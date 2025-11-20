#  Ограничение доступа в REST API: методы и практика

Ограничение доступа к определённым методам или ресурсам в REST API — это критически важный аспект безопасности. Правильная реализация контроля доступа защищает данные от несанкционированного доступа и обеспечивает соблюдение принципа наименьших привилегий.

##  Основные подходы к ограничению доступа

### 1. **Аутентификация и авторизация**

#### Аутентификация
Процесс проверки подлинности пользователя (кто вы).

#### Авторизация
Процесс определения прав доступа (что вы можете делать).

####  Пример базовой аутентификации:
```javascript
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
```

---

### 2. **Ролевая модель доступа**

#### Определение ролей
Создайте систему ролей для разных уровней доступа.

####  Пример ролевой модели:
```javascript
const roles = {
  GUEST: 'guest',
  USER: 'user',
  MODERATOR: 'moderator',
  ADMIN: 'admin'
};

const permissions = {
  [roles.GUEST]: ['read:public'],
  [roles.USER]: ['read:public', 'read:own', 'write:own'],
  [roles.MODERATOR]: ['read:public', 'read:own', 'write:own', 'moderate:content'],
  [roles.ADMIN]: ['read:all', 'write:all', 'delete:all', 'manage:users']
};
```

#### Middleware для проверки ролей
```javascript
const checkRole = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const userRole = req.user.role;
    const userPermissions = permissions[userRole] || [];
    
    if (!userPermissions.includes(requiredRole)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    
    next();
  };
};
```

---

### 3. **Middleware для контроля доступа**

#### Централизованное управление доступом
Создайте middleware для проверки прав доступа.

####  Пример middleware:
```javascript
const express = require('express');
const app = express();

// Middleware для проверки аутентификации
const requireAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  next();
};

// Middleware для проверки роли администратора
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

// Middleware для проверки владельца ресурса
const requireOwnership = (resourceType) => {
  return (req, res, next) => {
    const resourceId = req.params.id;
    const userId = req.user.id;
    
    // Проверяем, принадлежит ли ресурс пользователю
    if (req.user.role !== 'admin' && req.user.id !== resourceId) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    next();
  };
};
```

---

### 4. **Настройка маршрутов с ограничениями**

#### Разделение маршрутов по уровням доступа
Создайте отдельные маршруты для разных уровней доступа.

####  Пример настройки маршрутов:
```javascript
// Публичные маршруты (доступ для всех)
app.get('/api/public/posts', (req, res) => {
  // Получение публичных постов
});

// Маршруты для аутентифицированных пользователей
app.get('/api/posts', authenticateToken, (req, res) => {
  // Получение постов пользователя
});

app.post('/api/posts', authenticateToken, (req, res) => {
  // Создание нового поста
});

// Маршруты для администраторов
app.get('/api/admin/users', authenticateToken, requireAdmin, (req, res) => {
  // Получение списка всех пользователей
});

app.delete('/api/admin/users/:id', authenticateToken, requireAdmin, (req, res) => {
  // Удаление пользователя
});

// Маршруты с проверкой владельца
app.put('/api/posts/:id', authenticateToken, requireOwnership('post'), (req, res) => {
  // Обновление поста (только владелец)
});
```

---

### 5. **Ограничение по HTTP методам**

#### Определение разрешённых методов
Ограничьте доступ к определённым HTTP методам.

####  Пример ограничения методов:
```javascript
const allowedMethods = {
  '/api/posts': ['GET', 'POST'],
  '/api/posts/:id': ['GET', 'PUT', 'DELETE'],
  '/api/admin/users': ['GET', 'POST', 'PUT', 'DELETE']
};

const checkMethod = (req, res, next) => {
  const path = req.route?.path || req.path;
  const method = req.method;
  
  const allowed = allowedMethods[path];
  if (allowed && !allowed.includes(method)) {
    return res.status(405).json({ 
      error: `Method ${method} not allowed for ${path}` 
    });
  }
  
  next();
};

app.use(checkMethod);
```

