#  useMemo хук

**useMemo** — это хук в React, который используется для мемоизации вычислений, чтобы избежать повторного выполнения затратных вычислений при каждом рендере компонента. Это помогает оптимизировать производительность приложения, особенно при работе с тяжелыми вычислениями или большими объемами данных.

---

##  Что такое useMemo?

###  Основные характеристики:
- **Мемоизация вычислений** — кэширование результатов дорогих операций
- **Оптимизация производительности** — предотвращение ненужных пересчетов
- **Контроль зависимостей** — пересчет только при изменении зависимостей
- **Предотвращение ререндеров** — стабильные ссылки на объекты

###  Базовый синтаксис:
```jsx
import React, { useMemo } from 'react';

function MyComponent({ data }) {
  const expensiveValue = useMemo(() => {
    // Дорогие вычисления
    return heavyCalculation(data);
  }, [data]); // Массив зависимостей

  return <div>{expensiveValue}</div>;
}
```

---

##  Как работает useMemo?

###  Принцип работы:
1. **Первый рендер** — выполняется функция и результат кэшируется
2. **Последующие рендеры** — проверяются зависимости
3. **Если зависимости не изменились** — возвращается кэшированный результат
4. **Если зависимости изменились** — функция выполняется заново

###  Пример без useMemo:
```jsx
import React, { useState } from 'react';

function BadComponent({ numbers }) {
  const [count, setCount] = useState(0);

  //  Плохо: вычисления выполняются при каждом рендере
  const expensiveValue = numbers.reduce((sum, num) => {
    console.log('Выполняются дорогие вычисления...');
    return sum + num * num;
  }, 0);

  return (
    <div>
      <p>Результат: {expensiveValue}</p>
      <p>Счетчик: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Увеличить счетчик
      </button>
    </div>
  );
}
```

###  Пример с useMemo:
```jsx
import React, { useState, useMemo } from 'react';

function GoodComponent({ numbers }) {
  const [count, setCount] = useState(0);

  //  Хорошо: вычисления выполняются только при изменении numbers
  const expensiveValue = useMemo(() => {
    console.log('Выполняются дорогие вычисления...');
    return numbers.reduce((sum, num) => sum + num * num, 0);
  }, [numbers]);

  return (
    <div>
      <p>Результат: {expensiveValue}</p>
      <p>Счетчик: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Увеличить счетчик
      </button>
    </div>
  );
}
```

---

##  Типы использования useMemo

###  1. Оптимизация тяжелых вычислений
**Мемоизация результатов сложных математических операций.**

####  Пример:
```jsx
import React, { useState, useMemo } from 'react';

function FibonacciCalculator({ n }) {
  const [count, setCount] = useState(0);

  const fibonacci = useMemo(() => {
    console.log(`Вычисление числа Фибоначчи для n=${n}`);
    
    if (n <= 1) return n;
    
    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) {
      const temp = a + b;
      a = b;
      b = temp;
    }
    
    return b;
  }, [n]);

  return (
    <div>
      <h3>Число Фибоначчи F({n}) = {fibonacci}</h3>
      <p>Счетчик: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Увеличить (не влияет на вычисления)
      </button>
    </div>
  );
}
```

###  2. Мемоизация объектов и массивов
**Предотвращение создания новых объектов при каждом рендере.**

####  Пример:
```jsx
import React, { useState, useMemo } from 'react';

const ExpensiveChild = React.memo(({ config, data }) => {
  console.log('Рендеринг ExpensiveChild');
  return (
    <div>
      <h3>Конфигурация: {config.theme}</h3>
      <p>Обработанных элементов: {data.length}</p>
    </div>
  );
});

function ParentComponent() {
  const [theme, setTheme] = useState('light');
  const [count, setCount] = useState(0);
  const [items] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  // Мемоизация объекта конфигурации
  const config = useMemo(() => ({
    theme,
    fontSize: 16,
    colors: {
      primary: theme === 'light' ? '#000' : '#fff',
      secondary: theme === 'light' ? '#666' : '#ccc'
    }
  }), [theme]);

  // Мемоизация обработанных данных
  const processedData = useMemo(() => {
    console.log('Обработка данных...');
    return items.map(item => ({
      id: item,
      value: item * 2,
      isEven: item % 2 === 0
    }));
  }, [items]);

  return (
    <div>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Переключить тему
      </button>
      <button onClick={() => setCount(count + 1)}>
        Счетчик: {count}
      </button>
      
      <ExpensiveChild config={config} data={processedData} />
    </div>
  );
}
```

