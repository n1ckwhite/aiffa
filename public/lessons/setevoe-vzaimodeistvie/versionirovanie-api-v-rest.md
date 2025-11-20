#  Версионирование API в REST: подходы и практика

Версионирование API — это важный аспект проектирования RESTful сервисов, который позволяет вносить изменения в API, не нарушая работу существующих клиентов. Правильное версионирование обеспечивает обратную совместимость и плавную миграцию.

##  Зачем нужно версионирование?

### Основные причины:
- **Обратная совместимость** — старые клиенты продолжают работать
- **Плавная миграция** — постепенный переход на новые версии
- **Тестирование** — возможность тестировать новые функции
- **Стабильность** — предсказуемость API для клиентов

### Когда нужно версионирование:
- Изменение структуры ответов
- Удаление или переименование полей
- Изменение логики аутентификации
- Добавление обязательных параметров

---

##  Подходы к версионированию

### 1. **Версионирование через URL**

Самый распространённый способ, где версия указывается в пути URL.

####  Примеры:
```http
GET /api/v1/users              # Версия 1
GET /api/v2/users              # Версия 2
GET /api/v3/users              # Версия 3
```

####  Структура URL:
```
https://api.example.com/v1/users/123
│     │                │   │     │
│     │                │   │     └── Идентификатор ресурса
│     │                │   └──────── Коллекция ресурсов
│     │                └──────────── Версия API
│     └────────────────────────────── Домен
└────────────────────────────────────── Протокол
```

####  Преимущества:
- **Ясность** — версия очевидна из URL
- **Простота** — легко обрабатывать на сервере
- **Кэширование** — разные версии кэшируются отдельно
- **Документация** — легко документировать каждую версию

####  Недостатки:
- **URL загрязнение** — длинные URL
- **Много маршрутов** — необходимо поддерживать все версии
- **SEO** — может влиять на SEO при публичных API

####  JavaScript пример:
```javascript
// Версия 1
fetch('/api/v1/users')
  .then(response => response.json())
  .then(users => console.log('V1 users:', users));

// Версия 2
fetch('/api/v2/users')
  .then(response => response.json())
  .then(users => console.log('V2 users:', users));
```

---

### 2. **Версионирование через заголовки HTTP**

Версия указывается в заголовке запроса.

####  Примеры заголовков:
```http
GET /api/users HTTP/1.1
Host: api.example.com
API-Version: 2.0
Accept: application/json
```

```http
GET /api/users HTTP/1.1
Host: api.example.com
X-API-Version: 1.0
Accept: application/json
```

####  Преимущества:
- **Чистота URL** — URL остаётся неизменным
- **Гибкость** — легко добавлять новые заголовки
- **SEO дружелюбность** — не влияет на URL структуру
- **Обратная совместимость** — старые клиенты работают по умолчанию

####  Недостатки:
- **Скрытость** — версия не очевидна из URL
- **Сложность** — требует дополнительной обработки
- **Отладка** — сложнее отлаживать в браузере

####  JavaScript пример:
```javascript
// Версия 1
fetch('/api/users', {
  headers: { 'API-Version': '1.0' }
})
  .then(response => response.json())
  .then(users => console.log('V1 users:', users));

// Версия 2
fetch('/api/users', {
  headers: { 'API-Version': '2.0' }
})
  .then(response => response.json())
  .then(users => console.log('V2 users:', users));
```

---

### 3. **Версионирование через параметры запроса**

Версия указывается как параметр запроса.

####  Примеры:
```http
GET /api/users?version=1.0
GET /api/users?v=2.0
GET /api/users?api_version=3.0
```

####  Преимущества:
- **Простота** — легко реализовать
- **Гибкость** — можно комбинировать с другими параметрами
- **Обратная совместимость** — старые запросы работают

####  Недостатки:
- **URL загрязнение** — параметры делают URL длиннее
- **Кэширование** — разные версии не кэшируются отдельно
- **Читаемость** — менее очевидно, чем в URL

####  JavaScript пример:
```javascript
// Версия 1
fetch('/api/users?version=1.0')
  .then(response => response.json())
  .then(users => console.log('V1 users:', users));

// Версия 2
fetch('/api/users?version=2.0')
  .then(response => response.json())
  .then(users => console.log('V2 users:', users));
```

---

### 4. **Версионирование через медиаполитику (Content Negotiation)**

Использование заголовка `Accept` для указания версии и формата.

####  Примеры:
```http
GET /api/users HTTP/1.1
Host: api.example.com
Accept: application/vnd.example.v1+json
```

```http
GET /api/users HTTP/1.1
Host: api.example.com
Accept: application/vnd.example.v2+xml
```

