#  Управление процессами в Node.js

**В Node.js управление процессами и создание дочерних процессов** реализуются через модуль `child_process`, который предоставляет методы для создания и взаимодействия с дочерними процессами. Эти процессы могут быть использованы для выполнения внешних команд, работы с системными утилитами или запуска других скриптов.

---

##  Основные методы для управления процессами

###  1. Метод `spawn`
Используется для запуска команды в новом процессе. Возвращает поток данных, что делает его удобным для работы с большими объемами данных.

```javascript
const { spawn } = require('child_process');

// Запуск команды `ls` для отображения содержимого текущего каталога
const ls = spawn('ls', ['-lh']);

ls.stdout.on('data', (data) => {
    console.log(`Вывод: ${data}`);
});

ls.stderr.on('data', (data) => {
    console.error(`Ошибка: ${data}`);
});

ls.on('close', (code) => {
    console.log(`Процесс завершился с кодом: ${code}`);
});
```

**Когда использовать:**
- Для выполнения команды, которая выводит много данных
- Когда необходимо управлять потоками ввода/вывода

###  2. Метод `exec`
Используется для выполнения команды в оболочке. Возвращает буфер со всем результатом выполнения команды.

```javascript
const { exec } = require('child_process');

exec('ls -lh', (error, stdout, stderr) => {
    if (error) {
        console.error(`Ошибка: ${error.message}`);
        return;
    }
    console.log(`Вывод: ${stdout}`);
});
```

**Когда использовать:**
- Для выполнения команды, где важен результат
- Когда требуется простой интерфейс

###  3. Метод `execFile`
Позволяет выполнять файл напрямую, минуя оболочку. Повышает безопасность.

```javascript
const { execFile } = require('child_process');

execFile('node', ['-v'], (error, stdout, stderr) => {
    if (error) {
        console.error(`Ошибка: ${error.message}`);
        return;
    }
    console.log(`Вывод: ${stdout}`);
});
```

**Когда использовать:**
- Когда нужно выполнить файл (скрипт, бинарный файл)
- Когда ввод команды должен быть максимально защищён

###  4. Метод `fork`
Специализированный метод для создания дочернего процесса, который выполняет Node.js скрипт.

```javascript
const { fork } = require('child_process');

// Родительский процесс
const child = fork('child.js');
child.send({ greeting: 'Привет!' });
child.on('message', (message) => {
    console.log('Ответ:', message);
});
```

**Когда использовать:**
- Для выполнения задач в отдельном Node.js процессе
- Для обмена сообщениями между процессами

---

##  Управление процессами

###  Завершение процесса
```javascript
// Завершение текущего процесса
process.exit(code);

// Завершение дочернего процесса
child.kill([signal]);
```

###  Потоки ввода/вывода
Дочерние процессы имеют три потока:
- **`child.stdin`** — стандартный ввод
- **`child.stdout`** — стандартный вывод  
- **`child.stderr`** — поток ошибок

```javascript
const { spawn } = require('child_process');
const child = spawn('node');

// Отправка данных в stdin
child.stdin.write('console.log("Привет!");\n');
child.stdin.end();

// Чтение данных из stdout
child.stdout.on('data', (data) => {
    console.log(`Вывод: ${data}`);
});
```

---

##  Лучшие практики

###  Контроль ресурсов
- **Не запускайте слишком много процессов** одновременно
- **Обрабатывайте ошибки** — добавляйте обработчики `error`, `exit`, `close`
- **Используйте подходящие методы** — `exec` для простых задач, `spawn` для потоков, `fork` для Node.js скриптов
- **Ограничивайте доступ** — минимизируйте риски при работе с внешними командами

###  Обработка ошибок
```javascript
const { spawn } = require('child_process');

const child = spawn('some-command');

child.on('error', (error) => {
    console.error('Ошибка запуска процесса:', error);
});

child.on('exit', (code, signal) => {
    console.log(`Процесс завершился с кодом ${code} и сигналом ${signal}`);
});
```

---

##  Дополнительные примеры

