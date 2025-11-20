#  Потоки (Streams) в Node.js

**Stream (поток)** в Node.js — это интерфейс для обработки данных по частям, без необходимости загружать их полностью в память. Потоки предоставляют эффективный способ работы с большими объемами данных, например, при чтении файлов, обработке HTTP-запросов/ответов, передаче данных по сети или чтении/записи потокового мультимедиа.

Node.js реализует потоковый интерфейс через модуль `stream`, который поддерживает обработку данных "по частям", сохраняя ресурсы и ускоряя выполнение.

---

##  Типы потоков в Node.js

###  1. Readable (читаемые потоки)
**Используются для чтения данных.** Например, чтение из файла или получения данных из HTTP-запроса.

####  Пример:
```javascript
const fs = require('fs');

const readableStream = fs.createReadStream('file.txt');

readableStream.on('data', chunk => {
    console.log(`Получен кусок данных: ${chunk}`);
});

readableStream.on('end', () => {
    console.log('Чтение завершено');
});

readableStream.on('error', err => {
    console.error('Ошибка чтения:', err);
});
```

###  2. Writable (записываемые потоки)
**Используются для записи данных.** Например, запись в файл или отправка данных в HTTP-ответ.

####  Пример:
```javascript
const fs = require('fs');

const writableStream = fs.createWriteStream('output.txt');

writableStream.write('Hello, Stream!');
writableStream.write('\nВторая строка');
writableStream.end(); // Завершаем запись

writableStream.on('finish', () => {
    console.log('Запись завершена');
});

writableStream.on('error', err => {
    console.error('Ошибка записи:', err);
});
```

###  3. Duplex (двунаправленные потоки)
**Могут быть одновременно читаемыми и записываемыми.** Пример — работа с сетевыми соединениями.

####  Пример:
```javascript
const { Duplex } = require('stream');

const duplexStream = new Duplex({
    write(chunk, encoding, callback) {
        console.log(`Запись: ${chunk}`);
        callback();
    },
    read(size) {
        this.push('Данные для чтения');
        this.push(null); // Конец потока
    },
});

duplexStream.on('data', chunk => console.log(`Чтение: ${chunk}`));
duplexStream.write('Привет, Duplex!');
```

###  4. Transform (трансформирующие потоки)
**Это частный случай Duplex-потока, который преобразует данные в процессе передачи.** Например, сжатие или шифрование.

####  Пример:
```javascript
const { Transform } = require('stream');

const transformStream = new Transform({
    transform(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase());
        callback();
    },
});

process.stdin.pipe(transformStream).pipe(process.stdout);
```

---

##  Когда стоит использовать Stream в Node.js?

###  1. Работа с большими файлами
**Если файл слишком велик, чтобы загрузить его целиком в память.**

####  Пример:
```javascript
const fs = require('fs');

const readable = fs.createReadStream('bigfile.txt');
const writable = fs.createWriteStream('output.txt');

readable.pipe(writable);

readable.on('end', () => {
    console.log('Файл успешно скопирован');
});
```

###  2. Обработка данных в реальном времени
**Потоки идеально подходят для обработки потоковых данных, таких как видеотрансляции, аудио или данные с сенсоров.**

####  Пример:
```javascript
const { Transform } = require('stream');

const dataProcessor = new Transform({
    transform(chunk, encoding, callback) {
        // Обработка данных в реальном времени
        const processed = processData(chunk);
        this.push(processed);
        callback();
    }
});

sensorDataStream.pipe(dataProcessor).pipe(outputStream);
```

###  3. Работа с HTTP-запросами/ответами
**HTTP-запросы и ответы в Node.js реализованы как читаемые и записываемые потоки.**

####  Пример:
```javascript
const http = require('http');

http.createServer((req, res) => {
    // Эхо-сервер с обработкой потоков
    req.pipe(res);
}).listen(3000);

// Или с обработкой данных
http.createServer((req, res) => {
    let data = '';
    
    req.on('data', chunk => {
        data += chunk;
    });
    
    req.on('end', () => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Получено: ${data}`);
    });
}).listen(3000);
```

###  4. Сжатие данных
**Потоки трансформации, такие как zlib, позволяют сжимать данные "на лету".**

####  Пример:
```javascript
const zlib = require('zlib');
const fs = require('fs');

const gzip = zlib.createGzip();
const readable = fs.createReadStream('file.txt');
const writable = fs.createWriteStream('file.txt.gz');

readable.pipe(gzip).pipe(writable);