---

### 6. **Персонализированные правила доступа**

#### Условная авторизация
Создайте сложные правила доступа на основе контекста.

####  Пример условной авторизации:
```javascript
const checkResourceAccess = (resourceType) => {
  return async (req, res, next) => {
    const resourceId = req.params.id;
    const userId = req.user.id;
    
    try {
      // Получаем ресурс из базы данных
      const resource = await Resource.findById(resourceId);
      
      if (!resource) {
        return res.status(404).json({ error: 'Resource not found' });
      }
      
      // Проверяем права доступа
      const hasAccess = 
        req.user.role === 'admin' ||
        resource.userId === userId ||
        (resource.isPublic && req.method === 'GET');
      
      if (!hasAccess) {
        return res.status(403).json({ error: 'Access denied' });
      }
      
      req.resource = resource;
      next();
    } catch (error) {
      return res.status(500).json({ error: 'Server error' });
    }
  };
};
```

---

### 7. **Фильтрация данных на уровне базы данных**

#### Ограничение доступа к данным
Реализуйте фильтрацию данных в запросах к базе данных.

####  Пример фильтрации данных:
```javascript
const getUserPosts = async (req, res) => {
  const userId = req.user.id;
  const userRole = req.user.role;
  
  try {
    let query = {};
    
    // Фильтруем данные в зависимости от роли
    if (userRole === 'admin') {
      // Администраторы видят все посты
      query = {};
    } else if (userRole === 'moderator') {
      // Модераторы видят публичные посты и свои
      query = {
        $or: [
          { isPublic: true },
          { userId: userId }
        ]
      };
    } else {
      // Обычные пользователи видят только свои посты
      query = { userId: userId };
    }
    
    const posts = await Post.find(query);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
```

---

### 8. **Ограничение по IP и CORS**

#### IP-фильтрация
Ограничьте доступ по IP-адресам.

####  Пример IP-фильтрации:
```javascript
const allowedIPs = ['192.168.1.1', '10.0.0.1'];

const checkIP = (req, res, next) => {
  const clientIP = req.ip || req.connection.remoteAddress;
  
  if (!allowedIPs.includes(clientIP)) {
    return res.status(403).json({ error: 'IP not allowed' });
  }
  
  next();
};

// Применяем только к административным маршрутам
app.use('/api/admin', checkIP);
```

#### CORS настройка
Настройте политику междоменных запросов.

####  Пример CORS:
```javascript
const cors = require('cors');

const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      'https://yourdomain.com',
      'https://app.yourdomain.com'
    ];
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
```

---

### 9. **API Gateway для управления доступом**

#### Использование API Gateway
Создайте централизованную точку входа для управления доступом.

####  Пример API Gateway:
```javascript
const express = require('express');
const rateLimit = require('express-rate-limit');

const gateway = express();

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100 // максимум 100 запросов
});

gateway.use(limiter);

// Аутентификация
gateway.use('/api', authenticateToken);

// Авторизация по ролям
gateway.use('/api/admin', requireRole('admin'));
gateway.use('/api/moderator', requireRole(['admin', 'moderator']));

// Проксирование запросов к микросервисам
gateway.use('/api/users', proxy('http://user-service:3001'));
gateway.use('/api/posts', proxy('http://post-service:3002'));
gateway.use('/api/admin', proxy('http://admin-service:3003'));
```

---

##  Полный пример реализации

### Защищённый REST API с контролем доступа