###  Выполнение системных команд
```javascript
const { exec } = require('child_process');

// Получение информации о системе
exec('uname -a', (error, stdout, stderr) => {
    if (error) {
        console.error('Ошибка:', error);
        return;
    }
    console.log('Информация о системе:', stdout);
});
```

###  Работа с файлами
```javascript
const { spawn } = require('child_process');
const fs = require('fs');

// Создание архива
const tar = spawn('tar', ['-czf', 'archive.tar.gz', 'folder/']);

tar.on('close', (code) => {
    if (code === 0) {
        console.log('Архив создан успешно');
    } else {
        console.error('Ошибка создания архива');
    }
});
```

###  Обмен сообщениями между процессами
```javascript
// Родительский процесс
const { fork } = require('child_process');
const child = fork('./worker.js');

child.send({ task: 'calculate', data: [1, 2, 3, 4, 5] });

child.on('message', (result) => {
    console.log('Результат:', result);
});

// Дочерний процесс (worker.js)
process.on('message', (message) => {
    if (message.task === 'calculate') {
        const sum = message.data.reduce((a, b) => a + b, 0);
        process.send({ result: sum });
    }
});
```

---

##  Итог

**Управление процессами в Node.js** предоставляет гибкий и мощный способ взаимодействия с операционной системой и позволяет масштабировать приложения за счёт использования многопоточности.

**Ключевые принципы:**
- Выбирайте правильный метод для задачи
- Обрабатывайте ошибки и события
- Контролируйте использование ресурсов
- Соблюдайте принципы безопасности

##  ЗАДАЧИ

Вот набор задач, чтобы лучше понять `управление процессами в Node.js`:

---

###  Задача 1: Создание системы мониторинга процессов

 Создайте класс для мониторинга и управления дочерними процессами:
- Запуск и остановка процессов
- Отслеживание состояния процессов
- Логирование событий
- Автоматический перезапуск при сбоях

```javascript
// Создайте класс ProcessManager:
// startProcess(name, command, args) - запускает процесс
// stopProcess(name) - останавливает процесс
// getProcessStatus(name) - получает статус процесса
// restartProcess(name) - перезапускает процесс

// Пример использования:
// const pm = new ProcessManager();
// pm.startProcess('worker', 'node', ['worker.js']);
// pm.stopProcess('worker');
```

<details>
<summary> Решение</summary>

