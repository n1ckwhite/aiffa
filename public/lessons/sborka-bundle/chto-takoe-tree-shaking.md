#  Что такое Tree Shaking?

**Tree Shaking** — это процесс удаления "мертвого" кода из бандла. Под "мертвым" кодом подразумевается код, который импортирован, но фактически не используется в приложении. Tree Shaking оптимизирует финальный бандл, делая его меньше, что улучшает производительность приложения.

---

##  Происхождение термина

###  Аналогия с деревом:

- **Дерево** — это весь ваш код, включая зависимости
- **Tree Shaking** удаляет "сухие листья" (неиспользуемый код), оставляя только полезные части

---

##  Как Tree Shaking связано с бандлингом?

###  Проблема без Tree Shaking:

Бандлинг объединяет весь код (включая зависимости) в один или несколько файлов. Если весь импортированный код включён в бандл, это может привести к его избыточности.

###  Решение с Tree Shaking:

Tree Shaking помогает решить эту проблему, исключая неиспользуемые части кода из финального бандла.

---

##  Условия для работы Tree Shaking

###  1. Использование ES-модулей (ES Modules)

Tree Shaking работает только с `import` и `export`. CommonJS (`require`/`module.exports`) не поддерживает эту оптимизацию.

####  Пример правильного использования:
```javascript
// utils.js
export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}

// main.js
import { add } from './utils'; // subtract не используется и будет удалён
console.log(add(2, 3));
```

###  2. Поддержка со стороны бандлера

Webpack и другие современные бандлеры (Rollup, Vite) поддерживают Tree Shaking.

###  3. Минификация

Tree Shaking лучше работает в сочетании с минификаторами, такими как Terser, которые удаляют оставшиеся следы неиспользуемого кода.

---

##  Настройка Tree Shaking в Webpack

###  Базовая конфигурация:

Tree Shaking включён по умолчанию в Webpack, если используется режим production.

####  Пример конфигурации:
```javascript
module.exports = {
    mode: 'production', // Включает Tree Shaking автоматически
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist',
    },
    optimization: {
        usedExports: true, // Явное указание на использование Tree Shaking
    },
};
```

---

##  Как проверить работу Tree Shaking?

###  Пошаговая проверка:

1. **Создайте неиспользуемый код:**
```javascript
// src/utils.js
export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}

// src/index.js
import { add } from './utils';
console.log(add(1, 2)); // subtract не используется
```

2. **Соберите проект с Webpack:**
   - Выполните сборку в режиме production
   - Проверьте содержимое бандла: в файле `bundle.js` функция `subtract` отсутствует

---

##  Советы по использованию Tree Shaking

###  1. Структурируйте код с ES-модулями

- Используйте `import` и `export`
- Избегайте `require` и `module.exports`

###  2. Проверяйте сторонние библиотеки

- Некоторые библиотеки не оптимизированы для Tree Shaking
- Ищите модули с поддержкой ES6 (`"sideEffects": false` в package.json)

###  3. Используйте настройки Webpack

- Убедитесь, что в конфигурации Webpack указано `optimization.usedExports: true`

###  4. Сочетайте с минификацией

- Добавьте минификатор, такой как Terser, для полной очистки неиспользуемого кода

---

##  Пример конфигурации с Terser

####  Полная конфигурация:
```javascript
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist',
    },
    optimization: {
        usedExports: true, // Включение Tree Shaking
        minimize: true, // Минификация
        minimizer: [new TerserPlugin()],
    },
};
```

---

##  Tree Shaking и "sideEffects"

###  Поле sideEffects в package.json:

`sideEffects` — это поле в package.json, которое указывает, есть ли в модуле побочные эффекты при импорте. Если их нет, Webpack может безопасно удалить неиспользуемые части.

####  Пример без побочных эффектов:
```json
{
  "sideEffects": false
}
```

####  Пример с исключениями:
```json
{
  "sideEffects": ["*.css"]
}
```

---

##  Итог

**Tree Shaking** — это мощная техника для удаления неиспользуемого кода и оптимизации размера бандла. Это особенно важно в больших приложениях, где каждый килобайт на счету. Современные бандлеры, такие как Webpack, делают настройку Tree Shaking простой и эффективной, особенно в сочетании с минификацией.

##  ЗАДАЧИ

Вот набор задач, чтобы лучше понять `Tree Shaking`:

---

###  Задача 1: Анализ эффективности Tree Shaking

 Проанализируйте следующие примеры кода и определите, какой код будет удален Tree Shaking, а какой останется.

```javascript
// utils.js
export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}

export function multiply(a, b) {
    return a * b;
}

export const PI = 3.14159;

// main.js
import { add, multiply } from './utils';

function calculate(a, b) {
    return add(a, b) * 2;
}

console.log(calculate(5, 3));
console.log(multiply(4, 5));
```

<details>
<summary> Вывод</summary>

```javascript
// Анализ Tree Shaking:

// Код, который ОСТАНЕТСЯ в бандле:
// - функция add() (используется в calculate)
// - функция multiply() (используется напрямую)
// - функция calculate() (определена и используется)

// Код, который будет УДАЛЕН Tree Shaking:
// - функция subtract() (импортируется, но не используется)
// - константа PI (импортируется, но не используется)

// Результат: бандл будет содержать только используемый код,
// что уменьшит его размер примерно на 30-40%
```

</details>

---

###  Задача 2: Создание конфигурации для максимальной оптимизации

Создайте конфигурацию Webpack, которая обеспечивает максимальную эффективность Tree Shaking и минификации.

```javascript
// webpack.config.js
module.exports = {
    // Реализуйте конфигурацию для максимальной оптимизации
};
```

<details>
<summary> Решение</summary>

```javascript
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: '[name].[contenthash].js',
        path: __dirname + '/dist',
        clean: true
    },
    optimization: {
        usedExports: true, // Включение Tree Shaking
        sideEffects: false, // Указываем, что нет побочных эффектов
        minimize: true, // Включение минификации
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true, // Удаляем console.log
                        drop_debugger: true, // Удаляем debugger
                        pure_funcs: ['console.log'] // Удаляем вызовы console.log
                    },
                    mangle: {
                        toplevel: true // Переименовываем переменные верхнего уровня
                    }
                },
                extractComments: false // Не извлекаем комментарии
            })
        ],
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {
                                modules: false // Важно для Tree Shaking
                            }]
                        ]
                    }
                }
            }
        ]
    }
};
```

</details>

---

 Эти задачи помогут вам лучше понять принципы Tree Shaking, его настройку в Webpack и способы достижения максимальной оптимизации бандлов.

---
