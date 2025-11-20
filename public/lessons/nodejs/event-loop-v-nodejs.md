#  Event Loop в Node.js

**Event Loop (событийный цикл)** — это механизм в Node.js, который управляет выполнением асинхронных операций. Это основной компонент архитектуры Node.js, благодаря которому становится возможной однопоточная и асинхронная обработка задач. Event Loop позволяет Node.js одновременно обрабатывать множество операций ввода-вывода (I/O) без блокировки основного потока.

---

##  Как работает Event Loop?

**Событийный цикл работает по принципу очереди:** он обрабатывает задачи, размещенные в различных фазах. Каждая фаза имеет свою очередь задач, которые Event Loop поочередно выполняет. После выполнения текущей задачи Event Loop переходит к следующей фазе или ожидает новых задач.

---

##  Этапы работы Event Loop

Event Loop делится на несколько фаз, каждая из которых отвечает за выполнение определенных типов задач:

###  1. Timers
**Выполняет `setTimeout` и `setInterval`**, если истек их таймер.
```javascript
// Пример: setTimeout(() => console.log('timer'), 0)
```

###  2. I/O callbacks
**Обрабатывает почти все обратные вызовы (callback)** от асинхронных операций ввода-вывода, например, файловой системы или сети, кроме тех, которые отложены через таймеры.

###  3. Idle, prepare
**Внутренние фазы** для подготовки и оптимизации работы Event Loop. Как правило, они используются движком Node.js и редко требуют внимания разработчиков.

###  4. Poll
**Основная фаза**, где выполняется большинство I/O операций.
- Если в этой фазе есть новые задачи, они обрабатываются немедленно
- Если задач нет, Event Loop может ожидать новые события

###  5. Check
**Выполняет задачи**, зарегистрированные с помощью `setImmediate`.

###  6. Close callbacks
**Выполняет обратные вызовы** для закрытия (например, `socket.on('close')`).

**После прохождения всех фаз Event Loop возвращается в начало и повторяет процесс.**

---

##  Пример работы Event Loop

###  Рассмотрим пример:
```javascript
setTimeout(() => console.log('setTimeout'), 0);
setImmediate(() => console.log('setImmediate'));

console.log('Начало');
```

###  Вывод:
```
Начало
setImmediate
setTimeout
```

###  Объяснение:
1. **Сначала выполняется синхронный код** (`console.log('Начало')`)
2. **Функции `setTimeout` и `setImmediate` регистрируются** в Event Loop
3. **`setImmediate` выполняется раньше**, так как его обработка происходит в фазе `check`, а `setTimeout` попадает в фазу `timers`

---

##  Асинхронные операции и Event Loop

Node.js может запускать асинхронные операции ввода-вывода (например, чтение файла или запрос к базе данных), не блокируя основной поток выполнения. Это возможно благодаря взаимодействию Event Loop с системными потоками.

###  Пример:
```javascript
const fs = require('fs');

console.log('Начало');

fs.readFile('example.txt', (err, data) => {
    if (err) throw err;
    console.log('Чтение файла завершено');
});

setTimeout(() => console.log('setTimeout'), 0);
console.log('Конец');
```

###  Вывод:
```
Начало
Конец
setTimeout
Чтение файла завершено
```

###  Объяснение:
1. **Сначала выполняется синхронный код** (Начало и Конец)
2. **`fs.readFile` отправляет запрос** на чтение файла в системный поток. После завершения операции Node.js добавляет ее callback в очередь `poll`
3. **`setTimeout` попадает в очередь `timers`** и выполняется после синхронного кода
4. **Когда все синхронные задачи завершены**, Event Loop начинает обрабатывать асинхронные задачи

---

##  Взаимодействие setTimeout и setImmediate

Если `setTimeout` с нулевой задержкой (0) и `setImmediate` вызываются изнутри одного callback, порядок их выполнения может различаться:

###  Пример:
```javascript
const fs = require('fs');

fs.readFile('example.txt', () => {
    setTimeout(() => console.log('setTimeout'), 0);
    setImmediate(() => console.log('setImmediate'));
});
```

