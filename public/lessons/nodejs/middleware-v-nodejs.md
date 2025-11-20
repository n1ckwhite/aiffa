#  Middleware в Node.js

**Middleware в контексте Node.js** — это функции, которые обрабатывают запросы между получением HTTP-запроса сервером и отправкой ответа клиенту. Middleware используется в таких фреймворках, как Express.js, и предоставляет мощный способ управления запросами, ответами и логикой приложения.

---

##  Основные свойства middleware

###  Доступ к объектам
- **`req`** — объект запроса, содержащий данные о клиентском запросе (параметры, заголовки)
- **`res`** — объект ответа, который используется для отправки данных клиенту
- **`next`** — функция, вызываемая для передачи управления следующему middleware в цепочке

###  Возможности middleware
- **Обработка данных запроса**
- **Аутентификация и авторизация**
- **Логирование**
- **Управление ошибками**
- **Роутинг запросов**

###  Цепочка middleware
Middleware выполняются **последовательно** в порядке их определения. Если middleware не вызывает `next()`, выполнение цепочки останавливается.

---

##  Пример Middleware в Express.js

###  Базовый пример
```javascript
const express = require('express');
const app = express();

// Простейший middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next(); // Передача управления следующему middleware
});

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(3000, () => console.log('Сервер запущен на порту 3000'));
```

Этот middleware логирует метод и URL каждого запроса, а затем передает управление следующему обработчику.

---

##  Типы Middleware

###  1. Встроенные Middleware
Express имеет несколько встроенных middleware:

```javascript
app.use(express.json()); // Для работы с JSON
app.use(express.urlencoded({ extended: true })); // Для работы с данными форм
app.use(express.static('public')); // Для обслуживания статических файлов
```

###  2. Пользовательские Middleware
Пишутся вручную для выполнения специфичных задач:

```javascript
app.use((req, res, next) => {
    if (!req.headers['x-auth-token']) {
        return res.status(401).send('Unauthorized');
    }
    next();
});
```

###  3. Middleware для обработки ошибок
Используется для централизованного управления ошибками. Принимает 4 аргумента:

```javascript
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
```

###  4. Middleware на уровне маршрутов
Привязываются к определённым маршрутам:

```javascript
const checkAuth = (req, res, next) => {
    if (req.query.token === '12345') {
        next();
    } else {
        res.status(403).send('Forbidden');
    }
};

app.get('/protected', checkAuth, (req, res) => {
    res.send('Welcome to the protected route!');
});
```

###  5. Сторонние Middleware
Express поддерживает подключение сторонних библиотек:

```javascript
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

app.use(morgan('combined')); // Логирование запросов
app.use(helmet()); // Установка безопасных заголовков
app.use(cors()); // Включение CORS
```

---

##  Как работает Middleware?

###  Определение цепочки
Middleware добавляется через `app.use()` или привязывается к определённым маршрутам.

###  Порядок выполнения
Middleware выполняются в том порядке, в котором они были зарегистрированы.

###  Передача управления
Если `next()` вызывается, управление передаётся следующему middleware. Если не вызывается, выполнение цепочки останавливается.

###  Пример цепочки
```javascript
app.use((req, res, next) => {
    console.log('Middleware 1');
    next();
});

app.use((req, res, next) => {
    console.log('Middleware 2');
    next();
});

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Лог:
// Middleware 1
// Middleware 2
```

---

##  Лучшие практики работы с Middleware

###  Принципы разработки
- **Минимизируйте количество логики** в middleware — должен выполнять одну задачу
- **Обрабатывайте ошибки корректно** — используйте middleware для централизованного управления
- **Оптимизируйте порядок выполнения** — общие задачи выше специфичных
- **Не забывайте вызывать next()** — иначе приложение зависнет

###  Структура middleware
```javascript
const myMiddleware = (req, res, next) => {
    try {
        // Логика middleware
        // ...
        next(); // Обязательно!
    } catch (error) {
        next(error); // Передача ошибки
    }
};
```

---

##  Дополнительные примеры

###  Middleware для логирования
```javascript
const logger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url} - ${req.ip}`);
    next();
};

