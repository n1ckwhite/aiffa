#  Секция scripts в package.json

Для определения скриптов, которые будут запущены на определённых этапах жизненного цикла проекта, в файле `package.json` используется секция **`scripts`**.

---

##  Секция `scripts`

В этой секции вы можете определить пользовательские команды, которые можно запускать с помощью `npm run <имя_скрипта>`. Это позволяет вам автоматизировать различные задачи, такие как сборка проекта, запуск тестов, запуск серверов и т.д.

###  **Основные скрипты**

```json
{
  "scripts": {
    "start": "node server.js",
    "test": "jest",
    "build": "webpack --mode production",
    "dev": "webpack serve --mode development"
  }
}
```

В этом примере:
* **`start`**: Запускает приложение с помощью Node.js.
* **`test`**: Запускает тесты с использованием Jest.
* **`build`**: Собирает проект с использованием Webpack в режиме production.
* **`dev`**: Запускает сервер разработки с помощью Webpack в режиме разработки.

---

##  Специальные скрипты

Кроме пользовательских скриптов, есть также несколько предопределённых скриптов, которые npm будет автоматически выполнять на определённых этапах:

###  **pre и post скрипты**

* **`pre<имя_скрипта>`**: Выполняется перед запуском указанного скрипта.
* **`post<имя_скрипта>`**: Выполняется после завершения указанного скрипта.

```json
{
  "scripts": {
    "pretest": "echo 'Preparing to run tests...'",
    "test": "jest",
    "posttest": "echo 'Tests completed.'"
  }
}
```

В этом случае перед запуском тестов будет выведено сообщение "Preparing to run tests...", а после завершения тестов — "Tests completed."

---

##  Запуск скриптов

###  **Стандартные команды**

```bash
# Запуск скрипта start
npm start

# Запуск скрипта test
npm test

# Запуск пользовательского скрипта
npm run build
npm run dev
```

###  **Скрипты с параметрами**

```json
{
  "scripts": {
    "build": "webpack --mode production",
    "build:dev": "webpack --mode development",
    "test:watch": "jest --watch",
    "lint": "eslint src/",
    "lint:fix": "eslint src/ --fix"
  }
}
```

---

##  Примеры использования

###  **Веб-приложение**

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "build": "webpack --mode production",
    "test": "jest",
    "test:watch": "jest --watch",
    "lint": "eslint src/",
    "lint:fix": "eslint src/ --fix",
    "format": "prettier --write src/"
  }
}
```

###  **React приложение**

```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "dev": "react-scripts start"
  }
}
```

###  **Node.js API**

```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest",
    "test:coverage": "jest --coverage",
    "lint": "eslint .",
    "build": "babel src -d dist",
    "clean": "rm -rf dist",
    "prebuild": "npm run clean"
  }
}
```

---

##  Полезные паттерны

###  **Очистка перед сборкой**

```json
{
  "scripts": {
    "clean": "rm -rf dist",
    "prebuild": "npm run clean",
    "build": "webpack --mode production"
  }
}
```

###  **Проверка перед коммитом**

```json
{
  "scripts": {
    "lint": "eslint src/",
    "test": "jest",
    "precommit": "npm run lint && npm run test"
  }
}
```

###  **Различные окружения**

```json
{
  "scripts": {
    "start": "node index.js",
    "start:dev": "NODE_ENV=development node index.js",
    "start:prod": "NODE_ENV=production node index.js",
    "build:dev": "webpack --mode development",
    "build:prod": "webpack --mode production"
  }
}
```

---

##  Итог

| Тип скрипта | Назначение | Пример |
|-------------|------------|--------|
| `start` | Запуск приложения | `"start": "node index.js"` |
| `test` | Запуск тестов | `"test": "jest"` |
| `build` | Сборка проекта | `"build": "webpack"` |
| `dev` | Режим разработки | `"dev": "nodemon index.js"` |
| `pre<name>` | Выполняется перед | `"prebuild": "npm run clean"` |
| `post<name>` | Выполняется после | `"posttest": "echo 'Done'"` |

##  ЗАДАЧИ

Задачи по теме `Секция scripts в package.json`

---

###  Задача 1: Создать базовые скрипты

Создайте секцию scripts с базовыми командами для Node.js приложения:
* start - запуск приложения
* dev - режим разработки с nodemon
* test - запуск тестов

<details>
<summary> Решение</summary>

```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest"
  }
}
```

Создали базовые скрипты для запуска, разработки и тестирования.

</details>

---

###  Задача 2: Добавить pre и post скрипты

Дополните предыдущие скрипты pre и post хуками:
* pretest - очистка перед тестами
* posttest - сообщение о завершении

<details>
<summary> Решение</summary>

```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "pretest": "echo 'Cleaning before tests...'",
    "test": "jest",
    "posttest": "echo 'Tests completed successfully!'"
  }
}
```

Добавили pre и post хуки для автоматического выполнения команд.

</details>

---

###  Задача 3: Создать скрипты для веб-приложения

Создайте полный набор скриптов для веб-приложения с Express:
* start, dev, test, build, lint, format

<details>
<summary> Решение</summary>

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "build": "webpack --mode production",
    "build:dev": "webpack --mode development",
    "lint": "eslint src/",
    "lint:fix": "eslint src/ --fix",
    "format": "prettier --write src/",
    "clean": "rm -rf dist",
    "prebuild": "npm run clean"
  }
}
```

Создали полный набор скриптов для разработки, тестирования, сборки и линтинга.

</details>

---

 Секция `scripts` в `package.json` является мощным инструментом для управления задачами в вашем проекте и упрощает выполнение часто используемых команд. Правильное использование скриптов позволяет автоматизировать рутинные задачи и стандартизировать рабочий процесс.

---
