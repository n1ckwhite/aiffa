#  Определение среды выполнения в Node.js

**В Node.js объект `window` отсутствует**, поскольку это специфичный объект, доступный только в браузерной среде. Чтобы проверить наличие объекта `window` в Node.js (например, чтобы определить, где выполняется код — в браузере или в Node.js), можно использовать условное выражение.

---

##  Проверка наличия window

###  Базовый способ
```javascript
if (typeof window !== 'undefined') {
    console.log('Код выполняется в браузере.');
} else {
    console.log('Код выполняется в Node.js.');
}
```

**Как это работает:**
- **`typeof window`** — если `window` определён (в браузере), возвращает `'object'`
- **Если `window` не существует** (в Node.js), возвращает `'undefined'` без ошибки

---

##  Проверка через глобальные объекты

###  Проверка на объект `global` (Node.js)
```javascript
if (typeof global !== 'undefined') {
    console.log('Код выполняется в Node.js.');
}
```

###  Объект `document` (браузер)
```javascript
if (typeof document !== 'undefined') {
    console.log('Код выполняется в браузере.');
}
```

---

##  Универсальный подход

###  Определение среды выполнения
```javascript
const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';
const isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;

if (isBrowser) {
    console.log('Код выполняется в браузере.');
} else if (isNode) {
    console.log('Код выполняется в Node.js.');
}
```

**Этот метод учитывает нюансы разных окружений:**
- **Electron** — гибридная среда
- **React Native** — мобильная среда
- **Worker-threads** — многопоточность

---

##  Дополнительные проверки

###  Проверка специфичных объектов
```javascript
// Проверка Node.js окружения
const isNode = typeof process !== 'undefined' && 
               process.versions && 
               process.versions.node;

// Проверка браузерного окружения
const isBrowser = typeof window !== 'undefined' && 
                  typeof document !== 'undefined';

// Проверка Web Worker
const isWebWorker = typeof self !== 'undefined' && 
                    typeof importScripts === 'function';

// Проверка Service Worker
const isServiceWorker = typeof self !== 'undefined' && 
                        'serviceWorker' in self;
```

###  Проверка через `this`
```javascript
function detectEnvironment() {
    if (typeof window !== 'undefined' && window === this) {
        return 'browser';
    } else if (typeof global !== 'undefined' && global === this) {
        return 'node';
    } else if (typeof self !== 'undefined' && self === this) {
        return 'worker';
    }
    return 'unknown';
}
```

---

##  Практические примеры

###  Условная загрузка модулей
```javascript
let fs, path;

if (typeof window === 'undefined') {
    // Node.js окружение
    fs = require('fs');
    path = require('path');
} else {
    // Браузерное окружение
    console.log('Используем браузерные API');
}
```

###  Универсальные функции
```javascript
function getEnvironment() {
    if (typeof window !== 'undefined') {
        return 'browser';
    } else if (typeof process !== 'undefined' && process.versions && process.versions.node) {
        return 'node';
    } else if (typeof self !== 'undefined') {
        return 'worker';
    }
    return 'unknown';
}

// Использование
const env = getEnvironment();
console.log(`Текущая среда: ${env}`);
```

###  Проверка возможностей
```javascript
function hasFeature(feature) {
    switch (feature) {
        case 'fs':
            return typeof require !== 'undefined' && typeof require('fs') !== 'undefined';
        case 'fetch':
            return typeof fetch !== 'undefined';
        case 'localStorage':
            return typeof localStorage !== 'undefined';
        case 'process':
            return typeof process !== 'undefined';
        default:
            return false;
    }
}
```

---

##  Создание универсального детектора

