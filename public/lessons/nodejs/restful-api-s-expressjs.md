#  RESTful API с Express.js

**Express.js** — это популярный и минималистичный фреймворк для Node.js, который упрощает создание серверов и API. Ниже представлен пример создания простого RESTful API для управления коллекцией книг.

---

##  Установка Express.js

###  Инициализация проекта:
```bash
mkdir rest-api-example
cd rest-api-example
npm init -y
```

###  Установка Express:
```bash
npm install express
```

---

##  Пример RESTful API для управления книгами

###  Полный код:
```javascript
const express = require('express');
const app = express();
const PORT = 3000;

// Используем middleware для работы с JSON
app.use(express.json());

// Пример данных (вместо базы данных)
let books = [
    { id: 1, title: '1984', author: 'George Orwell' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
];

// === CRUD Операции ===

// 1. Получить список всех книг (READ)
app.get('/books', (req, res) => {
    res.json(books);
});

// 2. Получить информацию о книге по ID (READ)
app.get('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);

    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ message: 'Книга не найдена' });
    }
});

// 3. Добавить новую книгу (CREATE)
app.post('/books', (req, res) => {
    const { title, author } = req.body;

    if (!title || !author) {
        return res.status(400).json({ message: 'Поле title и author обязательны' });
    }

    const newBook = {
        id: books.length + 1,
        title,
        author,
    };

    books.push(newBook);
    res.status(201).json(newBook);
});

// 4. Обновить информацию о книге по ID (UPDATE)
app.put('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const { title, author } = req.body;

    const bookIndex = books.findIndex(b => b.id === bookId);

    if (bookIndex !== -1) {
        books[bookIndex] = {
            id: bookId,
            title: title || books[bookIndex].title,
            author: author || books[bookIndex].author,
        };

        res.json(books[bookIndex]);
    } else {
        res.status(404).json({ message: 'Книга не найдена' });
    }
});

// 5. Удалить книгу по ID (DELETE)
app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === bookId);

    if (bookIndex !== -1) {
        const deletedBook = books.splice(bookIndex, 1);
        res.json(deletedBook[0]);
    } else {
        res.status(404).json({ message: 'Книга не найдена' });
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
```

---

##  Описание маршрутов

###  1. Получение всех книг
- **Маршрут:** `GET /books`
- **Возвращает:** список всех книг

###  2. Получение книги по ID
- **Маршрут:** `GET /books/:id`
- **Возвращает:** книгу с указанным ID

###  3. Добавление новой книги
- **Маршрут:** `POST /books`
- **Ожидает:** объект книги в теле запроса

####  Пример тела запроса:
```json
{
    "title": "The Catcher in the Rye",
    "author": "J.D. Salinger"
}
```

###  4. Обновление книги по ID
- **Маршрут:** `PUT /books/:id`
- **Обновляет:** указанную книгу. Передавать можно только те поля, которые нужно изменить

###  5. Удаление книги по ID
- **Маршрут:** `DELETE /books/:id`
- **Удаляет:** книгу с указанным ID

---

##  Как протестировать API

###  1. Postman
Используйте инструмент Postman для отправки запросов к API. Вы можете отправлять GET, POST, PUT и DELETE запросы, указывая адрес сервера и тело запроса.

###  2. curl
Отправляйте запросы через терминал:

```bash
# Получить список книг
curl http://localhost:3000/books

# Добавить книгу
curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -d '{"title":"The Great Gatsby","author":"F. Scott Fitzgerald"}'

# Обновить книгу
curl -X PUT http://localhost:3000/books/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"1984 Updated"}'

# Удалить книгу
curl -X DELETE http://localhost:3000/books/1
```

###  3. Браузер
Для методов GET просто перейдите по адресу, например: `http://localhost:3000/books`

---

##  Преимущества использования Express.js для API

###  Простота
Легкий и интуитивно понятный синтаксис.

###  Маршрутизация
Удобная система маршрутов для управления запросами.

###  Middleware
Легкая интеграция middleware для обработки запросов, ошибок, логирования и аутентификации.