app.use(logger);
```

###  Middleware для аутентификации
```javascript
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'Токен не предоставлен' });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Недействительный токен' });
    }
};
```

###  Middleware для валидации
```javascript
const validateUser = (req, res, next) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ error: 'Email и пароль обязательны' });
    }
    
    if (!isValidEmail(email)) {
        return res.status(400).json({ error: 'Некорректный email' });
    }
    
    next();
};
```

---

##  Итог

**Middleware в Node.js** — это фундаментальный механизм, позволяющий легко управлять потоком обработки запросов и ответов. С помощью встроенных, пользовательских и сторонних middleware вы можете строить гибкие, масштабируемые и безопасные приложения.

**Ключевые принципы:**
- Одна задача на middleware
- Обязательный вызов `next()`
- Правильный порядок выполнения
- Централизованная обработка ошибок

##  ЗАДАЧИ

Вот набор задач, чтобы лучше понять `middleware в Node.js`:

---

###  Задача 1: Создание системы логирования и мониторинга

 Создайте комплексную систему middleware для:
- Логирования всех запросов с детальной информацией
- Отслеживания времени выполнения запросов
- Мониторинга ошибок и их частоты
- Генерации статистики по API

```javascript
// Создайте класс LoggerMiddleware:
// logRequest(req, res, next) - логирует запросы
// trackPerformance(req, res, next) - отслеживает производительность
// errorTracker(err, req, res, next) - отслеживает ошибки
// getStats() - возвращает статистику

// Пример использования:
// app.use(logger.logRequest);
// app.use(logger.trackPerformance);
// app.use(logger.errorTracker);
```

<details>
<summary> Решение</summary>

```javascript
class LoggerMiddleware {
    constructor(options = {}) {
        this.logs = [];
        this.stats = {
            totalRequests: 0,
            errors: 0,
            averageResponseTime: 0,
            requestsByMethod: {},
            requestsByStatus: {},
            errorsByType: {}
        };
        this.maxLogs = options.maxLogs || 1000;
        this.enableConsole = options.enableConsole !== false;
    }

    // Логирование запросов
    logRequest(req, res, next) {
        const startTime = Date.now();
        const requestId = this.generateRequestId();
        
        // Добавляем ID запроса для отслеживания
        req.requestId = requestId;
        
        // Логируем начало запроса
        const logEntry = {
            id: requestId,
            timestamp: new Date().toISOString(),
            method: req.method,
            url: req.url,
            ip: req.ip || req.connection.remoteAddress,
            userAgent: req.get('User-Agent'),
            startTime: startTime,
            status: null,
            responseTime: null,
            error: null
        };

        // Перехватываем ответ для логирования
        const originalSend = res.send;
        const originalJson = res.json;
        
        res.send = function(data) {
            logEntry.status = res.statusCode;
            logEntry.responseTime = Date.now() - startTime;
            this.logRequestComplete(logEntry);
            return originalSend.call(this, data);
        }.bind(this);

        res.json = function(data) {
            logEntry.status = res.statusCode;
            logEntry.responseTime = Date.now() - startTime;
            this.logRequestComplete(logEntry);
            return originalJson.call(this, data);
        }.bind(this);

        if (this.enableConsole) {
            console.log(` [${requestId}] ${req.method} ${req.url} - ${req.ip}`);
        }

        next();
    }

    // Отслеживание производительности
    trackPerformance(req, res, next) {
        const startTime = process.hrtime.bigint();
        
        res.on('finish', () => {
            const endTime = process.hrtime.bigint();
            const duration = Number(endTime - startTime) / 1000000; // в миллисекундах
            
            this.updatePerformanceStats(duration, req.method, res.statusCode);
            
            if (duration > 1000) { // Медленные запросы
                console.warn(`  Медленный запрос: ${req.method} ${req.url} - ${duration.toFixed(2)}ms`);
            }
        });

        next();
    }

    // Отслеживание ошибок
    errorTracker(err, req, res, next) {
        const errorLog = {
            id: req.requestId || this.generateRequestId(),
            timestamp: new Date().toISOString(),
            error: {
                message: err.message,
                stack: err.stack,
                name: err.name
            },
            request: {
                method: req.method,
                url: req.url,
                ip: req.ip,
                userAgent: req.get('User-Agent')
            }
        };

        this.logs.push(errorLog);
        this.stats.errors++;
        this.stats.errorsByType[err.name] = (this.stats.errorsByType[err.name] || 0) + 1;

        if (this.enableConsole) {
            console.error(` [${errorLog.id}] Ошибка: ${err.message}`);
        }

        // Ограничиваем количество логов
        if (this.logs.length > this.maxLogs) {
            this.logs.shift();
        }

        res.status(500).json({
            error: 'Внутренняя ошибка сервера',
            requestId: errorLog.id
        });
    }

