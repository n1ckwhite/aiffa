#  CRUD операции и HTTP методы в REST API

CRUD операции представляют собой четыре базовые функции, которые используются для управления данными в приложениях и базах данных. CRUD является акронимом, который расшифровывается как **C**reate, **R**ead, **U**pdate, **D**elete.

##  Что такое CRUD операции?

### 1. **C**reate (Создание)
Создание новых ресурсов или записей в системе.

### 2. **R**ead (Чтение)
Получение и отображение существующих данных.

### 3. **U**pdate (Обновление)
Изменение существующих данных или ресурсов.

### 4. **D**elete (Удаление)
Удаление ресурсов или записей из системы.

---

##  Соответствие CRUD и HTTP методов

### 1. **C**reate — POST

#### Назначение:
Создание нового ресурса на сервере.

####  Примеры:
```http
POST /api/users              # Создать нового пользователя
POST /api/posts              # Создать новый пост
POST /api/orders             # Создать новый заказ
```

####  JavaScript пример:
```javascript
fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    age: 25
  })
})
  .then(response => response.json())
  .then(newUser => console.log('Created user:', newUser));
```

#### Статус-коды:
- **201 Created** — ресурс успешно создан
- **400 Bad Request** — неверные данные
- **409 Conflict** — ресурс уже существует

---

### 2. **R**ead — GET

#### Назначение:
Получение данных с сервера без изменения состояния.

####  Примеры:
```http
GET /api/users              # Получить всех пользователей
GET /api/users/123          # Получить конкретного пользователя
GET /api/users/123/posts    # Получить посты пользователя
GET /api/products?category=electronics  # Фильтрация
```

####  JavaScript пример:
```javascript
// Получить всех пользователей
fetch('/api/users')
  .then(response => response.json())
  .then(users => console.log('Users:', users));

// Получить конкретного пользователя
fetch('/api/users/123')
  .then(response => response.json())
  .then(user => console.log('User:', user));
```

#### Статус-коды:
- **200 OK** — данные успешно получены
- **404 Not Found** — ресурс не найден
- **400 Bad Request** — неверный запрос

---

### 3. **U**pdate — PUT и PATCH

#### PUT (Полное обновление):
Замена всего ресурса новыми данными.

####  Пример PUT:
```http
PUT /api/users/123           # Полностью обновить пользователя
```

####  JavaScript пример PUT:
```javascript
fetch('/api/users/123', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Updated',
    email: 'john.updated@example.com',
    age: 30,
    city: 'New York'
  })
})
  .then(response => response.json())
  .then(updatedUser => console.log('Updated user:', updatedUser));
```

#### PATCH (Частичное обновление):
Изменение только определённых полей ресурса.

####  Пример PATCH:
```http
PATCH /api/users/123         # Обновить только email
```

####  JavaScript пример PATCH:
```javascript
fetch('/api/users/123', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'new.email@example.com'
  })
})
  .then(response => response.json())
  .then(updatedUser => console.log('Patched user:', updatedUser));
```

#### Статус-коды:
- **200 OK** — ресурс успешно обновлён
- **204 No Content** — обновление выполнено без возврата данных
- **404 Not Found** — ресурс не найден
- **400 Bad Request** — неверные данные

---

### 4. **D**elete — DELETE

#### Назначение:
Удаление ресурса с сервера.

####  Примеры:
```http
DELETE /api/users/123         # Удалить пользователя
DELETE /api/posts/456         # Удалить пост
DELETE /api/orders/789        # Удалить заказ
```

####  JavaScript пример:
```javascript
fetch('/api/users/123', {
  method: 'DELETE'
})
  .then(response => {
    if (response.status === 204) {
      console.log('User deleted successfully');
    }
  });
```

#### Статус-коды:
- **204 No Content** — ресурс успешно удалён
- **404 Not Found** — ресурс не найден
- **403 Forbidden** — нет прав на удаление