###  Вывод:
```
setImmediate
setTimeout
```

###  Объяснение:
Когда асинхронная операция завершается (например, `fs.readFile`), `setImmediate` будет выполнен раньше, так как он находится в фазе `check`, а `setTimeout` — в фазе `timers` следующего цикла.

---

##  Преимущества Event Loop

###  Асинхронность
Позволяет эффективно обрабатывать множество операций I/O, не блокируя поток.

###  Однопоточность
Упрощает разработку, избегая сложностей многопоточного программирования (например, мьютексов и гонок данных).

###  Высокая производительность
Node.js отлично подходит для задач с большим количеством сетевых подключений или операций ввода-вывода.

---

##  Недостатки Event Loop

###  Блокирующий код
Если в приложении выполняется блокирующий синхронный код, это может остановить весь Event Loop.

###  Непригодность для CPU-интенсивных задач
Поскольку Node.js однопоточен, длительные вычисления могут заблокировать обработку других задач.

---

##  Дополнительные концепции

###  Микрозадачи (Microtasks)
```javascript
// Promise.then() и process.nextTick() выполняются между фазами
process.nextTick(() => console.log('nextTick'));
Promise.resolve().then(() => console.log('Promise'));

setTimeout(() => console.log('setTimeout'), 0);
setImmediate(() => console.log('setImmediate'));

console.log('Синхронный код');
```

###  Приоритет выполнения
1. **Синхронный код**
2. **`process.nextTick()`**
3. **Promise.then()**
4. **Фазы Event Loop**

###  Блокировка Event Loop
```javascript
//  Плохо - блокирует Event Loop
function badFunction() {
    const start = Date.now();
    while (Date.now() - start < 5000) {
        // Долгая операция
    }
}

//  Хорошо - не блокирует Event Loop
function goodFunction() {
    setImmediate(() => {
        // Асинхронная обработка
    });
}
```

---

##  Мониторинг Event Loop

###  Измерение задержки Event Loop
```javascript
const { performance, PerformanceObserver } = require('perf_hooks');

const obs = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry) => {
        console.log(`Event Loop задержка: ${entry.duration}ms`);
    });
});

obs.observe({ entryTypes: ['measure'] });

// Измеряем задержку
setInterval(() => {
    performance.mark('start');
    setImmediate(() => {
        performance.mark('end');
        performance.measure('event-loop-lag', 'start', 'end');
    });
}, 1000);
```

###  Отслеживание использования CPU
```javascript
const { performance } = require('perf_hooks');

function monitorEventLoop() {
    const start = performance.now();
    
    setImmediate(() => {
        const duration = performance.now() - start;
        console.log(`Event Loop цикл: ${duration.toFixed(2)}ms`);
        
        if (duration > 100) {
            console.warn('  Высокая задержка Event Loop!');
        }
        
        monitorEventLoop(); // Рекурсивный мониторинг
    });
}

monitorEventLoop();
```

---

##  Итог

**Event Loop** — это ядро архитектуры Node.js, которое делает возможной асинхронную обработку задач в однопоточном окружении. Оно обеспечивает высокую производительность и масштабируемость приложений, но требует от разработчиков понимания фаз его работы, чтобы эффективно использовать его возможности и избегать ошибок.

**Ключевые принципы:**
- Понимайте фазы Event Loop
- Избегайте блокирующего кода
- Используйте асинхронные операции
- Мониторьте производительность
- Правильно используйте `setTimeout` и `setImmediate`

##  ЗАДАЧИ

Вот набор задач, чтобы лучше понять `Event Loop в Node.js`:

---

###  Задача 1: Создание простого планировщика задач

 Создайте систему планирования задач, которая демонстрирует работу Event Loop:
- Функция `scheduleTask` добавляет задачу в очередь
- Функция `runScheduler` выполняет задачи по приоритету
- Поддержка разных типов задач: immediate, timeout, interval
- Логирование порядка выполнения задач

