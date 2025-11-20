#  Как Node.js обрабатывает асинхронные операции: модель, плюсы и минусы

**Node.js** обрабатывает асинхронные операции через событийный цикл (Event Loop) и неблокирующий ввод‑вывод (Non‑blocking I/O). Код остаётся однопоточным, а длительные операции поручаются системным API/пулу, их результаты возвращаются событиями/колбэками/промисами.

---

##  Механизмы асинхронности в Node.js

###  Событийный цикл (Event Loop)
Сердце платформы. Управляет очередями macrotasks (таймеры, I/O callbacks, setImmediate) и microtasks (Promises). Пока I/O выполняется в ОС/пуле, поток Node продолжает обрабатывать другие события.

###  Callback‑функции
Базовый способ подписаться на завершение операции.

```javascript
const fs = require('fs');
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) return console.error(err);
  console.log(data);
});
```

###  Promise и async/await
Современный удобный синтаксис без «адов колбэков».

```javascript
const fs = require('fs/promises');

// Promise
fs.readFile('file.txt', 'utf8')
  .then(console.log)
  .catch(console.error);

// async/await
(async () => {
  try {
    const data = await fs.readFile('file.txt', 'utf8');
    console.log(data);
  } catch (e) {
    console.error(e);
  }
})();
```

###  Worker Threads (для CPU‑тяжёлых задач)
Однопоточность удобна для I/O, но CPU‑интенсивные задачи блокируют цикл. В таких случаях используйте воркеры.

```javascript
// main.js
const { Worker } = require('node:worker_threads');

function runHeavy(input) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(require.resolve('./worker.js'));
    worker.postMessage(input);
    worker.once('message', resolve);
    worker.once('error', reject);
  });
}

console.time('heavy');
runHeavy(42).then((r) => {
  console.timeEnd('heavy');
  console.log('result:', r);
});
```

```javascript
// worker.js
const { parentPort } = require('node:worker_threads');

parentPort.on('message', (n) => {
  let x = 0;
  for (let i = 0; i < 5e8; i++) x += i * n; // имитация CPU‑нагрузки
  parentPort.postMessage(x);
});
```

---

##  Преимущества асинхронной модели

- Высокая производительность для I/O: неблокирующий I/O позволяет обрабатывать тысячи соединений.
- Экономия ресурсов: нет затрат на поток на каждый запрос, меньше памяти/контекст‑свитчей.
- Идеально для I/O‑ориентированных задач: БД, файлы, сети, прокси, real‑time.
- Упрощённое масштабирование: горизонтально через кластеры/контейнеры, вертикально — через воркеры.

---

##  Недостатки и как их нивелировать

- Callback hell: вложенность ухудшает читабельность.
  - Решение: Promise, async/await, композиция.
- Однопоточность: CPU‑тяжёлые задачи блокируют Event Loop.
  - Решение: `worker_threads`, очереди, вынос в отдельные сервисы.
- CPU‑интенсивные сценарии: асинхронность не помогает.
  - Решение: выбирать подходящие технологии/архитектуру.
- Отладка асинхронного кода: разорванные стеки.
  - Решение: sourcemaps, `--trace-warnings`, логирование корреляций, APM.

---

##  Лучшие практики

- Не блокируйте Event Loop синхронными тяжёлыми вычислениями
- Отдавайте I/O стримами и используйте backpressure (`.pipe`)
- Обрабатывайте ошибки: `try/catch`, `.catch`, события `'error'`
- Не злоупотребляйте глобальными `unhandledRejection`/`uncaughtException`
- Параллелизируйте независимые I/O через `Promise.all`
- Используйте таймауты/повторы/ограничители (circuit breaker, rate limiting)

---

##  Итог

- Node.js достигает высокой пропускной способности благодаря Event Loop и неблокирующему I/O
- Для CPU‑нагрузок нужны воркеры/микросервисы
- Promise/async‑await делают асинхронный код читаемым и поддерживаемым

##  ЗАДАЧИ

Задачи для практики: `callbacks → promises`, `async/await`, `Event Loop`, `worker_threads`

---

###  Задача 1: Переписать callbacks → Promise
Есть функция c колбэком `readFileCb(path, cb)`. Оберните в `readFileAsync(path): Promise<string>` и используйте `Promise.all` для чтения двух файлов параллельно.

<details>
<summary> Решение</summary>

Шаги:
1) Создайте тестовые файлы и заготовку скрипта
```bash
echo "alpha" > a.txt
echo "beta" > b.txt
```

2) Реализуйте обёртку и параллельное чтение
```javascript
// index.js
const fs = require('fs');

const readFileAsync = (path) => new Promise((resolve, reject) => {
  fs.readFile(path, 'utf8', (err, data) => (err ? reject(err) : resolve(data)));
});

async function main() {
  try {
    const [a, b] = await Promise.all([
      readFileAsync('a.txt'),
      readFileAsync('b.txt')
    ]);
    console.log('a:', a.trim());
    console.log('b:', b.trim());
    console.log('sumLength:', a.length + b.length);
  } catch (e) {
    console.error('read error:', e.message);
  }
}

main();
```

3) Запустите и проверьте
```bash
node index.js
```
Ожидаемо: строки из a/b и сумма длин. Для проверки ошибки переименуйте `a.txt` и убедитесь, что выводится `read error: ...`.