###  Класс EnvironmentDetector
```javascript
class EnvironmentDetector {
    static detect() {
        const checks = {
            isBrowser: typeof window !== 'undefined' && typeof document !== 'undefined',
            isNode: typeof process !== 'undefined' && process.versions && process.versions.node,
            isWebWorker: typeof self !== 'undefined' && typeof importScripts === 'function',
            isServiceWorker: typeof self !== 'undefined' && 'serviceWorker' in self,
            isElectron: typeof process !== 'undefined' && process.versions && process.versions.electron,
            isReactNative: typeof navigator !== 'undefined' && navigator.product === 'ReactNative'
        };

        return {
            ...checks,
            environment: this.getEnvironmentName(checks),
            features: this.getAvailableFeatures(checks)
        };
    }

    static getEnvironmentName(checks) {
        if (checks.isElectron) return 'electron';
        if (checks.isReactNative) return 'react-native';
        if (checks.isServiceWorker) return 'service-worker';
        if (checks.isWebWorker) return 'web-worker';
        if (checks.isBrowser) return 'browser';
        if (checks.isNode) return 'node';
        return 'unknown';
    }

    static getAvailableFeatures(checks) {
        return {
            fileSystem: checks.isNode || checks.isElectron,
            dom: checks.isBrowser || checks.isElectron,
            webWorkers: checks.isBrowser,
            serviceWorkers: checks.isBrowser,
            nodeModules: checks.isNode || checks.isElectron,
            localStorage: checks.isBrowser || checks.isElectron,
            fetch: typeof fetch !== 'undefined'
        };
    }
}
```

---

##  Итог

**Определение среды выполнения** в Node.js позволяет создавать универсальный код, который работает в разных окружениях. Используйте проверки `typeof window`, `typeof process` и других глобальных объектов для надежного определения среды.

**Ключевые принципы:**
- Проверяйте наличие специфичных объектов
- Используйте `typeof` для безопасной проверки
- Учитывайте особенности разных окружений
- Создавайте универсальные детекторы

##  ЗАДАЧИ

Вот набор задач, чтобы лучше понять `определение среды выполнения в Node.js`:

---

###  Задача 1: Создание универсального детектора окружения

 Создайте класс для определения среды выполнения с:
- Определением браузера, Node.js, Web Worker, Service Worker
- Проверкой доступных API и возможностей
- Получением информации о версиях и платформах
- Кэшированием результатов проверки

```javascript
// Создайте класс EnvironmentDetector:
// detect() - определяет текущую среду
// getFeatures() - получает доступные возможности
// getVersion() - получает версию среды
// isSupported(feature) - проверяет поддержку функции

// Пример использования:
// const detector = new EnvironmentDetector();
// console.log(detector.detect());
// console.log(detector.isSupported('localStorage'));
```

<details>
<summary> Решение</summary>