```javascript
const { spawn } = require('child_process');
const EventEmitter = require('events');

class ProcessManager extends EventEmitter {
    constructor() {
        super();
        this.processes = new Map();
        this.restartAttempts = new Map();
        this.maxRestartAttempts = 3;
    }

    // Запуск процесса
    startProcess(name, command, args = [], options = {}) {
        if (this.processes.has(name)) {
            throw new Error(`Процесс ${name} уже запущен`);
        }

        const processOptions = {
            stdio: 'pipe',
            ...options
        };

        const child = spawn(command, args, processOptions);
        
        const processInfo = {
            name,
            command,
            args,
            process: child,
            startTime: Date.now(),
            restartCount: 0,
            status: 'running'
        };

        this.processes.set(name, processInfo);
        this.restartAttempts.set(name, 0);

        // Обработка событий процесса
        child.on('error', (error) => {
            console.error(` Ошибка процесса ${name}:`, error.message);
            this.emit('processError', { name, error });
            this.handleProcessError(name);
        });

        child.on('exit', (code, signal) => {
            console.log(` Процесс ${name} завершился с кодом ${code}`);
            this.emit('processExit', { name, code, signal });
            this.handleProcessExit(name, code);
        });

        // Логирование вывода
        if (child.stdout) {
            child.stdout.on('data', (data) => {
                console.log(` [${name}] ${data.toString().trim()}`);
                this.emit('processOutput', { name, type: 'stdout', data: data.toString() });
            });
        }

        if (child.stderr) {
            child.stderr.on('data', (data) => {
                console.error(`  [${name}] ${data.toString().trim()}`);
                this.emit('processOutput', { name, type: 'stderr', data: data.toString() });
            });
        }

        console.log(` Процесс ${name} запущен (PID: ${child.pid})`);
        this.emit('processStarted', { name, pid: child.pid });
        
        return child;
    }

    // Остановка процесса
    stopProcess(name, signal = 'SIGTERM') {
        const processInfo = this.processes.get(name);
        
        if (!processInfo) {
            throw new Error(`Процесс ${name} не найден`);
        }

        if (processInfo.status !== 'running') {
            console.log(`  Процесс ${name} уже остановлен`);
            return;
        }

        processInfo.status = 'stopping';
        processInfo.process.kill(signal);
        
        console.log(` Остановка процесса ${name}...`);
        this.emit('processStopping', { name });
    }

    // Принудительная остановка
    forceStopProcess(name) {
        const processInfo = this.processes.get(name);
        
        if (!processInfo) {
            throw new Error(`Процесс ${name} не найден`);
        }

        processInfo.status = 'killed';
        processInfo.process.kill('SIGKILL');
        
        console.log(` Принудительная остановка процесса ${name}`);
        this.emit('processKilled', { name });
    }

    // Получение статуса процесса
    getProcessStatus(name) {
        const processInfo = this.processes.get(name);
        
        if (!processInfo) {
            return { status: 'not_found' };
        }

        const uptime = Date.now() - processInfo.startTime;
        
        return {
            name: processInfo.name,
            status: processInfo.status,
            pid: processInfo.process.pid,
            uptime: Math.floor(uptime / 1000), // в секундах
            restartCount: processInfo.restartCount,
            command: `${processInfo.command} ${processInfo.args.join(' ')}`
        };
    }

    // Перезапуск процесса
    restartProcess(name) {
        const processInfo = this.processes.get(name);
        
        if (!processInfo) {
            throw new Error(`Процесс ${name} не найден`);
        }

        console.log(` Перезапуск процесса ${name}...`);
        
        // Останавливаем текущий процесс
        this.stopProcess(name);
        
        // Ждем завершения и запускаем заново
        setTimeout(() => {
            this.startProcess(
                processInfo.name, 
                processInfo.command, 
                processInfo.args
            );
        }, 1000);
    }

    // Обработка ошибки процесса
    handleProcessError(name) {
        const processInfo = this.processes.get(name);
        if (!processInfo) return;

        processInfo.status = 'error';
        this.attemptRestart(name);
    }

    // Обработка завершения процесса
    handleProcessExit(name, code) {
        const processInfo = this.processes.get(name);
        if (!processInfo) return;

        processInfo.status = 'exited';
        
        if (code !== 0) {
            this.attemptRestart(name);
        } else {
            this.processes.delete(name);
            this.restartAttempts.delete(name);
        }
    }

    // Попытка перезапуска
    attemptRestart(name) {
        const attempts = this.restartAttempts.get(name) || 0;
        
        if (attempts < this.maxRestartAttempts) {
            this.restartAttempts.set(name, attempts + 1);
            console.log(` Попытка перезапуска ${name} (${attempts + 1}/${this.maxRestartAttempts})`);
            
            setTimeout(() => {
                this.restartProcess(name);
            }, 2000 * (attempts + 1)); // Увеличиваем задержку
        } else {
            console.error(` Превышено максимальное количество попыток перезапуска для ${name}`);
            this.processes.delete(name);
            this.restartAttempts.delete(name);
            this.emit('processFailed', { name });
        }
    }

    // Получение списка всех процессов
    getAllProcesses() {
        const processes = [];
        
        for (const [name, processInfo] of this.processes) {
            processes.push(this.getProcessStatus(name));
        }
        
        return processes;
    }

    // Остановка всех процессов
    stopAllProcesses() {
        console.log(' Остановка всех процессов...');
        
        for (const [name] of this.processes) {
            this.stopProcess(name);
        }
    }

    // Получение статистики
    getStats() {
        const processes = this.getAllProcesses();
        const running = processes.filter(p => p.status === 'running').length;
        const stopped = processes.filter(p => p.status === 'stopped').length;
        const errors = processes.filter(p => p.status === 'error').length;
        
        return {
            total: processes.length,
            running,
            stopped,
            errors,
            processes
        };
    }
}

// Демонстрация использования
const pm = new ProcessManager();

// Обработчики событий
pm.on('processStarted', ({ name, pid }) => {
    console.log(` Процесс ${name} запущен с PID ${pid}`);
});

pm.on('processError', ({ name, error }) => {
    console.error(` Ошибка в процессе ${name}:`, error.message);
});

pm.on('processFailed', ({ name }) => {
    console.error(` Процесс ${name} окончательно не удалось запустить`);
});

// Запуск процессов
try {
    pm.startProcess('worker1', 'node', ['-e', 'console.log("Worker 1 работает"); setInterval(() => {}, 1000);']);
    pm.startProcess('worker2', 'node', ['-e', 'console.log("Worker 2 работает"); setTimeout(() => process.exit(1), 5000);']);
} catch (error) {
    console.error('Ошибка запуска:', error.message);
}

// Мониторинг
setInterval(() => {
    console.log('\n Статистика процессов:');
    console.log(pm.getStats());
}, 10000);

// Остановка через 30 секунд
setTimeout(() => {
    console.log('\n Остановка всех процессов...');
    pm.stopAllProcesses();
}, 30000);

module.exports = ProcessManager;
```