    // Завершение логирования запроса
    logRequestComplete(logEntry) {
        this.logs.push(logEntry);
        this.stats.totalRequests++;
        this.stats.requestsByMethod[logEntry.method] = (this.stats.requestsByMethod[logEntry.method] || 0) + 1;
        this.stats.requestsByStatus[logEntry.status] = (this.stats.requestsByStatus[logEntry.status] || 0) + 1;

        // Обновляем среднее время ответа
        this.updateAverageResponseTime(logEntry.responseTime);

        if (this.enableConsole) {
            const statusEmoji = logEntry.status >= 400 ? '' : '';
            console.log(`${statusEmoji} [${logEntry.id}] ${logEntry.method} ${logEntry.url} - ${logEntry.status} (${logEntry.responseTime}ms)`);
        }

        // Ограничиваем количество логов
        if (this.logs.length > this.maxLogs) {
            this.logs.shift();
        }
    }

    // Обновление статистики производительности
    updatePerformanceStats(duration, method, status) {
        // Здесь можно добавить более детальную статистику
        if (duration > 5000) { // Очень медленные запросы
            console.error(` Критически медленный запрос: ${method} - ${duration.toFixed(2)}ms`);
        }
    }

    // Обновление среднего времени ответа
    updateAverageResponseTime(responseTime) {
        const totalRequests = this.stats.totalRequests;
        const currentAverage = this.stats.averageResponseTime;
        
        this.stats.averageResponseTime = 
            (currentAverage * (totalRequests - 1) + responseTime) / totalRequests;
    }

    // Генерация ID запроса
    generateRequestId() {
        return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    // Получение статистики
    getStats() {
        const recentLogs = this.logs.filter(log => 
            new Date(log.timestamp) > new Date(Date.now() - 24 * 60 * 60 * 1000)
        );

        return {
            ...this.stats,
            recentRequests: recentLogs.length,
            topErrors: this.getTopErrors(),
            performanceMetrics: this.getPerformanceMetrics()
        };
    }

    // Топ ошибок
    getTopErrors() {
        return Object.entries(this.stats.errorsByType)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5)
            .map(([error, count]) => ({ error, count }));
    }

    // Метрики производительности
    getPerformanceMetrics() {
        const recentLogs = this.logs.filter(log => 
            log.responseTime && 
            new Date(log.timestamp) > new Date(Date.now() - 60 * 60 * 1000) // последний час
        );

        if (recentLogs.length === 0) return {};

        const responseTimes = recentLogs.map(log => log.responseTime);
        const sortedTimes = responseTimes.sort((a, b) => a - b);

        return {
            min: Math.min(...responseTimes),
            max: Math.max(...responseTimes),
            median: sortedTimes[Math.floor(sortedTimes.length / 2)],
            p95: sortedTimes[Math.floor(sortedTimes.length * 0.95)],
            p99: sortedTimes[Math.floor(sortedTimes.length * 0.99)]
        };
    }

    // Экспорт логов
    exportLogs(format = 'json') {
        if (format === 'json') {
            return JSON.stringify(this.logs, null, 2);
        } else if (format === 'csv') {
            return this.logsToCSV();
        }
        throw new Error('Неподдерживаемый формат');
    }

    // Конвертация в CSV
    logsToCSV() {
        if (this.logs.length === 0) return '';

        const headers = ['id', 'timestamp', 'method', 'url', 'ip', 'status', 'responseTime'];
        const csvRows = [headers.join(',')];

        this.logs.forEach(log => {
            const row = headers.map(header => {
                const value = log[header] || '';
                return `"${value.toString().replace(/"/g, '""')}"`;
            });
            csvRows.push(row.join(','));
        });

        return csvRows.join('\n');
    }

    // Очистка старых логов
    cleanup(olderThan = 7 * 24 * 60 * 60 * 1000) { // 7 дней
        const cutoff = new Date(Date.now() - olderThan);
        const initialCount = this.logs.length;
        
        this.logs = this.logs.filter(log => new Date(log.timestamp) > cutoff);
        
        const removedCount = initialCount - this.logs.length;
        console.log(` Очищено ${removedCount} старых логов`);
        
        return removedCount;
    }
}