```javascript
class EnvironmentDetector {
    constructor() {
        this.cache = new Map();
        this.detectionResult = null;
    }

    // Основной метод определения среды
    detect() {
        if (this.detectionResult) {
            return this.detectionResult;
        }

        const checks = this.performChecks();
        const environment = this.determineEnvironment(checks);
        const features = this.detectFeatures(checks);
        const versions = this.getVersions(checks);
        const platform = this.getPlatformInfo(checks);

        this.detectionResult = {
            environment,
            features,
            versions,
            platform,
            checks,
            timestamp: Date.now()
        };

        return this.detectionResult;
    }

    // Выполнение всех проверок
    performChecks() {
        return {
            // Базовые объекты
            hasWindow: typeof window !== 'undefined',
            hasDocument: typeof document !== 'undefined',
            hasProcess: typeof process !== 'undefined',
            hasGlobal: typeof global !== 'undefined',
            hasSelf: typeof self !== 'undefined',
            hasNavigator: typeof navigator !== 'undefined',
            
            // Специфичные проверки
            hasImportScripts: typeof importScripts === 'function',
            hasServiceWorker: typeof self !== 'undefined' && 'serviceWorker' in self,
            hasRequire: typeof require !== 'undefined',
            hasModule: typeof module !== 'undefined',
            hasExports: typeof exports !== 'undefined',
            
            // Проверки версий
            hasProcessVersions: typeof process !== 'undefined' && process.versions,
            hasNodeVersion: this.checkNodeVersion(),
            hasElectronVersion: this.checkElectronVersion(),
            
            // Проверки API
            hasFetch: typeof fetch !== 'undefined',
            hasLocalStorage: typeof localStorage !== 'undefined',
            hasSessionStorage: typeof sessionStorage !== 'undefined',
            hasIndexedDB: typeof indexedDB !== 'undefined',
            hasWebSocket: typeof WebSocket !== 'undefined',
            hasWorker: typeof Worker !== 'undefined',
            
            // Проверки React Native
            isReactNative: this.checkReactNative(),
            
            // Проверки Electron
            isElectron: this.checkElectron()
        };
    }

    // Определение среды на основе проверок
    determineEnvironment(checks) {
        if (checks.isElectron) return 'electron';
        if (checks.isReactNative) return 'react-native';
        if (checks.hasServiceWorker) return 'service-worker';
        if (checks.hasImportScripts) return 'web-worker';
        if (checks.hasWindow && checks.hasDocument) return 'browser';
        if (checks.hasProcess && checks.hasNodeVersion) return 'node';
        if (checks.hasSelf && !checks.hasWindow) return 'worker';
        return 'unknown';
    }

    // Определение доступных возможностей
    detectFeatures(checks) {
        return {
            // Файловая система
            fileSystem: checks.hasProcess || checks.isElectron,
            require: checks.hasRequire,
            modules: checks.hasModule && checks.hasExports,
            
            // DOM API
            dom: checks.hasWindow && checks.hasDocument,
            localStorage: checks.hasLocalStorage,
            sessionStorage: checks.hasSessionStorage,
            indexedDB: checks.hasIndexedDB,
            
            // Сетевые API
            fetch: checks.hasFetch,
            webSocket: checks.hasWebSocket,
            xhr: typeof XMLHttpRequest !== 'undefined',
            
            // Многопоточность
            webWorkers: checks.hasWorker && checks.hasWindow,
            serviceWorkers: checks.hasServiceWorker,
            workerThreads: checks.hasProcess && checks.hasRequire,
            
            // Другие API
            crypto: typeof crypto !== 'undefined',
            performance: typeof performance !== 'undefined',
            console: typeof console !== 'undefined',
            setTimeout: typeof setTimeout !== 'undefined',
            setInterval: typeof setInterval !== 'undefined'
        };
    }

    // Получение версий
    getVersions(checks) {
        const versions = {};

        if (checks.hasProcess && checks.hasProcessVersions) {
            versions.node = process.versions.node;
            versions.v8 = process.versions.v8;
            versions.uv = process.versions.uv;
            versions.openssl = process.versions.openssl;
            
            if (checks.isElectron) {
                versions.electron = process.versions.electron;
            }
        }

        if (checks.hasNavigator) {
            versions.userAgent = navigator.userAgent;
            versions.language = navigator.language;
            versions.platform = navigator.platform;
        }

        return versions;
    }

    // Получение информации о платформе
    getPlatformInfo(checks) {
        const info = {
            os: 'unknown',
            arch: 'unknown',
            type: 'unknown'
        };

        if (checks.hasProcess) {
            info.os = process.platform;
            info.arch = process.arch;
            info.type = process.type || 'node';
        }

        if (checks.hasNavigator) {
            info.userAgent = navigator.userAgent;
            info.language = navigator.language;
            info.platform = navigator.platform;
        }

        return info;
    }

    // Проверка поддержки функции
    isSupported(feature) {
        const detection = this.detect();
        return detection.features[feature] || false;
    }

    // Получение возможностей
    getFeatures() {
        return this.detect().features;
    }

    // Получение версии среды
    getVersion() {
        const detection = this.detect();
        return detection.versions;
    }

    // Получение информации о платформе
    getPlatform() {
        return this.detect().platform;
    }

    // Проверка Node.js версии
    checkNodeVersion() {
        return typeof process !== 'undefined' && 
               process.versions && 
               typeof process.versions.node === 'string';
    }

    // Проверка Electron версии
    checkElectronVersion() {
        return typeof process !== 'undefined' && 
               process.versions && 
               typeof process.versions.electron === 'string';
    }

    // Проверка React Native
    checkReactNative() {
        return typeof navigator !== 'undefined' && 
               navigator.product === 'ReactNative';
    }

    // Проверка Electron
    checkElectron() {
        return typeof process !== 'undefined' && 
               process.versions && 
               process.versions.electron;
    }

    // Получение детальной информации
    getDetailedInfo() {
        const detection = this.detect();
        
        return {
            environment: detection.environment,
            features: detection.features,
            versions: detection.versions,
            platform: detection.platform,
            capabilities: this.getCapabilities(),
            recommendations: this.getRecommendations()
        };
    }

    // Получение возможностей
    getCapabilities() {
        const features = this.getFeatures();
        
        return {
            canReadFiles: features.fileSystem,
            canUseDOM: features.dom,
            canUseStorage: features.localStorage || features.sessionStorage,
            canMakeRequests: features.fetch || features.xhr,
            canUseWorkers: features.webWorkers || features.workerThreads,
            canUseCrypto: features.crypto
        };
    }

    // Получение рекомендаций
    getRecommendations() {
        const env = this.detect().environment;
        const features = this.getFeatures();
        
        const recommendations = [];

        if (env === 'browser' && !features.fetch) {
            recommendations.push('Используйте polyfill для fetch API');
        }

        if (env === 'node' && !features.fileSystem) {
            recommendations.push('Проверьте доступность модуля fs');
        }

        if (!features.localStorage && !features.sessionStorage) {
            recommendations.push('Рассмотрите альтернативы для хранения данных');
        }

        return recommendations;
    }

    // Очистка кэша
    clearCache() {
        this.cache.clear();
        this.detectionResult = null;
    }

    // Получение отчета
    getReport() {
        const detection = this.detect();
        
        return {
            summary: {
                environment: detection.environment,
                timestamp: new Date(detection.timestamp).toISOString(),
                featuresCount: Object.values(detection.features).filter(Boolean).length
            },
            details: detection,
            capabilities: this.getCapabilities(),
            recommendations: this.getRecommendations()
        };
    }
}

// Демонстрация использования
const detector = new EnvironmentDetector();

console.log(' Определение среды выполнения:');
console.log(detector.detect());

console.log('\n Доступные возможности:');
console.log(detector.getFeatures());

console.log('\n Проверка поддержки функций:');
console.log('localStorage:', detector.isSupported('localStorage'));
console.log('fileSystem:', detector.isSupported('fileSystem'));
console.log('fetch:', detector.isSupported('fetch'));

console.log('\n Детальный отчет:');
console.log(detector.getReport());

module.exports = EnvironmentDetector;
```