###  3. Фильтрация и сортировка данных
**Оптимизация операций с большими массивами данных.**

####  Пример:
```jsx
import React, { useState, useMemo } from 'react';

function DataTable({ users }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  // Мемоизация фильтрации
  const filteredUsers = useMemo(() => {
    console.log('Фильтрация пользователей...');
    
    if (!searchTerm) return users;
    
    return users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  // Мемоизация сортировки
  const sortedUsers = useMemo(() => {
    console.log('Сортировка пользователей...');
    
    return [...filteredUsers].sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      
      if (sortOrder === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });
  }, [filteredUsers, sortBy, sortOrder]);

  return (
    <div>
      <div className="controls">
        <input
          type="text"
          placeholder="Поиск пользователей..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">По имени</option>
          <option value="email">По email</option>
        </select>
        
        <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
          {sortOrder === 'asc' ? '↑' : '↓'}
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Email</th>
            <th>Возраст</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

---

##  Когда использовать useMemo?

###  **Подходящие случаи:**
- **Тяжелые вычисления** — математические операции, обработка больших массивов
- **Создание объектов/массивов** — передача в дочерние компоненты
- **Фильтрация и сортировка** — операции с большими наборами данных
- **Преобразование данных** — форматирование, группировка, агрегация

###  **Неподходящие случаи:**
- **Простые вычисления** — арифметические операции, конкатенация строк
- **Примитивные значения** — числа, строки, булевы значения
- **Часто изменяющиеся зависимости** — может снизить производительность
- **Небольшие объекты** — создание объекта может быть быстрее мемоизации

---

##  Предосторожности при использовании

###  **Частые ошибки:**

#### 1. Злоупотребление useMemo:
```jsx
//  Плохо: ненужная мемоизация простых вычислений
function BadComponent({ a, b }) {
  const sum = useMemo(() => a + b, [a, b]); // Избыточно
  return <div>{sum}</div>;
}

//  Хорошо: простые вычисления без мемоизации
function GoodComponent({ a, b }) {
  const sum = a + b; // Достаточно
  return <div>{sum}</div>;
}
```

#### 2. Неправильные зависимости:
```jsx
//  Плохо: отсутствует зависимость
function BadComponent({ items, multiplier }) {
  const result = useMemo(() => {
    return items.map(item => item * multiplier);
  }, [items]); // multiplier не указан в зависимостях

  return <div>{result}</div>;
}

//  Хорошо: все зависимости указаны
function GoodComponent({ items, multiplier }) {
  const result = useMemo(() => {
    return items.map(item => item * multiplier);
  }, [items, multiplier]); // Все зависимости указаны

  return <div>{result}</div>;
}
```

#### 3. Мемоизация функций:
```jsx
//  Плохо: useMemo для функций
function BadComponent({ onClick }) {
  const memoizedFunction = useMemo(() => {
    return () => console.log('clicked');
  }, []);

  return <button onClick={memoizedFunction}>Click</button>;
}

//  Хорошо: useCallback для функций
function GoodComponent({ onClick }) {
  const memoizedFunction = useCallback(() => {
    console.log('clicked');
  }, []);

  return <button onClick={memoizedFunction}>Click</button>;
}
```

---

##  Сравнение с другими хуками

###  useMemo vs useCallback:
```jsx
import React, { useState, useMemo, useCallback } from 'react';

function ComparisonExample() {
  const [count, setCount] = useState(0);
  const [items] = useState([1, 2, 3, 4, 5]);

  // useMemo для значений
  const expensiveValue = useMemo(() => {
    return items.reduce((sum, item) => sum + item, 0);
  }, [items]);

  // useCallback для функций
  const handleClick = useCallback(() => {
    console.log('Button clicked');
  }, []);

  return (
    <div>
      <p>Сумма: {expensiveValue}</p>
      <button onClick={handleClick}>Click me</button>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
    </div>
  );
}
```

---

##  Продвинутые паттерны

###  1. Мемоизация с несколькими зависимостями:
```jsx
import React, { useState, useMemo } from 'react';