// Демонстрация использования
const logger = new LoggerMiddleware({ enableConsole: true });

const express = require('express');
const app = express();

// Применяем middleware
app.use(logger.logRequest);
app.use(logger.trackPerformance);

// Маршруты
app.get('/', (req, res) => {
    res.json({ message: 'Привет, мир!', requestId: req.requestId });
});

app.get('/slow', (req, res) => {
    setTimeout(() => {
        res.json({ message: 'Медленный запрос', requestId: req.requestId });
    }, 2000);
});

app.get('/error', (req, res, next) => {
    next(new Error('Тестовая ошибка'));
});

// Middleware обработки ошибок
app.use(logger.errorTracker);

// Статистика
app.get('/stats', (req, res) => {
    res.json(logger.getStats());
});

module.exports = LoggerMiddleware;
```

</details>

---

###  Задача 2: Создание системы аутентификации и авторизации

 Создайте middleware для:
- Проверки JWT токенов
- Контроля доступа к ресурсам
- Роли пользователей (admin, user, guest)
- Логирования попыток доступа

```javascript
// Создайте класс AuthMiddleware:
// verifyToken(req, res, next) - проверяет JWT токен
// requireRole(role) - проверяет роль пользователя
// requireAuth(req, res, next) - требует аутентификации
// logAccess(req, res, next) - логирует доступ

// Пример использования:
// app.use(auth.verifyToken);
// app.get('/admin', auth.requireRole('admin'), adminHandler);
// app.get('/profile', auth.requireAuth, profileHandler);
```

<details>
<summary> Решение</summary>

```javascript
const jwt = require('jsonwebtoken');

class AuthMiddleware {
    constructor(options = {}) {
        this.jwtSecret = options.jwtSecret || process.env.JWT_SECRET || 'your-secret-key';
        this.accessLogs = [];
        this.maxLogs = options.maxLogs || 1000;
    }