---

##  Сводная таблица CRUD и HTTP методов

| CRUD операция | HTTP метод | Назначение                    | Пример URI                | Статус-коды              |
|---------------|------------|-------------------------------|---------------------------|--------------------------|
| **C**reate    | POST       | Создание нового ресурса       | `/api/users`              | 201 Created             |
| **R**ead      | GET        | Получение данных              | `/api/users/123`          | 200 OK                  |
| **U**pdate    | PUT        | Полное обновление ресурса     | `/api/users/123`          | 200 OK / 204 No Content |
| **U**pdate    | PATCH      | Частичное обновление ресурса  | `/api/users/123`          | 200 OK / 204 No Content |
| **D**elete    | DELETE     | Удаление ресурса              | `/api/users/123`          | 204 No Content          |

---

##  Практические примеры CRUD API

### Пример 1: API для управления пользователями

```javascript
// CREATE - Создать пользователя
POST /api/users
{
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "age": 28
}

// READ - Получить всех пользователей
GET /api/users

// READ - Получить конкретного пользователя
GET /api/users/123

// UPDATE - Полностью обновить пользователя
PUT /api/users/123
{
  "name": "Alice Smith",
  "email": "alice.smith@example.com",
  "age": 29,
  "city": "Boston"
}

// UPDATE - Частично обновить пользователя
PATCH /api/users/123
{
  "email": "new.email@example.com"
}

// DELETE - Удалить пользователя
DELETE /api/users/123
```

### Пример 2: API для блога

```javascript
// CREATE - Создать пост
POST /api/posts
{
  "title": "Мой первый пост",
  "content": "Содержание поста...",
  "author_id": 123
}

// READ - Получить все посты
GET /api/posts

// READ - Получить конкретный пост
GET /api/posts/456

// UPDATE - Обновить пост
PUT /api/posts/456
{
  "title": "Обновлённый заголовок",
  "content": "Новое содержание...",
  "author_id": 123
}

// DELETE - Удалить пост
DELETE /api/posts/456
```

---

##  Особенности и лучшие практики

###  Правильное использование CRUD:

#### 1. **Создание (Create)**
- Используйте **POST** для создания новых ресурсов
- Возвращайте **201 Created** с заголовком `Location`
- Включайте созданный ресурс в ответ

#### 2. **Чтение (Read)**
- Используйте **GET** для получения данных
- Поддерживайте фильтрацию и пагинацию
- Возвращайте **200 OK** с данными

#### 3. **Обновление (Update)**
- Используйте **PUT** для полного обновления
- Используйте **PATCH** для частичного обновления
- Возвращайте **200 OK** или **204 No Content**

#### 4. **Удаление (Delete)**
- Используйте **DELETE** для удаления ресурсов
- Возвращайте **204 No Content**
- Рассмотрите мягкое удаление (soft delete)

###  Частые ошибки:

- Использование GET для изменения данных
- Использование POST для обновления существующих ресурсов
- Неправильное использование PUT vs PATCH
- Отсутствие обработки ошибок

---

##  Расширенные CRUD операции

### 1. **Массовые операции**
```javascript
// Массовое создание
POST /api/users/bulk
[
  {"name": "User 1", "email": "user1@example.com"},
  {"name": "User 2", "email": "user2@example.com"}
]

// Массовое удаление
DELETE /api/users?ids=1,2,3
```

### 2. **Поиск и фильтрация**
```javascript
// Поиск по параметрам
GET /api/users?name=john&age=25

// Сортировка
GET /api/users?sort=name&order=asc

// Пагинация
GET /api/users?page=1&limit=10
```

### 3. **Связанные ресурсы**
```javascript
// Получить посты пользователя
GET /api/users/123/posts

// Получить комментарии к посту
GET /api/posts/456/comments
```

---

##  Итог