####  Преимущества:
- **Стандартность** — использует HTTP стандарты
- **Гибкость** — поддерживает разные форматы
- **Чистота URL** — URL остаётся неизменным
- **Семантика** — явно указывает формат и версию

####  Недостатки:
- **Сложность** — сложнее в реализации
- **Понятность** — менее очевидно для разработчиков
- **Документация** — требует более подробной документации

####  JavaScript пример:
```javascript
// Версия 1, JSON
fetch('/api/users', {
  headers: { 'Accept': 'application/vnd.example.v1+json' }
})
  .then(response => response.json())
  .then(users => console.log('V1 JSON users:', users));

// Версия 2, XML
fetch('/api/users', {
  headers: { 'Accept': 'application/vnd.example.v2+xml' }
})
  .then(response => response.text())
  .then(xml => console.log('V2 XML users:', xml));
```

---

##  Сравнительная таблица подходов

| Критерий           | URL версионирование | Заголовки HTTP | Параметры запроса | Медиаполитика |
|--------------------|---------------------|----------------|-------------------|----------------|
| **Ясность**        |  Отличная         |  Скрыто      |  Умеренная      |  Скрыто      |
| **Простота**       |  Простое          |  Среднее     |  Простое        |  Сложное     |
| **SEO**            |  Плохо            |  Хорошо       |  Умеренно       |  Хорошо      |
| **Кэширование**    |  Отдельное        |  Общее        |  Общее          |  Отдельное   |
| **Стандартность**  |  Умеренная        |  Умеренная    |  Умеренная      |  Высокая     |
| **Гибкость**       |  Низкая           |  Высокая      |  Высокая        |  Высокая     |

---

##  Практические примеры

### Пример 1: API с URL версионированием

####  Структура API:
```http
# Версия 1
GET /api/v1/users              # Список пользователей
GET /api/v1/users/123          # Конкретный пользователь
POST /api/v1/users             # Создать пользователя

# Версия 2
GET /api/v2/users              # Список пользователей (новая структура)
GET /api/v2/users/123          # Конкретный пользователь
POST /api/v2/users             # Создать пользователя
```

####  Различия в ответах:

**Версия 1:**
```json
{
  "id": 123,
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Версия 2:**
```json
{
  "id": 123,
  "name": "John Doe",
  "email": "john@example.com",
  "created_at": "2023-01-15T10:30:00Z",
  "status": "active"
}
```

### Пример 2: API с заголовочным версионированием

####  Обработка на сервере:
```javascript
// Express.js пример
app.get('/api/users', (req, res) => {
  const version = req.headers['api-version'] || '1.0';
  
  if (version === '1.0') {
    res.json(getUsersV1());
  } else if (version === '2.0') {
    res.json(getUsersV2());
  } else {
    res.status(400).json({ error: 'Unsupported version' });
  }
});
```

### Пример 3: API с медиаполитикой

####  Обработка на сервере:
```javascript
// Express.js пример
app.get('/api/users', (req, res) => {
  const accept = req.headers.accept;
  
  if (accept.includes('application/vnd.example.v1+json')) {
    res.setHeader('Content-Type', 'application/vnd.example.v1+json');
    res.json(getUsersV1());
  } else if (accept.includes('application/vnd.example.v2+json')) {
    res.setHeader('Content-Type', 'application/vnd.example.v2+json');
    res.json(getUsersV2());
  } else {
    res.status(406).json({ error: 'Unsupported media type' });
  }
});
```

---

##  Стратегии миграции

### 1. **Постепенная миграция**
```javascript
// Клиент может использовать обе версии
const apiClient = {
  v1: {
    getUsers: () => fetch('/api/v1/users'),
    createUser: (data) => fetch('/api/v1/users', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  },
  v2: {
    getUsers: () => fetch('/api/v2/users'),
    createUser: (data) => fetch('/api/v2/users', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }
};
```

### 2. **Автоматическое определение версии**
```javascript
// Клиент автоматически выбирает версию
class APIClient {
  constructor(version = '2.0') {
    this.version = version;
  }
  
  getUsers() {
    return fetch(`/api/v${this.version.split('.')[0]}/users`);
  }
}
```

### 3. **Обратная совместимость**
```javascript
// Сервер поддерживает старые форматы
app.get('/api/users', (req, res) => {
  const version = req.headers['api-version'] || '1.0';
  
  const users = getUsers();
  
  if (version === '1.0') {
    // Удаляем новые поля для обратной совместимости
    const v1Users = users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email
    }));
    res.json(v1Users);
  } else {
    res.json(users);
  }
});
```

---

##  Лучшие практики

###  Рекомендации:

#### 1. **Выбирайте подход в зависимости от требований**
- **URL версионирование** — для публичных API с простыми клиентами
- **Заголовки HTTP** — для внутренних API с контролируемыми клиентами
- **Медиаполитика** — для сложных API с множественными форматами

#### 2. **Обеспечивайте обратную совместимость**
```javascript
// Поддерживайте старые версии минимум 6-12 месяцев
// Предупреждайте о устаревании через заголовки
res.setHeader('Deprecation', 'Wed, 21 Oct 2023 07:28:00 GMT');
res.setHeader('Sunset', 'Wed, 21 Oct 2024 07:28:00 GMT');
```

#### 3. **Документируйте изменения**
```markdown
# API Versioning

