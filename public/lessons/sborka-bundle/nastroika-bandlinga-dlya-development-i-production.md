#  Настройка бандлинга для development и production

**Настройка бандлинга для development и production** требует учёта различных потребностей и целей каждого окружения. Это критически важный аспект современной веб-разработки, который напрямую влияет на производительность и удобство разработки.

---

##  Различия между development и production

###  Development окружение
**Цель:** Быстрая разработка и удобная отладка

**Приоритеты:**
- Быстрая сборка
- Удобная отладка (Source Maps)
- Горячая перезагрузка (HMR)
- Читаемый код

###  Production окружение  
**Цель:** Оптимальная производительность и минимальный размер

**Приоритеты:**
- Минимизация размера бандла
- Оптимизация загрузки (code splitting, tree shaking)
- Максимальная производительность
- Эффективное кэширование

---

##  Разделение конфигурации Webpack

###  Структура файлов
Обычно разработчики создают три файла конфигурации:

```
project/
├── webpack.common.js    # Общие настройки
├── webpack.dev.js       # Настройки для разработки
├── webpack.prod.js      # Настройки для продакшена
└── package.json
```

---

##  1. Общая конфигурация (webpack.common.js)

Содержит настройки, которые одинаковы для разработки и продакшена.

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: '[name].bundle.js', // Генерация с хэшами будет в prod
        path: path.resolve(__dirname, 'dist'),
        clean: true, // Очистка директории перед сборкой
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'], // Обработчики CSS
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
    ],
};
```

---

##  2. Конфигурация для разработки (webpack.dev.js)

Добавляет инструменты, которые упрощают разработку.

```javascript
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map', // Удобная отладка
    devServer: {
        static: './dist',
        hot: true, // Горячая перезагрузка
        open: true, // Автоматически открывать браузер
        port: 3000,
    },
    optimization: {
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
    },
});
```

**Особенности development:**
- `devtool: 'inline-source-map'` — упрощает отладку
- `devServer` — обеспечивает быстрый запуск локального сервера
- `hot: true` — горячая перезагрузка модулей
- Отключены оптимизации для ускорения сборки

---

##  3. Конфигурация для продакшена (webpack.prod.js)

Включает оптимизации для минимизации и оптимальной загрузки.

```javascript
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const path = require('path');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    output: {
        filename: '[name].[contenthash].bundle.js', // Для кэширования
        path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin(), // Минификация JS
            new CssMinimizerPlugin(), // Минификация CSS
        ],
        splitChunks: {
            chunks: 'all', // Разделение кода (библиотеки в отдельные файлы)
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
    performance: {
        hints: false, // Отключение предупреждений о размере бандла
    },
});
```

**Особенности production:**
- `filename: '[name].[contenthash].bundle.js'` — добавляет хэши для эффективного кэширования
- **Минификация:**
  - `TerserPlugin` для JavaScript
  - `CssMinimizerPlugin` для CSS
- `splitChunks: { chunks: 'all' }` — автоматическое разделение кода
- Tree shaking включен автоматически в production mode

---

##  Сборка с помощью NPM-скриптов

В `package.json` настраиваем скрипты для запуска Webpack:

```json
{
  "scripts": {
    "start": "webpack serve --config webpack.dev.js",
    "build": "webpack --config webpack.prod.js",
    "build:analyze": "webpack --config webpack.prod.js --analyze"
  }
}
```

**Команды:**
- `npm run start` — запускает development-сборку с DevServer
- `npm run build` — создаёт оптимизированный бандл для продакшена
- `npm run build:analyze` — сборка с анализом размера бандла

> Примечание: надёжнее подключать анализатор по флагу окружения и читать `process.env.ANALYZE` в конфиге.

```bash
cross-env ANALYZE=true webpack --config webpack.prod.js
```

---

##  Сравнение Development и Production

| Характеристика | Development | Production |
|---|---|---|
| **Mode** | `development` | `production` |
| **Source Maps** | `inline-source-map` | `source-map` |
| **Минификация** |  Нет |  Да (JS, CSS) |
| **Hot Module Replacement** |  Да |  Нет |
| **Хэширование** |  Нет |  `contenthash` |
| **Tree Shaking** |  Включён (но не всегда используется) |  Активно используется |
| **Code Splitting** |  По необходимости |  Используется автоматически |
| **Скорость сборки** |  Быстрая |  Медленнее (из-за оптимизаций) |

---

##  Пример структуры проекта

```
my-app/
├── src/
│   ├── index.js
│   ├── index.html
│   └── styles.css
├── webpack.common.js
├── webpack.dev.js
├── webpack.prod.js
├── package.json
└── dist/
    ├── main.abc123.bundle.js
    ├── vendors.def456.bundle.js
    └── index.html