</details>

---

###  Задача 2: Создание системы выполнения команд с очередью

 Создайте систему для выполнения команд с очередью:
- Добавление команд в очередь
- Последовательное выполнение команд
- Обработка результатов и ошибок
- Лимиты на количество одновременных процессов

```javascript
// Создайте класс CommandQueue:
// addCommand(command, args, options) - добавляет команду в очередь
// start() - запускает обработку очереди
// stop() - останавливает обработку
// getQueueStatus() - получает статус очереди

// Пример использования:
// const queue = new CommandQueue({ maxConcurrent: 2 });
// queue.addCommand('ls', ['-la']);
// queue.addCommand('node', ['-v']);
// queue.start();
```

<details>
<summary> Решение</summary>

```javascript
const { spawn } = require('child_process');
const EventEmitter = require('events');

class CommandQueue extends EventEmitter {
    constructor(options = {}) {
        super();
        this.queue = [];
        this.running = new Map();
        this.maxConcurrent = options.maxConcurrent || 3;
        this.isProcessing = false;
        this.completed = [];
        this.failed = [];
    }

    // Добавление команды в очередь
    addCommand(command, args = [], options = {}) {
        const commandId = this.generateCommandId();
        
        const commandItem = {
            id: commandId,
            command,
            args,
            options: {
                timeout: 30000, // 30 секунд по умолчанию
                ...options
            },
            status: 'pending',
            createdAt: Date.now(),
            startedAt: null,
            completedAt: null,
            result: null,
            error: null
        };

        this.queue.push(commandItem);
        console.log(` Команда добавлена в очередь: ${command} ${args.join(' ')}`);
        
        this.emit('commandAdded', commandItem);
        
        // Автоматически запускаем обработку если не запущена
        if (!this.isProcessing) {
            this.start();
        }
        
        return commandId;
    }

    // Запуск обработки очереди
    start() {
        if (this.isProcessing) {
            console.log('  Обработка очереди уже запущена');
            return;
        }

        this.isProcessing = true;
        console.log(' Запуск обработки очереди команд');
        this.emit('queueStarted');
        
        this.processQueue();
    }

    // Остановка обработки очереди
    stop() {
        this.isProcessing = false;
        console.log('⏹  Остановка обработки очереди');
        this.emit('queueStopped');
    }

    // Обработка очереди
    async processQueue() {
        while (this.isProcessing && (this.queue.length > 0 || this.running.size > 0)) {
            // Запускаем новые команды если есть свободные слоты
            while (this.running.size < this.maxConcurrent && this.queue.length > 0) {
                const commandItem = this.queue.shift();
                this.executeCommand(commandItem);
            }

            // Ждем завершения хотя бы одной команды
            await this.waitForCompletion();
        }

        if (this.queue.length === 0 && this.running.size === 0) {
            console.log(' Все команды выполнены');
            this.emit('queueCompleted');
        }
    }

    // Выполнение команды
    executeCommand(commandItem) {
        commandItem.status = 'running';
        commandItem.startedAt = Date.now();
        
        console.log(`▶  Выполнение: ${commandItem.command} ${commandItem.args.join(' ')}`);
        
        const child = spawn(commandItem.command, commandItem.args, {
            stdio: 'pipe',
            ...commandItem.options
        });

        this.running.set(commandItem.id, { commandItem, child });

        // Таймаут
        const timeout = setTimeout(() => {
            console.log(`⏰ Таймаут команды ${commandItem.id}`);
            child.kill('SIGKILL');
            this.handleCommandError(commandItem, new Error('Таймаут выполнения команды'));
        }, commandItem.options.timeout);

        // Обработка вывода
        let stdout = '';
        let stderr = '';

        if (child.stdout) {
            child.stdout.on('data', (data) => {
                stdout += data.toString();
                this.emit('commandOutput', {
                    commandId: commandItem.id,
                    type: 'stdout',
                    data: data.toString()
                });
            });
        }

        if (child.stderr) {
            child.stderr.on('data', (data) => {
                stderr += data.toString();
                this.emit('commandOutput', {
                    commandId: commandItem.id,
                    type: 'stderr',
                    data: data.toString()
                });
            });
        }

        // Обработка завершения
        child.on('close', (code, signal) => {
            clearTimeout(timeout);
            this.running.delete(commandItem.id);
            
            if (code === 0) {
                this.handleCommandSuccess(commandItem, stdout, stderr);
            } else {
                this.handleCommandError(commandItem, new Error(`Команда завершилась с кодом ${code}`));
            }
        });

        child.on('error', (error) => {
            clearTimeout(timeout);
            this.running.delete(commandItem.id);
            this.handleCommandError(commandItem, error);
        });
    }

    // Обработка успешного выполнения
    handleCommandSuccess(commandItem, stdout, stderr) {
        commandItem.status = 'completed';
        commandItem.completedAt = Date.now();
        commandItem.result = { stdout, stderr };
        
        const duration = commandItem.completedAt - commandItem.startedAt;
        
        console.log(` Команда выполнена за ${duration}ms: ${commandItem.command}`);
        
        this.completed.push(commandItem);
        this.emit('commandCompleted', commandItem);
    }

    // Обработка ошибки
    handleCommandError(commandItem, error) {
        commandItem.status = 'failed';
        commandItem.completedAt = Date.now();
        commandItem.error = error.message;
        
        const duration = commandItem.completedAt - commandItem.startedAt;
        
        console.error(` Команда завершилась с ошибкой за ${duration}ms: ${commandItem.command} - ${error.message}`);
        
        this.failed.push(commandItem);
        this.emit('commandFailed', { commandItem, error });
    }

    // Ожидание завершения команд
    waitForCompletion() {
        return new Promise((resolve) => {
            if (this.running.size === 0) {
                resolve();
                return;
            }

            const checkInterval = setInterval(() => {
                if (this.running.size === 0) {
                    clearInterval(checkInterval);
                    resolve();
                }
            }, 100);
        });
    }

    // Получение статуса очереди
    getQueueStatus() {
        return {
            isProcessing: this.isProcessing,
            queueLength: this.queue.length,
            runningCount: this.running.size,
            completedCount: this.completed.length,
            failedCount: this.failed.length,
            totalProcessed: this.completed.length + this.failed.length,
            pending: this.queue.map(cmd => ({
                id: cmd.id,
                command: cmd.command,
                args: cmd.args,
                createdAt: cmd.createdAt
            })),
            running: Array.from(this.running.values()).map(({ commandItem }) => ({
                id: commandItem.id,
                command: commandItem.command,
                args: commandItem.args,
                startedAt: commandItem.startedAt
            }))
        };
    }

    // Получение статистики
    getStats() {
        const allCommands = [...this.completed, ...this.failed];
        const totalTime = allCommands.reduce((sum, cmd) => {
            if (cmd.startedAt && cmd.completedAt) {
                return sum + (cmd.completedAt - cmd.startedAt);
            }
            return sum;
        }, 0);

        return {
            total: allCommands.length,
            completed: this.completed.length,
            failed: this.failed.length,
            successRate: allCommands.length > 0 ? (this.completed.length / allCommands.length * 100).toFixed(2) : 0,
            averageTime: allCommands.length > 0 ? Math.round(totalTime / allCommands.length) : 0,
            maxConcurrent: this.maxConcurrent
        };
    }

    // Очистка завершенных команд
    clearCompleted() {
        this.completed = [];
        this.failed = [];
        console.log(' Завершенные команды очищены');
    }

    // Генерация ID команды
    generateCommandId() {
        return `cmd_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
}