```javascript
// Создайте функции:
// scheduleTask(task, type, delay) - планирует задачу
// runScheduler() - запускает планировщик
// Поддерживаемые типы: 'immediate', 'timeout', 'interval'

// Пример использования:
// scheduleTask(() => console.log('Task 1'), 'immediate');
// scheduleTask(() => console.log('Task 2'), 'timeout', 100);
// runScheduler();
```

<details>
<summary> Решение</summary>

```javascript
class TaskScheduler {
    constructor() {
        this.tasks = [];
        this.isRunning = false;
        this.taskId = 0;
    }

    scheduleTask(task, type, delay = 0) {
        const taskId = ++this.taskId;
        const taskObj = {
            id: taskId,
            task,
            type,
            delay,
            scheduledAt: Date.now(),
            executed: false
        };

        this.tasks.push(taskObj);
        console.log(` Задача ${taskId} запланирована (${type}, задержка: ${delay}ms)`);

        return taskId;
    }

    runScheduler() {
        if (this.isRunning) {
            console.log('  Планировщик уже запущен');
            return;
        }

        this.isRunning = true;
        console.log(' Планировщик задач запущен\n');

        // Выполняем immediate задачи
        this.executeImmediateTasks();

        // Выполняем timeout задачи
        this.executeTimeoutTasks();

        // Выполняем interval задачи
        this.executeIntervalTasks();

        // Завершаем планировщик
        setTimeout(() => {
            this.isRunning = false;
            console.log('\n Планировщик завершен');
            this.printSummary();
        }, 1000);
    }

    executeImmediateTasks() {
        console.log(' Выполнение immediate задач...');
        
        const immediateTasks = this.tasks.filter(t => t.type === 'immediate' && !t.executed);
        
        immediateTasks.forEach(task => {
            try {
                const startTime = Date.now();
                task.task();
                const duration = Date.now() - startTime;
                
                task.executed = true;
                task.executedAt = Date.now();
                
                console.log(`    Задача ${task.id} выполнена за ${duration}ms`);
            } catch (error) {
                console.error(`    Ошибка в задаче ${task.id}:`, error.message);
            }
        });
    }

    executeTimeoutTasks() {
        console.log('⏰ Выполнение timeout задач...');
        
        const timeoutTasks = this.tasks.filter(t => t.type === 'timeout' && !t.executed);
        
        timeoutTasks.forEach(task => {
            setTimeout(() => {
                try {
                    const startTime = Date.now();
                    task.task();
                    const duration = Date.now() - startTime;
                    
                    task.executed = true;
                    task.executedAt = Date.now();
                    
                    console.log(`    Задача ${task.id} выполнена за ${duration}ms (задержка: ${task.delay}ms)`);
                } catch (error) {
                    console.error(`    Ошибка в задаче ${task.id}:`, error.message);
                }
            }, task.delay);
        });
    }

    executeIntervalTasks() {
        console.log(' Выполнение interval задач...');
        
        const intervalTasks = this.tasks.filter(t => t.type === 'interval' && !t.executed);
        
        intervalTasks.forEach(task => {
            const intervalId = setInterval(() => {
                try {
                    const startTime = Date.now();
                    task.task();
                    const duration = Date.now() - startTime;
                    
                    console.log(`    Задача ${task.id} выполнена за ${duration}ms (interval)`);
                } catch (error) {
                    console.error(`    Ошибка в задаче ${task.id}:`, error.message);
                    clearInterval(intervalId);
                }
            }, task.delay);

            // Останавливаем interval через 500ms
            setTimeout(() => {
                clearInterval(intervalId);
                task.executed = true;
                task.executedAt = Date.now();
            }, 500);
        });
    }

    printSummary() {
        console.log('\n Сводка выполнения:');
        console.log(`   Всего задач: ${this.tasks.length}`);
        console.log(`   Выполнено: ${this.tasks.filter(t => t.executed).length}`);
        console.log(`   Не выполнено: ${this.tasks.filter(t => !t.executed).length}`);
        
        const executedTasks = this.tasks.filter(t => t.executed);
        if (executedTasks.length > 0) {
            console.log('\n Порядок выполнения:');
            executedTasks
                .sort((a, b) => a.executedAt - b.executedAt)
                .forEach(task => {
                    const delay = task.executedAt - task.scheduledAt;
                    console.log(`   ${task.id}. ${task.type} (задержка: ${delay}ms)`);
                });
        }
    }

    // Демонстрация работы Event Loop
    demonstrateEventLoop() {
        console.log(' Демонстрация Event Loop\n');
        
        // Синхронный код
        console.log('1. Синхронный код');
        
        // process.nextTick
        process.nextTick(() => {
            console.log('2. process.nextTick');
        });
        
        // Promise
        Promise.resolve().then(() => {
            console.log('3. Promise.then');
        });
        
        // setImmediate
        this.scheduleTask(() => {
            console.log('4. setImmediate');
        }, 'immediate');
        
        // setTimeout
        this.scheduleTask(() => {
            console.log('5. setTimeout(0)');
        }, 'timeout', 0);
        
        // setTimeout с задержкой
        this.scheduleTask(() => {
            console.log('6. setTimeout(100)');
        }, 'timeout', 100);
        
        console.log('7. Конец синхронного кода');
        
        // Запускаем планировщик
        this.runScheduler();
    }
}

// Демонстрация
const scheduler = new TaskScheduler();

// Простые задачи
scheduler.scheduleTask(() => console.log('Простая задача 1'), 'immediate');
scheduler.scheduleTask(() => console.log('Простая задача 2'), 'timeout', 50);
scheduler.scheduleTask(() => console.log('Простая задача 3'), 'interval', 200);

// Запуск планировщика
scheduler.runScheduler();

// Демонстрация Event Loop
setTimeout(() => {
    console.log('\n' + '='.repeat(50));
    scheduler.demonstrateEventLoop();
}, 2000);

module.exports = TaskScheduler;
```