    // Проверка JWT токена
    verifyToken(req, res, next) {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Токен авторизации не предоставлен'
            });
        }

        const token = authHeader.substring(7);
        
        try {
            const decoded = jwt.verify(token, this.jwtSecret);
            req.user = decoded;
            next();
        } catch (error) {
            this.logAccess(req, 'token_invalid', { error: error.message });
            return res.status(401).json({
                success: false,
                message: 'Недействительный токен'
            });
        }
    }

    // Требует аутентификации
    requireAuth(req, res, next) {
        if (!req.user) {
            this.logAccess(req, 'auth_required');
            return res.status(401).json({
                success: false,
                message: 'Требуется аутентификация'
            });
        }
        next();
    }

    // Проверка роли пользователя
    requireRole(requiredRole) {
        return (req, res, next) => {
            if (!req.user) {
                this.logAccess(req, 'auth_required');
                return res.status(401).json({
                    success: false,
                    message: 'Требуется аутентификация'
                });
            }

            const userRole = req.user.role || 'guest';
            const roleHierarchy = { guest: 0, user: 1, moderator: 2, admin: 3 };
            
            if (roleHierarchy[userRole] < roleHierarchy[requiredRole]) {
                this.logAccess(req, 'insufficient_role', { 
                    required: requiredRole, 
                    current: userRole 
                });
                return res.status(403).json({
                    success: false,
                    message: `Недостаточно прав. Требуется роль: ${requiredRole}`
                });
            }

            this.logAccess(req, 'access_granted', { role: userRole });
            next();
        };
    }

    // Проверка множественных ролей
    requireAnyRole(roles) {
        return (req, res, next) => {
            if (!req.user) {
                this.logAccess(req, 'auth_required');
                return res.status(401).json({
                    success: false,
                    message: 'Требуется аутентификация'
                });
            }

            const userRole = req.user.role || 'guest';
            
            if (!roles.includes(userRole)) {
                this.logAccess(req, 'insufficient_role', { 
                    required: roles, 
                    current: userRole 
                });
                return res.status(403).json({
                    success: false,
                    message: `Недостаточно прав. Требуется одна из ролей: ${roles.join(', ')}`
                });
            }

            this.logAccess(req, 'access_granted', { role: userRole });
            next();
        };
    }

    // Проверка владения ресурсом
    requireOwnership(field = 'userId') {
        return (req, res, next) => {
            if (!req.user) {
                this.logAccess(req, 'auth_required');
                return res.status(401).json({
                    success: false,
                    message: 'Требуется аутентификация'
                });
            }

            const resourceUserId = req.params[field] || req.body[field];
            const currentUserId = req.user.userId;

            if (resourceUserId !== currentUserId && req.user.role !== 'admin') {
                this.logAccess(req, 'ownership_denied', { 
                    resourceOwner: resourceUserId, 
                    currentUser: currentUserId 
                });
                return res.status(403).json({
                    success: false,
                    message: 'Доступ запрещен. Вы можете изменять только свои ресурсы'
                });
            }

            this.logAccess(req, 'ownership_granted');
            next();
        };
    }

    // Логирование доступа
    logAccess(req, action, details = {}) {
        const logEntry = {
            id: this.generateLogId(),
            timestamp: new Date().toISOString(),
            action,
            user: req.user ? {
                id: req.user.userId,
                email: req.user.email,
                role: req.user.role
            } : null,
            request: {
                method: req.method,
                url: req.url,
                ip: req.ip,
                userAgent: req.get('User-Agent')
            },
            details
        };

        this.accessLogs.push(logEntry);

        // Ограничиваем количество логов
        if (this.accessLogs.length > this.maxLogs) {
            this.accessLogs.shift();
        }

        // Логируем в консоль
        const statusEmoji = action.includes('denied') || action.includes('required') ? '' : '';
        console.log(`${statusEmoji} [${logEntry.id}] ${action} - ${req.method} ${req.url}`);
    }

    // Генерация ID лога
    generateLogId() {
        return `auth_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    // Middleware для проверки API ключа
    requireApiKey(apiKey = process.env.API_KEY) {
        return (req, res, next) => {
            const providedKey = req.headers['x-api-key'];
            
            if (!providedKey) {
                this.logAccess(req, 'api_key_missing');
                return res.status(401).json({
                    success: false,
                    message: 'API ключ не предоставлен'
                });
            }

            if (providedKey !== apiKey) {
                this.logAccess(req, 'api_key_invalid');
                return res.status(401).json({
                    success: false,
                    message: 'Недействительный API ключ'
                });
            }

            this.logAccess(req, 'api_key_valid');
            next();
        };
    }

    // Middleware для ограничения по IP
    allowIPs(allowedIPs) {
        return (req, res, next) => {
            const clientIP = req.ip || req.connection.remoteAddress;
            
            if (!allowedIPs.includes(clientIP)) {
                this.logAccess(req, 'ip_blocked', { clientIP, allowedIPs });
                return res.status(403).json({
                    success: false,
                    message: 'Доступ с вашего IP запрещен'
                });
            }

            this.logAccess(req, 'ip_allowed', { clientIP });
            next();
        };
    }

    // Middleware для ограничения по времени
    allowTimeWindow(startHour, endHour) {
        return (req, res, next) => {
            const now = new Date();
            const currentHour = now.getHours();
            
            if (currentHour < startHour || currentHour >= endHour) {
                this.logAccess(req, 'time_restricted', { 
                    currentHour, 
                    allowedWindow: `${startHour}-${endHour}` 
                });
                return res.status(403).json({
                    success: false,
                    message: `Доступ разрешен только с ${startHour}:00 до ${endHour}:00`
                });
            }

            this.logAccess(req, 'time_allowed', { currentHour });
            next();
        };
    }

    // Получение статистики доступа
    getAccessStats() {
        const stats = {
            totalLogs: this.accessLogs.length,
            byAction: {},
            byUser: {},
            byIP: {},
            recentActivity: this.accessLogs.slice(-50)
        };

        this.accessLogs.forEach(log => {
            stats.byAction[log.action] = (stats.byAction[log.action] || 0) + 1;
            
            if (log.user) {
                stats.byUser[log.user.email] = (stats.byUser[log.user.email] || 0) + 1;
            }
            
            stats.byIP[log.request.ip] = (stats.byIP[log.request.ip] || 0) + 1;
        });

        return stats;
    }

    // Получение подозрительной активности
    getSuspiciousActivity() {
        const suspiciousIPs = Object.entries(this.getAccessStats().byIP)
            .filter(([ip, count]) => count > 10)
            .sort(([,a], [,b]) => b - a);

        const failedAttempts = this.accessLogs.filter(log => 
            log.action.includes('denied') || log.action.includes('invalid')
        );

        return {
            suspiciousIPs,
            failedAttempts: failedAttempts.length,
            recentFailures: failedAttempts.slice(-10)
        };
    }
}

// Демонстрация использования
const auth = new AuthMiddleware({
    jwtSecret: 'super-secret-key',
    maxLogs: 500
});

const express = require('express');
const app = express();

app.use(express.json());

// Публичные маршруты
app.get('/', (req, res) => {
    res.json({ message: 'Публичный маршрут' });
});

// Защищенные маршруты
app.get('/profile', auth.verifyToken, auth.requireAuth, (req, res) => {
    res.json({ 
        message: 'Профиль пользователя', 
        user: req.user 
    });
});

app.get('/admin', auth.verifyToken, auth.requireRole('admin'), (req, res) => {
    res.json({ message: 'Админ панель' });
});

app.get('/moderator', auth.verifyToken, auth.requireAnyRole(['moderator', 'admin']), (req, res) => {
    res.json({ message: 'Модератор панель' });
});

// API с ключом
app.get('/api/data', auth.requireApiKey(), (req, res) => {
    res.json({ message: 'Данные API' });
});

// Статистика доступа
app.get('/auth/stats', auth.verifyToken, auth.requireRole('admin'), (req, res) => {
    res.json(auth.getAccessStats());
});

module.exports = AuthMiddleware;
```

</details>

---

###  Задача 3: Создание системы кэширования и оптимизации

 Создайте middleware для:
- Кэширования ответов API
- Сжатия данных
- Ограничения частоты запросов
- Оптимизации производительности

```javascript
// Создайте класс CacheMiddleware:
// cacheResponse(ttl) - кэширует ответы
// compressResponse(req, res, next) - сжимает данные
// rateLimit(limit, window) - ограничивает запросы
// optimizeResponse(req, res, next) - оптимизирует ответы

// Пример использования:
// app.use(cache.cacheResponse(300)); // 5 минут
// app.use(cache.compressResponse);
// app.use(cache.rateLimit(100, 60000)); // 100 запросов в минуту
```

<details>
<summary> Решение</summary>

```javascript
const zlib = require('zlib');
const crypto = require('crypto');

class CacheMiddleware {
    constructor(options = {}) {
        this.cache = new Map();
        this.rateLimits = new Map();
        this.compressionThreshold = options.compressionThreshold || 1024; // 1KB
        this.maxCacheSize = options.maxCacheSize || 1000;
        this.cleanupInterval = options.cleanupInterval || 60000; // 1 минута
        
        // Запускаем очистку кэша
        this.startCleanup();
    }

    // Кэширование ответов
    cacheResponse(ttl = 300) { // 5 минут по умолчанию
        return (req, res, next) => {
            const cacheKey = this.generateCacheKey(req);
            const cached = this.cache.get(cacheKey);

            if (cached && this.isCacheValid(cached, ttl)) {
                console.log(` Кэш HIT: ${req.method} ${req.url}`);
                
                // Восстанавливаем заголовки
                Object.entries(cached.headers).forEach(([key, value]) => {
                    res.setHeader(key, value);
                });
                
                return res.status(cached.status).send(cached.data);
            }

            // Перехватываем ответ для кэширования
            const originalSend = res.send;
            const originalJson = res.json;
            const originalEnd = res.end;

            const responseData = {
                status: null,
                headers: {},
                data: null,
                timestamp: Date.now()
            };

            // Сохраняем заголовки
            const originalSetHeader = res.setHeader;
            res.setHeader = function(name, value) {
                responseData.headers[name] = value;
                return originalSetHeader.call(this, name, value);
            };

            res.send = function(data) {
                responseData.status = res.statusCode;
                responseData.data = data;
                this.cacheResponse(cacheKey, responseData);
                return originalSend.call(this, data);
            }.bind(this);

            res.json = function(data) {
                responseData.status = res.statusCode;
                responseData.data = JSON.stringify(data);
                this.cacheResponse(cacheKey, responseData);
                return originalJson.call(this, data);
            }.bind(this);

            res.end = function(data) {
                if (data) {
                    responseData.status = res.statusCode;
                    responseData.data = data;
                    this.cacheResponse(cacheKey, responseData);
                }
                return originalEnd.call(this, data);
            }.bind(this);

            next();
        };
    }

    // Сжатие ответов
    compressResponse(req, res, next) {
        const acceptEncoding = req.headers['accept-encoding'] || '';
        
        if (!acceptEncoding.includes('gzip') && !acceptEncoding.includes('deflate')) {
            return next();
        }

        const originalSend = res.send;
        const originalJson = res.json;

        res.send = function(data) {
            if (typeof data === 'string' && data.length > this.compressionThreshold) {
                this.compressData(data, acceptEncoding, res, originalSend);
            } else {
                originalSend.call(this, data);
            }
        }.bind(this);

        res.json = function(data) {
            const jsonData = JSON.stringify(data);
            if (jsonData.length > this.compressionThreshold) {
                this.compressData(jsonData, acceptEncoding, res, originalJson);
            } else {
                originalJson.call(this, data);
            }
        }.bind(this);

        next();
    }

    // Ограничение частоты запросов
    rateLimit(limit = 100, windowMs = 60000) { // 100 запросов в минуту
        return (req, res, next) => {
            const key = req.ip || req.connection.remoteAddress;
            const now = Date.now();
            const windowStart = now - windowMs;

            // Очищаем старые записи
            if (!this.rateLimits.has(key)) {
                this.rateLimits.set(key, []);
            }

            const requests = this.rateLimits.get(key);
            const recentRequests = requests.filter(timestamp => timestamp > windowStart);
            
            if (recentRequests.length >= limit) {
                console.warn(`  Rate limit exceeded for ${key}`);
                return res.status(429).json({
                    success: false,
                    message: 'Слишком много запросов',
                    retryAfter: Math.ceil(windowMs / 1000)
                });
            }

            recentRequests.push(now);
            this.rateLimits.set(key, recentRequests);

            // Добавляем заголовки с информацией о лимитах
            res.setHeader('X-RateLimit-Limit', limit);
            res.setHeader('X-RateLimit-Remaining', limit - recentRequests.length);
            res.setHeader('X-RateLimit-Reset', new Date(now + windowMs).toISOString());

            next();
        };
    }

    // Оптимизация ответов
    optimizeResponse(req, res, next) {
        // Устанавливаем заголовки для кэширования
        if (req.method === 'GET') {
            res.setHeader('Cache-Control', 'public, max-age=300'); // 5 минут
            res.setHeader('ETag', this.generateETag(req.url));
        }

        // Удаляем заголовки, которые могут раскрыть информацию о сервере
        res.removeHeader('X-Powered-By');
        res.removeHeader('Server');

        // Добавляем заголовки безопасности
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-Frame-Options', 'DENY');
        res.setHeader('X-XSS-Protection', '1; mode=block');

        next();
    }

    // Middleware для предварительной загрузки данных
    preloadData(dataLoader) {
        return (req, res, next) => {
            const cacheKey = this.generateCacheKey(req);
            
            if (!this.cache.has(cacheKey)) {
                dataLoader(req)
                    .then(data => {
                        this.cache.set(cacheKey, {
                            data: JSON.stringify(data),
                            status: 200,
                            headers: { 'Content-Type': 'application/json' },
                            timestamp: Date.now()
                        });
                    })
                    .catch(error => {
                        console.error('Ошибка предварительной загрузки:', error);
                    });
            }
            
            next();
        };
    }

    // Middleware для инвалидации кэша
    invalidateCache(pattern) {
        return (req, res, next) => {
            const originalSend = res.send;
            const originalJson = res.json;

            res.send = function(data) {
                this.invalidateCacheByPattern(pattern);
                return originalSend.call(this, data);
            }.bind(this);

            res.json = function(data) {
                this.invalidateCacheByPattern(pattern);
                return originalJson.call(this, data);
            }.bind(this);

            next();
        };
    }

    // Вспомогательные методы
    generateCacheKey(req) {
        const keyData = {
            method: req.method,
            url: req.url,
            query: req.query,
            body: req.body
        };
        return crypto.createHash('md5').update(JSON.stringify(keyData)).digest('hex');
    }

    generateETag(url) {
        return `"${crypto.createHash('md5').update(url).digest('hex')}"`;
    }

    isCacheValid(cached, ttl) {
        return Date.now() - cached.timestamp < ttl * 1000;
    }

    cacheResponse(key, data) {
        // Ограничиваем размер кэша
        if (this.cache.size >= this.maxCacheSize) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        
        this.cache.set(key, data);
    }

    compressData(data, acceptEncoding, res, originalMethod) {
        if (acceptEncoding.includes('gzip')) {
            res.setHeader('Content-Encoding', 'gzip');
            zlib.gzip(data, (err, compressed) => {
                if (err) {
                    originalMethod.call(res, data);
                } else {
                    originalMethod.call(res, compressed);
                }
            });
        } else if (acceptEncoding.includes('deflate')) {
            res.setHeader('Content-Encoding', 'deflate');
            zlib.deflate(data, (err, compressed) => {
                if (err) {
                    originalMethod.call(res, data);
                } else {
                    originalMethod.call(res, compressed);
                }
            });
        } else {
            originalMethod.call(res, data);
        }
    }

    invalidateCacheByPattern(pattern) {
        const regex = new RegExp(pattern);
        for (const [key, value] of this.cache.entries()) {
            if (regex.test(value.data)) {
                this.cache.delete(key);
                console.log(`  Кэш инвалидирован: ${key}`);
            }
        }
    }

    // Очистка старых записей
    startCleanup() {
        setInterval(() => {
            this.cleanup();
        }, this.cleanupInterval);
    }

    cleanup() {
        const now = Date.now();
        let cleaned = 0;

        // Очищаем кэш
        for (const [key, value] of this.cache.entries()) {
            if (now - value.timestamp > 24 * 60 * 60 * 1000) { // 24 часа
                this.cache.delete(key);
                cleaned++;
            }
        }

        // Очищаем rate limits
        for (const [key, requests] of this.rateLimits.entries()) {
            const recentRequests = requests.filter(timestamp => now - timestamp < 60 * 60 * 1000); // 1 час
            if (recentRequests.length === 0) {
                this.rateLimits.delete(key);
            } else {
                this.rateLimits.set(key, recentRequests);
            }
        }

        if (cleaned > 0) {
            console.log(` Очищено ${cleaned} устаревших записей кэша`);
        }
    }

    // Статистика кэша
    getCacheStats() {
        return {
            cacheSize: this.cache.size,
            rateLimitEntries: this.rateLimits.size,
            hitRate: this.calculateHitRate(),
            memoryUsage: this.estimateMemoryUsage()
        };
    }

    calculateHitRate() {
        // Простая реализация - в реальном приложении нужно отслеживать hits/misses
        return Math.random() * 100; // Заглушка
    }

    estimateMemoryUsage() {
        let totalSize = 0;
        for (const [key, value] of this.cache.entries()) {
            totalSize += key.length + JSON.stringify(value).length;
        }
        return totalSize;
    }

    // Очистка всего кэша
    clearCache() {
        this.cache.clear();
        this.rateLimits.clear();
        console.log('  Весь кэш очищен');
    }
}

// Демонстрация использования
const cache = new CacheMiddleware({
    compressionThreshold: 512,
    maxCacheSize: 500,
    cleanupInterval: 30000
});

const express = require('express');
const app = express();

app.use(express.json());

// Применяем middleware
app.use(cache.optimizeResponse);
app.use(cache.compressResponse);
app.use(cache.rateLimit(50, 60000)); // 50 запросов в минуту

// Кэшированные маршруты
app.get('/api/users', cache.cacheResponse(300), (req, res) => {
    // Симуляция медленного запроса
    setTimeout(() => {
        res.json({ 
            users: [
                { id: 1, name: 'Иван' },
                { id: 2, name: 'Мария' }
            ],
            timestamp: new Date().toISOString()
        });
    }, 1000);
});

app.get('/api/posts', cache.cacheResponse(600), (req, res) => {
    res.json({ 
        posts: [
            { id: 1, title: 'Заголовок 1' },
            { id: 2, title: 'Заголовок 2' }
        ]
    });
});

// Маршрут с инвалидацией кэша
app.post('/api/posts', cache.invalidateCache('posts'), (req, res) => {
    res.json({ message: 'Пост создан', id: Date.now() });
});

// Статистика кэша
app.get('/cache/stats', (req, res) => {
    res.json(cache.getCacheStats());
});

// Очистка кэша
app.delete('/cache', (req, res) => {
    cache.clearCache();
    res.json({ message: 'Кэш очищен' });
});

module.exports = CacheMiddleware;
```

</details>

---

 Эти задачи помогут понять принципы работы с middleware в Node.js и научиться создавать эффективные системы обработки запросов.

---