####  Express.js с полным контролем доступа:
```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api/', limiter);

// Аутентификация middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Проверка роли
const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const userRole = req.user.role;
    const allowedRoles = Array.isArray(roles) ? roles : [roles];
    
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    
    next();
  };
};

// Проверка владельца ресурса
const requireOwnership = (resourceType) => {
  return async (req, res, next) => {
    const resourceId = req.params.id;
    const userId = req.user.id;
    
    try {
      // Здесь должна быть логика проверки владельца
      // Например, получение ресурса из базы данных
      const resource = await getResourceById(resourceId, resourceType);
      
      if (!resource) {
        return res.status(404).json({ error: 'Resource not found' });
      }
      
      if (req.user.role !== 'admin' && resource.userId !== userId) {
        return res.status(403).json({ error: 'Access denied' });
      }
      
      req.resource = resource;
      next();
    } catch (error) {
      return res.status(500).json({ error: 'Server error' });
    }
  };
};

// Публичные маршруты
app.get('/api/public/posts', (req, res) => {
  res.json({ message: 'Public posts available to everyone' });
});

// Маршруты для аутентифицированных пользователей
app.get('/api/posts', authenticateToken, (req, res) => {
  res.json({ message: 'User posts', userId: req.user.id });
});

app.post('/api/posts', authenticateToken, (req, res) => {
  res.json({ message: 'Post created', userId: req.user.id });
});

// Маршруты с проверкой владельца
app.put('/api/posts/:id', authenticateToken, requireOwnership('post'), (req, res) => {
  res.json({ message: 'Post updated', resource: req.resource });
});

app.delete('/api/posts/:id', authenticateToken, requireOwnership('post'), (req, res) => {
  res.json({ message: 'Post deleted' });
});

// Административные маршруты
app.get('/api/admin/users', authenticateToken, requireRole('admin'), (req, res) => {
  res.json({ message: 'All users list' });
});

app.delete('/api/admin/users/:id', authenticateToken, requireRole('admin'), (req, res) => {
  res.json({ message: 'User deleted' });
});

// Модераторские маршруты
app.get('/api/moderator/content', authenticateToken, requireRole(['admin', 'moderator']), (req, res) => {
  res.json({ message: 'Moderator content' });
});

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

---

##  Итог

Ограничение доступа в REST API требует комплексного подхода, включающего аутентификацию, авторизацию, ролевую модель и персонализированные правила. Правильная реализация обеспечивает безопасность данных и соблюдение принципа наименьших привилегий.

### Ключевые принципы:
-  Используйте многоуровневую систему аутентификации
-  Применяйте ролевую модель доступа
-  Создавайте персонализированные правила
-  Фильтруйте данные на уровне базы данных
-  Используйте middleware для централизованного управления
-  Ограничивайте доступ по IP и CORS
-  Регулярно тестируйте систему безопасности

##  ЗАДАЧИ

Задачи по теме `Ограничение доступа в REST API`:

---

###  Задача 1: Создание middleware для проверки ролей
Создайте middleware, который проверяет, имеет ли пользователь роль администратора или модератора.

<details>
<summary> Решение</summary>

```javascript
const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const userRole = req.user.role;
    const allowedRoles = Array.isArray(roles) ? roles : [roles];
    
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    
    next();
  };
};

// Использование:
app.get('/api/admin/users', authenticateToken, requireRole('admin'), (req, res) => {
  res.json({ users: [] });
});

app.get('/api/moderator/content', authenticateToken, requireRole(['admin', 'moderator']), (req, res) => {
  res.json({ content: [] });
});
```

</details>

---

###  Задача 2: Проверка владельца ресурса
Создайте middleware для проверки, является ли пользователь владельцем ресурса.

<details>
<summary> Решение</summary>

```javascript
const requireOwnership = (resourceType) => {
  return async (req, res, next) => {
    const resourceId = req.params.id;
    const userId = req.user.id;
    
    try {
      // Получаем ресурс из базы данных
      const resource = await Resource.findById(resourceId);
      
      if (!resource) {
        return res.status(404).json({ error: 'Resource not found' });
      }
      
      // Проверяем права доступа
      if (req.user.role !== 'admin' && resource.userId !== userId) {
        return res.status(403).json({ error: 'Access denied' });
      }
      
      req.resource = resource;
      next();
    } catch (error) {
      return res.status(500).json({ error: 'Server error' });
    }
  };
};