###  Расширяемость
Поддерживает множество библиотек и плагинов.

---

##  Дополнительные возможности Express.js

###  Middleware для логирования
```javascript
// Логирование всех запросов
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});
```

###  Обработка ошибок
```javascript
// Middleware для обработки ошибок
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Что-то пошло не так!' });
});
```

###  CORS для кросс-доменных запросов
```javascript
// Установка CORS заголовков
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
```

###  Валидация данных
```javascript
// Middleware для валидации
const validateBook = (req, res, next) => {
    const { title, author } = req.body;
    if (!title || !author) {
        return res.status(400).json({ 
            message: 'Поля title и author обязательны' 
        });
    }
    next();
};

// Использование валидации
app.post('/books', validateBook, (req, res) => {
    // Логика создания книги
});
```

---

##  Структура проекта

###  Рекомендуемая структура:
```
rest-api/
├── src/
│   ├── controllers/
│   │   └── bookController.js
│   ├── routes/
│   │   └── bookRoutes.js
│   ├── middleware/
│   │   └── validation.js
│   └── app.js
├── package.json
└── server.js
```

###  Разделение на модули:
```javascript
// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.post('/', bookController.createBook);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

module.exports = router;
```

---

##  Итог

**Express.js** — это мощный инструмент для создания RESTful API в Node.js. Он предоставляет простой и гибкий способ создания серверных приложений с поддержкой всех стандартных HTTP-методов и возможностью легкого расширения функциональности.

**Ключевые принципы:**
- Используйте RESTful принципы для дизайна API
- Разделяйте код на модули и контроллеры
- Добавляйте middleware для общей логики
- Обрабатывайте ошибки централизованно
- Валидируйте входящие данные

##  ЗАДАЧИ

Вот набор задач, чтобы лучше понять `RESTful API с Express.js`:

---

###  Задача 1: Создание API для управления задачами (Todo API)

 Создайте RESTful API для управления списком задач со следующими возможностями:
- Получение всех задач
- Получение задачи по ID
- Создание новой задачи
- Обновление статуса задачи
- Удаление задачи
- Фильтрация по статусу (выполнено/не выполнено)

```javascript
// Создайте API с маршрутами:
// GET /todos - все задачи
// GET /todos/:id - задача по ID
// POST /todos - создать задачу
// PUT /todos/:id - обновить задачу
// DELETE /todos/:id - удалить задачу
// GET /todos?status=completed - фильтр по статусу

// Структура задачи:
// { id, title, description, completed, createdAt, updatedAt }
```

<details>
<summary> Решение</summary>

