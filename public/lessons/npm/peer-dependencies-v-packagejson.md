#  Peer dependencies в package.json

"Peer dependencies" (пиринговые зависимости) — это специальный тип зависимостей в файле `package.json`, который указывает, что определённый пакет требует наличие другой библиотеки в окружении, но не устанавливает её автоматически. Это особенно полезно в случаях, когда вы разрабатываете библиотеку или плагин, которые должны работать с определённой версией другой библиотеки.

---

##  Когда использовать peer dependencies

###  **1. Плагины и расширения**

Если вы создаёте библиотеку или плагин, который зависит от другой библиотеки (например, плагин для React), вам следует указать эту зависимость как "peer dependency". Это гарантирует, что пользователь вашей библиотеки установит нужную версию зависимости, чтобы избежать конфликта версий.

```json
{
  "name": "react-modal-plugin",
  "version": "1.0.0",
  "peerDependencies": {
    "react": "^17.0.0",
    "react-dom": "^17.0.0"
  }
}
```

###  **2. Совместимость версий**

Если ваша библиотека или пакет требует конкретной версии другой библиотеки или диапазона версий, использование "peer dependencies" помогает обеспечить, что пользователи вашего пакета установят соответствующую версию, которая будет совместима с вашим кодом.

```json
{
  "name": "vue-router-plugin",
  "version": "1.0.0",
  "peerDependencies": {
    "vue": "^3.0.0"
  }
}
```

###  **3. Избежание дублирования**

В случае, если несколько библиотек зависят от одной и той же библиотеки, использование "peer dependencies" помогает избежать ситуации, когда разные версии одной и той же библиотеки могут быть установлены в проекте, что может привести к конфликтам.

```json
{
  "name": "webpack-loader",
  "version": "1.0.0",
  "peerDependencies": {
    "webpack": "^5.0.0"
  }
}
```

---

##  Когда НЕ использовать peer dependencies

###  **1. Обычные приложения**

Для обычных приложений (не библиотек) peer dependencies обычно не нужны. Используйте обычные `dependencies` для пакетов, которые нужны вашему приложению.

```json
{
  "name": "my-web-app",
  "version": "1.0.0",
  "dependencies": {
    "express": "^4.17.1",
    "mongoose": "^5.10.9"
  }
}
```

###  **2. Внутренние зависимости**

Если пакет является внутренней зависимостью вашего проекта и не предназначен для публикации, peer dependencies не нужны.

```json
{
  "name": "internal-utils",
  "version": "1.0.0",
  "dependencies": {
    "lodash": "^4.17.21"
  }
}
```

###  **3. Независимые библиотеки**

Если ваша библиотека не зависит от других библиотек или может работать независимо, peer dependencies не требуются.

```json
{
  "name": "utility-functions",
  "version": "1.0.0",
  "dependencies": {
    "moment": "^2.29.4"
  }
}
```

---

##  Примеры использования

###  **React плагин**

```json
{
  "name": "react-datepicker",
  "version": "2.0.0",
  "peerDependencies": {
    "react": "^16.8.0 || ^17.0.0 || ^18.0.0",
    "react-dom": "^16.8.0 || ^17.0.0 || ^18.0.0"
  },
  "dependencies": {
    "date-fns": "^2.29.3"
  }
}
```

###  **Webpack loader**

```json
{
  "name": "babel-loader",
  "version": "8.2.0",
  "peerDependencies": {
    "webpack": "^4.0.0 || ^5.0.0",
    "@babel/core": "^7.0.0"
  },
  "dependencies": {
    "loader-utils": "^2.0.0"
  }
}
```

###  **Vue компонент**

```json
{
  "name": "vue-chart-component",
  "version": "1.0.0",
  "peerDependencies": {
    "vue": "^3.0.0",
    "chart.js": "^3.0.0"
  }
}
```

---

##  Как это работает

###  **Установка и проверка**

Когда пользователь устанавливает вашу библиотеку, npm проверяет "peer dependencies" и выводит предупреждение, если они не установлены. Однако, в отличие от обычных зависимостей, npm не устанавливает их автоматически.

```bash
npm install react-modal-plugin
# Предупреждение: react-modal-plugin@1.0.0 requires a peer of react@^17.0.0
```

###  **Разрешение конфликтов**

Если в проекте уже установлена несовместимая версия peer dependency, npm выдаст предупреждение:

```bash
npm install react-modal-plugin
# Предупреждение: react-modal-plugin@1.0.0 requires a peer of react@^17.0.0 but none is installed
```

