#  Что такое код-сплиттинг (Code Splitting)?

**Код-сплиттинг (Code Splitting)** — это техника оптимизации, которая позволяет разбивать бандлы на более мелкие части. Вместо того чтобы загружать весь код приложения в одном большом файле, код-сплиттинг позволяет загружать только те части кода, которые необходимы в данный момент времени.

---

##  Основные преимущества код-сплиттинга

###  Почему это важно:

1. **Снижение времени загрузки**
   - Браузер загружает только нужный код
   - Остальные части кода загружаются по мере необходимости

2. **Лучшее кэширование**
   - Изменения в одной части приложения не требуют повторной загрузки всего бандла
   - Пользователи получают обновления быстрее

3. **Оптимизация для производительности**
   - Улучшает пользовательский опыт
   - Особенно эффективно на медленных сетях

---

##  Как код-сплиттинг связан с бандлингом?

###  Взаимосвязь концепций:

- **Бандлинг**: Объединяет все модули и ресурсы в один или несколько файлов
- **Код-сплиттинг**: Делает бандлинг более гибким, разбивая код на части, которые могут загружаться динамически

###  Без код-сплиттинга:
Все ресурсы (CSS, JavaScript, изображения) объединяются в один файл, что может привести к большому размеру бандла.

###  С код-сплиттингом:
Код разделяется на небольшие файлы, которые могут быть загружены асинхронно.

---

##  Типы код-сплиттинга в Webpack

###  1. Разделение на несколько точек входа
Каждая точка входа создаёт отдельный бандл. Например, если у вас есть "админка" и "пользовательский интерфейс", можно создать два отдельных файла.

###  2. Динамическая загрузка
Код загружается по мере необходимости с использованием функции `import()`.

###  3. Автоматическое разделение
Webpack автоматически разбивает бандлы, например, выделяет общие библиотеки, такие как `react` и `lodash`.

---

##  Настройка код-сплиттинга в Webpack

###  1. Динамическая загрузка с использованием import()

####  Пример динамического импорта:
```javascript
// Вместо статического импорта:
import moduleA from './moduleA';

// Используем динамический импорт:
function loadModule() {
    import('./moduleA').then((moduleA) => {
        moduleA.default();
    }).catch((err) => console.error('Ошибка загрузки модуля:', err));
}
```

Webpack автоматически создаст отдельный бандл для `moduleA`.

####  Конфигурация Webpack для динамических импортов:
```javascript
module.exports = {
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js', // Именование динамических бандлов
        path: __dirname + '/dist',
    },
};
```

###  2. Автоматическое разделение с помощью SplitChunksPlugin

Webpack автоматически извлекает общие модули или библиотеки в отдельные файлы.

####  Пример настройки:
```javascript
module.exports = {
    optimization: {
        splitChunks: {
            chunks: 'all', // Разделение для всех видов импортов
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/, // Отделяем сторонние библиотеки
                    name: 'vendors',
                    chunks: 'all',
                },
                default: {
                    minChunks: 2, // Общий код, встречающийся минимум в двух модулях
                    priority: -20,
                    reuseExistingChunk: true, // Использовать существующие чанки
                },
            },
        },
    },
};
```

####  Результат:
- Отдельный файл `vendors.bundle.js` для сторонних библиотек (например, `react`, `lodash`)
- Другие общие модули автоматически выделяются в отдельные файлы

###  3. Множественные точки входа

####  Пример конфигурации:
```javascript
module.exports = {
    entry: {
        app: './src/app.js',
        admin: './src/admin.js',
    },
    output: {
        filename: '[name].bundle.js', // app.bundle.js, admin.bundle.js
        path: __dirname + '/dist',
    },
};
```

####  Результат:
- `app.bundle.js` для основной логики
- `admin.bundle.js` для админской панели

---

##  Практический пример

###  Структура файлов:

####  src/index.js:
```javascript
import _ from 'lodash';

function component() {
    const element = document.createElement('div');
    element.innerHTML = _.join(['Hello', 'Webpack'], ' ');
    return element;
}

document.body.appendChild(component());

// Динамическая загрузка
document.getElementById('loadButton').addEventListener('click', () => {
    import('./lazyModule').then(({ default: lazy }) => {
        lazy();
    });
});
```

####  src/lazyModule.js:
```javascript
export default function lazy() {
    console.log('Ленивая загрузка выполнена!');
}
```