// Демонстрация использования
const queue = new CommandQueue({ maxConcurrent: 2 });

// Обработчики событий
queue.on('commandCompleted', (commandItem) => {
    console.log(` Команда ${commandItem.id} выполнена успешно`);
});

queue.on('commandFailed', ({ commandItem, error }) => {
    console.error(` Команда ${commandItem.id} завершилась с ошибкой: ${error.message}`);
});

queue.on('queueCompleted', () => {
    console.log(' Все команды в очереди выполнены');
    console.log(' Статистика:', queue.getStats());
});

// Добавляем команды в очередь
queue.addCommand('node', ['-v']);
queue.addCommand('ls', ['-la']);
queue.addCommand('echo', ['Hello World']);
queue.addCommand('node', ['-e', 'console.log("Тестовая команда")']);
queue.addCommand('nonexistent-command', []); // Эта команда завершится с ошибкой

// Мониторинг статуса
setInterval(() => {
    console.log('\n Статус очереди:');
    console.log(queue.getQueueStatus());
}, 5000);

module.exports = CommandQueue;
```

</details>

---

###  Задача 3: Создание системы обмена сообщениями между процессами

 Создайте систему для обмена сообщениями между родительским и дочерними процессами:
- Создание воркеров для обработки задач
- Отправка задач воркерам
- Получение результатов от воркеров
- Балансировка нагрузки между воркерами

```javascript
// Создайте класс ProcessPool:
// createWorker() - создает нового воркера
// sendTask(task) - отправляет задачу воркеру
// getResults() - получает результаты
// getPoolStatus() - получает статус пула

