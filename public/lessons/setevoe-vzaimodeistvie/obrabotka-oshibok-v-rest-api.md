#  Обработка ошибок в REST API: принципы и практика

Обработка ошибок в REST API — важный аспект, который влияет на взаимодействие клиента и сервера. Правильная обработка ошибок позволяет клиентам понять, что произошло не так, и как они могут это исправить.

##  Основные принципы обработки ошибок

### 1. **Использование HTTP статус-кодов**

REST API использует стандартные HTTP статус-коды для обозначения результата запроса.

####  Основные статус-коды ошибок:

**4xx — Ошибки клиента:**
- **400 Bad Request** — неверный запрос
- **401 Unauthorized** — требуется аутентификация
- **403 Forbidden** — нет прав доступа
- **404 Not Found** — ресурс не найден
- **409 Conflict** — конфликт с текущим состоянием
- **422 Unprocessable Entity** — неверные данные

**5xx — Ошибки сервера:**
- **500 Internal Server Error** — внутренняя ошибка сервера
- **502 Bad Gateway** — ошибка шлюза
- **503 Service Unavailable** — сервис недоступен

---

### 2. **Структура ответа об ошибке**

Стандартизированная структура ответа об ошибке помогает клиентам обрабатывать ошибки.

####  Базовая структура ошибки:
```json
{
  "status": 404,
  "error": "Not Found",
  "message": "User with id 123 not found",
  "timestamp": "2023-10-01T12:00:00Z",
  "path": "/api/users/123",
  "details": {
    "field": "id",
    "value": "123"
  }
}
```

####  Расширенная структура ошибки:
```json
{
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "timestamp": "2023-10-01T12:00:00Z",
  "path": "/api/users",
  "errors": [
    {
      "field": "email",
      "message": "Email is required",
      "code": "REQUIRED"
    },
    {
      "field": "age",
      "message": "Age must be between 18 and 100",
      "code": "RANGE",
      "min": 18,
      "max": 100
    }
  ]
}
```

---

##  Типы ошибок и их обработка

### 1. **Ошибки валидации (400 Bad Request)**

####  Пример валидации данных:
```javascript
// Middleware для валидации
const validateUser = (req, res, next) => {
  const { name, email, age } = req.body;
  const errors = [];
  
  if (!name || name.trim().length < 2) {
    errors.push({
      field: 'name',
      message: 'Name must be at least 2 characters long',
      code: 'MIN_LENGTH'
    });
  }
  
  if (!email || !email.includes('@')) {
    errors.push({
      field: 'email',
      message: 'Valid email is required',
      code: 'INVALID_EMAIL'
    });
  }
  
  if (age && (age < 18 || age > 100)) {
    errors.push({
      field: 'age',
      message: 'Age must be between 18 and 100',
      code: 'RANGE',
      min: 18,
      max: 100
    });
  }
  
  if (errors.length > 0) {
    return res.status(400).json({
      status: 400,
      error: 'Bad Request',
      message: 'Validation failed',
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
      errors: errors
    });
  }
  
  next();
};
```

####  Ответ клиенту:
```json
{
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "timestamp": "2023-10-01T12:00:00Z",
  "path": "/api/users",
  "errors": [
    {
      "field": "email",
      "message": "Valid email is required",
      "code": "INVALID_EMAIL"
    },
    {
      "field": "age",
      "message": "Age must be between 18 and 100",
      "code": "RANGE",
      "min": 18,
      "max": 100
    }
  ]
}
```

### 2. **Ошибки аутентификации (401 Unauthorized)**

####  Пример обработки аутентификации:
```javascript
// Middleware для проверки аутентификации
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({
      status: 401,
      error: 'Unauthorized',
      message: 'Authentication token is required',
      timestamp: new Date().toISOString(),
      path: req.originalUrl
    });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      status: 401,
      error: 'Unauthorized',
      message: 'Invalid or expired token',
      timestamp: new Date().toISOString(),
      path: req.originalUrl
    });
  }
};
```