```javascript
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// База данных в памяти
let todos = [
    { 
        id: 1, 
        title: 'Изучить Express.js', 
        description: 'Освоить основы создания RESTful API',
        completed: false,
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15')
    },
    { 
        id: 2, 
        title: 'Создать Todo API', 
        description: 'Реализовать CRUD операции для задач',
        completed: true,
        createdAt: new Date('2024-01-16'),
        updatedAt: new Date('2024-01-16')
    }
];

let nextId = 3;

// Middleware для логирования
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// GET /todos - получить все задачи
app.get('/todos', (req, res) => {
    const { status } = req.query;
    let filteredTodos = todos;
    
    // Фильтрация по статусу
    if (status === 'completed') {
        filteredTodos = todos.filter(todo => todo.completed);
    } else if (status === 'pending') {
        filteredTodos = todos.filter(todo => !todo.completed);
    }
    
    res.json({
        success: true,
        count: filteredTodos.length,
        data: filteredTodos
    });
});

// GET /todos/:id - получить задачу по ID
app.get('/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const todo = todos.find(t => t.id === todoId);
    
    if (todo) {
        res.json({
            success: true,
            data: todo
        });
    } else {
        res.status(404).json({
            success: false,
            message: 'Задача не найдена'
        });
    }
});

// POST /todos - создать новую задачу
app.post('/todos', (req, res) => {
    const { title, description } = req.body;
    
    // Валидация
    if (!title) {
        return res.status(400).json({
            success: false,
            message: 'Поле title обязательно'
        });
    }
    
    const newTodo = {
        id: nextId++,
        title,
        description: description || '',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
    };
    
    todos.push(newTodo);
    
    res.status(201).json({
        success: true,
        message: 'Задача создана',
        data: newTodo
    });
});

// PUT /todos/:id - обновить задачу
app.put('/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const { title, description, completed } = req.body;
    
    const todoIndex = todos.findIndex(t => t.id === todoId);
    
    if (todoIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'Задача не найдена'
        });
    }
    
    // Обновляем только переданные поля
    if (title !== undefined) todos[todoIndex].title = title;
    if (description !== undefined) todos[todoIndex].description = description;
    if (completed !== undefined) todos[todoIndex].completed = completed;
    
    todos[todoIndex].updatedAt = new Date();
    
    res.json({
        success: true,
        message: 'Задача обновлена',
        data: todos[todoIndex]
    });
});

// DELETE /todos/:id - удалить задачу
app.delete('/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const todoIndex = todos.findIndex(t => t.id === todoId);
    
    if (todoIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'Задача не найдена'
        });
    }
    
    const deletedTodo = todos.splice(todoIndex, 1)[0];
    
    res.json({
        success: true,
        message: 'Задача удалена',
        data: deletedTodo
    });
});

// Обработка ошибок
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Внутренняя ошибка сервера'
    });
});

// Обработка 404
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Маршрут не найден'
    });
});

app.listen(PORT, () => {
    console.log(` Todo API запущен на http://localhost:${PORT}`);
    console.log(' Доступные эндпоинты:');
    console.log('   GET    /todos - все задачи');
    console.log('   GET    /todos/:id - задача по ID');
    console.log('   POST   /todos - создать задачу');
    console.log('   PUT    /todos/:id - обновить задачу');
    console.log('   DELETE /todos/:id - удалить задачу');
    console.log('   GET    /todos?status=completed - фильтр по статусу');
});

module.exports = app;
```

</details>

---

###  Задача 2: Создание API для блога с аутентификацией

 Создайте API для блога с постами и комментариями:
- Регистрация и авторизация пользователей
- CRUD операции для постов
- Добавление комментариев к постам
- Получение постов с пагинацией
- Поиск постов по заголовку

```javascript
// Создайте API с маршрутами:
// POST /auth/register - регистрация
// POST /auth/login - авторизация
// GET /posts - все посты с пагинацией
// GET /posts/:id - пост по ID
// POST /posts - создать пост (требует авторизации)
// PUT /posts/:id - обновить пост (требует авторизации)
// DELETE /posts/:id - удалить пост (требует авторизации)
// POST /posts/:id/comments - добавить комментарий
// GET /posts/:id/comments - получить комментарии поста

// Структуры:
// User: { id, username, email, password }
// Post: { id, title, content, authorId, createdAt, updatedAt }
// Comment: { id, postId, authorId, content, createdAt }
```

<details>
<summary> Решение</summary>

```javascript
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// База данных в памяти
let users = [
    { id: 1, username: 'admin', email: 'admin@example.com', password: 'admin123' }
];
let posts = [
    { 
        id: 1, 
        title: 'Добро пожаловать в блог!', 
        content: 'Это первый пост в нашем блоге...',
        authorId: 1,
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15')
    }
];
let comments = [
    { 
        id: 1, 
        postId: 1, 
        authorId: 1, 
        content: 'Отличный пост!',
        createdAt: new Date('2024-01-15')
    }
];

let nextUserId = 2;
let nextPostId = 2;
let nextCommentId = 2;

// Middleware для аутентификации
const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization;
    
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Токен авторизации не предоставлен'
        });
    }
    
    // Простая проверка токена (в реальном приложении используйте JWT)
    const userId = parseInt(token);
    const user = users.find(u => u.id === userId);
    
    if (!user) {
        return res.status(401).json({
            success: false,
            message: 'Неверный токен авторизации'
        });
    }
    
    req.user = user;
    next();
};