###  Webpack конфигурация:
```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js',
        path: __dirname + '/dist',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
};
```

###  Результат:
- Главный бандл `main.bundle.js`
- Динамический бандл `lazyModule.chunk.js`, который загружается только при клике

---

##  Итог

**Код-сплиттинг** — это мощная техника, позволяющая:
- Сократить время загрузки страницы
- Улучшить кэширование
- Оптимизировать производительность

Webpack делает настройку код-сплиттинга простой, поддерживая как автоматическое разделение, так и динамическую загрузку модулей.

##  ЗАДАЧИ

Вот набор задач, чтобы лучше понять `код-сплиттинг`:

---

###  Задача 1: Анализ конфигурации SplitChunksPlugin

 Проанализируйте следующую конфигурацию Webpack и объясните, как будет происходить разделение кода.

```javascript
module.exports = {
    entry: {
        main: './src/main.js',
        admin: './src/admin.js'
    },
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].[chunkhash].js',
        path: __dirname + '/dist'
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 20000,
            maxSize: 244000,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    priority: 10,
                    chunks: 'all'
                },
                common: {
                    name: 'common',
                    minChunks: 2,
                    priority: 5,
                    reuseExistingChunk: true
                }
            }
        }
    }
};
```

<details>
<summary> Вывод</summary>

```javascript
// Анализ конфигурации SplitChunksPlugin:

// 1. Разделение по точкам входа:
// - main.bundle.js (основное приложение)
// - admin.bundle.js (админская панель)

// 2. Автоматическое разделение:
// - minSize: 20000 - минимальный размер чанка 20KB
// - maxSize: 244000 - максимальный размер чанка 244KB

// 3. Группы кэширования:
// - vendor: все node_modules в отдельный файл vendors.[chunkhash].js
// - common: общий код, используемый минимум в 2 модулях

// 4. Результат:
// - main.bundle.js, admin.bundle.js (точки входа)
// - vendors.[chunkhash].js (сторонние библиотеки)
// - common.[chunkhash].js (общий код)
// - Дополнительные чанки если размер превышает maxSize
```

</details>

---

###  Задача 2: Реализация ленивой загрузки компонентов

Создайте React компонент с ленивой загрузкой, используя динамический импорт. Компонент должен загружать тяжелую библиотеку только при необходимости.

```javascript
// LazyComponent.js
import React, { useState } from 'react';

function LazyComponent() {
    const [chartData, setChartData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const loadChart = async () => {
        setIsLoading(true);
        try {
            // Реализуйте ленивую загрузку Chart.js
            const Chart = await import('chart.js');
            // Создайте простую диаграмму
            // Обновите состояние chartData
        } catch (error) {
            console.error('Ошибка загрузки Chart.js:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <button onClick={loadChart} disabled={isLoading}>
                {isLoading ? 'Загрузка...' : 'Загрузить диаграмму'}
            </button>
            {chartData && <div>Диаграмма загружена!</div>}
        </div>
    );
}

export default LazyComponent;
```

<details>
<summary> Решение</summary>

```javascript
import React, { useState, useRef, useEffect } from 'react';

function LazyComponent() {
    const [chartData, setChartData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const canvasRef = useRef(null);

    const loadChart = async () => {
        setIsLoading(true);
        try {
            // Ленивая загрузка Chart.js
            const { Chart, registerables } = await import('chart.js');
            Chart.register(...registerables);
            
            // Создание простой диаграммы
            const ctx = canvasRef.current.getContext('2d');
            const chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Январь', 'Февраль', 'Март'],
                    datasets: [{
                        label: 'Продажи',
                        data: [12, 19, 3],
                        backgroundColor: 'rgba(54, 162, 235, 0.2)'
                    }]
                }
            });
            
            setChartData(chart);
        } catch (error) {
            console.error('Ошибка загрузки Chart.js:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <button onClick={loadChart} disabled={isLoading}>
                {isLoading ? 'Загрузка...' : 'Загрузить диаграмму'}
            </button>
            {chartData && (
                <div>
                    <canvas ref={canvasRef} width="400" height="200"></canvas>
                    <p>Диаграмма успешно загружена!</p>
                </div>
            )}
        </div>
    );
}

export default LazyComponent;
```

</details>

---

 Эти задачи помогут вам лучше понять принципы код-сплиттинга, настройку SplitChunksPlugin и реализацию ленивой загрузки в React приложениях.

---
