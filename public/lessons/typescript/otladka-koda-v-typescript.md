#  Отладка кода в TypeScript

TypeScript компилируется в JavaScript, поэтому отладка во многом похожа на JS. Однако строгая типизация, Source Maps и tooling делают процесс заметно удобнее.

---

##  Короткое резюме
- **О чём**: инструменты и практики отладки TS в Node.js и браузере.
- **Зачем**: быстрее находить причины ошибок и предотвращать их до запуска.
- **Что уметь**: настраивать Source Maps, отлаживать в VS Code/Chrome, применять линтеры и тесты. 

---

##  Инструменты IDE (VS Code) 
- Подсветка ошибок типов, IntelliSense, переход по символам.
- Встроенный отладчик JS/TS: точки останова, просмотр переменных/стека, шаги по коду.
- Отлично работает совместно с Source Maps и `launch.json`.

```json
// .vscode/launch.json — пример для Node.js
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Запуск программы",
      "program": "${workspaceFolder}/src/index.ts",
      "preLaunchTask": "tsc: build - tsconfig.json",
      "outFiles": ["${workspaceFolder}/dist/**/*.js"],
      "sourceMaps": true
    }
  ]
}
```

---

##  Source Maps (карты источников) 
Позволяют отлаживать исходники TypeScript, сопоставляя их с скомпилированным JS.

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "sourceMap": true
  }
}
```

Шаги:
- Включите `sourceMap: true` и соберите проект `tsc`.
- Отлаживайте в VS Code или Chrome DevTools — увидите `.ts` файлы, ставьте breakpoints прямо в них.

---

##  Подходы к отладке 
###  Консольное логирование
```ts
function add(a: number, b: number): number {
  console.log("Arguments:", { a, b });
  return a + b;
}
```
Советы: используйте `console.table`, структурируйте объекты, логируйте ключевые ветки.

###  Breakpoints в отладчике
- Ставьте точки останова, шагайте по коду, смотрите переменные/стек.
- Работает в VS Code и Chrome DevTools при включённых Source Maps.

###  Строгая типизация как профилактика
```json
// tsconfig.json (фрагмент)
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```
Типизация ловит многие ошибки до запуска.

###  Линтеры и статический анализ
ESLint с `@typescript-eslint` выявляет проблемы стиля/ошибки раннее.

###  Unit‑тестирование
Jest + ts-jest помогает воспроизводить и фиксировать дефекты, писать регресс‑тесты.

---

##  Инструменты отладки 
###  VS Code Debugger
- Поддержка Node.js и браузеров, работа с Source Maps, удобные watch‑выражения.

###  Chrome DevTools
- Вкладка Sources → исходники `.ts` при включённых Source Maps, breakpoints, профилировщик.

###  Node.js Debugger
```bash
node --inspect dist/index.js
```
Подключайтесь DevTools или VS Code.

###  Sentry (и аналоги)
- Логирование ошибок, трассировка, алерты; загрузка Source Maps для развёрнутых стеков в проде.

---

##  Советы для эффективной отладки 
- Включайте строгую типизацию (`strict`, `noImplicitAny`, `strictNullChecks`).
- Дробите сложные функции, давайте явные имена переменным/функциям.
- Логируйте ошибки и ключевые ветки; используйте `try/catch` там, где есть риск.
- Автоматизируйте: линтеры, тесты, CI/CD — сокращают цикл обратной связи. 

##  Итог
- Source Maps позволяют отлаживать исходники `.ts` в VS Code/Chrome.
- Строгая типизация и ESLint предотвращают ошибки ещё до запуска.
- Тесты (Jest) ускоряют поиск и предотвращение регрессий.
- Совмещая инструменты, вы уменьшаете время поиска причин и повышаете надёжность. 

##  ЗАДАЧИ

Вот набор задач, чтобы лучше понять `отладку кода в TypeScript`:

---

###  Задача 1: Source Maps + отладка в VS Code
 Включите Source Maps, настройте `launch.json` и поставьте брейкпоинт в `.ts`.

```ts
// src/index.ts
function greet(name: string) {
  return `Hello, ${name}!`;
}

console.log(greet("TS"));
```

<details>
<summary> Решение</summary>

```json
// tsconfig.json
{
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "sourceMap": true,
    "strict": true
  }
}
```

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug",
      "program": "${workspaceFolder}/src/index.ts",
      "preLaunchTask": "tsc: build - tsconfig.json",
      "outFiles": ["${workspaceFolder}/dist/**/*.js"],
      "sourceMaps": true
    }
  ]
}
```

Поставьте breakpoint в `src/index.ts`, запустите конфигурацию Debug и шагайте по коду.

</details>

---

###  Задача 2: ESLint для TypeScript
 Настройте ESLint с `@typescript-eslint`, запретите неиспользуемые переменные.

```bash
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

```json
// .eslintrc.json
{
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error"
  }
}
```

<details>
<summary> Решение</summary>

Проверьте проект командой `npx eslint "src/**/*.{ts,tsx}"` и исправьте замечания.

</details>

---

###  Задача 3: Jest + ts‑jest
 Настройте Jest для TS и напишите простой тест.

```bash
npm install -D jest ts-jest @types/jest
npx ts-jest config:init
```

```ts
// src/math.ts
export function add(a: number, b: number) { return a + b; }
```

```ts
// src/math.test.ts
import { add } from "./math";

test("adds 1 + 2 = 3", () => {
  expect(add(1, 2)).toBe(3);
});
```

Запустите `npx jest` и убедитесь, что тест проходит.

---

 Эти задачи помогают закрепить настройку Source Maps и запуск отладчика, внедрение статического анализа (ESLint) и базовых юнит‑тестов (Jest), что сокращает цикл поиска и исправления ошибок и повышает надёжность кода.

---

