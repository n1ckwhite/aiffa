#  Безопасность в Node.js

**Обеспечение безопасности в Node.js приложениях** требует многослойного подхода, включающего различные методы, инструменты и лучшие практики. Вот основные аспекты:

---

##  1. Управление зависимостями

###  Аудит зависимостей
- **Используйте встроенную команду** `npm audit` или `yarn audit` для проверки уязвимостей в зависимостях
- **Регулярно обновляйте зависимости**
- **Установите только те зависимости**, которые действительно необходимы

###  Минимизация числа зависимостей
- **Избегайте ненужных или неподдерживаемых библиотек**
- **Проверьте код открытых библиотек** перед их использованием

---

##  2. Управление конфиденциальными данными

###  Хранение секретов
- **Никогда не сохраняйте конфиденциальные данные** (ключи API, пароли) в коде
- **Используйте переменные окружения** через пакеты, такие как `dotenv`
- **Рассмотрите системы управления секретами**, такие как HashiCorp Vault, AWS Secrets Manager или Azure Key Vault

###  Разделение окружений
- **Настройте разные конфигурации** для разработки, тестирования и продакшна

---

##  3. Проверка пользовательского ввода

###  Валидация входных данных
- **Используйте библиотеки**, такие как `Joi` или `Validator.js`, для проверки пользовательского ввода
- **Проверяйте входные данные** на стороне клиента и сервера

###  Избегайте NoSQL-инъекций
- **Используйте библиотеки**, такие как `mongoose`, с включённой валидацией схемы
- **Никогда не вставляйте непроверенные данные** в запросы

---

##  4. Защита от общих атак

###  SQL-инъекции
- **Используйте ORM**, такие как Sequelize или TypeORM, или подготовленные выражения

###  XSS (межсайтовый скриптинг)
- **Экранируйте пользовательский ввод** в HTML-выводе
- **Используйте библиотеки**, такие как `xss-clean`

###  CSRF (подделка межсайтовых запросов)
- **Включите CSRF-защиту** через middleware, например, `csurf`

###  Защита от DoS-атак
- **Ограничьте размер запросов** с помощью middleware, такого как `express.json({ limit: '10kb' })`
- **Используйте инструменты**, такие как `express-rate-limit`, для ограничения числа запросов от одного IP
- **Рассмотрите использование CDN** или WAF (Web Application Firewall)

---

##  5. Безопасность сетевого уровня

###  HTTPS
- **Всегда используйте HTTPS** для шифрования передачи данных
- **Настройте HSTS** (HTTP Strict Transport Security)

###  Защита CORS
- **Настройте cors middleware** для разрешения запросов только с доверенных источников

###  Firewall и прокси
- **Используйте брандмауэры и обратные прокси**, такие как NGINX, для фильтрации трафика

---

##  6. Обработка сессий и аутентификация

###  JWT (JSON Web Tokens)
- **Подписывайте токены** с использованием секретов или ключей RSA
- **Устанавливайте срок действия токенов**
- **Храните токены в безопасных HTTP-only cookies**

###  Шифрование паролей
- **Используйте bcrypt или argon2** для хеширования паролей
- **Никогда не сохраняйте пароли** в открытом виде

---

##  7. Защита кода

###  Линтинг безопасности
- **Используйте линтеры**, такие как `eslint-plugin-security`

###  Принципы наименьших привилегий
- **Запускайте приложение** с минимально необходимыми правами
- **Ограничьте доступ** к чувствительным файлам

---

##  8. Мониторинг и аудит

###  Мониторинг событий
- **Используйте инструменты**, такие как New Relic или Datadog, для наблюдения за производительностью и аномалиями

###  Логирование
- **Логируйте только безопасную информацию**, избегайте записи чувствительных данных
- **Используйте инструменты**, такие как Winston или Morgan

###  Аудит безопасности
- **Регулярно проводите тестирование** на проникновение
- **Используйте сканеры**, такие как OWASP ZAP или Burp Suite

---

##  9. Обновление и патчи

