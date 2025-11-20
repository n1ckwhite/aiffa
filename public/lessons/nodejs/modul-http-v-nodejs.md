#  Модуль HTTP в Node.js

**Модуль http** в Node.js является встроенным модулем, который предоставляет функциональность для создания HTTP-серверов и обработки запросов/ответов по протоколу HTTP. Он позволяет разрабатывать серверные приложения, такие как веб-серверы, API или другие сетевые сервисы, без использования сторонних библиотек.

---

##  Основные функции модуля http

###  1. Создание HTTP-серверов
**Метод `http.createServer()`** создает сервер, который прослушивает входящие HTTP-запросы.

###  2. Обработка HTTP-запросов
**Сервер может обрабатывать различные типы запросов** (GET, POST, PUT, DELETE и др.). Содержит объекты `req` (запрос) и `res` (ответ), которые позволяют работать с заголовками, телом запроса и отправлять ответы.

###  3. Клиентские запросы
**Модуль http также позволяет отправлять HTTP-запросы** к другим серверам через метод `http.request()` или `http.get()`.

###  4. Гибкость и расширяемость
**Позволяет интегрировать middleware, маршрутизацию, обрабатывать файлы** и многое другое.

---

##  Пример использования: Создание простого веб-сервера

###  Базовый HTTP-сервер:
```javascript
const http = require('http');

// Создаем сервер
const server = http.createServer((req, res) => {
    // Устанавливаем заголовок ответа
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    // Проверяем метод и URL запроса
    if (req.method === 'GET' && req.url === '/') {
        res.end('Привет, мир! Это GET запрос на корневой маршрут.');
    } else if (req.method === 'POST' && req.url === '/submit') {
        let body = '';

        // Читаем данные из тела запроса
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            res.end(`Данные получены: ${body}`);
        });
    } else {
        // Если маршрут не найден
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Страница не найдена');
    }
});

// Запускаем сервер на порту 3000
server.listen(3000, () => {
    console.log('Сервер запущен на http://localhost:3000');
});
```

---

##  Как работает этот сервер

###  1. Создание сервера
**Метод `http.createServer()`** создает сервер, который прослушивает входящие запросы.

###  2. Обработка запросов
- **Объект `req`** содержит информацию о запросе, включая метод (GET, POST) и URL
- **Объект `res`** используется для отправки ответа клиенту
- **Метод `res.writeHead()`** устанавливает HTTP-заголовки
- **Метод `res.end()`** завершает формирование ответа

###  3. Запуск сервера
**Сервер запускается на порту 3000** и начинает прослушивать входящие запросы. Доступ к серверу можно получить, перейдя по адресу `http://localhost:3000` в браузере.

---

##  Преимущества модуля http

###  Простота
Встроенный модуль, не требующий установки сторонних библиотек.

###  Гибкость
Позволяет настраивать работу сервера под конкретные задачи.

###  Легкость интеграции
Можно комбинировать с другими модулями и библиотеками (например, `fs` для работы с файлами).

---

##  Недостатки

###  Базовый функционал
Для сложных задач требуется использование сторонних библиотек, таких как express (middleware, маршрутизация, обработка ошибок).

###  Меньшая производительность
При большом объеме запросов дополнительные фреймворки, такие как Fastify, могут быть быстрее.

---

##  Когда использовать модуль http

###  Для небольших и простых приложений
Например, прототипов или учебных проектов.

###  Если требуется минимальная зависимость
От сторонних библиотек.

###  Когда необходимо создать кастомное решение
Без избыточных возможностей.

###  Для более сложных приложений
Лучше использовать фреймворки вроде Express.js, которые упрощают маршрутизацию, обработку middleware и другие задачи.

---

##  Дополнительные возможности

###  Работа с заголовками
```javascript
const server = http.createServer((req, res) => {
    // Читаем заголовки запроса
    const userAgent = req.headers['user-agent'];
    const contentType = req.headers['content-type'];
    
    // Устанавливаем заголовки ответа
    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache'
    });
    
    res.end(JSON.stringify({ message: 'Hello World' }));
});
```

###  Обработка различных HTTP-методов
```javascript
const server = http.createServer((req, res) => {
    const { method, url } = req;
    
    switch (method) {
        case 'GET':
            handleGet(req, res);
            break;
        case 'POST':
            handlePost(req, res);
            break;
        case 'PUT':
            handlePut(req, res);
            break;
        case 'DELETE':
            handleDelete(req, res);
            break;
        default:
            res.writeHead(405, { 'Content-Type': 'text/plain' });
            res.end('Method Not Allowed');
    }
});
```