- **CRUD** — основа для работы с данными в приложениях
- **HTTP методы** — стандартизированный способ выполнения CRUD операций
- **POST** = Create, **GET** = Read, **PUT/PATCH** = Update, **DELETE** = Delete
- Правильное использование CRUD и HTTP методов обеспечивает понятный и предсказуемый API

##  ЗАДАЧИ

Задачи по теме `CRUD операции и HTTP методы`:

---

###  Задача 1: Определение CRUD
Что означает аббревиатура CRUD и какие операции она включает?
<details>
<summary> Решение</summary>

**Ответ:**
CRUD = Create, Read, Update, Delete — четыре базовые операции для управления данными в приложениях.

</details>

---

###  Задача 2: Соответствие методов
Какой HTTP метод соответствует каждой CRUD операции?
<details>
<summary> Решение</summary>

**Ответ:**
- Create → POST
- Read → GET
- Update → PUT/PATCH
- Delete → DELETE

</details>

---

###  Задача 3: PUT vs PATCH
В чём разница между PUT и PATCH при обновлении данных?
<details>
<summary> Решение</summary>

**Ответ:**
PUT заменяет весь ресурс целиком, PATCH обновляет только указанные поля.

</details>

---

###  Задача 4: Статус-коды
Какие статус-коды HTTP используются для каждой CRUD операции?
<details>
<summary> Решение</summary>

**Ответ:**
- Create (POST) → 201 Created
- Read (GET) → 200 OK
- Update (PUT/PATCH) → 200 OK / 204 No Content
- Delete (DELETE) → 204 No Content

</details>

---

###  Задача 5: Практическое применение
Создайте CRUD API для управления товарами в интернет-магазине:
<details>
<summary> Решение</summary>

```javascript
// CREATE
POST /api/products
{
  "name": "Смартфон",
  "price": 29999,
  "category": "electronics"
}

// READ
GET /api/products              // Все товары
GET /api/products/123          // Конкретный товар

// UPDATE
PUT /api/products/123          // Полное обновление
PATCH /api/products/123        // Частичное обновление

// DELETE
DELETE /api/products/123       // Удаление товара
```

</details>

---

###  Задача 6: Обработка ошибок
Как правильно обрабатывать ошибки в CRUD операциях?
<details>
<summary> Решение</summary>

```javascript
fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(userData)
})
  .then(response => {
    if (response.status === 201) {
      return response.json(); // Успешное создание
    } else if (response.status === 400) {
      throw new Error('Неверные данные');
    } else if (response.status === 409) {
      throw new Error('Ресурс уже существует');
    } else {
      throw new Error(`HTTP ${response.status}`);
    }
  })
  .then(data => console.log('Success:', data))
  .catch(error => console.error('Error:', error));
```

</details>

---

###  Задача 7: Массовые операции
Как реализовать массовые CRUD операции в REST API?
<details>
<summary> Решение</summary>

```javascript
// Массовое создание
POST /api/users/bulk
[
  {"name": "User 1", "email": "user1@example.com"},
  {"name": "User 2", "email": "user2@example.com"}
]

// Массовое удаление
DELETE /api/users?ids=1,2,3

// Массовое обновление
PUT /api/users/bulk
[
  {"id": 1, "name": "Updated User 1"},
  {"id": 2, "name": "Updated User 2"}
]
```

</details>

---

###  Задача 8: Связанные ресурсы
Как работать со связанными ресурсами в CRUD API?
<details>
<summary> Решение</summary>

```javascript
// Получить посты пользователя
GET /api/users/123/posts

// Создать пост для пользователя
POST /api/users/123/posts
{
  "title": "Новый пост",
  "content": "Содержание"
}

// Получить комментарии к посту
GET /api/posts/456/comments

// Добавить комментарий к посту
POST /api/posts/456/comments
{
  "text": "Отличный пост!",
  "user_id": 123
}
```

</details>

---

 Эти задачи помогут закрепить понимание CRUD операций и их связи с HTTP методами!

--- 