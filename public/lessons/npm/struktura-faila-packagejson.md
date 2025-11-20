#  Структура файла package.json

Файл `package.json` является важной частью любого проекта на Node.js и используется для управления зависимостями, метаданными проекта и конфигурацией. Вот основные элементы структуры файла `package.json`:

---

##  Основные поля в package.json

###  1. **name**

* Название вашего пакета или проекта. Должно быть уникальным, если вы планируете публиковать его в NPM.
* Пример: `"name": "my-awesome-project"`

###  2. **version**

* Версия вашего пакета, следуя семантическому версионированию (semver). Обычно состоит из трех чисел: Major.Minor.Patch.
* Пример: `"version": "1.0.0"`

###  3. **description**

* Краткое описание вашего проекта или пакета.
* Пример: `"description": "A simple project that does awesome things."`

###  4. **main**

* Указывает основной файл вашего проекта (например, точка входа). Это файл, который будет загружаться при импорте вашего пакета.
* Пример: `"main": "index.js"`

###  5. **scripts**

* Объект, содержащий команды, которые можно выполнять через NPM. Например, вы можете определить команды для тестирования, сборки и запуска приложения.

```json
"scripts": {
  "start": "node index.js",
  "test": "jest",
  "build": "webpack",
  "dev": "nodemon index.js"
}
```

###  6. **keywords**

* Массив ключевых слов, которые описывают ваш пакет. Это может помочь другим пользователям найти ваш пакет в NPM.
* Пример: `"keywords": ["node", "npm", "example"]`

###  7. **author**

* Имя автора или команды, создавшей проект.
* Пример: `"author": "John Doe"`

###  8. **license**

* Лицензия, под которой распространяется ваш проект. Например, MIT, ISC и другие.
* Пример: `"license": "MIT"`

###  9. **dependencies**

* Объект, перечисляющий зависимости вашего проекта, которые необходимы для его работы. Каждое имя пакета связано с его версией.

```json
"dependencies": {
  "express": "^4.17.1",
  "mongoose": "^5.10.9",
  "lodash": "^4.17.21"
}
```

###  10. **devDependencies**

* Объект, аналогичный `dependencies`, но предназначенный для зависимостей, используемых только во время разработки (например, тестовые фреймворки, сборщики и т.д.).

```json
"devDependencies": {
  "jest": "^26.6.0",
  "webpack": "^5.24.2",
  "eslint": "^7.32.0"
}
```

###  11. **peerDependencies**

* Зависимости, которые ваш пакет ожидает быть установлены в родительском проекте. Это полезно для библиотек, которые работают с другими библиотеками.

```json
"peerDependencies": {
  "react": "^17.0.0"
}
```

###  12. **engines**

* Указывает версии Node.js или других окружений, которые поддерживает ваш проект.

```json
"engines": {
  "node": ">=12.0.0",
  "npm": ">=6.0.0"
}
```

---

##  Пример файла package.json

Вот пример полного файла `package.json`:

```json
{
  "name": "my-awesome-project",
  "version": "1.0.0",
  "description": "A simple project that does awesome things.",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "jest",
    "build": "webpack",
    "dev": "nodemon index.js"
  },
  "keywords": ["node", "npm", "example"],
  "author": "John Doe",
  "license": "MIT",
  "dependencies": {
    "express": "^4.17.1",
    "mongoose": "^5.10.9"
  },
  "devDependencies": {
    "jest": "^26.6.0",
    "webpack": "^5.24.2"
  },
  "peerDependencies": {
    "react": "^17.0.0"
  },
  "engines": {
    "node": ">=12.0.0"
  }
}
```

---

##  Итог

| Поле | Назначение | Пример |
|------|------------|--------|
| `name` | Название проекта | `"my-project"` |
| `version` | Версия пакета | `"1.0.0"` |
| `description` | Описание проекта | `"Описание проекта"` |
| `main` | Точка входа | `"index.js"` |
| `scripts` | Команды для запуска | `"start": "node index.js"` |
| `dependencies` | Продакшн зависимости | `"express": "^4.17.1"` |
| `devDependencies` | Зависимости для разработки | `"jest": "^26.6.0"` |

##  ЗАДАЧИ

Задачи по теме `Структура файла package.json`

---

###  Задача 1: Создать базовую структуру package.json

Создайте минимальный файл `package.json` с полями `name`, `version`, `description` и `main`.

<details>
<summary> Решение</summary>

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "Мой первый проект",
  "main": "index.js"
}
```

Создали базовую структуру с обязательными полями.

</details>

---

###  Задача 2: Добавить скрипты и зависимости

Дополните package.json скриптами для запуска и тестирования, а также добавьте зависимость express.

<details>
<summary> Решение</summary>

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "Мой первый проект",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.17.1"
  }
}
```

Добавили скрипты для запуска и тестирования, а также зависимость express.

</details>

---

###  Задача 3: Создать полный package.json

Создайте полный файл package.json с метаданными, зависимостями и devDependencies.

<details>
<summary> Решение</summary>

```json
{
  "name": "my-web-app",
  "version": "1.0.0",
  "description": "Веб-приложение на Node.js",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest",
    "build": "webpack"
  },
  "keywords": ["node", "express", "web"],
  "author": "Ваше имя",
  "license": "MIT",
  "dependencies": {
    "express": "^4.17.1",
    "mongoose": "^5.10.9"
  },
  "devDependencies": {
    "nodemon": "^2.0.12",
    "jest": "^26.6.0",
    "webpack": "^5.24.2"
  },
  "engines": {
    "node": ">=12.0.0"
  }
}
```

Создали полный package.json со всеми необходимыми полями и зависимостями.

</details>

---

 Знание структуры файла `package.json` позволяет правильно организовать Node.js проект, управлять зависимостями и настраивать скрипты для автоматизации разработки.

---