###  Работа с параметрами URL
```javascript
const url = require('url');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const query = parsedUrl.query;
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        path: parsedUrl.pathname,
        query: query
    }));
});
```

---

##  Итог

**Модуль http** — это основа для создания веб-серверов в Node.js. Он предоставляет базовую функциональность для обработки HTTP-запросов и ответов, что делает его идеальным выбором для простых приложений и изучения основ веб-разработки.

**Ключевые принципы:**
- Используйте для простых веб-серверов
- Изучайте основы HTTP-протокола
- Комбинируйте с другими модулями Node.js
- Для сложных проектов переходите на Express.js

##  ЗАДАЧИ

Вот набор задач, чтобы лучше понять `модуль HTTP в Node.js`:

---

###  Задача 1: Создание простого API-сервера

 Создайте HTTP-сервер, который обрабатывает следующие маршруты:
- `GET /api/users` - возвращает список пользователей
- `GET /api/users/:id` - возвращает пользователя по ID
- `POST /api/users` - создает нового пользователя
- `GET /` - возвращает информацию о сервере

```javascript
// Создайте функцию createApiServer, которая:
// - Обрабатывает различные HTTP-методы
// - Парсит URL и извлекает параметры
// - Возвращает JSON-ответы
// - Обрабатывает ошибки (404, 400)

// Пример использования:
// const server = createApiServer();
// server.listen(3000, () => console.log('API сервер запущен'));
```

<details>
<summary> Решение</summary>

```javascript
const http = require('http');
const url = require('url');

function createApiServer() {
    // Простая база данных в памяти
    let users = [
        { id: 1, name: 'Иван', email: 'ivan@example.com' },
        { id: 2, name: 'Мария', email: 'maria@example.com' },
        { id: 3, name: 'Петр', email: 'petr@example.com' }
    ];
    
    let nextId = 4;

    const server = http.createServer((req, res) => {
        const parsedUrl = url.parse(req.url, true);
        const path = parsedUrl.pathname;
        const method = req.method;
        
        // Устанавливаем CORS заголовки
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json');
        
        try {
            // Маршрут: GET /
            if (method === 'GET' && path === '/') {
                res.writeHead(200);
                res.end(JSON.stringify({
                    message: 'API сервер работает',
                    version: '1.0.0',
                    endpoints: [
                        'GET /api/users',
                        'GET /api/users/:id',
                        'POST /api/users'
                    ]
                }));
            }
            // Маршрут: GET /api/users
            else if (method === 'GET' && path === '/api/users') {
                res.writeHead(200);
                res.end(JSON.stringify(users));
            }
            // Маршрут: GET /api/users/:id
            else if (method === 'GET' && path.startsWith('/api/users/')) {
                const userId = parseInt(path.split('/')[3]);
                const user = users.find(u => u.id === userId);
                
                if (user) {
                    res.writeHead(200);
                    res.end(JSON.stringify(user));
                } else {
                    res.writeHead(404);
                    res.end(JSON.stringify({ error: 'Пользователь не найден' }));
                }
            }
            // Маршрут: POST /api/users
            else if (method === 'POST' && path === '/api/users') {
                let body = '';
                
                req.on('data', chunk => {
                    body += chunk.toString();
                });
                
                req.on('end', () => {
                    try {
                        const newUser = JSON.parse(body);
                        
                        // Валидация
                        if (!newUser.name || !newUser.email) {
                            res.writeHead(400);
                            res.end(JSON.stringify({ error: 'Имя и email обязательны' }));
                            return;
                        }
                        
                        // Создаем пользователя
                        const user = {
                            id: nextId++,
                            name: newUser.name,
                            email: newUser.email
                        };
                        
                        users.push(user);
                        
                        res.writeHead(201);
                        res.end(JSON.stringify(user));
                    } catch (err) {
                        res.writeHead(400);
                        res.end(JSON.stringify({ error: 'Неверный JSON' }));
                    }
                });
            }
            // Неизвестный маршрут
            else {
                res.writeHead(404);
                res.end(JSON.stringify({ error: 'Маршрут не найден' }));
            }
        } catch (error) {
            res.writeHead(500);
            res.end(JSON.stringify({ error: 'Внутренняя ошибка сервера' }));
        }
    });
    
    return server;
}

// Использование:
const server = createApiServer();
server.listen(3000, () => {
    console.log(' API сервер запущен на http://localhost:3000');
    console.log(' Доступные эндпоинты:');
    console.log('   GET  / - информация о сервере');
    console.log('   GET  /api/users - список пользователей');
    console.log('   GET  /api/users/:id - пользователь по ID');
    console.log('   POST /api/users - создать пользователя');
});

module.exports = createApiServer;
```

</details>

---

