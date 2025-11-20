#  Что такое HMR (Hot Module Replacement)?

**Hot Module Replacement (HMR)** — это механизм, позволяющий заменять модули приложения в реальном времени без полной перезагрузки страницы. Он тесно связан с бандлингом: бандлер (чаще Webpack) отслеживает изменения исходников, пересобирает только изменённые модули и «горячо» подменяет их в уже загруженном бандле.

---

##  Зачем нужен HMR?

- ** Быстрая обратная связь**: меньше времени между изменением кода и его результатом в браузере.
- **Сохранение состояния**: состояние приложения (например, состояние компонентов, Redux store) остается между обновлениями.
- **Без полной перезагрузки**: обновляется только изменённый модуль.
- **Отлично для CSS**: изменения стилей применяются мгновенно.

---

##  Как HMR связан с бандлингом?

HMR интегрирован в процесс бандлинга:
1. Бандлер находит изменения в исходниках.
2. Пересобирает только изменённые модули (инкрементальная сборка).
3. Отправляет обновления в браузер по WebSocket.
4. Применяет изменения, не перезагружая страницу.

> В связке с Webpack это реализовано через DevServer и HMR Runtime, который «подшивает» обновления в загруженный бандл.

---

##  Как это работает по шагам

1. **DevServer** — запускается сервер разработки с HMR.
2. **WebSocket** — браузер поддерживает постоянное соединение с сервером.
3. **Diff-сборка** — пересобирается только изменившийся модуль.
4. **HMR Runtime** — принимает обновления и выполняет горячую замену.

---

##  Настройка HMR в Webpack

###  Установка
```bash
npm i -D webpack webpack-cli webpack-dev-server html-webpack-plugin
```

###  Конфигурация `webpack.dev.js`
```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        static: './dist',
        hot: true, // Включение HMR
        open: true,
        port: 3000,
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html' }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'], // Авто-HMR для CSS
            },
        ],
    },
};
```

###  Входной файл (`src/index.js`)
```javascript
import './styles.css';
import { renderApp } from './app';

renderApp();

if (module && module.hot) {
    module.hot.accept('./app', () => {
        // Точка горячей замены
        document.body.innerHTML = '';
        renderApp();
    });
}
```

###  Пример модуля (`src/app.js`)
```javascript
export function renderApp() {
    const el = document.createElement('div');
    el.textContent = 'Hello HMR!';
    document.body.appendChild(el);
}
```

###  Скрипт запуска
```json
{
  "scripts": {
    "start": "webpack serve --config webpack.dev.js"
  }
}
```

---

##  Особенности и ограничения

- **Только для разработки**: в production HMR отключён.
- **Поддержка библиотек**: не все библиотеки из коробки поддерживают HMR API.
- **Состояние**: без корректного обработчика можно потерять состояние при замене модулей.
- **CSS**: с `style-loader` обновляется без ручной настройки; для JS требуется обработчик `module.hot.accept`.

---

##  Пример: HMR для CSS

```javascript
// index.js
import './styles.css'; // Изменения подхватываются автоматически через style-loader
```

```css
/* styles.css */
body { font-family: system-ui, sans-serif; }
button { padding: 8px 12px; }
```

Измените CSS — браузер обновит стили без перезагрузки.

---

##  Итог

**HMR** — это мощный инструмент поверх бандлинга, ускоряющий цикл «изменил — увидел». Он подменяет изменённые модули в уже загруженном бандле по WebSocket, сохраняя состояние и экономя время разработки.

##  ЗАДАЧИ

Задачи, чтобы закрепить `HMR` на практике:

---

###  Задача 1: Включить HMR и сохранить состояние счётчика

Реализуйте простой счётчик и настройте HMR так, чтобы при изменении текста кнопки состояние счётчика сохранялось.

**Ожидаемое поведение:**
- Клик по кнопке увеличивает счётчик.
- Изменение текста кнопки в `app.js` не сбрасывает текущее значение счётчика.

<details>
<summary> Решение</summary>

```javascript
// src/app.js
export function mount(root, state) {
    root.innerHTML = '';
    const button = document.createElement('button');
    button.textContent = `Count: ${state.count}`; // меняйте текст в ходе разработки
    button.addEventListener('click', () => {
        state.count += 1;
        button.textContent = `Count: ${state.count}`;
    });
    root.appendChild(button);
}

// src/index.js
import { mount } from './app';

const appRoot = document.createElement('div');
document.body.appendChild(appRoot);

// состояние вне модуля app — переживает замену
const appState = { count: 0 };

mount(appRoot, appState);

if (module && module.hot) {
    module.hot.accept('./app', () => {
        // повторно монтируем, сохраняя appState
        const next = require('./app');
        next.mount(appRoot, appState);
    });
}
```
</details>

---

###  Задача 2: Настроить HMR для CSS и JS одновременно

Соберите конфигурацию, в которой:
- CSS обновляется мгновенно без перезагрузки.
- JS-модуль заменяется «горячо» с повторным рендером узла.

<details>
<summary> Решение</summary>

```javascript
// webpack.dev.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: { filename: 'bundle.js', path: path.resolve(__dirname, 'dist') },
  devServer: { static: './dist', hot: true, open: true },
  plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' }
    ]
  }
};
```

```javascript
// src/index.js
import './styles.css';
import { render } from './widget';

const root = document.querySelector('#root');
render(root);

if (module && module.hot) {
  module.hot.accept('./widget', () => {
    const next = require('./widget');
    next.render(root);
  });
}
```

```javascript
// src/widget.js
export function render(root) {
  root.innerHTML = `<h1>Widget v1</h1>`; // меняйте текст и наблюдайте HMR
}
```
</details>

---

 Эти задачи помогут отработать HMR для JS и CSS, а также научат сохранять состояние между «горячими» обновлениями.

---