writable.on('finish', () => {
    console.log('Файл сжат успешно');
});
```

###  5. Экономия ресурсов
**Потоки позволяют обрабатывать данные "по частям", снижая потребление памяти.**

---

##  Преимущества использования Stream

###  Эффективное использование памяти
Потоки работают с данными небольшими частями, что снижает нагрузку на оперативную память.

###  Быстрота обработки
Потоки начинают обработку данных сразу, как только они становятся доступны, вместо ожидания загрузки полного объема.

###  Поддержка пайплайнов (pipe)
Простая передача данных между потоками через метод `.pipe()`, что упрощает создание конвейеров обработки данных.

####  Пример пайплайна:
```javascript
const fs = require('fs');
const zlib = require('zlib');

fs.createReadStream('input.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('output.txt.gz'));
```

###  Гибкость
Возможность комбинировать разные типы потоков для создания сложных процессов.

---

##  Недостатки

###  Сложность отладки
Ошибки в асинхронной обработке потоков могут быть сложными для диагностики.

###  Кривая обучения
Понимание работы с потоками, их событиями и методами требует времени.

###  Необходимость продуманной обработки ошибок
Потоки требуют особого подхода к обработке ошибок, иначе приложение может «сломаться» при возникновении исключений.

---

##  События потоков

###  Readable потоки
- `data` — получение данных
- `end` — завершение чтения
- `error` — ошибка чтения
- `close` — закрытие потока

###  Writable потоки
- `drain` — готовность к записи
- `finish` — завершение записи
- `error` — ошибка записи
- `close` — закрытие потока

####  Пример обработки событий:
```javascript
const fs = require('fs');

const readable = fs.createReadStream('input.txt');
const writable = fs.createWriteStream('output.txt');

readable.on('data', chunk => {
    console.log(`Прочитано: ${chunk.length} байт`);
    
    // Проверяем, можно ли записать
    if (!writable.write(chunk)) {
        // Если буфер полон, приостанавливаем чтение
        readable.pause();
    }
});

writable.on('drain', () => {
    // Буфер освободился, возобновляем чтение
    readable.resume();
});

readable.on('end', () => {
    writable.end();
});

readable.on('error', err => {
    console.error('Ошибка чтения:', err);
});

writable.on('error', err => {
    console.error('Ошибка записи:', err);
});
```

---

##  Итог

**Потоки** — это мощный инструмент в Node.js для обработки больших объемов данных и работы с потоковыми данными. Они идеально подходят для задач, где важно экономить память, обрабатывать данные в реальном времени или строить высокопроизводительные приложения с минимальными задержками.

**Ключевые принципы:**
- Используйте потоки для больших файлов
- Обрабатывайте данные в реальном времени
- Экономьте память при работе с данными
- Правильно обрабатывайте ошибки
- Используйте пайплайны для сложных операций

##  ЗАДАЧИ

Вот набор задач, чтобы лучше понять `потоки (Streams) в Node.js`:

---

###  Задача 1: Создание простого файлового копировщика

 Создайте программу, которая копирует файл с помощью потоков. Программа должна:
- Читать исходный файл по частям
- Записывать данные в новый файл
- Показывать прогресс копирования
- Обрабатывать ошибки

```javascript
// Создайте функцию copyFileWithProgress, которая:
// - Принимает пути к исходному и целевому файлам
// - Использует потоки для копирования
// - Показывает прогресс в процентах
// - Обрабатывает ошибки чтения и записи

// Пример использования:
// copyFileWithProgress('input.txt', 'output.txt');
```

<details>
<summary> Решение</summary>

```javascript
const fs = require('fs');
const path = require('path');

function copyFileWithProgress(sourcePath, destPath) {
    return new Promise((resolve, reject) => {
        // Получаем размер исходного файла
        const stats = fs.statSync(sourcePath);
        const fileSize = stats.size;
        let copiedBytes = 0;

        console.log(`Начинаем копирование файла размером ${fileSize} байт`);

        const readable = fs.createReadStream(sourcePath);
        const writable = fs.createWriteStream(destPath);

        readable.on('data', chunk => {
            copiedBytes += chunk.length;
            const progress = ((copiedBytes / fileSize) * 100).toFixed(2);
            process.stdout.write(`\rПрогресс: ${progress}% (${copiedBytes}/${fileSize} байт)`);
        });

        readable.on('end', () => {
            console.log('\n Копирование завершено успешно');
            resolve();
        });

        readable.on('error', err => {
            console.error('\n Ошибка чтения:', err.message);
            reject(err);
        });

        writable.on('error', err => {
            console.error('\n Ошибка записи:', err.message);
            reject(err);
        });

        // Соединяем потоки
        readable.pipe(writable);
    });
}

// Использование:
copyFileWithProgress('input.txt', 'output.txt')
    .then(() => console.log('Операция завершена'))
    .catch(err => console.error('Ошибка:', err.message));
```

</details>

---

###  Задача 2: Создание трансформирующего потока для обработки текста

 Создайте трансформирующий поток, который:
- Читает текстовый файл
- Преобразует все слова в верхний регистр
- Добавляет номера строк
- Записывает результат в новый файл

```javascript
// Создайте класс TextProcessor, который:
// - Наследуется от Transform
// - Добавляет номера строк к тексту
// - Преобразует текст в верхний регистр
// - Обрабатывает данные построчно

// Пример использования:
// const processor = new TextProcessor();
// fs.createReadStream('input.txt')
//   .pipe(processor)
//   .pipe(fs.createWriteStream('output.txt'));
```

<details>
<summary> Решение</summary>

```javascript
const { Transform } = require('stream');
const fs = require('fs');

class TextProcessor extends Transform {
    constructor(options = {}) {
        super(options);
        this.lineNumber = 1;
    }

    _transform(chunk, encoding, callback) {
        // Разбиваем данные на строки
        const data = chunk.toString();
        const lines = data.split('\n');
        
        let processedData = '';
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            
            if (line.trim() !== '') {
                // Добавляем номер строки и преобразуем в верхний регистр
                processedData += `${this.lineNumber}: ${line.toUpperCase()}\n`;
                this.lineNumber++;
            } else {
                processedData += '\n';
            }
        }
        
        this.push(processedData);
        callback();
    }

    _flush(callback) {
        // Вызывается при завершении потока
        console.log(`Обработано строк: ${this.lineNumber - 1}`);
        callback();
    }
}