// Использование:
app.put('/api/posts/:id', authenticateToken, requireOwnership('post'), (req, res) => {
  res.json({ message: 'Post updated', resource: req.resource });
});
```

</details>

---

###  Задача 3: Фильтрация данных по ролям
Создайте функцию для фильтрации данных в зависимости от роли пользователя.

<details>
<summary> Решение</summary>

```javascript
const filterDataByRole = (userRole, userId) => {
  const filters = {
    admin: {}, // Администраторы видят все данные
    moderator: {
      $or: [
        { isPublic: true },
        { userId: userId }
      ]
    },
    user: { userId: userId } // Обычные пользователи видят только свои данные
  };
  
  return filters[userRole] || { userId: userId };
};

const getUserPosts = async (req, res) => {
  const userId = req.user.id;
  const userRole = req.user.role;
  
  try {
    const filter = filterDataByRole(userRole, userId);
    const posts = await Post.find(filter);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
```

</details>

---

###  Задача 4: Ограничение HTTP методов
Создайте middleware для ограничения доступа к определённым HTTP методам.

<details>
<summary> Решение</summary>

```javascript
const allowedMethods = {
  '/api/posts': ['GET', 'POST'],
  '/api/posts/:id': ['GET', 'PUT', 'DELETE'],
  '/api/admin/users': ['GET', 'POST', 'PUT', 'DELETE']
};

const checkMethod = (req, res, next) => {
  const path = req.route?.path || req.path;
  const method = req.method;
  
  const allowed = allowedMethods[path];
  if (allowed && !allowed.includes(method)) {
    return res.status(405).json({ 
      error: `Method ${method} not allowed for ${path}` 
    });
  }
  
  next();
};

app.use(checkMethod);
```

</details>

---

###  Задача 5: IP-фильтрация для административных маршрутов
Создайте middleware для ограничения доступа по IP-адресам.

<details>
<summary> Решение</summary>

```javascript
const allowedIPs = ['192.168.1.1', '10.0.0.1', '127.0.0.1'];

const checkIP = (req, res, next) => {
  const clientIP = req.ip || req.connection.remoteAddress;
  
  if (!allowedIPs.includes(clientIP)) {
    return res.status(403).json({ 
      error: 'IP not allowed',
      clientIP: clientIP 
    });
  }
  
  next();
};

// Применяем только к административным маршрутам
app.use('/api/admin', checkIP);
```

</details>

---

###  Задача 6: Создание системы разрешений
Создайте систему разрешений с детальным контролем доступа.

<details>
<summary> Решение</summary>

```javascript
const permissions = {
  user: {
    posts: ['read:own', 'write:own'],
    comments: ['read:public', 'write:own']
  },
  moderator: {
    posts: ['read:all', 'write:own', 'moderate:content'],
    comments: ['read:all', 'write:own', 'moderate:content'],
    users: ['read:all']
  },
  admin: {
    posts: ['read:all', 'write:all', 'delete:all'],
    comments: ['read:all', 'write:all', 'delete:all'],
    users: ['read:all', 'write:all', 'delete:all']
  }
};

const checkPermission = (resource, action) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    const userPermissions = permissions[userRole] || {};
    const resourcePermissions = userPermissions[resource] || [];
    
    if (!resourcePermissions.includes(action)) {
      return res.status(403).json({ 
        error: `Permission denied: ${action} on ${resource}` 
      });
    }
    
    next();
  };
};

// Использование:
app.get('/api/posts', authenticateToken, checkPermission('posts', 'read:all'), (req, res) => {
  res.json({ posts: [] });
});
```

</details>

---

 Эти задачи помогут закрепить понимание ограничения доступа в REST API и научиться применять различные методы контроля на практике!

--- 