- **Регулярно обновляйте Node.js** и установленные модули для исправления известных уязвимостей
- **Следите за изменениями** в Node.js Security Releases

---

##  10. Обучение команды

- **Проводите обучение по безопасности** для разработчиков
- **Ознакомьтесь с руководствами**, такими как OWASP Top Ten

---

##  Дополнительные инструменты безопасности

###  Middleware для Express.js
```javascript
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

// Безопасные заголовки
app.use(helmet());

// Ограничение запросов
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 минут
    max: 100 // максимум 100 запросов с IP
});
app.use(limiter);

// CORS настройки
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    credentials: true
}));
```

###  Валидация данных
```javascript
const Joi = require('joi');

const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).required(),
    age: Joi.number().integer().min(18).max(120)
});

// Middleware валидации
const validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};
```

###  Безопасное хранение паролей
```javascript
const bcrypt = require('bcrypt');

// Хеширование пароля
const hashPassword = async (password) => {
    const saltRounds = 12;
    return await bcrypt.hash(password, saltRounds);
};

// Проверка пароля
const verifyPassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};
```

---

##  Итог

**Безопасность Node.js приложений** — это комплексный процесс, требующий внимания к множеству аспектов. Применяя эти меры, вы сможете значительно повысить безопасность вашего Node.js приложения.

**Ключевые принципы:**
- Всегда валидируйте входные данные
- Используйте HTTPS и безопасные заголовки
- Регулярно обновляйте зависимости
- Мониторьте и логируйте события
- Следуйте принципу наименьших привилегий

##  ЗАДАЧИ

Вот набор задач, чтобы лучше понять `безопасность в Node.js`:

---

###  Задача 1: Создание системы валидации и санитизации данных

 Создайте middleware для Express.js, которое:
- Валидирует входящие данные с помощью Joi
- Санитизирует HTML-контент от XSS-атак
- Ограничивает размер запросов
- Логирует подозрительную активность

```javascript
// Создайте функции:
// createValidationMiddleware(schema) - создает middleware валидации
// sanitizeInput(input) - очищает HTML от опасных тегов
// createSecurityMiddleware() - объединяет все защиты

// Пример использования:
// app.use(createSecurityMiddleware());
// app.post('/users', createValidationMiddleware(userSchema), createUser);
```

<details>
<summary> Решение</summary>