// Использование:
const processor = new TextProcessor();

fs.createReadStream('input.txt')
  .pipe(processor)
  .pipe(fs.createWriteStream('output.txt'));

processor.on('finish', () => {
    console.log(' Обработка текста завершена');
});

processor.on('error', err => {
    console.error(' Ошибка обработки:', err.message);
});
```

</details>

---

###  Задача 3: Создание HTTP-сервера с потоковой обработкой

 Создайте HTTP-сервер, который:
- Принимает файлы через POST-запрос
- Обрабатывает их потоково (сжимает)
- Возвращает сжатый файл
- Показывает прогресс обработки

```javascript
// Создайте HTTP-сервер, который:
// - Принимает файлы через multipart/form-data
// - Сжимает файлы с помощью gzip
// - Возвращает сжатый файл
// - Показывает размер исходного и сжатого файла

// Пример использования:
// POST /compress
// Content-Type: multipart/form-data
// file: [выбранный файл]
```

<details>
<summary> Решение</summary>

```javascript
const http = require('http');
const zlib = require('zlib');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/compress') {
        let originalSize = 0;
        let compressedSize = 0;
        
        // Создаем временный файл для сжатия
        const tempFile = `temp_${Date.now()}.gz`;
        const gzip = zlib.createGzip();
        const writable = fs.createWriteStream(tempFile);
        
        console.log('Начинаем сжатие файла...');
        
        // Обрабатываем входящие данные
        req.on('data', chunk => {
            originalSize += chunk.length;
            console.log(`Получено: ${originalSize} байт`);
        });
        
        // Сжимаем данные
        req.pipe(gzip).pipe(writable);
        
        writable.on('finish', () => {
            // Получаем размер сжатого файла
            const stats = fs.statSync(tempFile);
            compressedSize = stats.size;
            
            const compressionRatio = ((1 - compressedSize / originalSize) * 100).toFixed(2);
            
            console.log(`Сжатие завершено:`);
            console.log(`Исходный размер: ${originalSize} байт`);
            console.log(`Сжатый размер: ${compressedSize} байт`);
            console.log(`Коэффициент сжатия: ${compressionRatio}%`);
            
            // Отправляем сжатый файл
            res.writeHead(200, {
                'Content-Type': 'application/gzip',
                'Content-Disposition': 'attachment; filename="compressed.gz"',
                'Content-Length': compressedSize
            });
            
            const readable = fs.createReadStream(tempFile);
            readable.pipe(res);
            
            // Удаляем временный файл после отправки
            readable.on('end', () => {
                fs.unlinkSync(tempFile);
                console.log('Временный файл удален');
            });
        });
        
        writable.on('error', err => {
            console.error('Ошибка записи:', err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Ошибка сжатия файла');
        });
        
    } else if (req.method === 'GET' && req.url === '/') {
        // Простая HTML-форма для загрузки файла
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Сжатие файлов</title>
                <meta charset="utf-8">
            </head>
            <body>
                <h1>Сжатие файлов с помощью потоков</h1>
                <form action="/compress" method="post" enctype="multipart/form-data">
                    <input type="file" name="file" required>
                    <button type="submit">Сжать файл</button>
                </form>
            </body>
            </html>
        `);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Страница не найдена');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(` Сервер запущен на http://localhost:${PORT}`);
    console.log('Откройте браузер и загрузите файл для сжатия');
});