## Version 2.0 (Current)
- Added `created_at` field to user responses
- Added `status` field to user responses
- Removed `age` field from user responses

## Version 1.0 (Deprecated)
- Basic user fields: id, name, email, age
- Will be removed on 2024-10-21
```

#### 4. **Используйте семантическое версионирование**
```http
GET /api/v1.0/users    # Major.Minor
GET /api/v1.1/users    # Minor changes
GET /api/v2.0/users    # Major changes (breaking)
```

---

##  Итог

- **URL версионирование** — самый простой и понятный подход
- **Заголовки HTTP** — гибкий подход для контролируемых API
- **Медиаполитика** — стандартный подход для сложных API
- **Обратная совместимость** — ключ к успешному версионированию
- **Документация** — критически важна для пользователей API

##  ЗАДАЧИ

Задачи по теме `Версионирование API в REST`:

---

###  Задача 1: Выбор подхода
Какой подход к версионированию выбрать для публичного API?
<details>
<summary> Решение</summary>

**Ответ:**
URL версионирование — самый простой и понятный для пользователей публичного API.

</details>

---

###  Задача 2: URL версионирование
Как правильно структурировать URL для версионирования API?
<details>
<summary> Решение</summary>

**Ответ:**
```
GET /api/v1/users              # Версия 1
GET /api/v2/users              # Версия 2
GET /api/v1/users/123          # Конкретный ресурс в версии 1
```

</details>

---

###  Задача 3: Заголовочное версионирование
Как реализовать версионирование через заголовки HTTP?
<details>
<summary> Решение</summary>

```javascript
fetch('/api/users', {
  headers: { 'API-Version': '2.0' }
})
  .then(response => response.json())
  .then(data => console.log(data));
```

</details>

---

###  Задача 4: Медиаполитика
Как использовать медиаполитику для версионирования?
<details>
<summary> Решение</summary>

```javascript
fetch('/api/users', {
  headers: { 'Accept': 'application/vnd.example.v2+json' }
})
  .then(response => response.json())
  .then(data => console.log(data));
```

</details>

---

###  Задача 5: Обратная совместимость
Как обеспечить обратную совместимость при изменении API?
<details>
<summary> Решение</summary>

```javascript
// Сервер поддерживает старые форматы
app.get('/api/users', (req, res) => {
  const version = req.headers['api-version'] || '1.0';
  const users = getUsers();
  
  if (version === '1.0') {
    // Удаляем новые поля для обратной совместимости
    const v1Users = users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email
    }));
    res.json(v1Users);
  } else {
    res.json(users);
  }
});
```

</details>

---

###  Задача 6: Миграция клиентов
Как помочь клиентам мигрировать на новую версию API?
<details>
<summary> Решение</summary>

**Ответ:**
- Предоставить подробную документацию изменений
- Обеспечить период поддержки старой версии
- Использовать заголовки Deprecation и Sunset
- Предоставить инструменты для автоматической миграции

</details>

---

###  Задача 7: Семантическое версионирование
Как правильно использовать семантическое версионирование в API?
<details>
<summary> Решение</summary>

**Ответ:**
- MAJOR.MINOR.PATCH формат
- MAJOR — breaking changes (v1.0 → v2.0)
- MINOR — новые функции (v1.0 → v1.1)
- PATCH — исправления (v1.0.0 → v1.0.1)

</details>

---

###  Задача 8: Тестирование версий
Как тестировать разные версии API?
<details>
<summary> Решение</summary>

```javascript
// Тестирование разных версий
describe('API Versioning', () => {
  test('V1 API should work', async () => {
    const response = await fetch('/api/v1/users');
    const users = await response.json();
    expect(users[0]).toHaveProperty('name');
    expect(users[0]).not.toHaveProperty('created_at');
  });
  
  test('V2 API should work', async () => {
    const response = await fetch('/api/v2/users');
    const users = await response.json();
    expect(users[0]).toHaveProperty('name');
    expect(users[0]).toHaveProperty('created_at');
  });
});
```

</details>

---

 Эти задачи помогут закрепить понимание версионирования API и его правильного использования!

--- 