```javascript
const Joi = require('joi');
const xss = require('xss');
const rateLimit = require('express-rate-limit');

class SecurityMiddleware {
    constructor() {
        this.suspiciousActivity = new Map();
        this.maxSuspiciousAttempts = 5;
    }

    // Создание middleware валидации
    createValidationMiddleware(schema) {
        return (req, res, next) => {
            const { error, value } = schema.validate(req.body, {
                abortEarly: false,
                stripUnknown: true
            });

            if (error) {
                this.logSuspiciousActivity(req.ip, 'validation_error', error.details);
                return res.status(400).json({
                    success: false,
                    message: 'Ошибка валидации данных',
                    errors: error.details.map(detail => ({
                        field: detail.path.join('.'),
                        message: detail.message
                    }))
                });
            }

            // Санитизируем данные
            req.body = this.sanitizeObject(value);
            next();
        };
    }

    // Санитизация HTML-контента
    sanitizeInput(input) {
        if (typeof input === 'string') {
            return xss(input, {
                whiteList: {
                    p: [],
                    br: [],
                    strong: [],
                    em: []
                },
                stripIgnoreTag: true,
                stripIgnoreTagBody: ['script']
            });
        }
        return input;
    }

    // Рекурсивная санитизация объекта
    sanitizeObject(obj) {
        if (Array.isArray(obj)) {
            return obj.map(item => this.sanitizeObject(item));
        }
        
        if (obj && typeof obj === 'object') {
            const sanitized = {};
            for (const [key, value] of Object.entries(obj)) {
                sanitized[key] = this.sanitizeObject(value);
            }
            return sanitized;
        }
        
        return this.sanitizeInput(obj);
    }

    // Middleware ограничения размера запроса
    createSizeLimitMiddleware(maxSize = '10mb') {
        return (req, res, next) => {
            const contentLength = parseInt(req.headers['content-length'] || '0');
            const maxBytes = this.parseSize(maxSize);
            
            if (contentLength > maxBytes) {
                this.logSuspiciousActivity(req.ip, 'oversized_request', { size: contentLength });
                return res.status(413).json({
                    success: false,
                    message: 'Размер запроса превышает допустимый лимит'
                });
            }
            
            next();
        };
    }

    // Парсинг размера в байты
    parseSize(size) {
        const units = { b: 1, kb: 1024, mb: 1024 * 1024, gb: 1024 * 1024 * 1024 };
        const match = size.toLowerCase().match(/^(\d+(?:\.\d+)?)\s*(b|kb|mb|gb)?$/);
        
        if (!match) return 10 * 1024 * 1024; // 10MB по умолчанию
        
        const value = parseFloat(match[1]);
        const unit = match[2] || 'b';
        
        return Math.floor(value * units[unit]);
    }

    // Rate limiting с адаптивными лимитами
    createRateLimitMiddleware() {
        return rateLimit({
            windowMs: 15 * 60 * 1000, // 15 минут
            max: (req) => {
                // Снижаем лимит для подозрительных IP
                const attempts = this.suspiciousActivity.get(req.ip) || 0;
                return Math.max(10, 100 - attempts * 10);
            },
            message: {
                success: false,
                message: 'Слишком много запросов, попробуйте позже'
            },
            standardHeaders: true,
            legacyHeaders: false,
            handler: (req, res) => {
                this.logSuspiciousActivity(req.ip, 'rate_limit_exceeded');
                res.status(429).json({
                    success: false,
                    message: 'Превышен лимит запросов'
                });
            }
        });
    }

    // Логирование подозрительной активности
    logSuspiciousActivity(ip, type, details = {}) {
        const now = Date.now();
        const activity = this.suspiciousActivity.get(ip) || { count: 0, lastSeen: 0, types: [] };
        
        activity.count++;
        activity.lastSeen = now;
        activity.types.push({ type, timestamp: now, details });
        
        // Очищаем старые записи (старше 1 часа)
        activity.types = activity.types.filter(item => now - item.timestamp < 3600000);
        
        this.suspiciousActivity.set(ip, activity);
        
        console.warn(` Подозрительная активность от ${ip}: ${type}`, details);
        
        // Блокируем IP при превышении лимита
        if (activity.count > this.maxSuspiciousAttempts) {
            console.error(` IP ${ip} заблокирован из-за подозрительной активности`);
        }
    }

    // Создание комплексного middleware безопасности
    createSecurityMiddleware(options = {}) {
        const {
            maxRequestSize = '10mb',
            enableRateLimit = true,
            enableValidation = true
        } = options;

        return (req, res, next) => {
            // Логируем все запросы
            console.log(`${new Date().toISOString()} - ${req.method} ${req.url} - ${req.ip}`);
            
            // Применяем ограничения размера
            this.createSizeLimitMiddleware(maxRequestSize)(req, res, (err) => {
                if (err) return next(err);
                
                // Применяем rate limiting
                if (enableRateLimit) {
                    this.createRateLimitMiddleware()(req, res, next);
                } else {
                    next();
                }
            });
        };
    }

    // Схемы валидации для разных типов данных
    static getValidationSchemas() {
        return {
            user: Joi.object({
                email: Joi.string().email().required(),
                password: Joi.string().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).required(),
                name: Joi.string().min(2).max(50).required(),
                age: Joi.number().integer().min(18).max(120)
            }),
            
            post: Joi.object({
                title: Joi.string().min(5).max(200).required(),
                content: Joi.string().min(10).max(5000).required(),
                tags: Joi.array().items(Joi.string().max(20)).max(10)
            }),
            
            comment: Joi.object({
                content: Joi.string().min(1).max(1000).required(),
                postId: Joi.string().required()
            })
        };
    }

    // Получение статистики безопасности
    getSecurityStats() {
        const stats = {
            totalSuspiciousIPs: this.suspiciousActivity.size,
            blockedIPs: 0,
            totalAttempts: 0
        };

        for (const [ip, activity] of this.suspiciousActivity) {
            stats.totalAttempts += activity.count;
            if (activity.count > this.maxSuspiciousAttempts) {
                stats.blockedIPs++;
            }
        }

        return stats;
    }
}

// Демонстрация использования
const security = new SecurityMiddleware();

// Создаем Express приложение
const express = require('express');
const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(security.createSecurityMiddleware());

// Защищенные маршруты
app.post('/users', 
    security.createValidationMiddleware(SecurityMiddleware.getValidationSchemas().user),
    (req, res) => {
        res.json({ success: true, message: 'Пользователь создан', data: req.body });
    }
);

app.post('/posts',
    security.createValidationMiddleware(SecurityMiddleware.getValidationSchemas().post),
    (req, res) => {
        res.json({ success: true, message: 'Пост создан', data: req.body });
    }
);

// Статистика безопасности
app.get('/security/stats', (req, res) => {
    res.json(security.getSecurityStats());
});

module.exports = SecurityMiddleware;
```