server.on('error', err => {
    console.error('Ошибка сервера:', err);
});
```

</details>

---

###  Задача 4: Создание конвейера обработки данных

 Создайте систему обработки логов, которая:
- Читает лог-файл построчно
- Фильтрует только ошибки
- Форматирует их в JSON
- Сжимает результат
- Сохраняет в архив

```javascript
// Создайте конвейер обработки логов:
// 1. LogReader - читает лог-файл построчно
// 2. ErrorFilter - фильтрует только строки с ошибками
// 3. JSONFormatter - преобразует в JSON формат
// 4. GzipCompressor - сжимает данные
// 5. FileWriter - сохраняет результат

// Пример использования:
// const pipeline = new LogProcessor();
// pipeline.processLogs('app.log', 'errors.json.gz');
```

<details>
<summary> Решение</summary>

```javascript
const { Transform, Readable } = require('stream');
const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

// Класс для чтения лог-файла построчно
class LogReader extends Readable {
    constructor(filePath, options = {}) {
        super(options);
        this.filePath = filePath;
        this.buffer = '';
    }

    _read() {
        if (!this.fileStream) {
            this.fileStream = fs.createReadStream(this.filePath);
            
            this.fileStream.on('data', chunk => {
                this.buffer += chunk.toString();
                const lines = this.buffer.split('\n');
                
                // Оставляем последнюю неполную строку в буфере
                this.buffer = lines.pop() || '';
                
                // Отправляем полные строки
                lines.forEach(line => {
                    if (line.trim()) {
                        this.push(line);
                    }
                });
            });
            
            this.fileStream.on('end', () => {
                // Отправляем последнюю строку, если она есть
                if (this.buffer.trim()) {
                    this.push(this.buffer);
                }
                this.push(null); // Конец потока
            });
            
            this.fileStream.on('error', err => {
                this.destroy(err);
            });
        }
    }
}

// Фильтр для ошибок
class ErrorFilter extends Transform {
    constructor(options = {}) {
        super(options);
        this.errorCount = 0;
    }

    _transform(chunk, encoding, callback) {
        const line = chunk.toString();
        
        // Ищем строки с ошибками (содержат ERROR, FATAL, Exception)
        if (line.match(/(ERROR|FATAL|Exception|Error)/i)) {
            this.errorCount++;
            this.push(line);
        }
        
        callback();
    }

    _flush(callback) {
        console.log(`Найдено ошибок: ${this.errorCount}`);
        callback();
    }
}

// Форматировщик в JSON
class JSONFormatter extends Transform {
    constructor(options = {}) {
        super(options);
        this.lineNumber = 1;
    }

    _transform(chunk, encoding, callback) {
        const line = chunk.toString();
        
        const logEntry = {
            lineNumber: this.lineNumber++,
            timestamp: this.extractTimestamp(line),
            level: this.extractLevel(line),
            message: line.trim(),
            processedAt: new Date().toISOString()
        };
        
        this.push(JSON.stringify(logEntry) + '\n');
        callback();
    }

    extractTimestamp(line) {
        const match = line.match(/(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})/);
        return match ? match[1] : new Date().toISOString();
    }

    extractLevel(line) {
        if (line.includes('FATAL')) return 'FATAL';
        if (line.includes('ERROR')) return 'ERROR';
        if (line.includes('Exception')) return 'EXCEPTION';
        return 'UNKNOWN';
    }
}

// Основной класс для обработки логов
class LogProcessor {
    constructor() {
        this.processedCount = 0;
    }