// Пример использования:
// const pool = new ProcessPool({ maxWorkers: 3 });
// pool.sendTask({ type: 'calculate', data: [1, 2, 3, 4, 5] });
// pool.sendTask({ type: 'process', data: 'Hello World' });
```

<details>
<summary> Решение</summary>

```javascript
const { fork } = require('child_process');
const path = require('path');
const EventEmitter = require('events');

class ProcessPool extends EventEmitter {
    constructor(options = {}) {
        super();
        this.maxWorkers = options.maxWorkers || 3;
        this.workers = new Map();
        this.taskQueue = [];
        this.results = new Map();
        this.taskId = 0;
        this.workerScript = options.workerScript || path.join(__dirname, 'worker.js');
    }

    // Создание воркера
    createWorker() {
        const workerId = this.generateWorkerId();
        
        try {
            const worker = fork(this.workerScript);
            
            const workerInfo = {
                id: workerId,
                process: worker,
                status: 'idle',
                currentTask: null,
                tasksCompleted: 0,
                createdAt: Date.now()
            };

            this.workers.set(workerId, workerInfo);

            // Обработка сообщений от воркера
            worker.on('message', (message) => {
                this.handleWorkerMessage(workerId, message);
            });

            // Обработка завершения воркера
            worker.on('exit', (code, signal) => {
                console.log(` Воркер ${workerId} завершился с кодом ${code}`);
                this.handleWorkerExit(workerId, code, signal);
            });

            // Обработка ошибок воркера
            worker.on('error', (error) => {
                console.error(` Ошибка воркера ${workerId}:`, error.message);
                this.handleWorkerError(workerId, error);
            });

            console.log(` Воркер ${workerId} создан (PID: ${worker.pid})`);
            this.emit('workerCreated', { workerId, pid: worker.pid });
            
            return workerId;
        } catch (error) {
            console.error(` Ошибка создания воркера:`, error.message);
            throw error;
        }
    }

    // Инициализация пула воркеров
    initialize() {
        console.log(` Инициализация пула из ${this.maxWorkers} воркеров`);
        
        for (let i = 0; i < this.maxWorkers; i++) {
            try {
                this.createWorker();
            } catch (error) {
                console.error(` Не удалось создать воркер ${i + 1}:`, error.message);
            }
        }
    }

