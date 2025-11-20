#  Событийно‑ориентированное программирование в Node.js

**Событийно‑ориентированное программирование (Event‑Driven Programming)** — подход, в котором выполнение программы организовано вокруг генерации и обработки событий. В Node.js это фундаментальная модель, лежащая в основе асинхронности и неблокирующего I/O.

---

##  Основные принципы

###  События и слушатели
Программа реагирует на события (HTTP‑запрос, завершение чтения файла, подключение по WebSocket). Для каждого события назначается слушатель (callback), который вызывается при наступлении события.

###  Событийный цикл (Event Loop)
Сердце Node.js — цикл, управляющий очередями задач (таймеры, I/O callbacks, `setImmediate`, microtasks Promises). Это позволяет эффективно обрабатывать множество операций без создания потоков на каждый запрос.

###  Эмиссия событий через EventEmitter
Базовый механизм событий — класс `EventEmitter`. Компоненты могут «эмитировать» пользовательские и системные события, а другие — подписываться и реагировать.

###  Асинхронность и неблокирующий I/O
Пока одна операция I/O выполняется в фоне, основной поток продолжает обрабатывать другие события, что повышает пропускную способность.

---

##  Пример: собственные события через EventEmitter

```javascript
const EventEmitter = require('events');
const bus = new EventEmitter();

// Регистрация слушателей
bus.on('user:login', (userId) => {
  console.log('Пользователь вошёл:', userId);
});

bus.once('app:ready', () => {
  console.log('Приложение готово (одноразовый слушатель)');
});

// Эмиссия событий
bus.emit('app:ready');
bus.emit('app:ready'); // повтор не вызовет once‑слушатель
bus.emit('user:login', 42);
```

---

##  Пример: HTTP‑сервер как источники событий

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  // Обработчик запроса (также срабатывает на событие 'request')
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Hello, World!\n');
});

server.on('request', (req) => {
  console.log(`Запрос: ${req.method} ${req.url}`);
});

server.on('listening', () => {
  console.log('Сервер запущен на http://localhost:3000');
});

server.on('error', (err) => {
  console.error('Ошибка сервера:', err);
});

server.listen(3000);
```

---

##  Коротко о фазах Event Loop

- Macrotasks: `setTimeout`, `setInterval`, I/O callbacks, `setImmediate`
- Microtasks: обработчики `Promise` (`.then/.catch/.finally`), `queueMicrotask`
- Порядок: синхронный код → microtasks → следующая macrotask‑фаза (упрощённо)

```javascript
console.log('sync');
setTimeout(() => console.log('timeout'), 0);
Promise.resolve().then(() => console.log('microtask'));
setImmediate(() => console.log('immediate'));
```

---

##  Лучшие практики

- Всегда обрабатывайте событие `'error'` у эмиттеров/стримов
- Используйте `once` для одноразовых событий, чтобы избежать утечек слушателей
- Не выполняйте тяжёлые синхронные операции в слушателях — выносите в воркеры/очереди
- Для потоков данных используйте Streams и backpressure (`.pipe`, `readableFlowing`)
- Удаляйте слушателей при необходимости: `emitter.off(event, handler)`
- Логируйте и мониторьте критические события (подключения, отказы, таймауты)

---

##  Где применяется

- Реал‑тайм взаимодействие: чаты, уведомления, трекинг
- Обработка потоков данных: файлы, мультимедиа, прокси
- API‑шлюзы, брокеры событий, микросервисы

---

##  Итог

- События и Event Loop делают Node.js реактивным и эффективным для I/O
- `EventEmitter` — универсальный механизм декуплинга компонентов
- Следуйте практикам обработки ошибок и backpressure для устойчивости

##  ЗАДАЧИ

Задачи для практики: `EventEmitter, once/off, Event Loop, Streams`

---

###  Задача 1: Счётчик слушателей
Создайте эмиттер, повесьте 3 слушателя на событие `tick`, эмитируйте событие 2 раза, затем снимите один слушатель и эмитируйте ещё раз. Выведите количество активных слушателей.

<details>
<summary> Решение</summary>

Шаги:
1) Создайте файл `listeners.js` и реализуйте пример
```javascript
const EventEmitter = require('events');
const bus = new EventEmitter();