// POST /auth/register - регистрация
app.post('/auth/register', (req, res) => {
    const { username, email, password } = req.body;
    
    // Валидация
    if (!username || !email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Все поля обязательны'
        });
    }
    
    // Проверка на существующего пользователя
    const existingUser = users.find(u => u.email === email || u.username === username);
    if (existingUser) {
        return res.status(400).json({
            success: false,
            message: 'Пользователь с таким email или username уже существует'
        });
    }
    
    const newUser = {
        id: nextUserId++,
        username,
        email,
        password // В реальном приложении хешируйте пароль
    };
    
    users.push(newUser);
    
    res.status(201).json({
        success: true,
        message: 'Пользователь зарегистрирован',
        data: { id: newUser.id, username: newUser.username, email: newUser.email }
    });
});

// POST /auth/login - авторизация
app.post('/auth/login', (req, res) => {
    const { email, password } = req.body;
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        return res.status(401).json({
            success: false,
            message: 'Неверный email или пароль'
        });
    }
    
    res.json({
        success: true,
        message: 'Авторизация успешна',
        data: { 
            token: user.id, // В реальном приложении используйте JWT
            user: { id: user.id, username: user.username, email: user.email }
        }
    });
});

// GET /posts - все посты с пагинацией
app.get('/posts', (req, res) => {
    const { page = 1, limit = 10, search } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    
    let filteredPosts = posts;
    
    // Поиск по заголовку
    if (search) {
        filteredPosts = posts.filter(post => 
            post.title.toLowerCase().includes(search.toLowerCase())
        );
    }
    
    // Сортировка по дате создания (новые сначала)
    filteredPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    // Пагинация
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);
    
    res.json({
        success: true,
        data: paginatedPosts,
        pagination: {
            currentPage: pageNum,
            totalPages: Math.ceil(filteredPosts.length / limitNum),
            totalPosts: filteredPosts.length,
            hasNext: endIndex < filteredPosts.length,
            hasPrev: pageNum > 1
        }
    });
});

// GET /posts/:id - пост по ID
app.get('/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(p => p.id === postId);
    
    if (!post) {
        return res.status(404).json({
            success: false,
            message: 'Пост не найден'
        });
    }
    
    res.json({
        success: true,
        data: post
    });
});

// POST /posts - создать пост (требует авторизации)
app.post('/posts', authenticateUser, (req, res) => {
    const { title, content } = req.body;
    
    if (!title || !content) {
        return res.status(400).json({
            success: false,
            message: 'Поля title и content обязательны'
        });
    }
    
    const newPost = {
        id: nextPostId++,
        title,
        content,
        authorId: req.user.id,
        createdAt: new Date(),
        updatedAt: new Date()
    };
    
    posts.push(newPost);
    
    res.status(201).json({
        success: true,
        message: 'Пост создан',
        data: newPost
    });
});

// PUT /posts/:id - обновить пост (требует авторизации)
app.put('/posts/:id', authenticateUser, (req, res) => {
    const postId = parseInt(req.params.id);
    const postIndex = posts.findIndex(p => p.id === postId);
    
    if (postIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'Пост не найден'
        });
    }
    
    // Проверяем, что пользователь является автором поста
    if (posts[postIndex].authorId !== req.user.id) {
        return res.status(403).json({
            success: false,
            message: 'У вас нет прав для редактирования этого поста'
        });
    }
    
    const { title, content } = req.body;
    
    if (title !== undefined) posts[postIndex].title = title;
    if (content !== undefined) posts[postIndex].content = content;
    posts[postIndex].updatedAt = new Date();
    
    res.json({
        success: true,
        message: 'Пост обновлен',
        data: posts[postIndex]
    });
});

// DELETE /posts/:id - удалить пост (требует авторизации)
app.delete('/posts/:id', authenticateUser, (req, res) => {
    const postId = parseInt(req.params.id);
    const postIndex = posts.findIndex(p => p.id === postId);
    
    if (postIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'Пост не найден'
        });
    }
    
    // Проверяем, что пользователь является автором поста
    if (posts[postIndex].authorId !== req.user.id) {
        return res.status(403).json({
            success: false,
            message: 'У вас нет прав для удаления этого поста'
        });
    }
    
    const deletedPost = posts.splice(postIndex, 1)[0];
    
    // Удаляем все комментарии к посту
    comments = comments.filter(c => c.postId !== postId);
    
    res.json({
        success: true,
        message: 'Пост удален',
        data: deletedPost
    });
});