### 3. **Ошибки авторизации (403 Forbidden)**

####  Пример проверки прав доступа:
```javascript
// Middleware для проверки прав
const checkPermission = (permission) => {
  return (req, res, next) => {
    const user = req.user;
    
    if (!user.permissions.includes(permission)) {
      return res.status(403).json({
        status: 403,
        error: 'Forbidden',
        message: `Access denied. Required permission: ${permission}`,
        timestamp: new Date().toISOString(),
        path: req.originalUrl,
        required_permission: permission
      });
    }
    
    next();
  };
};

// Использование
app.delete('/api/users/:id', 
  authenticate, 
  checkPermission('DELETE_USERS'), 
  deleteUser
);
```

### 4. **Ошибки "Не найдено" (404 Not Found)**

####  Пример обработки отсутствующих ресурсов:
```javascript
// Получение пользователя
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        status: 404,
        error: 'Not Found',
        message: `User with id ${req.params.id} not found`,
        timestamp: new Date().toISOString(),
        path: req.originalUrl,
        resource_id: req.params.id
      });
    }
    
    res.json(user);
  } catch (error) {
    next(error);
  }
});
```

### 5. **Ошибки конфликтов (409 Conflict)**

####  Пример обработки дубликатов:
```javascript
// Создание пользователя
app.post('/api/users', async (req, res) => {
  try {
    const { email } = req.body;
    
    // Проверяем, существует ли пользователь с таким email
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return res.status(409).json({
        status: 409,
        error: 'Conflict',
        message: 'User with this email already exists',
        timestamp: new Date().toISOString(),
        path: req.originalUrl,
        conflicting_field: 'email',
        conflicting_value: email
      });
    }
    
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});
```

---

##  Обработка ошибок на сервере

### 1. **Express.js Middleware для обработки ошибок**

####  Глобальный обработчик ошибок:
```javascript
// Middleware для обработки ошибок
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  // Определяем статус код
  let status = 500;
  let message = 'Internal Server Error';
  
  if (err.name === 'ValidationError') {
    status = 400;
    message = 'Validation Error';
  } else if (err.name === 'CastError') {
    status = 400;
    message = 'Invalid ID format';
  } else if (err.code === 11000) {
    status = 409;
    message = 'Duplicate key error';
  } else if (err.name === 'JsonWebTokenError') {
    status = 401;
    message = 'Invalid token';
  } else if (err.name === 'TokenExpiredError') {
    status = 401;
    message = 'Token expired';
  }
  
  // Формируем ответ об ошибке
  const errorResponse = {
    status: status,
    error: message,
    message: err.message || message,
    timestamp: new Date().toISOString(),
    path: req.originalUrl
  };
  
  // Добавляем детали в режиме разработки
  if (process.env.NODE_ENV === 'development') {
    errorResponse.stack = err.stack;
  }
  
  res.status(status).json(errorResponse);
});
```

### 2. **Классы ошибок**

####  Создание кастомных ошибок:
```javascript
// Базовый класс ошибки
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

// Специализированные ошибки
class ValidationError extends AppError {
  constructor(message, errors = []) {
    super(message, 400);
    this.errors = errors;
  }
}

class NotFoundError extends AppError {
  constructor(resource, id) {
    super(`${resource} with id ${id} not found`, 404);
    this.resource = resource;
    this.id = id;
  }
}

class ConflictError extends AppError {
  constructor(message, field, value) {
    super(message, 409);
    this.field = field;
    this.value = value;
  }
}

// Использование
app.get('/api/users/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      throw new NotFoundError('User', req.params.id);
    }
    
    res.json(user);
  } catch (error) {
    next(error);
  }
});
```

### 3. **Обработка асинхронных ошибок**