function AdvancedMemo({ data, filters, sortOptions }) {
  const processedData = useMemo(() => {
    console.log('Обработка данных...');
    
    let result = [...data];
    
    // Применение фильтров
    if (filters.category) {
      result = result.filter(item => item.category === filters.category);
    }
    
    if (filters.minPrice) {
      result = result.filter(item => item.price >= filters.minPrice);
    }
    
    // Сортировка
    result.sort((a, b) => {
      const aValue = a[sortOptions.field];
      const bValue = b[sortOptions.field];
      
      if (sortOptions.order === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    
    return result;
  }, [data, filters, sortOptions]);

  return (
    <div>
      <h3>Обработанные данные ({processedData.length} элементов)</h3>
      {processedData.map(item => (
        <div key={item.id}>{item.name} - {item.price}₽</div>
      ))}
    </div>
  );
}
```

###  2. Условная мемоизация:
```jsx
import React, { useState, useMemo } from 'react';

function ConditionalMemo({ data, shouldProcess }) {
  const processedData = useMemo(() => {
    if (!shouldProcess) {
      return data; // Возвращаем исходные данные без обработки
    }
    
    console.log('Выполняется дорогая обработка...');
    return data.map(item => ({
      ...item,
      processed: true,
      timestamp: Date.now()
    }));
  }, [data, shouldProcess]);

  return (
    <div>
      <h3>Данные ({processedData.length} элементов)</h3>
      {processedData.map(item => (
        <div key={item.id}>
          {item.name} {item.processed && '(обработано)'}
        </div>
      ))}
    </div>
  );
}
```

---

##  Итог

**useMemo** — мощный инструмент для оптимизации производительности React-приложений.

**Ключевые принципы:**
- Используйте для тяжелых вычислений
- Мемоизируйте объекты и массивы для дочерних компонентов
- Правильно указывайте зависимости
- Не злоупотребляйте для простых операций
- Рассматривайте альтернативы (useCallback для функций)

---

##  ЗАДАЧИ

Задачи для практики: `useMemo хук`

---

###  Задача 1: Оптимизируйте компонент с тяжелыми вычислениями
Создайте компонент, который:
- Вычисляет факториал числа
- Использует useMemo для оптимизации
- Имеет счетчик, который не влияет на вычисления

<details>
<summary> Решение</summary>

```jsx
import React, { useState, useMemo } from 'react';

function FactorialCalculator() {
  const [number, setNumber] = useState(5);
  const [counter, setCounter] = useState(0);

  // Мемоизация вычисления факториала
  const factorial = useMemo(() => {
    console.log(`Вычисление факториала для числа ${number}`);
    
    if (number < 0) return 'Не определен';
    if (number === 0 || number === 1) return 1;
    
    let result = 1;
    for (let i = 2; i <= number; i++) {
      result *= i;
    }
    
    return result;
  }, [number]);

  return (
    <div className="factorial-calculator">
      <h2>Калькулятор факториала</h2>
      
      <div className="input-section">
        <label>
          Число:
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(parseInt(e.target.value) || 0)}
            min="0"
            max="20"
          />
        </label>
      </div>

      <div className="result-section">
        <h3>Результат:</h3>
        <p className="factorial-result">
          {number}! = {factorial}
        </p>
      </div>

      <div className="counter-section">
        <p>Счетчик (не влияет на вычисления): {counter}</p>
        <button onClick={() => setCounter(counter + 1)}>
          Увеличить счетчик
        </button>
      </div>

      <div className="info">
        <p><strong>Инструкция:</strong></p>
        <ul>
          <li>Измените число для пересчета факториала</li>
          <li>Увеличивайте счетчик - факториал не пересчитывается</li>
          <li>Откройте консоль для отслеживания вычислений</li>
        </ul>
      </div>
    </div>
  );
}

export default FactorialCalculator;
```

</details>

---

###  Задача 2: Создайте компонент с мемоизированной фильтрацией
Создайте компонент списка товаров, который:
- Фильтрует товары по цене и категории
- Сортирует по названию или цене
- Использует useMemo для оптимизации операций

<details>
<summary> Решение</summary>

```jsx
import React, { useState, useMemo } from 'react';

function ProductList({ products }) {
  const [priceFilter, setPriceFilter] = useState({ min: 0, max: 1000 });
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  // Мемоизация фильтрации товаров
  const filteredProducts = useMemo(() => {
    console.log('Фильтрация товаров...');
    
    return products.filter(product => {
      const priceMatch = product.price >= priceFilter.min && 
                        product.price <= priceFilter.max;
      const categoryMatch = categoryFilter === 'all' || 
                           product.category === categoryFilter;
      
      return priceMatch && categoryMatch;
    });
  }, [products, priceFilter, categoryFilter]);

  // Мемоизация сортировки товаров
  const sortedProducts = useMemo(() => {
    console.log('Сортировка товаров...');
    
    return [...filteredProducts].sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      // Для числовых значений
      if (sortBy === 'price') {
        aValue = Number(aValue);
        bValue = Number(bValue);
      }
      
      // Для строковых значений
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [filteredProducts, sortBy, sortOrder]);

  // Мемоизация статистики
  const statistics = useMemo(() => {
    console.log('Вычисление статистики...');
    
    const total = sortedProducts.length;
    const averagePrice = total > 0 
      ? sortedProducts.reduce((sum, product) => sum + product.price, 0) / total
      : 0;
    const categories = [...new Set(sortedProducts.map(p => p.category))];
    
    return {
      total,
      averagePrice: averagePrice.toFixed(2),
      categories: categories.length
    };
  }, [sortedProducts]);

  return (
    <div className="product-list">
      <h2>Список товаров</h2>
      
      <div className="filters">
        <div className="price-filter">
          <label>
            Цена от:
            <input
              type="number"
              value={priceFilter.min}
              onChange={(e) => setPriceFilter(prev => ({
                ...prev,
                min: Number(e.target.value)
              }))}
            />
          </label>
          <label>
            Цена до:
            <input
              type="number"
              value={priceFilter.max}
              onChange={(e) => setPriceFilter(prev => ({
                ...prev,
                max: Number(e.target.value)
              }))}
            />
          </label>
        </div>

        <div className="category-filter">
          <label>
            Категория:
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">Все категории</option>
              <option value="electronics">Электроника</option>
              <option value="clothing">Одежда</option>
              <option value="books">Книги</option>
              <option value="home">Дом и сад</option>
            </select>
          </label>
        </div>

        <div className="sort-controls">
          <label>
            Сортировать по:
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Названию</option>
              <option value="price">Цене</option>
              <option value="category">Категории</option>
            </select>
          </label>
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>

      <div className="statistics">
        <h3>Статистика:</h3>
        <p>Найдено товаров: {statistics.total}</p>
        <p>Средняя цена: {statistics.averagePrice}₽</p>
        <p>Категорий: {statistics.categories}</p>
      </div>

      <div className="products">
        {sortedProducts.length === 0 ? (
          <p>Товары не найдены</p>
        ) : (
          sortedProducts.map(product => (
            <div key={product.id} className="product-item">
              <h4>{product.name}</h4>
              <p>Цена: {product.price}₽</p>
              <p>Категория: {product.category}</p>
              <p>Рейтинг: {product.rating}/5</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Пример использования:
function App() {
  const products = [
    { id: 1, name: 'iPhone 15', price: 89990, category: 'electronics', rating: 4.8 },
    { id: 2, name: 'Футболка', price: 1500, category: 'clothing', rating: 4.2 },
    { id: 3, name: 'JavaScript для начинающих', price: 2500, category: 'books', rating: 4.9 },
    { id: 4, name: 'MacBook Pro', price: 199990, category: 'electronics', rating: 4.9 },
    { id: 5, name: 'Джинсы', price: 3500, category: 'clothing', rating: 4.1 },
    { id: 6, name: 'React в действии', price: 3200, category: 'books', rating: 4.7 },
    { id: 7, name: 'Диван', price: 45000, category: 'home', rating: 4.3 },
    { id: 8, name: 'Samsung Galaxy', price: 65000, category: 'electronics', rating: 4.6 }
  ];

  return <ProductList products={products} />;
}

export default App;
```

</details>

---

###  Задача 3: Создайте компонент с мемоизированными стилями
Создайте компонент, который:
- Динамически изменяет стили на основе props
- Использует useMemo для мемоизации объектов стилей
- Предотвращает ненужные ререндеры дочерних компонентов

<details>
<summary> Решение</summary>

```jsx
import React, { useState, useMemo, memo } from 'react';

// Мемоизированный дочерний компонент
const StyledBox = memo(({ styles, title, content }) => {
  console.log(`Рендеринг StyledBox: ${title}`);
  
  return (
    <div style={styles} className="styled-box">
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
});

function DynamicStyling() {
  const [theme, setTheme] = useState('light');
  const [size, setSize] = useState('medium');
  const [color, setColor] = useState('blue');
  const [counter, setCounter] = useState(0);

  // Мемоизация стилей для основного контейнера
  const containerStyles = useMemo(() => {
    console.log('Создание стилей контейнера...');
    
    const baseStyles = {
      padding: '20px',
      borderRadius: '8px',
      transition: 'all 0.3s ease',
      margin: '10px 0'
    };

    const themeStyles = {
      light: {
        backgroundColor: '#ffffff',
        color: '#333333',
        border: '1px solid #e0e0e0'
      },
      dark: {
        backgroundColor: '#2d2d2d',
        color: '#ffffff',
        border: '1px solid #555555'
      }
    };

    const sizeStyles = {
      small: { fontSize: '14px', padding: '10px' },
      medium: { fontSize: '16px', padding: '20px' },
      large: { fontSize: '18px', padding: '30px' }
    };

    return {
      ...baseStyles,
      ...themeStyles[theme],
      ...sizeStyles[size]
    };
  }, [theme, size]);

  // Мемоизация стилей для цветных блоков
  const colorBlockStyles = useMemo(() => {
    console.log('Создание стилей цветных блоков...');
    
    const colorMap = {
      blue: { backgroundColor: '#3498db', color: '#ffffff' },
      red: { backgroundColor: '#e74c3c', color: '#ffffff' },
      green: { backgroundColor: '#2ecc71', color: '#ffffff' },
      purple: { backgroundColor: '#9b59b6', color: '#ffffff' },
      orange: { backgroundColor: '#f39c12', color: '#ffffff' }
    };

    return {
      ...colorMap[color],
      padding: '15px',
      borderRadius: '6px',
      textAlign: 'center',
      fontWeight: 'bold'
    };
  }, [color]);

  // Мемоизация стилей для кнопок
  const buttonStyles = useMemo(() => {
    console.log('Создание стилей кнопок...');
    
    return {
      padding: '10px 20px',
      margin: '5px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
      backgroundColor: theme === 'light' ? '#f8f9fa' : '#495057',
      color: theme === 'light' ? '#333' : '#fff',
      transition: 'background-color 0.2s ease'
    };
  }, [theme]);

  return (
    <div className="dynamic-styling">
      <h2>Динамические стили с useMemo</h2>
      
      <div style={containerStyles}>
        <h3>Основной контейнер</h3>
        <p>Этот контейнер меняет стили в зависимости от темы и размера.</p>
        <p>Счетчик: {counter} (не влияет на стили)</p>
      </div>

      <StyledBox
        styles={colorBlockStyles}
        title="Цветной блок"
        content={`Этот блок использует цвет: ${color}`}
      />

      <div className="controls">
        <div className="control-group">
          <label>Тема:</label>
          <button
            style={buttonStyles}
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            {theme === 'light' ? 'Темная' : 'Светлая'}
          </button>
        </div>

        <div className="control-group">
          <label>Размер:</label>
          {['small', 'medium', 'large'].map(sizeOption => (
            <button
              key={sizeOption}
              style={buttonStyles}
              onClick={() => setSize(sizeOption)}
            >
              {sizeOption}
            </button>
          ))}
        </div>

        <div className="control-group">
          <label>Цвет:</label>
          {['blue', 'red', 'green', 'purple', 'orange'].map(colorOption => (
            <button
              key={colorOption}
              style={buttonStyles}
              onClick={() => setColor(colorOption)}
            >
              {colorOption}
            </button>
          ))}
        </div>

        <div className="control-group">
          <label>Счетчик (не влияет на стили):</label>
          <button
            style={buttonStyles}
            onClick={() => setCounter(counter + 1)}
          >
            Увеличить: {counter}
          </button>
        </div>
      </div>

      <div className="info">
        <h3>Инструкции:</h3>
        <ul>
          <li>Измените тему, размер или цвет - стили пересоздаются</li>
          <li>Увеличивайте счетчик - стили не пересоздаются</li>
          <li>Откройте консоль для отслеживания создания стилей</li>
          <li>StyledBox рендерится только при изменении стилей</li>
        </ul>
      </div>
    </div>
  );
}

export default DynamicStyling;
```

</details>

---

###  Задача 4: Создайте компонент с мемоизированными вычислениями
Создайте компонент аналитики, который:
- Вычисляет различные метрики из данных
- Использует useMemo для оптимизации вычислений
- Отображает графики и статистику

<details>
<summary> Решение</summary>

```jsx
import React, { useState, useMemo } from 'react';

function AnalyticsDashboard({ salesData }) {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  // Мемоизация фильтрации данных по периоду
  const filteredData = useMemo(() => {
    console.log('Фильтрация данных по периоду...');
    
    const now = new Date();
    const filterDate = new Date();
    
    switch (selectedPeriod) {
      case 'week':
        filterDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        filterDate.setMonth(now.getMonth() - 1);
        break;
      case 'quarter':
        filterDate.setMonth(now.getMonth() - 3);
        break;
      case 'year':
        filterDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        return salesData;
    }
    
    return salesData.filter(item => new Date(item.date) >= filterDate);
  }, [salesData, selectedPeriod]);

  // Мемоизация базовых метрик
  const basicMetrics = useMemo(() => {
    console.log('Вычисление базовых метрик...');
    
    if (filteredData.length === 0) {
      return {
        totalRevenue: 0,
        totalOrders: 0,
        averageOrderValue: 0,
        totalCustomers: 0
      };
    }
    
    const totalRevenue = filteredData.reduce((sum, item) => sum + item.revenue, 0);
    const totalOrders = filteredData.length;
    const averageOrderValue = totalRevenue / totalOrders;
    const uniqueCustomers = new Set(filteredData.map(item => item.customerId)).size;
    
    return {
      totalRevenue,
      totalOrders,
      averageOrderValue,
      totalCustomers: uniqueCustomers
    };
  }, [filteredData]);

  // Мемоизация трендов
  const trends = useMemo(() => {
    console.log('Вычисление трендов...');
    
    if (filteredData.length < 2) {
      return { revenueTrend: 0, ordersTrend: 0 };
    }
    
    // Сортируем данные по дате
    const sortedData = [...filteredData].sort((a, b) => 
      new Date(a.date) - new Date(b.date)
    );
    
    // Берем первую и вторую половину для сравнения
    const midPoint = Math.floor(sortedData.length / 2);
    const firstHalf = sortedData.slice(0, midPoint);
    const secondHalf = sortedData.slice(midPoint);
    
    const firstHalfRevenue = firstHalf.reduce((sum, item) => sum + item.revenue, 0);
    const secondHalfRevenue = secondHalf.reduce((sum, item) => sum + item.revenue, 0);
    
    const revenueTrend = firstHalf.length > 0 
      ? ((secondHalfRevenue / secondHalf.length) - (firstHalfRevenue / firstHalf.length)) / (firstHalfRevenue / firstHalf.length) * 100
      : 0;
    
    const ordersTrend = firstHalf.length > 0
      ? ((secondHalf.length - firstHalf.length) / firstHalf.length) * 100
      : 0;
    
    return {
      revenueTrend: Math.round(revenueTrend * 100) / 100,
      ordersTrend: Math.round(ordersTrend * 100) / 100
    };
  }, [filteredData]);

  // Мемоизация топ категорий
  const topCategories = useMemo(() => {
    console.log('Вычисление топ категорий...');
    
    const categoryStats = {};
    
    filteredData.forEach(item => {
      if (!categoryStats[item.category]) {
        categoryStats[item.category] = {
          revenue: 0,
          orders: 0
        };
      }
      categoryStats[item.category].revenue += item.revenue;
      categoryStats[item.category].orders += 1;
    });
    
    return Object.entries(categoryStats)
      .map(([category, stats]) => ({
        category,
        ...stats,
        averageOrderValue: stats.revenue / stats.orders
      }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  }, [filteredData]);

  // Мемоизация данных для графика
  const chartData = useMemo(() => {
    console.log('Подготовка данных для графика...');
    
    const dailyData = {};
    
    filteredData.forEach(item => {
      const date = new Date(item.date).toISOString().split('T')[0];
      if (!dailyData[date]) {
        dailyData[date] = { revenue: 0, orders: 0 };
      }
      dailyData[date].revenue += item.revenue;
      dailyData[date].orders += 1;
    });
    
    return Object.entries(dailyData)
      .map(([date, data]) => ({
        date,
        ...data
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [filteredData]);

  return (
    <div className="analytics-dashboard">
      <h2>Панель аналитики</h2>
      
      <div className="controls">
        <div className="period-selector">
          <label>Период:</label>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="week">Неделя</option>
            <option value="month">Месяц</option>
            <option value="quarter">Квартал</option>
            <option value="year">Год</option>
          </select>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <h3>Общая выручка</h3>
          <p className="metric-value">
            {basicMetrics.totalRevenue.toLocaleString()}₽
          </p>
          <p className={`trend ${trends.revenueTrend >= 0 ? 'positive' : 'negative'}`}>
            {trends.revenueTrend >= 0 ? '↗' : '↘'} {Math.abs(trends.revenueTrend)}%
          </p>
        </div>

        <div className="metric-card">
          <h3>Количество заказов</h3>
          <p className="metric-value">{basicMetrics.totalOrders}</p>
          <p className={`trend ${trends.ordersTrend >= 0 ? 'positive' : 'negative'}`}>
            {trends.ordersTrend >= 0 ? '↗' : '↘'} {Math.abs(trends.ordersTrend)}%
          </p>
        </div>

        <div className="metric-card">
          <h3>Средний чек</h3>
          <p className="metric-value">
            {Math.round(basicMetrics.averageOrderValue).toLocaleString()}₽
          </p>
        </div>

        <div className="metric-card">
          <h3>Уникальные клиенты</h3>
          <p className="metric-value">{basicMetrics.totalCustomers}</p>
        </div>
      </div>

      <div className="charts-section">
        <h3>Топ категории</h3>
        <div className="categories-list">
          {topCategories.map((category, index) => (
            <div key={category.category} className="category-item">
              <span className="rank">#{index + 1}</span>
              <span className="name">{category.category}</span>
              <span className="revenue">{category.revenue.toLocaleString()}₽</span>
              <span className="orders">{category.orders} заказов</span>
            </div>
          ))}
        </div>
      </div>

      <div className="chart-data">
        <h3>Данные для графика ({chartData.length} точек)</h3>
        <div className="chart-preview">
          {chartData.slice(0, 10).map(item => (
            <div key={item.date} className="chart-bar">
              <div 
                className="bar"
                style={{
                  height: `${(item.revenue / Math.max(...chartData.map(d => d.revenue))) * 100}%`
                }}
              ></div>
              <span className="date">{item.date}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="info">
        <h3>Информация о производительности:</h3>
        <ul>
          <li>Все вычисления мемоизированы с помощью useMemo</li>
          <li>Данные пересчитываются только при изменении периода</li>
          <li>Откройте консоль для отслеживания вычислений</li>
          <li>Попробуйте изменить период - вычисления выполнятся заново</li>
        </ul>
      </div>
    </div>
  );
}

// Пример использования:
function App() {
  // Генерация тестовых данных
  const generateSalesData = () => {
    const categories = ['Электроника', 'Одежда', 'Книги', 'Дом и сад', 'Спорт'];
    const data = [];
    
    for (let i = 0; i < 1000; i++) {
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 365));
      
      data.push({
        id: i + 1,
        date: date.toISOString().split('T')[0],
        revenue: Math.floor(Math.random() * 10000) + 1000,
        customerId: Math.floor(Math.random() * 200) + 1,
        category: categories[Math.floor(Math.random() * categories.length)]
      });
    }
    
    return data;
  };

  const salesData = generateSalesData();

  return <AnalyticsDashboard salesData={salesData} />;
}

export default App;
```

</details>

---

 Эти задачи помогут освоить различные аспекты использования useMemo для оптимизации производительности React-приложений!

---