</details>

---

###  Задача 2: async/await с обработкой ошибок
Прочитайте `config.json`, распарсьте и выведите поле `apiUrl`. Обработайте ошибки чтения и парсинга.

<details>
<summary> Решение</summary>

Шаги:
1) Подготовьте файл конфигурации
```bash
cat > config.json << 'JSON'
{
  "apiUrl": "https://api.example.com",
  "retries": 3
}
JSON
```

2) Реализуйте чтение и надёжный парсинг
```javascript
// read-config.js
const fs = require('fs/promises');

async function loadConfig(path) {
  const raw = await fs.readFile(path, 'utf8');
  try {
    return JSON.parse(raw);
  } catch (e) {
    throw new Error(`invalid json in ${path}: ${e.message}`);
  }
}

(async () => {
  try {
    const cfg = await loadConfig('config.json');
    console.log('apiUrl:', cfg.apiUrl);
  } catch (e) {
    console.error('config error:', e.message);
    process.exitCode = 1;
  }
})();
```

3) Негативные кейсы
- Переименуйте файл — должно вывести ошибку чтения.
- Вставьте в `config.json` некорректный JSON — должно вывести `invalid json ...`.

</details>

---

###  Задача 3: Показать блокировку цикла
Сравните `pbkdf2Sync` и асинхронный `pbkdf2`, выведите метки времени и покажите, что sync блокирует цикл.

<details>
<summary> Решение</summary>

```javascript
// blocking.js
const { pbkdf2Sync, pbkdf2 } = require('crypto');

console.time('sync');
pbkdf2Sync('pass', 'salt', 1e5, 64, 'sha512');
console.timeEnd('sync');

console.time('async');
pbkdf2('pass', 'salt', 1e5, 64, 'sha512', () => {
  console.timeEnd('async');
  console.log('async finished');
});

console.log('loop alive (printed before async finishes)');
```

Запуск:
```bash
node blocking.js
```
Наблюдение: sync‑замер блокирует поток до завершения. Сообщение `loop alive` появляется сразу после запуска async‑варианта, до его завершения.

</details>

---

###  Задача 4: Измерить задержку Event Loop
Реализуйте «tick delay» — периодически меряйте разницу между плановым и фактическим временем `setTimeout`.

<details>
<summary> Решение</summary>

```javascript
// loop-delay.js
const interval = 100;
let next = Date.now() + interval;

setInterval(() => {
  const now = Date.now();
  console.log('delay(ms):', now - next);
  next = now + interval;
}, interval);
```

Дополнительно: создайте нагрузку (например, синхронный цикл на 200–300мс) и посмотрите, как растёт задержка.
```javascript
// cpu-spike.js
const start = Date.now();
while (Date.now() - start < 300) {}
console.log('spike done');
```
В отдельном терминале запустите оба скрипта и сравните задержки до/после «спайка».

</details>

---

###  Задача 5: Развернуть воркер для CPU‑задачи
Вынесите функцию расчёта в `worker_threads` и верните результат через `message`.

<details>
<summary> Решение</summary>

Структура файлов:
```
project/
  main.js
  worker.js
```

Код:
```javascript
// main.js
const { Worker } = require('node:worker_threads');

function runHeavy(input) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(require.resolve('./worker.js'));
    worker.postMessage(input);
    worker.once('message', resolve);
    worker.once('error', reject);
  });
}

(async () => {
  console.time('heavy');
  const result = await runHeavy(42);
  console.timeEnd('heavy');
  console.log('result:', result);
})();
```

```javascript
// worker.js
const { parentPort } = require('node:worker_threads');

parentPort.on('message', (n) => {
  let x = 0;
  for (let i = 0; i < 5e8; i++) x += i * n; // имитация тяжёлой CPU‑работы
  parentPort.postMessage(x);
});
```

Запуск:
```bash
node main.js
```
Ожидаемо: вы увидите время выполнения и итоговый результат, при этом Event Loop остаётся отзывчивым для других задач.

</details>

---

###  Задача 6: Идентифицировать I/O‑bound vs CPU‑bound
Дан список задач (скачивание файла, сжатие изображения, запрос к БД, сортировка массива в 10 млн элементов). Классифицируйте их и предложите подход.

<details>
<summary> Решение</summary>

Классификация и подходы:
- Скачивание файла — I/O‑bound → используйте стримы и backpressure
- Запрос к БД — I/O‑bound → пул соединений, таймауты/повторы
- Сжатие изображения — CPU‑bound → воркер/вынос в отдельный сервис
- Сортировка 10 млн — CPU‑bound → воркер/оптимизация алгоритма/порционность

Мини‑примеры:
```javascript
// Стриминг файла клиенту (отдача без буферизации всего файла)
const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  if (req.url === '/file') {
    const stream = fs.createReadStream('big.dat');
    stream.on('error', () => res.writeHead(500).end('read error'));
    res.writeHead(200, { 'Content-Type': 'application/octet-stream' });
    stream.pipe(res);
  } else {
    res.writeHead(404).end();
  }
}).listen(3005);
```

```javascript
// Параллельные запросы I/O
await Promise.all([
  fetch('https://example.com/a'),
  fetch('https://example.com/b')
]);
```

</details>

---

 Эти задачи помогут закрепить понимание асинхронной модели Node.js, преимуществ/ограничений и практик её применения.

---