// POST /posts/:id/comments - добавить комментарий
app.post('/posts/:id/comments', (req, res) => {
    const postId = parseInt(req.params.id);
    const { content } = req.body;
    
    // Проверяем существование поста
    const post = posts.find(p => p.id === postId);
    if (!post) {
        return res.status(404).json({
            success: false,
            message: 'Пост не найден'
        });
    }
    
    if (!content) {
        return res.status(400).json({
            success: false,
            message: 'Поле content обязательно'
        });
    }
    
    const newComment = {
        id: nextCommentId++,
        postId,
        authorId: 1, // В реальном приложении получайте из токена
        content,
        createdAt: new Date()
    };
    
    comments.push(newComment);
    
    res.status(201).json({
        success: true,
        message: 'Комментарий добавлен',
        data: newComment
    });
});

// GET /posts/:id/comments - получить комментарии поста
app.get('/posts/:id/comments', (req, res) => {
    const postId = parseInt(req.params.id);
    
    // Проверяем существование поста
    const post = posts.find(p => p.id === postId);
    if (!post) {
        return res.status(404).json({
            success: false,
            message: 'Пост не найден'
        });
    }
    
    const postComments = comments.filter(c => c.postId === postId);
    
    res.json({
        success: true,
        data: postComments
    });
});

// Обработка ошибок
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Внутренняя ошибка сервера'
    });
});

app.listen(PORT, () => {
    console.log(` Blog API запущен на http://localhost:${PORT}`);
    console.log(' Доступные эндпоинты:');
    console.log('   POST   /auth/register - регистрация');
    console.log('   POST   /auth/login - авторизация');
    console.log('   GET    /posts - все посты с пагинацией');
    console.log('   GET    /posts/:id - пост по ID');
    console.log('   POST   /posts - создать пост (авторизация)');
    console.log('   PUT    /posts/:id - обновить пост (авторизация)');
    console.log('   DELETE /posts/:id - удалить пост (авторизация)');
    console.log('   POST   /posts/:id/comments - добавить комментарий');
    console.log('   GET    /posts/:id/comments - получить комментарии');
});

module.exports = app;
```

</details>

---

###  Задача 3: Создание API для интернет-магазина

 Создайте API для интернет-магазина с товарами и заказами:
- CRUD операции для товаров
- Создание и управление корзиной покупок
- Оформление заказов
- Получение статистики продаж
- Фильтрация товаров по категориям и цене

```javascript
// Создайте API с маршрутами:
// GET /products - все товары с фильтрацией
// GET /products/:id - товар по ID
// POST /products - создать товар
// PUT /products/:id - обновить товар
// DELETE /products/:id - удалить товар
// GET /cart - получить корзину
// POST /cart/items - добавить товар в корзину
// PUT /cart/items/:id - обновить количество
// DELETE /cart/items/:id - удалить из корзины
// POST /orders - оформить заказ
// GET /orders - получить заказы
// GET /stats/sales - статистика продаж

// Структуры:
// Product: { id, name, description, price, category, stock, createdAt }
// CartItem: { id, productId, quantity, price }
// Order: { id, items, total, status, createdAt }
```

<details>
<summary> Решение</summary>

```javascript
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// База данных в памяти
let products = [
    { 
        id: 1, 
        name: 'iPhone 15', 
        description: 'Новейший смартфон от Apple',
        price: 999.99,
        category: 'electronics',
        stock: 50,
        createdAt: new Date('2024-01-15')
    },
    { 
        id: 2, 
        name: 'MacBook Pro', 
        description: 'Профессиональный ноутбук',
        price: 1999.99,
        category: 'electronics',
        stock: 25,
        createdAt: new Date('2024-01-15')
    },
    { 
        id: 3, 
        name: 'Nike Air Max', 
        description: 'Удобные кроссовки',
        price: 129.99,
        category: 'shoes',
        stock: 100,
        createdAt: new Date('2024-01-15')
    }
];