```

---

##  Итог

**Development:** Оптимизирован для быстроты, удобства отладки и тестирования.

**Production:** Ориентирован на производительность и минимизацию размера бандла.

Разделение конфигурации с помощью `webpack-merge` позволяет переиспользовать общие настройки, что упрощает управление сборкой и обеспечивает оптимальные условия для каждого окружения.

##  ЗАДАЧИ

Вот набор задач, чтобы лучше понять `настройку бандлинга для development и production`:

---

###  Задача 1: Создание базовой конфигурации Webpack

Создайте проект с разделением конфигурации Webpack для development и production. Проект должен включать:

**Требования:**
- Обработку JavaScript (ES6+)
- Обработку CSS
- Генерацию HTML
- Source maps для отладки

**Файлы для создания:**
- `webpack.common.js`
- `webpack.dev.js` 
- `webpack.prod.js`
- `package.json` с необходимыми зависимостями

<details>
<summary> Решение</summary>

```javascript
// webpack.common.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
    ],
};

// webpack.dev.js
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
        hot: true,
        open: true,
    },
});

// webpack.prod.js
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].bundle.js',
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
        splitChunks: {
            chunks: 'all',
        },
    },
});
```

</details>

---

###  Задача 2: Оптимизация загрузки и кэширования

Настройте Webpack для эффективного кэширования и разделения кода.

**Требования:**
- Разделение vendor (библиотек) и application кода
- Динамические импорты для code splitting
- Настройка long-term кэширования
- Оптимизация загрузки изображений

**Дополнительные настройки:**
- `splitChunks` для разделения vendor кода
- `[contenthash]` для имен файлов
- Оптимизация изображений

<details>
<summary> Решение</summary>

```javascript
// webpack.prod.js с расширенными настройками
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].bundle.js',
        chunkFilename: '[name].[contenthash].chunk.js',
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                    priority: 10,
                },
                common: {
                    name: 'common',
                    minChunks: 2,
                    chunks: 'all',
                    priority: 5,
                },
            },
        },
        runtimeChunk: 'single',
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif|svg)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 8 * 1024, // 8KB
                    },
                },
            },
        ],
    },
});
```

</details>

---

###  Задача 3: Расширенная оптимизация production

Создайте production-конфигурацию с продвинутыми оптимизациями.

**Требования:**
- Tree shaking для удаления неиспользуемого кода
- Минификация CSS с извлечением критических стилей
- Оптимизация шрифтов
- Настройка gzip сжатия
- Анализ размера бандла

**Дополнительные плагины:**
- `MiniCssExtractPlugin` для извлечения CSS
- `CompressionWebpackPlugin` для gzip
- `BundleAnalyzerPlugin` для анализа размера

<details>
<summary> Решение</summary>

```javascript
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    output: {
        filename: '[name].[contenthash].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new CompressionWebpackPlugin({
            algorithm: 'gzip',
            test: /\.(js|css|html|svg)$/,
            threshold: 10240,
            minRatio: 0.8,
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
});
```

</details>

---

 Эти задачи помогут вам лучше понять принципы настройки бандлинга для разных окружений, оптимизацию производительности и управление конфигурацией Webpack.

---