    async processLogs(inputFile, outputFile) {
        return new Promise((resolve, reject) => {
            console.log(` Начинаем обработку лог-файла: ${inputFile}`);
            
            const reader = new LogReader(inputFile);
            const errorFilter = new ErrorFilter();
            const jsonFormatter = new JSONFormatter();
            const gzipCompressor = zlib.createGzip();
            const writer = fs.createWriteStream(outputFile);
            
            // Подсчитываем обработанные записи
            jsonFormatter.on('data', () => {
                this.processedCount++;
                if (this.processedCount % 10 === 0) {
                    process.stdout.write(`\rОбработано записей: ${this.processedCount}`);
                }
            });
            
            // Создаем конвейер обработки
            reader
                .pipe(errorFilter)
                .pipe(jsonFormatter)
                .pipe(gzipCompressor)
                .pipe(writer);
            
            writer.on('finish', () => {
                console.log(`\n Обработка завершена!`);
                console.log(` Результат сохранен в: ${outputFile}`);
                console.log(` Обработано записей: ${this.processedCount}`);
                
                // Показываем размер файлов
                const inputStats = fs.statSync(inputFile);
                const outputStats = fs.statSync(outputFile);
                const compressionRatio = ((1 - outputStats.size / inputStats.size) * 100).toFixed(2);
                
                console.log(` Исходный размер: ${inputStats.size} байт`);
                console.log(` Сжатый размер: ${outputStats.size} байт`);
                console.log(` Коэффициент сжатия: ${compressionRatio}%`);
                
                resolve();
            });
            
            writer.on('error', reject);
            reader.on('error', reject);
        });
    }
}

// Использование:
async function main() {
    const processor = new LogProcessor();
    
    try {
        await processor.processLogs('app.log', 'errors.json.gz');
        console.log(' Обработка логов завершена успешно!');
    } catch (error) {
        console.error(' Ошибка обработки:', error.message);
    }
}

// Запуск, если файл выполняется напрямую
if (require.main === module) {
    main();
}

module.exports = { LogProcessor, LogReader, ErrorFilter, JSONFormatter };
```

</details>

---

###  Задача 5: Создание системы мониторинга потоков

 Создайте систему мониторинга, которая:
- Отслеживает производительность потоков
- Измеряет скорость передачи данных
- Логирует статистику
- Предотвращает переполнение буферов

```javascript
// Создайте класс StreamMonitor, который:
// - Обертывает существующие потоки
// - Измеряет скорость передачи данных
// - Отслеживает использование памяти
// - Предотвращает переполнение буферов
// - Генерирует отчеты о производительности

// Пример использования:
// const monitor = new StreamMonitor();
// const monitoredStream = monitor.wrap(originalStream);
```

<details>
<summary> Решение</summary>

```javascript
const { Transform, PassThrough } = require('stream');
const fs = require('fs');

class StreamMonitor extends Transform {
    constructor(options = {}) {
        super(options);
        this.stats = {
            bytesProcessed: 0,
            startTime: Date.now(),
            chunksProcessed: 0,
            errors: 0,
            lastChunkTime: Date.now(),
            averageSpeed: 0,
            peakSpeed: 0,
            memoryUsage: process.memoryUsage()
        };
        
        this.reportInterval = options.reportInterval || 5000; // 5 секунд
        this.maxBufferSize = options.maxBufferSize || 1024 * 1024; // 1MB
        this.bufferSize = 0;
        
        this.startMonitoring();
    }

    _transform(chunk, encoding, callback) {
        const now = Date.now();
        const chunkSize = chunk.length;
        
        // Обновляем статистику
        this.stats.bytesProcessed += chunkSize;
        this.stats.chunksProcessed++;
        this.bufferSize += chunkSize;
        
        // Проверяем переполнение буфера
        if (this.bufferSize > this.maxBufferSize) {
            console.warn('  Предупреждение: буфер близок к переполнению');
            // Приостанавливаем чтение, если это readable поток
            if (this.readable && this.pause) {
                this.pause();
                setTimeout(() => {
                    this.resume();
                    this.bufferSize = 0;
                }, 100);
            }
        }
        
        // Вычисляем скорость
        const timeDiff = now - this.stats.lastChunkTime;
        if (timeDiff > 0) {
            const currentSpeed = (chunkSize / timeDiff) * 1000; // байт/сек
            this.stats.averageSpeed = (this.stats.averageSpeed + currentSpeed) / 2;
            this.stats.peakSpeed = Math.max(this.stats.peakSpeed, currentSpeed);
        }
        
        this.stats.lastChunkTime = now;
        this.stats.memoryUsage = process.memoryUsage();
        
        // Передаем данные дальше
        this.push(chunk);
        callback();
    }

    _flush(callback) {
        this.generateFinalReport();
        callback();
    }

