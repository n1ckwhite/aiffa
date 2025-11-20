#  Особенности Node.js и отличия от PHP/Java

**Node.js** выделяется среди серверных технологий (PHP, Java) за счёт своей асинхронной, событийно‑ориентированной модели и единого языка **JavaScript** на фронтенде и бэкенде.

---

##  Ключевые особенности Node.js

###  Единый язык JavaScript
Один стек на клиенте и сервере упрощает обмен знаниями, переиспользование утилит/типов (TS) и ускоряет разработку.

###  Асинхронность по умолчанию
Операции I/O выполняются неблокирующе (через колбэки/промисы), что даёт высокую пропускную способность при множестве запросов.

###  Однопоточность (с умом)
Основной поток один, что снижает накладные расходы на синхронизацию. Для CPU‑задач доступны `worker_threads`, `cluster` или вынос в отдельные сервисы.

###  Событийный цикл (Event Loop)
Управляет очередями задач: macrotasks/microtasks/таймеры/I/O callbacks, обеспечивая реактивность без создания потоков на каждый запрос.

###  Не блокирующий ввод‑вывод (Non‑blocking I/O)
Позволяет обрабатывать тысячи соединений без блокировки основного потока ожиданием диска/сети.

###  Экосистема npm
Крупнейший реестр пакетов: веб‑фреймворки, БД, очереди, auth, инструменты сборки/CLI.

###  Движок Chrome V8
Выполняет JS с JIT‑компиляцией в машинный код; высокая производительность и современные возможности языка.

---

##  Сравнение с PHP и Java

###  PHP (классический стек)
- По умолчанию блокирующий I/O, каждый запрос — отдельный процесс/воркер веб‑сервера.
- Разные языки для фронта и бэка → контекст‑свитчинг.
- Отлично подходит для монолитных приложений, CMS, SSR на шаблонах.

###  Java (классический enterprise)
- Многопоточность/пул потоков, богатые JVM‑инструменты, строгая типизация.
- Более высокий оверхед на управление потоками и памятью.
- Силен для сложных доменных моделей, heavy CPU, крупных команд и строгих SLA.

###  Сравнительная таблица

| Аспект | Node.js | PHP | Java |
|-------|---------|-----|------|
| Модель исполнения | Однопоточная + Event Loop | Процесс/воркер на запрос | Пул потоков |
| I/O | Неблокирующий по умолчанию | Обычно блокирующий | Неблокирующий через NIO |
| Real‑time/WebSocket | Нативно/удобно | Доп. плагины/серверы | Поддерживается (Netty, Spring) |
| Язык фронт/бэк | Один (JS/TS) | Разные | Разные |
| CPU‑тяжёлые задачи | Нужны воркеры/микросервисы | Воркеры/расширения | Хорошо из коробки |
| Экосистема | npm (огромная) | Пакеты/Composer | Maven/Gradle (богатая) |
| Типичная ниша | I/O‑нагрузка, real‑time, API | CMS/SSR/монолиты | Enterprise, сложные домены |

---

##  Когда Node.js особенно эффективен

- Реал‑тайм: чаты, уведомления, трекинг, совместное редактирование
- Высоконагруженные API и gateway‑слой
- Streaming/прокси/агрегация данных
- Serverless/микросервисы, где важны скорость деплоя и холодный старт

---

##  Итог

- Node.js силён там, где доминирует I/O и важна реактивность/real‑time.
- Единый язык снижает когнитивную нагрузку команды.
- Для CPU‑нагрузок применяйте воркеры/кластеризацию или выносите в отдельные сервисы.

##  ЗАДАЧИ

Задачи для практики: `сравнение технологий, неблокирующий I/O, Event Loop, npm`

---

###  Задача 1: Выбор технологии под сценарий
Какую технологию выбрать и почему?
- А) Чат с тысячами одновременных соединений
- Б) Тяжёлая отчётность с сложными расчётами CPU
- В) Корпоративная ERP с жёсткими транзакциями и доменной логикой
- Г) Контентный сайт/блог с SSR и CMS

<details>
<summary> Решение</summary>

- А) Node.js (real‑time, WebSocket, I/O)
- Б) Java (CPU‑bound, инструменты JVM) или выделенный сервис на Go/Rust + Node gateway
- В) Java (богатая экосистема enterprise, типизация, транзакции)
- Г) PHP (CMS‑экосистема) или Node.js (Next.js) — зависит от требований

</details>

---