</details>

---

###  Задача 2: Создание системы аутентификации с JWT

 Создайте систему аутентификации с:
- Регистрацией и логином пользователей
- JWT токенами с истечением срока действия
- Хешированием паролей с bcrypt
- Middleware для проверки токенов
- Защитой от брутфорс-атак

```javascript
// Создайте класс AuthSystem:
// register(userData) - регистрация пользователя
// login(email, password) - авторизация
// verifyToken(token) - проверка JWT токена
// createAuthMiddleware() - middleware для защищенных маршрутов

// Пример использования:
// const auth = new AuthSystem();
// app.post('/register', auth.register);
// app.post('/login', auth.login);
// app.get('/profile', auth.createAuthMiddleware(), getProfile);
```

<details>
<summary> Решение</summary>

```javascript
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

class AuthSystem {
    constructor(options = {}) {
        this.jwtSecret = options.jwtSecret || process.env.JWT_SECRET || 'your-secret-key';
        this.jwtExpiresIn = options.jwtExpiresIn || '24h';
        this.bcryptRounds = options.bcryptRounds || 12;
        this.maxLoginAttempts = options.maxLoginAttempts || 5;
        this.lockoutTime = options.lockoutTime || 15 * 60 * 1000; // 15 минут
        
        // Хранилище пользователей (в реальном приложении используйте БД)
        this.users = new Map();
        this.loginAttempts = new Map();
        this.refreshTokens = new Map();
    }

    // Регистрация пользователя
    async register(userData) {
        const { email, password, name } = userData;
        
        // Проверяем существование пользователя
        if (this.users.has(email)) {
            throw new Error('Пользователь с таким email уже существует');
        }
        
        // Валидация данных
        if (!this.isValidEmail(email)) {
            throw new Error('Некорректный email');
        }
        
        if (!this.isValidPassword(password)) {
            throw new Error('Пароль должен содержать минимум 8 символов, включая заглавные и строчные буквы, цифры');
        }
        
        // Хешируем пароль
        const hashedPassword = await bcrypt.hash(password, this.bcryptRounds);
        
        // Создаем пользователя
        const user = {
            id: crypto.randomUUID(),
            email,
            password: hashedPassword,
            name,
            createdAt: new Date(),
            isActive: true
        };
        
        this.users.set(email, user);
        
        console.log(` Пользователь ${email} зарегистрирован`);
        
        return {
            success: true,
            message: 'Пользователь успешно зарегистрирован',
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        };
    }

    // Авторизация пользователя
    async login(email, password) {
        // Проверяем блокировку
        if (this.isAccountLocked(email)) {
            throw new Error('Аккаунт временно заблокирован из-за множественных неудачных попыток входа');
        }
        
        // Находим пользователя
        const user = this.users.get(email);
        if (!user) {
            this.recordFailedAttempt(email);
            throw new Error('Неверный email или пароль');
        }
        
        // Проверяем пароль
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            this.recordFailedAttempt(email);
            throw new Error('Неверный email или пароль');
        }
        
        // Сбрасываем счетчик неудачных попыток
        this.loginAttempts.delete(email);
        
        // Генерируем токены
        const accessToken = this.generateAccessToken(user);
        const refreshToken = this.generateRefreshToken(user);
        
        // Сохраняем refresh token
        this.refreshTokens.set(refreshToken, {
            userId: user.id,
            email: user.email,
            createdAt: new Date()
        });
        
        console.log(` Пользователь ${email} авторизован`);
        
        return {
            success: true,
            message: 'Авторизация успешна',
            tokens: {
                accessToken,
                refreshToken,
                expiresIn: this.jwtExpiresIn
            },
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        };
    }

    // Генерация access token
    generateAccessToken(user) {
        return jwt.sign(
            {
                userId: user.id,
                email: user.email,
                type: 'access'
            },
            this.jwtSecret,
            { expiresIn: this.jwtExpiresIn }
        );
    }

    // Генерация refresh token
    generateRefreshToken(user) {
        const token = crypto.randomBytes(64).toString('hex');
        return token;
    }

    // Проверка JWT токена
    verifyToken(token) {
        try {
            const decoded = jwt.verify(token, this.jwtSecret);
            
            if (decoded.type !== 'access') {
                throw new Error('Неверный тип токена');
            }
            
            return decoded;
        } catch (error) {
            throw new Error('Недействительный токен');
        }
    }

    // Обновление токена
    async refreshAccessToken(refreshToken) {
        const tokenData = this.refreshTokens.get(refreshToken);
        
        if (!tokenData) {
            throw new Error('Недействительный refresh token');
        }
        
        const user = this.users.get(tokenData.email);
        if (!user || !user.isActive) {
            throw new Error('Пользователь не найден или деактивирован');
        }
        
        const newAccessToken = this.generateAccessToken(user);
        
        return {
            success: true,
            accessToken: newAccessToken,
            expiresIn: this.jwtExpiresIn
        };
    }

    // Middleware для защищенных маршрутов
    createAuthMiddleware() {
        return (req, res, next) => {
            try {
                const authHeader = req.headers.authorization;
                
                if (!authHeader || !authHeader.startsWith('Bearer ')) {
                    return res.status(401).json({
                        success: false,
                        message: 'Токен авторизации не предоставлен'
                    });
                }
                
                const token = authHeader.substring(7);
                const decoded = this.verifyToken(token);
                
                // Добавляем информацию о пользователе в запрос
                req.user = {
                    id: decoded.userId,
                    email: decoded.email
                };
                
                next();
            } catch (error) {
                return res.status(401).json({
                    success: false,
                    message: error.message
                });
            }
        };
    }

    // Проверка блокировки аккаунта
    isAccountLocked(email) {
        const attempts = this.loginAttempts.get(email);
        if (!attempts) return false;
        
        const now = Date.now();
        const timeSinceLastAttempt = now - attempts.lastAttempt;
        
        if (attempts.count >= this.maxLoginAttempts && timeSinceLastAttempt < this.lockoutTime) {
            return true;
        }
        
        // Сбрасываем счетчик если прошло достаточно времени
        if (timeSinceLastAttempt >= this.lockoutTime) {
            this.loginAttempts.delete(email);
            return false;
        }
        
        return false;
    }

    // Запись неудачной попытки входа
    recordFailedAttempt(email) {
        const attempts = this.loginAttempts.get(email) || { count: 0, lastAttempt: 0 };
        attempts.count++;
        attempts.lastAttempt = Date.now();
        this.loginAttempts.set(email, attempts);
        
        console.warn(`  Неудачная попытка входа для ${email} (${attempts.count}/${this.maxLoginAttempts})`);
    }

    // Валидация email
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Валидация пароля
    isValidPassword(password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    }

    // Выход из системы
    logout(refreshToken) {
        if (refreshToken) {
            this.refreshTokens.delete(refreshToken);
        }
        
        return {
            success: true,
            message: 'Выход выполнен успешно'
        };
    }

    // Получение статистики
    getStats() {
        return {
            totalUsers: this.users.size,
            activeRefreshTokens: this.refreshTokens.size,
            lockedAccounts: Array.from(this.loginAttempts.entries())
                .filter(([email, attempts]) => this.isAccountLocked(email)).length
        };
    }
}

// Демонстрация использования
const auth = new AuthSystem({
    jwtSecret: 'super-secret-key-change-in-production',
    jwtExpiresIn: '1h',
    maxLoginAttempts: 3,
    lockoutTime: 5 * 60 * 1000 // 5 минут для демо
});

// Express приложение
const express = require('express');
const app = express();

app.use(express.json());

// Публичные маршруты
app.post('/register', async (req, res) => {
    try {
        const result = await auth.register(req.body);
        res.json(result);
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await auth.login(email, password);
        res.json(result);
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        });
    }
});

app.post('/refresh', async (req, res) => {
    try {
        const { refreshToken } = req.body;
        const result = await auth.refreshAccessToken(refreshToken);
        res.json(result);
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        });
    }
});

// Защищенные маршруты
app.get('/profile', auth.createAuthMiddleware(), (req, res) => {
    res.json({
        success: true,
        message: 'Профиль пользователя',
        user: req.user
    });
});

app.post('/logout', auth.createAuthMiddleware(), (req, res) => {
    const { refreshToken } = req.body;
    const result = auth.logout(refreshToken);
    res.json(result);
});

// Статистика
app.get('/auth/stats', (req, res) => {
    res.json(auth.getStats());
});

module.exports = AuthSystem;
```