const h1 = () => console.log('h1');
const h2 = () => console.log('h2');
const h3 = () => console.log('h3');

bus.on('tick', h1);
bus.on('tick', h2);
bus.on('tick', h3);

bus.emit('tick');
bus.emit('tick');

bus.off('tick', h2);

console.log('listeners:', bus.listenerCount('tick'));
bus.emit('tick');
```

2) Запустите
```bash
node listeners.js
```
Ожидаемо: два запуска по три обработчика, затем вывод `listeners: 2` и один запуск по двум обработчикам.

</details>

---

###  Задача 2: Одноразовый запуск
Используя `once`, дождитесь события `ready`, затем выполните инициализацию и запретите повторный запуск.

<details>
<summary> Решение</summary>

Шаги:
1) Реализуйте ожидающую инициализацию
```javascript
const { once, EventEmitter } = require('events');

async function bootstrap() {
  const bus = new EventEmitter();
  setTimeout(() => bus.emit('ready'), 100);
  await once(bus, 'ready');
  console.log('init done');
}

bootstrap();
```

2) Проверьте, что повторная эмиссия не ломает логику. (Можно не вызывать повторно, так как мы не ждём второй раз.)

</details>

---

###  Задача 3: Порядок Event Loop
Выведите ожидаемый порядок выполнения: sync → microtask → timeout/immediate (возможны нюансы среды), поясните почему.

<details>
<summary> Решение</summary>

```javascript
// order.js
console.log('sync');
setTimeout(() => console.log('timeout'), 0);
Promise.resolve().then(() => console.log('microtask'));
setImmediate(() => console.log('immediate'));
```

Запуск:
```bash
node order.js | cat
```

Microtasks обрабатываются перед переходом к следующей macrotask‑фазе, потому `microtask` появляется раньше таймеров/`immediate`.

</details>

---

###  Задача 4: Потоки и backpressure
Считайте большой файл потоково и отправьте клиенту, используя `.pipe`, обработайте `error` и `close`.

<details>
<summary> Решение</summary>

Структура:
```
project/
  server.js
  big.mp4
```

Код сервера:
```javascript
const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  if (req.url === '/video') {
    const stream = fs.createReadStream('big.mp4');
    stream.on('error', (e) => {
      res.writeHead(500);
      res.end('read error');
    });
    res.on('close', () => stream.destroy());
    res.writeHead(200, { 'Content-Type': 'video/mp4' });
    stream.pipe(res);
  } else {
    res.writeHead(404).end();
  }
}).listen(3001, () => console.log('http://localhost:3001/video'));
```

Проверьте в браузере или через `curl --output /dev/null http://localhost:3001/video`.

</details>

---

###  Задача 5: Обработка ошибок эмиттера
Сымитируйте ошибку у `EventEmitter` и корректно обработайте её, чтобы процесс не упал.

<details>
<summary> Решение</summary>

```javascript
// emitter-error.js
const EventEmitter = require('events');
const bus = new EventEmitter();

bus.on('error', (err) => {
  console.error('handled error:', err.message);
});

bus.emit('error', new Error('boom'));
console.log('still alive');
```

Запуск: `node emitter-error.js` — ожидаемо, процесс не завершится аварийно.

</details>

---

###  Задача 6: Таймаут как событие
Реализуйте функцию `wait(ms)`, возвращающую `Promise`, и используйте её для последовательной эмиссии событий `tick`.

<details>
<summary> Решение</summary>

```javascript
// tick-wait.js
const EventEmitter = require('events');
const bus = new EventEmitter();

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

bus.on('tick', (n) => console.log('tick', n));

(async () => {
  for (let i = 1; i <= 3; i++) {
    await wait(200);
    bus.emit('tick', i);
  }
})();
```

Запуск: `node tick-wait.js` — ожидаемо, вы увидите `tick 1`, `tick 2`, `tick 3` с паузами ~200мс.

</details>

---

 Эти задачи помогут глубже понять EventEmitter, Event Loop и практики безопасной обработки событий и потоков в Node.js.

---