    // Отправка задачи воркеру
    sendTask(task, priority = 0) {
        const taskId = ++this.taskId;
        const taskItem = {
            id: taskId,
            task,
            priority,
            status: 'pending',
            createdAt: Date.now(),
            assignedWorker: null,
            result: null,
            error: null
        };

        this.taskQueue.push(taskItem);
        
        // Сортируем по приоритету (высший приоритет = меньшее число)
        this.taskQueue.sort((a, b) => a.priority - b.priority);
        
        console.log(` Задача ${taskId} добавлена в очередь`);
        this.emit('taskQueued', taskItem);
        
        // Пытаемся назначить задачу свободному воркеру
        this.assignTasks();
        
        return taskId;
    }

    // Назначение задач воркерам
    assignTasks() {
        const idleWorkers = Array.from(this.workers.values())
            .filter(worker => worker.status === 'idle');
        
        const pendingTasks = this.taskQueue.filter(task => task.status === 'pending');
        
        const assignments = Math.min(idleWorkers.length, pendingTasks.length);
        
        for (let i = 0; i < assignments; i++) {
            const worker = idleWorkers[i];
            const task = pendingTasks[i];
            
            this.assignTaskToWorker(worker, task);
        }
    }

    // Назначение задачи конкретному воркеру
    assignTaskToWorker(worker, task) {
        worker.status = 'busy';
        worker.currentTask = task;
        task.status = 'running';
        task.assignedWorker = worker.id;
        
        console.log(`▶  Задача ${task.id} назначена воркеру ${worker.id}`);
        
        // Отправляем задачу воркеру
        worker.process.send({
            type: 'task',
            taskId: task.id,
            data: task.task
        });
        
        this.emit('taskAssigned', { taskId: task.id, workerId: worker.id });
    }

    // Обработка сообщений от воркера
    handleWorkerMessage(workerId, message) {
        const worker = this.workers.get(workerId);
        if (!worker) return;

        switch (message.type) {
            case 'result':
                this.handleTaskResult(workerId, message);
                break;
            case 'error':
                this.handleTaskError(workerId, message);
                break;
            case 'ready':
                console.log(` Воркер ${workerId} готов к работе`);
                worker.status = 'idle';
                this.assignTasks();
                break;
        }
    }

    // Обработка результата задачи
    handleTaskResult(workerId, message) {
        const worker = this.workers.get(workerId);
        if (!worker || !worker.currentTask) return;

        const task = worker.currentTask;
        task.status = 'completed';
        task.result = message.result;
        task.completedAt = Date.now();
        
        this.results.set(task.id, task);
        
        console.log(` Задача ${task.id} выполнена воркером ${workerId}`);
        
        // Освобождаем воркер
        worker.status = 'idle';
        worker.currentTask = null;
        worker.tasksCompleted++;
        
        this.emit('taskCompleted', { taskId: task.id, workerId, result: message.result });
        
        // Назначаем следующую задачу
        this.assignTasks();
    }

    // Обработка ошибки задачи
    handleTaskError(workerId, message) {
        const worker = this.workers.get(workerId);
        if (!worker || !worker.currentTask) return;

        const task = worker.currentTask;
        task.status = 'failed';
        task.error = message.error;
        task.completedAt = Date.now();
        
        this.results.set(task.id, task);
        
        console.error(` Задача ${task.id} завершилась с ошибкой в воркере ${workerId}: ${message.error}`);
        
        // Освобождаем воркер
        worker.status = 'idle';
        worker.currentTask = null;
        
        this.emit('taskFailed', { taskId: task.id, workerId, error: message.error });
        
        // Назначаем следующую задачу
        this.assignTasks();
    }