</details>

---

###  Задача 3: Создание системы мониторинга безопасности

 Создайте систему мониторинга, которая:
- Отслеживает подозрительную активность
- Логирует события безопасности
- Отправляет уведомления о нарушениях
- Ведет статистику атак

```javascript
// Создайте класс SecurityMonitor:
// logEvent(type, details) - логирует событие безопасности
// detectAnomalies() - обнаруживает аномалии
// generateReport() - генерирует отчет
// sendAlert(alert) - отправляет уведомления

// Пример использования:
// const monitor = new SecurityMonitor();
// monitor.logEvent('failed_login', { ip: '192.168.1.1', user: 'admin' });
// monitor.startMonitoring();
```

<details>
<summary> Решение</summary>

```javascript
class SecurityMonitor {
    constructor(options = {}) {
        this.events = [];
        this.maxEvents = options.maxEvents || 10000;
        this.alertThresholds = {
            failedLogins: 5,
            suspiciousRequests: 10,
            dataBreachAttempts: 3
        };
        this.alertCallbacks = [];
        this.isMonitoring = false;
        this.monitoringInterval = null;
    }

    // Логирование события безопасности
    logEvent(type, details = {}) {
        const event = {
            id: this.generateEventId(),
            type,
            timestamp: new Date(),
            details,
            severity: this.getSeverity(type),
            ip: details.ip || 'unknown',
            userAgent: details.userAgent || 'unknown'
        };

        this.events.push(event);

        // Ограничиваем количество событий
        if (this.events.length > this.maxEvents) {
            this.events.shift();
        }

        console.log(` Событие безопасности: ${type}`, details);

        // Проверяем на аномалии
        this.checkForAnomalies(event);

        return event;
    }

    // Генерация ID события
    generateEventId() {
        return `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    // Определение серьезности события
    getSeverity(type) {
        const severityMap = {
            'login_success': 'info',
            'login_failed': 'warning',
            'account_locked': 'warning',
            'suspicious_request': 'warning',
            'data_breach_attempt': 'critical',
            'rate_limit_exceeded': 'warning',
            'invalid_token': 'warning',
            'unauthorized_access': 'critical',
            'sql_injection_attempt': 'critical',
            'xss_attempt': 'critical'
        };

        return severityMap[type] || 'info';
    }

    // Проверка на аномалии
    checkForAnomalies(event) {
        const recentEvents = this.getRecentEvents(5 * 60 * 1000); // 5 минут
        const ipEvents = recentEvents.filter(e => e.ip === event.ip);
        const userEvents = recentEvents.filter(e => e.details.user === event.details.user);

        // Проверяем множественные неудачные попытки входа
        const failedLogins = ipEvents.filter(e => e.type === 'login_failed');
        if (failedLogins.length >= this.alertThresholds.failedLogins) {
            this.triggerAlert('multiple_failed_logins', {
                ip: event.ip,
                count: failedLogins.length,
                timeWindow: '5 minutes'
            });
        }

        // Проверяем подозрительные запросы
        const suspiciousRequests = ipEvents.filter(e => e.type === 'suspicious_request');
        if (suspiciousRequests.length >= this.alertThresholds.suspiciousRequests) {
            this.triggerAlert('suspicious_activity', {
                ip: event.ip,
                count: suspiciousRequests.length,
                timeWindow: '5 minutes'
            });
        }

        // Проверяем попытки нарушения данных
        const breachAttempts = ipEvents.filter(e => e.type === 'data_breach_attempt');
        if (breachAttempts.length >= this.alertThresholds.dataBreachAttempts) {
            this.triggerAlert('data_breach_attempts', {
                ip: event.ip,
                count: breachAttempts.length,
                timeWindow: '5 minutes'
            });
        }
    }

    // Получение недавних событий
    getRecentEvents(timeWindow) {
        const cutoff = new Date(Date.now() - timeWindow);
        return this.events.filter(event => event.timestamp > cutoff);
    }

    // Срабатывание предупреждения
    triggerAlert(type, details) {
        const alert = {
            id: this.generateEventId(),
            type,
            timestamp: new Date(),
            details,
            severity: 'high'
        };

        console.warn(` ПРЕДУПРЕЖДЕНИЕ БЕЗОПАСНОСТИ: ${type}`, details);

        // Вызываем зарегистрированные обработчики
        this.alertCallbacks.forEach(callback => {
            try {
                callback(alert);
            } catch (error) {
                console.error('Ошибка в обработчике предупреждения:', error);
            }
        });
    }

    // Регистрация обработчика предупреждений
    onAlert(callback) {
        this.alertCallbacks.push(callback);
    }

    // Запуск мониторинга
    startMonitoring(interval = 60000) { // 1 минута
        if (this.isMonitoring) {
            console.log('  Мониторинг уже запущен');
            return;
        }

        this.isMonitoring = true;
        console.log(' Мониторинг безопасности запущен');

        this.monitoringInterval = setInterval(() => {
            this.performHealthCheck();
        }, interval);
    }

    // Остановка мониторинга
    stopMonitoring() {
        if (!this.isMonitoring) {
            console.log('  Мониторинг не запущен');
            return;
        }

        this.isMonitoring = false;
        if (this.monitoringInterval) {
            clearInterval(this.monitoringInterval);
            this.monitoringInterval = null;
        }

        console.log('⏹  Мониторинг безопасности остановлен');
    }

    // Проверка состояния системы
    performHealthCheck() {
        const recentEvents = this.getRecentEvents(60 * 1000); // 1 минута
        const criticalEvents = recentEvents.filter(e => e.severity === 'critical');
        const warningEvents = recentEvents.filter(e => e.severity === 'warning');

        if (criticalEvents.length > 0) {
            console.warn(`  Обнаружено ${criticalEvents.length} критических событий за последнюю минуту`);
        }

        if (warningEvents.length > 10) {
            console.warn(`  Высокий уровень предупреждений: ${warningEvents.length} за минуту`);
        }
    }

    // Генерация отчета безопасности
    generateReport(timeRange = 24 * 60 * 60 * 1000) { // 24 часа
        const cutoff = new Date(Date.now() - timeRange);
        const reportEvents = this.events.filter(event => event.timestamp > cutoff);

        const stats = {
            totalEvents: reportEvents.length,
            byType: {},
            bySeverity: {},
            byIP: {},
            timeRange: {
                start: cutoff,
                end: new Date()
            }
        };

        // Группировка по типам
        reportEvents.forEach(event => {
            stats.byType[event.type] = (stats.byType[event.type] || 0) + 1;
            stats.bySeverity[event.severity] = (stats.bySeverity[event.severity] || 0) + 1;
            stats.byIP[event.ip] = (stats.byIP[event.ip] || 0) + 1;
        });

        // Топ подозрительных IP
        const topSuspiciousIPs = Object.entries(stats.byIP)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 10);

        return {
            ...stats,
            topSuspiciousIPs,
            recommendations: this.generateRecommendations(stats)
        };
    }

    // Генерация рекомендаций
    generateRecommendations(stats) {
        const recommendations = [];

        if (stats.byType['login_failed'] > 100) {
            recommendations.push('Рассмотрите усиление защиты от брутфорс-атак');
        }

        if (stats.byType['sql_injection_attempt'] > 0) {
            recommendations.push('Усильте валидацию входных данных и используйте подготовленные запросы');
        }

        if (stats.byType['xss_attempt'] > 0) {
            recommendations.push('Улучшите санитизацию HTML-контента');
        }

        if (stats.bySeverity['critical'] > 10) {
            recommendations.push('Проведите аудит безопасности системы');
        }

        return recommendations;
    }

    // Экспорт событий
    exportEvents(format = 'json') {
        if (format === 'json') {
            return JSON.stringify(this.events, null, 2);
        } else if (format === 'csv') {
            return this.eventsToCSV();
        }
        throw new Error('Неподдерживаемый формат экспорта');
    }

    // Конвертация в CSV
    eventsToCSV() {
        if (this.events.length === 0) return '';

        const headers = ['id', 'type', 'timestamp', 'severity', 'ip', 'userAgent'];
        const csvRows = [headers.join(',')];

        this.events.forEach(event => {
            const row = headers.map(header => {
                const value = event[header] || '';
                return `"${value.toString().replace(/"/g, '""')}"`;
            });
            csvRows.push(row.join(','));
        });

        return csvRows.join('\n');
    }

    // Очистка старых событий
    cleanup(olderThan = 7 * 24 * 60 * 60 * 1000) { // 7 дней
        const cutoff = new Date(Date.now() - olderThan);
        const initialCount = this.events.length;
        
        this.events = this.events.filter(event => event.timestamp > cutoff);
        
        const removedCount = initialCount - this.events.length;
        console.log(` Очищено ${removedCount} старых событий безопасности`);
        
        return removedCount;
    }
}

// Демонстрация использования
const monitor = new SecurityMonitor();

// Настраиваем обработчик предупреждений
monitor.onAlert((alert) => {
    console.log(` Отправка уведомления: ${alert.type}`);
    // Здесь можно добавить отправку email, Slack, SMS и т.д.
});

// Запускаем мониторинг
monitor.startMonitoring(30000); // 30 секунд

// Симулируем события
setTimeout(() => {
    monitor.logEvent('login_failed', { ip: '192.168.1.100', user: 'admin' });
    monitor.logEvent('login_failed', { ip: '192.168.1.100', user: 'admin' });
    monitor.logEvent('login_failed', { ip: '192.168.1.100', user: 'admin' });
    monitor.logEvent('login_failed', { ip: '192.168.1.100', user: 'admin' });
    monitor.logEvent('login_failed', { ip: '192.168.1.100', user: 'admin' });
}, 2000);

setTimeout(() => {
    const report = monitor.generateReport();
    console.log(' Отчет безопасности:', report);
}, 5000);

module.exports = SecurityMonitor;
```

</details>

---

 Эти задачи помогут понять принципы обеспечения безопасности в Node.js приложениях и научиться создавать защищенные системы.

---