###  Задача 2: Создание файлового сервера

 Создайте HTTP-сервер, который:
- Отдает статические файлы из папки `public`
- Поддерживает MIME-типы для разных расширений файлов
- Обрабатывает ошибки 404 для несуществующих файлов
- Показывает список файлов для директорий

```javascript
// Создайте функцию createFileServer, которая:
// - Читает файлы из указанной папки
// - Определяет MIME-тип по расширению
// - Обрабатывает ошибки доступа к файлам
// - Возвращает HTML-список для директорий

// Пример использования:
// const server = createFileServer('./public');
// server.listen(3000, () => console.log('Файловый сервер запущен'));
```

<details>
<summary> Решение</summary>

```javascript
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

function createFileServer(publicDir) {
    // MIME-типы для разных расширений
    const mimeTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon',
        '.txt': 'text/plain'
    };

    const server = http.createServer((req, res) => {
        const parsedUrl = url.parse(req.url);
        let pathname = parsedUrl.pathname;
        
        // Безопасность: предотвращаем доступ к файлам вне public
        if (pathname.includes('..')) {
            res.writeHead(403);
            res.end('Доступ запрещен');
            return;
        }
        
        // Если запрашивается корень, показываем index.html
        if (pathname === '/') {
            pathname = '/index.html';
        }
        
        const filePath = path.join(publicDir, pathname);
        
        // Проверяем существование файла
        fs.stat(filePath, (err, stats) => {
            if (err) {
                res.writeHead(404);
                res.end('Файл не найден');
                return;
            }
            
            if (stats.isDirectory()) {
                // Если это директория, показываем список файлов
                showDirectoryListing(filePath, res);
            } else {
                // Если это файл, отдаем его
                serveFile(filePath, res);
            }
        });
    });
    
    function serveFile(filePath, res) {
        const ext = path.extname(filePath).toLowerCase();
        const mimeType = mimeTypes[ext] || 'application/octet-stream';
        
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Ошибка чтения файла');
                return;
            }
            
            res.writeHead(200, { 'Content-Type': mimeType });
            res.end(data);
        });
    }
    
    function showDirectoryListing(dirPath, res) {
        fs.readdir(dirPath, (err, files) => {
            if (err) {
                res.writeHead(500);
                res.end('Ошибка чтения директории');
                return;
            }
            
            const html = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Содержимое директории</title>
                    <meta charset="utf-8">
                    <style>
                        body { font-family: Arial, sans-serif; margin: 40px; }
                        h1 { color: #333; }
                        ul { list-style: none; padding: 0; }
                        li { margin: 10px 0; }
                        a { text-decoration: none; color: #0066cc; }
                        a:hover { text-decoration: underline; }
                        .file { color: #666; }
                        .dir { color: #0066cc; font-weight: bold; }
                    </style>
                </head>
                <body>
                    <h1> Содержимое директории</h1>
                    <ul>
                        ${files.map(file => {
                            const filePath = path.join(dirPath, file);
                            const isDir = fs.statSync(filePath).isDirectory();
                            const icon = isDir ? '' : '';
                            const className = isDir ? 'dir' : 'file';
                            return `<li class="${className}">${icon} <a href="/${file}">${file}</a></li>`;
                        }).join('')}
                    </ul>
                </body>
                </html>
            `;
            
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(html);
        });
    }
    
    return server;
}

// Использование:
const server = createFileServer('./public');
server.listen(3000, () => {
    console.log(' Файловый сервер запущен на http://localhost:3000');
    console.log(' Обслуживает файлы из папки: ./public');
});

module.exports = createFileServer;
```

</details>

---

###  Задача 3: Создание прокси-сервера

 Создайте HTTP-сервер, который:
- Принимает запросы от клиентов
- Перенаправляет их на другой сервер
- Возвращает ответ обратно клиенту
- Логирует все запросы и ответы
- Обрабатывает ошибки соединения

```javascript
// Создайте функцию createProxyServer, которая:
// - Принимает запросы и перенаправляет их на целевой сервер
// - Сохраняет заголовки и тело запроса
// - Логирует информацию о запросах
// - Обрабатывает ошибки и таймауты

// Пример использования:
// const proxy = createProxyServer('http://api.example.com');
// proxy.listen(3000, () => console.log('Прокси-сервер запущен'));
```

<details>
<summary> Решение</summary>

```javascript
const http = require('http');
const url = require('url');