</details>

---

###  Задача 2: Создание системы мониторинга Event Loop

 Создайте систему мониторинга, которая отслеживает производительность Event Loop:
- Измерение задержки Event Loop
- Отслеживание блокирующих операций
- Генерация предупреждений при высокой задержке
- Статистика производительности

```javascript
// Создайте класс EventLoopMonitor:
// start() - запускает мониторинг
// stop() - останавливает мониторинг
// getStats() - возвращает статистику
// onLag(callback) - обработчик высокой задержки

// Пример использования:
// const monitor = new EventLoopMonitor();
// monitor.onLag((lag) => console.log('Высокая задержка:', lag));
// monitor.start();
```

<details>
<summary> Решение</summary>

```javascript
class EventLoopMonitor {
    constructor(options = {}) {
        this.isRunning = false;
        this.interval = options.interval || 1000; // Интервал измерения в мс
        this.lagThreshold = options.lagThreshold || 50; // Порог задержки в мс
        this.maxSamples = options.maxSamples || 100; // Максимум образцов
        
        this.samples = [];
        this.lagCallbacks = [];
        this.intervalId = null;
        this.startTime = null;
    }

    start() {
        if (this.isRunning) {
            console.log('  Мониторинг уже запущен');
            return;
        }

        this.isRunning = true;
        this.startTime = Date.now();
        console.log(' Мониторинг Event Loop запущен');

        this.intervalId = setInterval(() => {
            this.measureLag();
        }, this.interval);
    }

    stop() {
        if (!this.isRunning) {
            console.log('  Мониторинг не запущен');
            return;
        }

        this.isRunning = false;
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }

        console.log('⏹  Мониторинг Event Loop остановлен');
    }

    measureLag() {
        const start = process.hrtime.bigint();
        
        setImmediate(() => {
            const end = process.hrtime.bigint();
            const lag = Number(end - start) / 1000000; // Конвертируем в миллисекунды
            
            this.recordSample(lag);
            this.checkLagThreshold(lag);
        });
    }

    recordSample(lag) {
        const sample = {
            timestamp: Date.now(),
            lag: lag,
            memoryUsage: process.memoryUsage(),
            uptime: process.uptime()
        };

        this.samples.push(sample);

        // Ограничиваем количество образцов
        if (this.samples.length > this.maxSamples) {
            this.samples.shift();
        }
    }

    checkLagThreshold(lag) {
        if (lag > this.lagThreshold) {
            console.warn(`  Высокая задержка Event Loop: ${lag.toFixed(2)}ms`);
            
            // Вызываем обработчики
            this.lagCallbacks.forEach(callback => {
                try {
                    callback(lag, this.getCurrentStats());
                } catch (error) {
                    console.error('Ошибка в обработчике задержки:', error);
                }
            });
        }
    }

    onLag(callback) {
        if (typeof callback === 'function') {
            this.lagCallbacks.push(callback);
        }
    }

    getStats() {
        if (this.samples.length === 0) {
            return {
                samples: 0,
                averageLag: 0,
                maxLag: 0,
                minLag: 0,
                highLagCount: 0,
                uptime: process.uptime()
            };
        }

        const lags = this.samples.map(s => s.lag);
        const averageLag = lags.reduce((sum, lag) => sum + lag, 0) / lags.length;
        const maxLag = Math.max(...lags);
        const minLag = Math.min(...lags);
        const highLagCount = lags.filter(lag => lag > this.lagThreshold).length;

        return {
            samples: this.samples.length,
            averageLag: parseFloat(averageLag.toFixed(2)),
            maxLag: parseFloat(maxLag.toFixed(2)),
            minLag: parseFloat(minLag.toFixed(2)),
            highLagCount,
            uptime: process.uptime(),
            memoryUsage: process.memoryUsage()
        };
    }

    getCurrentStats() {
        const latest = this.samples[this.samples.length - 1];
        return latest ? {
            lag: latest.lag,
            memoryUsage: latest.memoryUsage,
            timestamp: latest.timestamp
        } : null;
    }

    // Создание блокирующей операции для тестирования
    createBlockingOperation(duration) {
        console.log(` Создание блокирующей операции на ${duration}ms`);
        
        const start = Date.now();
        while (Date.now() - start < duration) {
            // Блокирующая операция
        }
        
        console.log(` Блокирующая операция завершена`);
    }

    // Демонстрация мониторинга
    demonstrate() {
        console.log(' Демонстрация мониторинга Event Loop\n');

        // Настраиваем обработчик высокой задержки
        this.onLag((lag, stats) => {
            console.log(` Обнаружена высокая задержка: ${lag.toFixed(2)}ms`);
            console.log(`   Память: ${(stats.memoryUsage.heapUsed / 1024 / 1024).toFixed(2)}MB`);
        });

        // Запускаем мониторинг
        this.start();

        // Создаем различные нагрузки
        setTimeout(() => {
            console.log('\n Создание легкой нагрузки...');
            for (let i = 0; i < 1000; i++) {
                setImmediate(() => {
                    Math.random();
                });
            }
        }, 2000);

        setTimeout(() => {
            console.log('\n Создание блокирующей операции...');
            this.createBlockingOperation(200);
        }, 4000);

        setTimeout(() => {
            console.log('\n Статистика:');
            const stats = this.getStats();
            console.log(`   Образцов: ${stats.samples}`);
            console.log(`   Средняя задержка: ${stats.averageLag}ms`);
            console.log(`   Максимальная задержка: ${stats.maxLag}ms`);
            console.log(`   Высокие задержки: ${stats.highLagCount}`);
        }, 6000);

        setTimeout(() => {
            this.stop();
            console.log('\n Демонстрация завершена');
        }, 8000);
    }

    // Экспорт данных для анализа
    exportData() {
        return {
            config: {
                interval: this.interval,
                lagThreshold: this.lagThreshold,
                maxSamples: this.maxSamples
            },
            samples: this.samples,
            stats: this.getStats()
        };
    }
}

// Демонстрация
const monitor = new EventLoopMonitor({
    interval: 500,
    lagThreshold: 30,
    maxSamples: 50
});

// Запуск демонстрации
if (require.main === module) {
    monitor.demonstrate();
}

module.exports = EventLoopMonitor;
```