####  Async/await wrapper:
```javascript
// Wrapper для обработки асинхронных ошибок
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Использование
app.get('/api/users/:id', asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  
  if (!user) {
    throw new NotFoundError('User', req.params.id);
  }
  
  res.json(user);
}));
```

---

##  Логирование ошибок

### 1. **Структурированное логирование**

####  Пример с Winston:
```javascript
const winston = require('winston');

// Настройка логгера
const logger = winston.createLogger({
  level: 'error',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log' }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

// Middleware для логирования ошибок
app.use((err, req, res, next) => {
  // Логируем ошибку
  logger.error({
    message: err.message,
    stack: err.stack,
    statusCode: err.statusCode || 500,
    path: req.originalUrl,
    method: req.method,
    userAgent: req.get('User-Agent'),
    ip: req.ip,
    timestamp: new Date().toISOString()
  });
  
  // Отправляем ответ клиенту
  res.status(err.statusCode || 500).json({
    status: err.statusCode || 500,
    error: err.status || 'Internal Server Error',
    message: err.message,
    timestamp: new Date().toISOString(),
    path: req.originalUrl
  });
});
```

### 2. **Мониторинг ошибок**

####  Интеграция с Sentry:
```javascript
const Sentry = require('@sentry/node');

// Инициализация Sentry
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV
});

// Middleware для отправки ошибок в Sentry
app.use((err, req, res, next) => {
  // Отправляем ошибку в Sentry
  Sentry.captureException(err, {
    extra: {
      path: req.originalUrl,
      method: req.method,
      userAgent: req.get('User-Agent'),
      ip: req.ip
    }
  });
  
  // Обрабатываем ошибку как обычно
  next(err);
});
```

---

##  Обработка ошибок на клиенте

### 1. **JavaScript fetch с обработкой ошибок**

####  Пример клиентского кода:
```javascript
class APIClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }
  
  async request(endpoint, options = {}) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new APIError(
          data.message || 'API Error',
          response.status,
          data
        );
      }
      
      return data;
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      
      throw new APIError(
        'Network error',
        0,
        { message: error.message }
      );
    }
  }
  
  async getUser(id) {
    return this.request(`/api/users/${id}`);
  }
  
  async createUser(userData) {
    return this.request('/api/users', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }
}

// Класс для обработки API ошибок
class APIError extends Error {
  constructor(message, status, data) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = 'APIError';
  }
}

// Использование
const api = new APIClient('https://api.example.com');

try {
  const user = await api.getUser(123);
  console.log('User:', user);
} catch (error) {
  if (error instanceof APIError) {
    console.error('API Error:', error.status, error.message);
    
    if (error.status === 404) {
      console.log('User not found');
    } else if (error.status === 401) {
      console.log('Please login');
    }
  } else {
    console.error('Network error:', error.message);
  }
}
```

### 2. **React компонент для обработки ошибок**

####  Пример React хука:
```javascript
import { useState, useEffect } from 'react';

const useAPI = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(url);
        const result = await response.json();
        
        if (!response.ok) {
          throw new Error(result.message || 'API Error');
        }
        
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [url]);
  
  return { data, error, loading };
};

// Использование в компоненте
const UserProfile = ({ userId }) => {
  const { data: user, error, loading } = useAPI(`/api/users/${userId}`);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>User not found</div>;
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
};
```

---

##  Лучшие практики

###  Рекомендации:

#### 1. **Консистентность**
- Используйте единую структуру ошибок во всём API
- Следуйте стандартным HTTP статус-кодам
- Обеспечьте предсказуемые сообщения об ошибках

#### 2. **Безопасность**
- Не раскрывайте внутреннюю информацию в продакшене
- Логируйте ошибки для отладки
- Используйте HTTPS для передачи данных

#### 3. **Документация**
- Документируйте все возможные ошибки
- Предоставьте примеры ответов об ошибках
- Объясните, как клиенты должны обрабатывать ошибки