let cart = [];
let orders = [];
let nextProductId = 4;
let nextOrderId = 1;

// Middleware для логирования
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// GET /products - все товары с фильтрацией
app.get('/products', (req, res) => {
    const { category, minPrice, maxPrice, search } = req.query;
    let filteredProducts = [...products];
    
    // Фильтрация по категории
    if (category) {
        filteredProducts = filteredProducts.filter(p => p.category === category);
    }
    
    // Фильтрация по цене
    if (minPrice) {
        filteredProducts = filteredProducts.filter(p => p.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
        filteredProducts = filteredProducts.filter(p => p.price <= parseFloat(maxPrice));
    }
    
    // Поиск по названию
    if (search) {
        filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(search.toLowerCase())
        );
    }
    
    res.json({
        success: true,
        count: filteredProducts.length,
        data: filteredProducts
    });
});

// GET /products/:id - товар по ID
app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        return res.status(404).json({
            success: false,
            message: 'Товар не найден'
        });
    }
    
    res.json({
        success: true,
        data: product
    });
});

// POST /products - создать товар
app.post('/products', (req, res) => {
    const { name, description, price, category, stock } = req.body;
    
    // Валидация
    if (!name || !price || !category) {
        return res.status(400).json({
            success: false,
            message: 'Поля name, price и category обязательны'
        });
    }
    
    if (price <= 0) {
        return res.status(400).json({
            success: false,
            message: 'Цена должна быть больше 0'
        });
    }
    
    const newProduct = {
        id: nextProductId++,
        name,
        description: description || '',
        price: parseFloat(price),
        category,
        stock: parseInt(stock) || 0,
        createdAt: new Date()
    };
    
    products.push(newProduct);
    
    res.status(201).json({
        success: true,
        message: 'Товар создан',
        data: newProduct
    });
});

// PUT /products/:id - обновить товар
app.put('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === productId);
    
    if (productIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'Товар не найден'
        });
    }
    
    const { name, description, price, category, stock } = req.body;
    
    // Обновляем только переданные поля
    if (name !== undefined) products[productIndex].name = name;
    if (description !== undefined) products[productIndex].description = description;
    if (price !== undefined) products[productIndex].price = parseFloat(price);
    if (category !== undefined) products[productIndex].category = category;
    if (stock !== undefined) products[productIndex].stock = parseInt(stock);
    
    res.json({
        success: true,
        message: 'Товар обновлен',
        data: products[productIndex]
    });
});

// DELETE /products/:id - удалить товар
app.delete('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === productId);
    
    if (productIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'Товар не найден'
        });
    }
    
    const deletedProduct = products.splice(productIndex, 1)[0];
    
    // Удаляем товар из корзины
    cart = cart.filter(item => item.productId !== productId);
    
    res.json({
        success: true,
        message: 'Товар удален',
        data: deletedProduct
    });
});

// GET /cart - получить корзину
app.get('/cart', (req, res) => {
    const cartWithProducts = cart.map(item => {
        const product = products.find(p => p.id === item.productId);
        return {
            ...item,
            product: product ? {
                name: product.name,
                price: product.price,
                category: product.category
            } : null
        };
    });
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    res.json({
        success: true,
        data: {
            items: cartWithProducts,
            total: total.toFixed(2),
            itemCount: cart.length
        }
    });
});

// POST /cart/items - добавить товар в корзину
app.post('/cart/items', (req, res) => {
    const { productId, quantity = 1 } = req.body;
    
    const product = products.find(p => p.id === productId);
    if (!product) {
        return res.status(404).json({
            success: false,
            message: 'Товар не найден'
        });
    }
    
    if (product.stock < quantity) {
        return res.status(400).json({
            success: false,
            message: 'Недостаточно товара на складе'
        });
    }
    
    // Проверяем, есть ли товар уже в корзине
    const existingItem = cart.find(item => item.productId === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: cart.length + 1,
            productId,
            quantity,
            price: product.price
        });
    }
    
    res.json({
        success: true,
        message: 'Товар добавлен в корзину',
        data: cart
    });
});