</details>

---

###  Задача 2: Создание адаптивного модуля для разных сред

 Создайте модуль, который адаптируется под разные среды выполнения:
- Автоматический выбор API для файловой системы
- Универсальные функции для работы с данными
- Fallback для неподдерживаемых функций
- Единый интерфейс для всех сред

```javascript
// Создайте класс AdaptiveModule:
// readFile(path) - читает файл в зависимости от среды
// writeFile(path, data) - записывает файл
// getStorage(key) - получает данные из хранилища
// setStorage(key, value) - сохраняет данные

// Пример использования:
// const adapter = new AdaptiveModule();
// adapter.writeFile('test.txt', 'Hello World');
// const data = adapter.getStorage('userData');
```

<details>
<summary> Решение</summary>

```javascript
const EnvironmentDetector = require('./EnvironmentDetector');

class AdaptiveModule {
    constructor() {
        this.detector = new EnvironmentDetector();
        this.environment = this.detector.detect().environment;
        this.features = this.detector.getFeatures();
        
        // Инициализация API для разных сред
        this.initAPIs();
    }

    // Инициализация API
    initAPIs() {
        this.fs = null;
        this.path = null;
        this.storage = null;
        this.http = null;

        // Node.js API
        if (this.features.fileSystem) {
            try {
                this.fs = require('fs');
                this.path = require('path');
            } catch (error) {
                console.warn('Не удалось загрузить модули fs и path');
            }
        }

        // Браузерное хранилище
        if (this.features.localStorage) {
            this.storage = localStorage;
        } else if (this.features.sessionStorage) {
            this.storage = sessionStorage;
        }

        // HTTP клиент
        if (this.features.fetch) {
            this.http = fetch;
        } else if (typeof XMLHttpRequest !== 'undefined') {
            this.http = this.createXHRAdapter();
        }
    }

    // Чтение файла
    async readFile(filePath) {
        if (this.features.fileSystem && this.fs) {
            // Node.js
            return new Promise((resolve, reject) => {
                this.fs.readFile(filePath, 'utf8', (err, data) => {
                    if (err) reject(err);
                    else resolve(data);
                });
            });
        } else if (this.features.fetch) {
            // Браузер - через fetch
            try {
                const response = await fetch(filePath);
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                return await response.text();
            } catch (error) {
                throw new Error(`Не удалось прочитать файл: ${error.message}`);
            }
        } else {
            throw new Error('Чтение файлов не поддерживается в данной среде');
        }
    }

    // Запись файла
    async writeFile(filePath, data) {
        if (this.features.fileSystem && this.fs) {
            // Node.js
            return new Promise((resolve, reject) => {
                this.fs.writeFile(filePath, data, 'utf8', (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
        } else {
            // Браузер - через Blob и download
            this.downloadFile(data, filePath);
        }
    }

    // Скачивание файла в браузере
    downloadFile(data, filename) {
        if (typeof window === 'undefined') {
            throw new Error('Скачивание файлов доступно только в браузере');
        }

        const blob = new Blob([data], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        URL.revokeObjectURL(url);
    }

    // Получение данных из хранилища
    getStorage(key) {
        if (this.storage) {
            try {
                const data = this.storage.getItem(key);
                return data ? JSON.parse(data) : null;
            } catch (error) {
                console.warn('Ошибка чтения из хранилища:', error.message);
                return null;
            }
        } else {
            console.warn('Локальное хранилище не поддерживается');
            return null;
        }
    }

    // Сохранение данных в хранилище
    setStorage(key, value) {
        if (this.storage) {
            try {
                this.storage.setItem(key, JSON.stringify(value));
                return true;
            } catch (error) {
                console.warn('Ошибка записи в хранилище:', error.message);
                return false;
            }
        } else {
            console.warn('Локальное хранилище не поддерживается');
            return false;
        }
    }

    // Удаление данных из хранилища
    removeStorage(key) {
        if (this.storage) {
            try {
                this.storage.removeItem(key);
                return true;
            } catch (error) {
                console.warn('Ошибка удаления из хранилища:', error.message);
                return false;
            }
        }
        return false;
    }

    // HTTP запрос
    async httpRequest(url, options = {}) {
        if (this.http) {
            if (this.features.fetch) {
                // Используем fetch
                const response = await fetch(url, {
                    method: options.method || 'GET',
                    headers: options.headers || {},
                    body: options.body || undefined
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                
                return {
                    status: response.status,
                    headers: Object.fromEntries(response.headers.entries()),
                    data: await response.text()
                };
            } else {
                // Используем XMLHttpRequest
                return this.xhrRequest(url, options);
            }
        } else {
            throw new Error('HTTP запросы не поддерживаются в данной среде');
        }
    }

    // XMLHttpRequest адаптер
    xhrRequest(url, options) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            
            xhr.open(options.method || 'GET', url);
            
            // Установка заголовков
            if (options.headers) {
                Object.entries(options.headers).forEach(([key, value]) => {
                    xhr.setRequestHeader(key, value);
                });
            }
            
            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve({
                        status: xhr.status,
                        headers: this.parseHeaders(xhr.getAllResponseHeaders()),
                        data: xhr.responseText
                    });
                } else {
                    reject(new Error(`HTTP ${xhr.status}: ${xhr.statusText}`));
                }
            };
            
            xhr.onerror = () => {
                reject(new Error('Ошибка сети'));
            };
            
            xhr.send(options.body || null);
        });
    }

    // Парсинг заголовков
    parseHeaders(headerString) {
        const headers = {};
        headerString.split('\r\n').forEach(line => {
            const parts = line.split(': ');
            if (parts.length === 2) {
                headers[parts[0]] = parts[1];
            }
        });
        return headers;
    }

    // Создание XHR адаптера
    createXHRAdapter() {
        return (url, options) => this.xhrRequest(url, options);
    }

    // Получение информации о среде
    getEnvironmentInfo() {
        return {
            environment: this.environment,
            features: this.features,
            capabilities: {
                canReadFiles: this.features.fileSystem,
                canWriteFiles: this.features.fileSystem,
                canUseStorage: !!this.storage,
                canMakeRequests: !!this.http,
                canDownloadFiles: this.environment === 'browser'
            }
        };
    }

    // Проверка поддержки функции
    isSupported(feature) {
        const capabilities = {
            'readFile': this.features.fileSystem || this.features.fetch,
            'writeFile': this.features.fileSystem || this.environment === 'browser',
            'storage': !!this.storage,
            'http': !!this.http
        };
        
        return capabilities[feature] || false;
    }

    // Универсальная функция для работы с данными
    async processData(data, processor) {
        try {
            return await processor(data);
        } catch (error) {
            console.error('Ошибка обработки данных:', error.message);
            throw error;
        }
    }

    // Сохранение конфигурации
    saveConfig(config) {
        return this.setStorage('app_config', config);
    }

    // Загрузка конфигурации
    loadConfig() {
        return this.getStorage('app_config') || {};
    }

    // Получение отчета о возможностях
    getCapabilitiesReport() {
        const info = this.getEnvironmentInfo();
        
        return {
            environment: info.environment,
            supportedFeatures: Object.entries(info.capabilities)
                .filter(([, supported]) => supported)
                .map(([feature]) => feature),
            unsupportedFeatures: Object.entries(info.capabilities)
                .filter(([, supported]) => !supported)
                .map(([feature]) => feature),
            recommendations: this.getRecommendations()
        };
    }

    // Получение рекомендаций
    getRecommendations() {
        const recommendations = [];
        
        if (!this.features.fileSystem && this.environment === 'browser') {
            recommendations.push('Для работы с файлами используйте File API или drag&drop');
        }
        
        if (!this.storage) {
            recommendations.push('Рассмотрите использование IndexedDB для хранения данных');
        }
        
        if (!this.http) {
            recommendations.push('Добавьте polyfill для fetch API');
        }
        
        return recommendations;
    }
}

// Демонстрация использования
const adapter = new AdaptiveModule();

console.log(' Адаптивный модуль инициализирован');
console.log(' Информация о среде:', adapter.getEnvironmentInfo());

// Тестирование возможностей
console.log('\n Поддерживаемые функции:');
console.log('readFile:', adapter.isSupported('readFile'));
console.log('writeFile:', adapter.isSupported('writeFile'));
console.log('storage:', adapter.isSupported('storage'));
console.log('http:', adapter.isSupported('http'));

// Работа с хранилищем
adapter.setStorage('test_key', { message: 'Hello World', timestamp: Date.now() });
const storedData = adapter.getStorage('test_key');
console.log('\n Данные из хранилища:', storedData);

// Отчет о возможностях
console.log('\n Отчет о возможностях:');
console.log(adapter.getCapabilitiesReport());

module.exports = AdaptiveModule;
```

</details>

---

 Эти задачи помогут понять принципы определения среды выполнения в Node.js и научиться создавать адаптивные модули для разных окружений.

---