</details>

---

###  Задача 3: Создание асинхронной очереди задач

 Создайте систему очереди задач, которая работает с Event Loop:
- Очередь с приоритетами (high, normal, low)
- Ограничение количества одновременных задач
- Автоматическое выполнение задач через Event Loop
- Обработка ошибок и повторные попытки

```javascript
// Создайте класс AsyncTaskQueue:
// addTask(task, priority) - добавляет задачу в очередь
// start() - запускает обработку очереди
// stop() - останавливает обработку
// getQueueStatus() - возвращает статус очереди

// Пример использования:
// const queue = new AsyncTaskQueue({ concurrency: 3 });
// queue.addTask(() => fetchData(), 'high');
// queue.start();
```

<details>
<summary> Решение</summary>

```javascript
class AsyncTaskQueue {
    constructor(options = {}) {
        this.concurrency = options.concurrency || 3; // Максимум одновременных задач
        this.retryAttempts = options.retryAttempts || 3; // Количество попыток
        this.retryDelay = options.retryDelay || 1000; // Задержка между попытками
        
        this.queues = {
            high: [],
            normal: [],
            low: []
        };
        
        this.running = new Set();
        this.completed = [];
        this.failed = [];
        this.isProcessing = false;
        this.taskId = 0;
    }

    addTask(task, priority = 'normal', metadata = {}) {
        const taskId = ++this.taskId;
        const taskObj = {
            id: taskId,
            task,
            priority,
            metadata,
            attempts: 0,
            createdAt: Date.now(),
            status: 'pending'
        };

        this.queues[priority].push(taskObj);
        console.log(` Задача ${taskId} добавлена в очередь (приоритет: ${priority})`);

        // Автоматически запускаем обработку, если она не запущена
        if (!this.isProcessing) {
            this.start();
        }

        return taskId;
    }

    start() {
        if (this.isProcessing) {
            console.log('  Очередь уже обрабатывается');
            return;
        }

        this.isProcessing = true;
        console.log(' Обработка очереди задач запущена');

        this.processQueue();
    }

    stop() {
        this.isProcessing = false;
        console.log('⏹  Обработка очереди остановлена');
    }

    processQueue() {
        if (!this.isProcessing) return;

        // Обрабатываем задачи по приоритету
        const priorities = ['high', 'normal', 'low'];
        
        for (const priority of priorities) {
            while (this.queues[priority].length > 0 && this.running.size < this.concurrency) {
                const task = this.queues[priority].shift();
                this.executeTask(task);
            }
        }

        // Если есть задачи в очереди или выполняющиеся, продолжаем обработку
        if (this.hasPendingTasks() || this.running.size > 0) {
            setImmediate(() => this.processQueue());
        } else {
            this.isProcessing = false;
            console.log(' Все задачи обработаны');
        }
    }

    async executeTask(taskObj) {
        taskObj.status = 'running';
        taskObj.startedAt = Date.now();
        this.running.add(taskObj.id);

        console.log(` Выполнение задачи ${taskObj.id} (${taskObj.priority})`);

        try {
            // Выполняем задачу асинхронно
            const result = await this.runTask(taskObj.task);
            
            taskObj.status = 'completed';
            taskObj.completedAt = Date.now();
            taskObj.result = result;
            taskObj.duration = taskObj.completedAt - taskObj.startedAt;

            this.completed.push(taskObj);
            console.log(` Задача ${taskObj.id} выполнена за ${taskObj.duration}ms`);

        } catch (error) {
            taskObj.attempts++;
            taskObj.lastError = error.message;

            if (taskObj.attempts < this.retryAttempts) {
                console.log(` Повторная попытка для задачи ${taskObj.id} (попытка ${taskObj.attempts}/${this.retryAttempts})`);
                
                // Добавляем задачу обратно в очередь с задержкой
                setTimeout(() => {
                    this.queues[taskObj.priority].unshift(taskObj);
                    this.processQueue();
                }, this.retryDelay * taskObj.attempts);
            } else {
                taskObj.status = 'failed';
                taskObj.failedAt = Date.now();
                this.failed.push(taskObj);
                console.log(` Задача ${taskObj.id} провалена после ${taskObj.attempts} попыток: ${error.message}`);
            }
        } finally {
            this.running.delete(taskObj.id);
        }
    }

    runTask(task) {
        return new Promise((resolve, reject) => {
            try {
                const result = task();
                
                // Если задача возвращает Promise
                if (result && typeof result.then === 'function') {
                    result.then(resolve).catch(reject);
                } else {
                    resolve(result);
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    hasPendingTasks() {
        return Object.values(this.queues).some(queue => queue.length > 0);
    }

    getQueueStatus() {
        const pending = Object.values(this.queues).reduce((sum, queue) => sum + queue.length, 0);
        
        return {
            pending,
            running: this.running.size,
            completed: this.completed.length,
            failed: this.failed.length,
            concurrency: this.concurrency,
            isProcessing: this.isProcessing,
            queues: {
                high: this.queues.high.length,
                normal: this.queues.normal.length,
                low: this.queues.low.length
            }
        };
    }

    // Демонстрация работы очереди
    demonstrate() {
        console.log(' Демонстрация асинхронной очереди задач\n');

        // Создаем различные типы задач
        const createTask = (name, duration, shouldFail = false) => {
            return () => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        if (shouldFail) {
                            reject(new Error(`Задача ${name} провалена`));
                        } else {
                            console.log(`    Выполняется: ${name}`);
                            resolve(`Результат ${name}`);
                        }
                    }, duration);
                });
            };
        };

        // Добавляем задачи с разными приоритетами
        this.addTask(createTask('Высокий приоритет 1', 100), 'high');
        this.addTask(createTask('Низкий приоритет 1', 200), 'low');
        this.addTask(createTask('Обычный приоритет 1', 150), 'normal');
        this.addTask(createTask('Высокий приоритет 2', 120), 'high');
        this.addTask(createTask('Обычный приоритет 2', 180), 'normal');
        this.addTask(createTask('Провальная задача', 100, true), 'normal');
        this.addTask(createTask('Низкий приоритет 2', 250), 'low');

        // Мониторим статус очереди
        const statusInterval = setInterval(() => {
            const status = this.getQueueStatus();
            console.log(`\n Статус очереди:`);
            console.log(`   Ожидают: ${status.pending}`);
            console.log(`   Выполняются: ${status.running}`);
            console.log(`   Завершены: ${status.completed}`);
            console.log(`   Провалены: ${status.failed}`);
            console.log(`   Очереди: H:${status.queues.high} N:${status.queues.normal} L:${status.queues.low}`);

            if (status.pending === 0 && status.running === 0) {
                clearInterval(statusInterval);
                console.log('\n Демонстрация завершена');
            }
        }, 500);
    }

    // Очистка завершенных задач
    clearCompleted() {
        this.completed = [];
        this.failed = [];
        console.log(' Завершенные задачи очищены');
    }

    // Получение статистики
    getStats() {
        const allTasks = [...this.completed, ...this.failed];
        const avgDuration = allTasks.length > 0 
            ? allTasks.reduce((sum, task) => sum + (task.duration || 0), 0) / allTasks.length 
            : 0;

        return {
            total: allTasks.length,
            completed: this.completed.length,
            failed: this.failed.length,
            successRate: allTasks.length > 0 ? (this.completed.length / allTasks.length * 100).toFixed(2) : 0,
            averageDuration: Math.round(avgDuration),
            byPriority: {
                high: allTasks.filter(t => t.priority === 'high').length,
                normal: allTasks.filter(t => t.priority === 'normal').length,
                low: allTasks.filter(t => t.priority === 'low').length
            }
        };
    }
}

// Демонстрация
if (require.main === module) {
    const queue = new AsyncTaskQueue({
        concurrency: 2,
        retryAttempts: 2,
        retryDelay: 500
    });

    queue.demonstrate();
}

module.exports = AsyncTaskQueue;
```

</details>

---

 Эти задачи помогут понять принципы работы Event Loop в Node.js и научиться создавать эффективные асинхронные системы.

---