// PUT /cart/items/:id - обновить количество
app.put('/cart/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const { quantity } = req.body;
    
    const item = cart.find(i => i.id === itemId);
    if (!item) {
        return res.status(404).json({
            success: false,
            message: 'Товар в корзине не найден'
        });
    }
    
    const product = products.find(p => p.id === item.productId);
    if (product.stock < quantity) {
        return res.status(400).json({
            success: false,
            message: 'Недостаточно товара на складе'
        });
    }
    
    item.quantity = quantity;
    
    res.json({
        success: true,
        message: 'Количество обновлено',
        data: item
    });
});

// DELETE /cart/items/:id - удалить из корзины
app.delete('/cart/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const itemIndex = cart.findIndex(i => i.id === itemId);
    
    if (itemIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'Товар в корзине не найден'
        });
    }
    
    const deletedItem = cart.splice(itemIndex, 1)[0];
    
    res.json({
        success: true,
        message: 'Товар удален из корзины',
        data: deletedItem
    });
});

// POST /orders - оформить заказ
app.post('/orders', (req, res) => {
    if (cart.length === 0) {
        return res.status(400).json({
            success: false,
            message: 'Корзина пуста'
        });
    }
    
    // Проверяем наличие товаров на складе
    for (const item of cart) {
        const product = products.find(p => p.id === item.productId);
        if (product.stock < item.quantity) {
            return res.status(400).json({
                success: false,
                message: `Недостаточно товара "${product.name}" на складе`
            });
        }
    }
    
    // Создаем заказ
    const order = {
        id: nextOrderId++,
        items: [...cart],
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        status: 'pending',
        createdAt: new Date()
    };
    
    orders.push(order);
    
    // Обновляем остатки товаров
    for (const item of cart) {
        const product = products.find(p => p.id === item.productId);
        product.stock -= item.quantity;
    }
    
    // Очищаем корзину
    cart = [];
    
    res.status(201).json({
        success: true,
        message: 'Заказ оформлен',
        data: order
    });
});

// GET /orders - получить заказы
app.get('/orders', (req, res) => {
    res.json({
        success: true,
        count: orders.length,
        data: orders
    });
});

// GET /stats/sales - статистика продаж
app.get('/stats/sales', (req, res) => {
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    
    // Статистика по категориям
    const categoryStats = {};
    orders.forEach(order => {
        order.items.forEach(item => {
            const product = products.find(p => p.id === item.productId);
            if (product) {
                if (!categoryStats[product.category]) {
                    categoryStats[product.category] = { count: 0, revenue: 0 };
                }
                categoryStats[product.category].count += item.quantity;
                categoryStats[product.category].revenue += item.price * item.quantity;
            }
        });
    });
    
    res.json({
        success: true,
        data: {
            totalOrders,
            totalRevenue: totalRevenue.toFixed(2),
            averageOrderValue: averageOrderValue.toFixed(2),
            categoryStats
        }
    });
});

// Обработка ошибок
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Внутренняя ошибка сервера'
    });
});

app.listen(PORT, () => {
    console.log(` E-commerce API запущен на http://localhost:${PORT}`);
    console.log(' Доступные эндпоинты:');
    console.log('   GET    /products - все товары с фильтрацией');
    console.log('   GET    /products/:id - товар по ID');
    console.log('   POST   /products - создать товар');
    console.log('   PUT    /products/:id - обновить товар');
    console.log('   DELETE /products/:id - удалить товар');
    console.log('   GET    /cart - получить корзину');
    console.log('   POST   /cart/items - добавить в корзину');
    console.log('   PUT    /cart/items/:id - обновить количество');
    console.log('   DELETE /cart/items/:id - удалить из корзины');
    console.log('   POST   /orders - оформить заказ');
    console.log('   GET    /orders - получить заказы');
    console.log('   GET    /stats/sales - статистика продаж');
});

module.exports = app;
```

</details>

---

 Эти задачи помогут понять принципы создания RESTful API с Express.js и научиться строить полноценные веб-приложения.

---