    startMonitoring() {
        this.monitorInterval = setInterval(() => {
            this.generateProgressReport();
        }, this.reportInterval);
    }

    generateProgressReport() {
        const elapsed = Date.now() - this.stats.startTime;
        const speed = this.stats.bytesProcessed / (elapsed / 1000);
        const memoryMB = this.stats.memoryUsage.heapUsed / 1024 / 1024;
        
        console.log(`
 Отчет о производительности потоков:
   ⏱  Время работы: ${(elapsed / 1000).toFixed(2)}с
    Обработано байт: ${this.formatBytes(this.stats.bytesProcessed)}
    Обработано чанков: ${this.stats.chunksProcessed}
    Текущая скорость: ${this.formatBytes(speed)}/с
    Средняя скорость: ${this.formatBytes(this.stats.averageSpeed)}/с
    Пиковая скорость: ${this.formatBytes(this.stats.peakSpeed)}/с
    Использование памяти: ${memoryMB.toFixed(2)}MB
    Размер буфера: ${this.formatBytes(this.bufferSize)}
        `);
    }

    generateFinalReport() {
        const elapsed = Date.now() - this.stats.startTime;
        const avgSpeed = this.stats.bytesProcessed / (elapsed / 1000);
        const memoryMB = this.stats.memoryUsage.heapUsed / 1024 / 1024;
        
        console.log(`
 ФИНАЛЬНЫЙ ОТЧЕТ:
   ⏱  Общее время: ${(elapsed / 1000).toFixed(2)}с
    Всего байт: ${this.formatBytes(this.stats.bytesProcessed)}
    Всего чанков: ${this.stats.chunksProcessed}
    Средняя скорость: ${this.formatBytes(avgSpeed)}/с
    Пиковая скорость: ${this.formatBytes(this.stats.peakSpeed)}/с
    Финальная память: ${memoryMB.toFixed(2)}MB
    Ошибок: ${this.stats.errors}
        `);
        
        // Сохраняем отчет в файл
        this.saveReportToFile();
    }

    saveReportToFile() {
        const report = {
            timestamp: new Date().toISOString(),
            duration: Date.now() - this.stats.startTime,
            bytesProcessed: this.stats.bytesProcessed,
            chunksProcessed: this.stats.chunksProcessed,
            averageSpeed: this.stats.averageSpeed,
            peakSpeed: this.stats.peakSpeed,
            memoryUsage: this.stats.memoryUsage,
            errors: this.stats.errors
        };
        
        const reportFile = `stream-report-${Date.now()}.json`;
        fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));
        console.log(` Отчет сохранен в файл: ${reportFile}`);
    }

    formatBytes(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Метод для обертывания существующих потоков
    static wrap(stream, options = {}) {
        const monitor = new StreamMonitor(options);
        
        // Перехватываем события ошибок
        stream.on('error', (err) => {
            monitor.stats.errors++;
            monitor.emit('error', err);
        });
        
        // Создаем пайплайн с мониторингом
        return stream.pipe(monitor);
    }

    // Остановка мониторинга
    stop() {
        if (this.monitorInterval) {
            clearInterval(this.monitorInterval);
        }
    }
}

// Пример использования
function demonstrateMonitoring() {
    console.log(' Демонстрация мониторинга потоков');
    
    // Создаем тестовый файл
    const testData = 'A'.repeat(1000000); // 1MB данных
    fs.writeFileSync('test-data.txt', testData);
    
    // Создаем потоки с мониторингом
    const reader = fs.createReadStream('test-data.txt');
    const monitor = new StreamMonitor({ 
        reportInterval: 2000,
        maxBufferSize: 500 * 1024 // 500KB
    });
    const writer = fs.createWriteStream('output-monitored.txt');
    
    // Обертываем поток мониторингом
    const monitoredReader = StreamMonitor.wrap(reader, {
        reportInterval: 1000
    });
    
    // Создаем пайплайн
    monitoredReader.pipe(monitor).pipe(writer);
    
    writer.on('finish', () => {
        console.log(' Обработка завершена');
        monitor.stop();
        
        // Удаляем тестовые файлы
        fs.unlinkSync('test-data.txt');
        fs.unlinkSync('output-monitored.txt');
    });
}

// Запуск демонстрации
if (require.main === module) {
    demonstrateMonitoring();
}

module.exports = { StreamMonitor };
```

</details>

---

 Эти задачи помогут понять принципы работы с потоками в Node.js и научиться создавать эффективные системы обработки данных.

---