    // Обработка завершения воркера
    handleWorkerExit(workerId, code, signal) {
        const worker = this.workers.get(workerId);
        if (!worker) return;

        // Если воркер был занят задачей, помечаем задачу как failed
        if (worker.currentTask) {
            const task = worker.currentTask;
            task.status = 'failed';
            task.error = `Воркер завершился с кодом ${code}`;
            task.completedAt = Date.now();
            this.results.set(task.id, task);
        }

        this.workers.delete(workerId);
        
        // Создаем новый воркер если нужно
        if (this.workers.size < this.maxWorkers) {
            setTimeout(() => {
                try {
                    this.createWorker();
                } catch (error) {
                    console.error(' Не удалось пересоздать воркер:', error.message);
                }
            }, 1000);
        }
    }

    // Обработка ошибки воркера
    handleWorkerError(workerId, error) {
        const worker = this.workers.get(workerId);
        if (!worker) return;

        if (worker.currentTask) {
            const task = worker.currentTask;
            task.status = 'failed';
            task.error = error.message;
            task.completedAt = Date.now();
            this.results.set(task.id, task);
        }

        this.workers.delete(workerId);
    }

    // Получение результата задачи
    getTaskResult(taskId) {
        return this.results.get(taskId);
    }

    // Получение всех результатов
    getAllResults() {
        return Array.from(this.results.values());
    }

    // Получение статуса пула
    getPoolStatus() {
        const workers = Array.from(this.workers.values());
        const idleWorkers = workers.filter(w => w.status === 'idle').length;
        const busyWorkers = workers.filter(w => w.status === 'busy').length;
        
        const tasks = Array.from(this.results.values());
        const completedTasks = tasks.filter(t => t.status === 'completed').length;
        const failedTasks = tasks.filter(t => t.status === 'failed').length;
        const pendingTasks = this.taskQueue.filter(t => t.status === 'pending').length;
        const runningTasks = this.taskQueue.filter(t => t.status === 'running').length;

        return {
            workers: {
                total: workers.length,
                idle: idleWorkers,
                busy: busyWorkers
            },
            tasks: {
                total: tasks.length + pendingTasks + runningTasks,
                completed: completedTasks,
                failed: failedTasks,
                pending: pendingTasks,
                running: runningTasks
            },
            queueLength: this.taskQueue.length
        };
    }

    // Получение статистики
    getStats() {
        const workers = Array.from(this.workers.values());
        const totalTasksCompleted = workers.reduce((sum, w) => sum + w.tasksCompleted, 0);
        
        return {
            workers: workers.length,
            totalTasksCompleted,
            averageTasksPerWorker: workers.length > 0 ? (totalTasksCompleted / workers.length).toFixed(2) : 0,
            uptime: workers.length > 0 ? Math.min(...workers.map(w => Date.now() - w.createdAt)) : 0
        };
    }

    // Остановка пула
    stop() {
        console.log(' Остановка пула воркеров...');
        
        for (const [workerId, worker] of this.workers) {
            worker.process.kill('SIGTERM');
        }
        
        this.workers.clear();
        this.emit('poolStopped');
    }

    // Генерация ID воркера
    generateWorkerId() {
        return `worker_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
}

// Демонстрация использования
const pool = new ProcessPool({ maxWorkers: 2 });

// Обработчики событий
pool.on('taskCompleted', ({ taskId, workerId, result }) => {
    console.log(` Задача ${taskId} выполнена воркером ${workerId}:`, result);
});

pool.on('taskFailed', ({ taskId, workerId, error }) => {
    console.error(` Задача ${taskId} завершилась с ошибкой в воркере ${workerId}:`, error);
});

// Инициализируем пул
pool.initialize();

// Отправляем задачи
setTimeout(() => {
    pool.sendTask({ type: 'calculate', data: [1, 2, 3, 4, 5] }, 1);
    pool.sendTask({ type: 'process', data: 'Hello World' }, 2);
    pool.sendTask({ type: 'calculate', data: [10, 20, 30] }, 1);
    pool.sendTask({ type: 'process', data: 'Another task' }, 3);
}, 1000);

// Мониторинг
setInterval(() => {
    console.log('\n Статус пула:');
    console.log(pool.getPoolStatus());
}, 5000);

// Остановка через 30 секунд
setTimeout(() => {
    pool.stop();
}, 30000);

module.exports = ProcessPool;
```

</details>

---

 Эти задачи помогут понять принципы управления процессами в Node.js и научиться создавать эффективные системы многопроцессной обработки.

---