###  Задача 2: Переписать блокирующий код на неблокирующий
Есть сервер, читающий файл синхронно `fs.readFileSync`. Перепишите на промисы и верните корректные заголовки.

<details>
<summary> Решение</summary>

Шаги:
1) Подготовьте данные
```bash
echo "hello from data" > data.txt
```

2) Реализуйте сервер на промисах
```javascript
// server.js (ESM)
import http from 'http';
import { readFile } from 'fs/promises';

const server = http.createServer(async (req, res) => {
  if (req.url === '/data') {
    try {
      const text = await readFile('data.txt', 'utf-8');
      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end(text);
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
      return res.end(JSON.stringify({ error: 'read error' }));
    }
  }
  res.writeHead(404).end();
});

server.listen(3000, () => console.log('http://localhost:3000'));
```

3) Проверьте ответы
```bash
node server.js
curl -s http://localhost:3000/data
curl -i http://localhost:3000/unknown
```

</details>

---

###  Задача 3: Порядок Event Loop
Выведите порядок: `console.log`, `setTimeout(0)`, `Promise.resolve().then`, `setImmediate`.

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
Ожидаемо (упрощённо): `sync → microtask → timeout/immediate` (конкретный порядок timeout/immediate зависит от фазы цикла и среды OS/Node).

</details>

---

###  Задача 4: Мини‑WebSocket сервер
Поднимите echo‑сервер на `ws`, который возвращает клиенту полученные сообщения.

<details>
<summary> Решение</summary>

```bash
npm init -y
npm install ws
```

```javascript
// server-ws.js
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });
wss.on('connection', (ws) => {
  ws.on('message', (msg) => ws.send(`echo: ${msg}`));
});
```

Мини‑клиент для проверки:
```javascript
// client-ws.js
import WebSocket from 'ws';

const ws = new WebSocket('ws://localhost:8080');
ws.on('open', () => ws.send('ping'));
ws.on('message', (data) => {
  console.log('recv:', data.toString());
  ws.close();
});
```

Запуск:
```bash
node server-ws.js &
node client-ws.js
```
Ожидаемо: клиент увидит `recv: echo: ping`.

</details>

---

###  Задача 5: Подбор npm‑пакетов
Выберите пакеты для: логирования, валидации, доступа к Postgres, rate limiting. Обоснуйте выбор.

<details>
<summary> Решение</summary>

Рекомендуемые пакеты и минимальные примеры:

1) Логирование — `pino`
```bash
npm i pino
```
```javascript
import pino from 'pino';
const logger = pino();
logger.info({ userId: 1 }, 'user logged in');
```

2) Валидация — `zod`
```bash
npm i zod
```
```javascript
import { z } from 'zod';
const User = z.object({ name: z.string(), age: z.number().int().min(0) });
const parsed = User.parse({ name: 'Nick', age: 20 });
```

3) Postgres — `pg`
```bash
npm i pg
```
```javascript
import { Client } from 'pg';
const client = new Client({ connectionString: process.env.DATABASE_URL });
await client.connect();
const rows = (await client.query('select now()')).rows;
await client.end();
```

4) Rate limiting — `rate-limiter-flexible`
```bash
npm i rate-limiter-flexible
```
```javascript
import http from 'http';
import { RateLimiterMemory } from 'rate-limiter-flexible';

const limiter = new RateLimiterMemory({ points: 5, duration: 1 });

http.createServer(async (req, res) => {
  try {
    await limiter.consume(req.socket.remoteAddress || 'anon');
    res.writeHead(200).end('ok');
  } catch {
    res.writeHead(429).end('Too Many Requests');
  }
}).listen(3009);
```

</details>

---

###  Задача 6: CPU‑нагрузка без блокировки
Вынесите тяжёлую функцию в воркер‑поток, чтобы не блокировать основной Event Loop.

<details>
<summary> Решение</summary>

```javascript
// main.js
import { Worker } from 'node:worker_threads';

function runHeavy(input) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL('./worker.js', import.meta.url));
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
import { parentPort } from 'node:worker_threads';

parentPort.on('message', (n) => {
  // имитация тяжёлой работы
  let x = 0;
  for (let i = 0; i < 5e8; i++) x += i * n;
  parentPort.postMessage(x);
});
```

Запуск:
```bash
node main.js
```
Ожидаемо: увидите время выполнения и числовой результат без блокировки основного цикла.

</details>

---

 Эти задачи помогут закрепить понимание особенностей Node.js, отличий от PHP/Java и практических аспектов Event Loop и неблокирующего I/O.

---