---

##  Сравнение типов зависимостей

###  **dependencies vs peerDependencies**

| Тип | Автоматическая установка | Назначение | Пример |
|-----|-------------------------|------------|--------|
| `dependencies` |  Да | Пакеты, необходимые для работы | express, lodash |
| `peerDependencies` |  Нет | Требования к окружению | react, vue |

###  **Когда что использовать**

```json
{
  "name": "my-library",
  "version": "1.0.0",
  "dependencies": {
    "lodash": "^4.17.21"        // Нужен для работы библиотеки
  },
  "peerDependencies": {
    "react": "^17.0.0"          // Требуется в проекте пользователя
  },
  "devDependencies": {
    "jest": "^26.6.0"           // Нужен только для разработки
  }
}
```

---

##  Итог

| Сценарий | Использовать peerDependencies | Причина |
|----------|------------------------------|---------|
| Создание плагина для React |  Да | Избежание конфликтов версий |
| Обычное веб-приложение |  Нет | Используйте dependencies |
| Библиотека для Vue |  Да | Совместимость с Vue |
| Утилитарная библиотека |  Нет | Независимая работа |
| Webpack loader |  Да | Совместимость с Webpack |

##  ЗАДАЧИ

Задачи по теме `Peer dependencies в package.json`

---

###  Задача 1: Определить, нужны ли peer dependencies

Определите, нужны ли peer dependencies для следующих пакетов:

* `react-router` - роутинг для React приложений
* `express-server` - веб-сервер на Express
* `vue-chart` - компонент для Vue с Chart.js
* `utility-functions` - набор утилитарных функций

<details>
<summary> Решение</summary>

```json
// react-router - НУЖНЫ peer dependencies
{
  "peerDependencies": {
    "react": "^16.8.0 || ^17.0.0 || ^18.0.0",
    "react-dom": "^16.8.0 || ^17.0.0 || ^18.0.0"
  }
}

// express-server - НЕ нужны peer dependencies
{
  "dependencies": {
    "express": "^4.17.1"
  }
}

// vue-chart - НУЖНЫ peer dependencies
{
  "peerDependencies": {
    "vue": "^3.0.0",
    "chart.js": "^3.0.0"
  }
}

// utility-functions - НЕ нужны peer dependencies
{
  "dependencies": {
    "lodash": "^4.17.21"
  }
}
```

**Объяснение:**
* Плагины и компоненты для фреймворков нуждаются в peer dependencies
* Обычные приложения и утилиты используют обычные dependencies

</details>

---

###  Задача 2: Создать package.json для React плагина

Создайте package.json для плагина, который добавляет функциональность в React приложения.

<details>
<summary> Решение</summary>

```json
{
  "name": "react-notification-plugin",
  "version": "1.0.0",
  "description": "Плагин для уведомлений в React",
  "main": "index.js",
  "peerDependencies": {
    "react": "^16.8.0 || ^17.0.0 || ^18.0.0",
    "react-dom": "^16.8.0 || ^17.0.0 || ^18.0.0"
  },
  "dependencies": {
    "classnames": "^2.3.1"
  },
  "devDependencies": {
    "jest": "^26.6.0",
    "eslint": "^7.32.0"
  }
}
```

**Объяснение:**
* `peerDependencies` для React - плагин работает с React
* `dependencies` для classnames - внутренняя зависимость плагина
* `devDependencies` для инструментов разработки

</details>

---

###  Задача 3: Определить неправильное использование

Найдите ошибки в использовании peer dependencies:

```json
{
  "name": "my-web-app",
  "version": "1.0.0",
  "peerDependencies": {
    "express": "^4.17.1",
    "mongoose": "^5.10.9"
  }
}
```

<details>
<summary> Решение</summary>

**Ошибка:** Использование peerDependencies для обычного веб-приложения.

**Правильно:**
```json
{
  "name": "my-web-app",
  "version": "1.0.0",
  "dependencies": {
    "express": "^4.17.1",
    "mongoose": "^5.10.9"
  }
}
```

**Объяснение:**
* Обычные приложения должны использовать `dependencies`
* `peerDependencies` нужны только для библиотек и плагинов
* Express и Mongoose - это зависимости приложения, а не требования к окружению

</details>

---

 Использование "peer dependencies" — это хороший способ управления зависимостями, особенно в контексте создания библиотек и плагинов. Это позволяет обеспечить совместимость с другими библиотеками и избежать потенциальных конфликтов версий, что делает ваш код более устойчивым и предсказуемым для пользователей.

---