function createProxyServer(targetUrl) {
    const target = url.parse(targetUrl);
    
    const server = http.createServer((req, res) => {
        console.log(` ${req.method} ${req.url} -> ${target.host}`);
        
        // Создаем опции для запроса к целевому серверу
        const options = {
            hostname: target.hostname,
            port: target.port || 80,
            path: req.url,
            method: req.method,
            headers: {
                ...req.headers,
                host: target.host
            }
        };
        
        // Создаем запрос к целевому серверу
        const proxyReq = http.request(options, (proxyRes) => {
            console.log(` ${proxyRes.statusCode} ${req.url}`);
            
            // Копируем заголовки ответа
            res.writeHead(proxyRes.statusCode, proxyRes.headers);
            
            // Передаем данные от целевого сервера к клиенту
            proxyRes.pipe(res);
        });
        
        // Обрабатываем ошибки
        proxyReq.on('error', (err) => {
            console.error(` Ошибка прокси: ${err.message}`);
            res.writeHead(502);
            res.end('Ошибка прокси-сервера');
        });
        
        // Устанавливаем таймаут
        proxyReq.setTimeout(10000, () => {
            console.error(`⏰ Таймаут для ${req.url}`);
            proxyReq.destroy();
            res.writeHead(504);
            res.end('Таймаут запроса');
        });
        
        // Передаем тело запроса к целевому серверу
        req.pipe(proxyReq);
        
        // Обрабатываем закрытие соединения клиентом
        req.on('close', () => {
            console.log(` Клиент отключился: ${req.url}`);
            proxyReq.destroy();
        });
    });
    
    return server;
}

// Расширенная версия с дополнительными возможностями
function createAdvancedProxyServer(targetUrl, options = {}) {
    const target = url.parse(targetUrl);
    const { 
        timeout = 10000, 
        logRequests = true,
        modifyRequest = null,
        modifyResponse = null 
    } = options;
    
    const server = http.createServer((req, res) => {
        if (logRequests) {
            console.log(` [${new Date().toISOString()}] ${req.method} ${req.url}`);
        }
        
        // Модифицируем запрос, если есть функция
        if (modifyRequest) {
            modifyRequest(req);
        }
        
        const proxyOptions = {
            hostname: target.hostname,
            port: target.port || (target.protocol === 'https:' ? 443 : 80),
            path: req.url,
            method: req.method,
            headers: {
                ...req.headers,
                host: target.host
            }
        };
        
        const proxyReq = http.request(proxyOptions, (proxyRes) => {
            if (logRequests) {
                console.log(` [${new Date().toISOString()}] ${proxyRes.statusCode} ${req.url}`);
            }
            
            // Модифицируем ответ, если есть функция
            if (modifyResponse) {
                modifyResponse(proxyRes, res);
            } else {
                res.writeHead(proxyRes.statusCode, proxyRes.headers);
            }
            
            proxyRes.pipe(res);
        });
        
        proxyReq.on('error', (err) => {
            console.error(` [${new Date().toISOString()}] Ошибка: ${err.message}`);
            if (!res.headersSent) {
                res.writeHead(502);
                res.end('Ошибка прокси-сервера');
            }
        });
        
        proxyReq.setTimeout(timeout, () => {
            console.error(`⏰ [${new Date().toISOString()}] Таймаут: ${req.url}`);
            proxyReq.destroy();
            if (!res.headersSent) {
                res.writeHead(504);
                res.end('Таймаут запроса');
            }
        });
        
        req.pipe(proxyReq);
        
        req.on('close', () => {
            if (logRequests) {
                console.log(` [${new Date().toISOString()}] Клиент отключился: ${req.url}`);
            }
            proxyReq.destroy();
        });
    });
    
    return server;
}

// Использование простого прокси:
const simpleProxy = createProxyServer('http://jsonplaceholder.typicode.com');
simpleProxy.listen(3000, () => {
    console.log(' Простой прокси-сервер запущен на http://localhost:3000');
    console.log(' Перенаправляет запросы на: http://jsonplaceholder.typicode.com');
});

// Использование продвинутого прокси:
const advancedProxy = createAdvancedProxyServer('http://httpbin.org', {
    timeout: 15000,
    logRequests: true,
    modifyRequest: (req) => {
        // Добавляем кастомный заголовок
        req.headers['x-proxy-request'] = 'true';
    },
    modifyResponse: (proxyRes, res) => {
        // Добавляем кастомный заголовок к ответу
        proxyRes.headers['x-proxy-response'] = 'true';
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
    }
});

advancedProxy.listen(3001, () => {
    console.log(' Продвинутый прокси-сервер запущен на http://localhost:3001');
    console.log(' Перенаправляет запросы на: http://httpbin.org');
});

module.exports = { createProxyServer, createAdvancedProxyServer };
```

</details>

---

 Эти задачи помогут понять основы работы с модулем HTTP в Node.js и научиться создавать различные типы серверов.

---