#### 4. **Мониторинг**
- Настройте алерты для критических ошибок
- Отслеживайте частоту ошибок
- Анализируйте паттерны ошибок

---

##  Итог

- **HTTP статус-коды** — основа обработки ошибок в REST
- **Структурированные ответы** — помогают клиентам обрабатывать ошибки
- **Логирование** — критически важно для отладки
- **Безопасность** — не раскрывайте внутреннюю информацию
- **Документация** — помогает пользователям API

##  ЗАДАЧИ

Задачи по теме `Обработка ошибок в REST API`:

---

###  Задача 1: HTTP статус-коды
Какие HTTP статус-коды используются для ошибок в REST API?
<details>
<summary> Решение</summary>

**Ответ:**
- 400 Bad Request — неверный запрос
- 401 Unauthorized — требуется аутентификация
- 403 Forbidden — нет прав доступа
- 404 Not Found — ресурс не найден
- 409 Conflict — конфликт с состоянием
- 500 Internal Server Error — ошибка сервера

</details>

---

###  Задача 2: Структура ошибки
Как должна выглядеть структура ответа об ошибке?
<details>
<summary> Решение</summary>

```json
{
  "status": 404,
  "error": "Not Found",
  "message": "User with id 123 not found",
  "timestamp": "2023-10-01T12:00:00Z",
  "path": "/api/users/123"
}
```

</details>

---

###  Задача 3: Валидация данных
Как обрабатывать ошибки валидации в REST API?
<details>
<summary> Решение</summary>

```javascript
app.post('/api/users', (req, res) => {
  const errors = validateUser(req.body);
  
  if (errors.length > 0) {
    return res.status(400).json({
      status: 400,
      error: 'Bad Request',
      message: 'Validation failed',
      errors: errors
    });
  }
  
  // Создание пользователя
});
```

</details>

---

###  Задача 4: Middleware для ошибок
Как создать middleware для обработки ошибок в Express.js?
<details>
<summary> Решение</summary>

```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  res.status(err.statusCode || 500).json({
    status: err.statusCode || 500,
    error: err.message || 'Internal Server Error',
    timestamp: new Date().toISOString(),
    path: req.originalUrl
  });
});
```

</details>

---

###  Задача 5: Кастомные ошибки
Как создать кастомные классы ошибок?
<details>
<summary> Решение</summary>

```javascript
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
  }
}

class NotFoundError extends AppError {
  constructor(resource, id) {
    super(`${resource} with id ${id} not found`, 404);
  }
}
```

</details>

---

###  Задача 6: Клиентская обработка
Как обрабатывать ошибки на клиенте?
<details>
<summary> Решение</summary>

```javascript
async function fetchUser(id) {
  try {
    const response = await fetch(`/api/users/${id}`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'API Error');
    }
    
    return data;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}
```

</details>

---

###  Задача 7: Логирование ошибок
Как настроить логирование ошибок?
<details>
<summary> Решение</summary>

```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log' })
  ]
});

app.use((err, req, res, next) => {
  logger.error({
    message: err.message,
    stack: err.stack,
    path: req.originalUrl,
    timestamp: new Date().toISOString()
  });
  
  next(err);
});
```

</details>

---

###  Задача 8: Безопасность ошибок
Как обеспечить безопасность при обработке ошибок?
<details>
<summary> Решение</summary>

```javascript
app.use((err, req, res, next) => {
  const errorResponse = {
    status: err.statusCode || 500,
    error: err.status || 'Internal Server Error',
    message: err.message,
    timestamp: new Date().toISOString(),
    path: req.originalUrl
  };
  
  // В продакшене не показываем stack trace
  if (process.env.NODE_ENV === 'development') {
    errorResponse.stack = err.stack;
  }
  
  res.status(err.statusCode || 500).json(errorResponse);
});
```

</details>

---

 Эти задачи помогут закрепить понимание обработки ошибок в REST API!

--- 