#  Оптимизация производительности React

**Оптимизация производительности React-приложения** — это критически важная задача для обеспечения быстрой и отзывчивой работы, особенно в сложных и масштабных приложениях. Существует множество стратегий и методов, которые помогают улучшить производительность вашего React-приложения.

---

##  Что такое оптимизация производительности?

###  Основные цели:
- **Быстрый рендеринг** — минимизация времени отрисовки компонентов
- **Меньше перерендеров** — избежание ненужных обновлений
- **Эффективная память** — оптимизация использования ресурсов
- **Быстрая загрузка** — уменьшение времени первоначальной загрузки

###  Проблемы производительности:
```jsx
//  Плохо: компонент перерендеривается при каждом изменении
function BadComponent({ data, onUpdate }) {
  const expensiveValue = data.map(item => item.value * 2); // Вычисляется каждый раз
  
  return (
    <div>
      {expensiveValue.map(value => <div key={value}>{value}</div>)}
      <button onClick={() => onUpdate()}>Обновить</button>
    </div>
  );
}
```

---

##  React.memo для мемоизации компонентов

###  Что такое React.memo?
**React.memo** — это высший компонент, который мемоизирует результат рендеринга и предотвращает ненужные перерисовки, если props не изменились.

###  Простой пример:
```jsx
import React from 'react';

const ExpensiveComponent = React.memo(({ name, age }) => {
  console.log('Рендеринг ExpensiveComponent');
  return (
    <div>
      <h3>{name}</h3>
      <p>Возраст: {age}</p>
    </div>
  );
});

// Использование:
function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({ name: 'Иван', age: 25 });

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Счетчик: {count}
      </button>
      <ExpensiveComponent name={user.name} age={user.age} />
    </div>
  );
}
```

###  Кастомная функция сравнения:
```jsx
const MyComponent = React.memo(({ user, settings }) => {
  return (
    <div>
      <h3>{user.name}</h3>
      <p>Тема: {settings.theme}</p>
    </div>
  );
}, (prevProps, nextProps) => {
  // Возвращаем true, если props равны (не нужно перерендеривать)
  return (
    prevProps.user.name === nextProps.user.name &&
    prevProps.settings.theme === nextProps.settings.theme
  );
});
```

---

##  useMemo для мемоизации вычислений

###  Что такое useMemo?
**useMemo** позволяет мемоизировать результаты дорогих вычислений и пересчитывать их только при изменении зависимостей.

###  Пример с дорогими вычислениями:
```jsx
import React, { useState, useMemo } from 'react';

function ExpensiveList({ items, filter }) {
  const filteredItems = useMemo(() => {
    console.log('Фильтрация списка...');
    return items.filter(item => 
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [items, filter]);

  const sortedItems = useMemo(() => {
    console.log('Сортировка списка...');
    return filteredItems.sort((a, b) => a.name.localeCompare(b.name));
  }, [filteredItems]);

  return (
    <div>
      {sortedItems.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
```

###  Пример с объектами:
```jsx
function UserProfile({ user, theme }) {
  const userStyles = useMemo(() => ({
    backgroundColor: theme === 'dark' ? '#333' : '#fff',
    color: theme === 'dark' ? '#fff' : '#333',
    padding: '20px',
    borderRadius: '8px'
  }), [theme]);

  return (
    <div style={userStyles}>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
```

---

##  useCallback для мемоизации функций

###  Что такое useCallback?
**useCallback** мемоизирует функции, предотвращая их пересоздание при каждом рендере. Особенно полезно при передаче функций в дочерние компоненты.

###  Пример с передачей функций:
```jsx
import React, { useState, useCallback } from 'react';

const ChildComponent = React.memo(({ onIncrement, onDecrement }) => {
  console.log('Рендеринг ChildComponent');
  return (
    <div>
      <button onClick={onIncrement}>+</button>
      <button onClick={onDecrement}>-</button>
    </div>
  );
});

function ParentComponent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  const handleIncrement = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  const handleDecrement = useCallback(() => {
    setCount(prev => prev - 1);
  }, []);

  return (
    <div>
      <input 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Введите имя"
      />
      <p>Счетчик: {count}</p>
      <ChildComponent 
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
      />
    </div>
  );
}
```

---

##  Ленивая загрузка (Lazy Loading)

###  React.lazy и Suspense
**Ленивая загрузка** позволяет загружать компоненты только когда они действительно нужны, уменьшая размер первоначального бандла.

###  Базовый пример:
```jsx
import React, { Suspense, lazy } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));
const AnotherLazyComponent = lazy(() => import('./AnotherLazyComponent'));

function App() {
  const [showComponent, setShowComponent] = useState(false);

  return (
    <div>
      <button onClick={() => setShowComponent(!showComponent)}>
        {showComponent ? 'Скрыть' : 'Показать'} компонент
      </button>
      
      <Suspense fallback={<div>Загрузка...</div>}>
        {showComponent && <LazyComponent />}
      </Suspense>
    </div>
  );
}
```

###  Ленивая загрузка с роутингом:
```jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="loading">Загрузка страницы...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

---

##  Оптимизация списков

###  Правильное использование ключей (key)
**Уникальные ключи** помогают React эффективно обновлять списки, точно определяя какие элементы изменились.

###  Хороший пример:
```jsx
function UserList({ users }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {user.name} - {user.email}
        </li>
      ))}
    </ul>
  );
}
```

###  Виртуализация больших списков:
```jsx
import { FixedSizeList as List } from 'react-window';

function VirtualizedList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      {items[index].name}
    </div>
  );

  return (
    <List
      height={600}
      itemCount={items.length}
      itemSize={50}
    >
      {Row}
    </List>
  );
}
```

---

##  Оптимизация состояния

###  Разделение состояния
**Разделение состояния** на логические части предотвращает ненужные перерендеры.

###  Плохой пример:
```jsx
//  Плохо: одно большое состояние
function BadComponent() {
  const [state, setState] = useState({
    user: { name: '', email: '' },
    settings: { theme: 'light', language: 'ru' },
    ui: { loading: false, error: null }
  });

  const updateUser = (userData) => {
    setState(prev => ({ ...prev, user: { ...prev.user, ...userData } }));
  };

  // При изменении user перерендериваются все компоненты, использующие state
}
```

###  Хороший пример:
```jsx
//  Хорошо: разделенное состояние
function GoodComponent() {
  const [user, setUser] = useState({ name: '', email: '' });
  const [settings, setSettings] = useState({ theme: 'light', language: 'ru' });
  const [ui, setUI] = useState({ loading: false, error: null });

  const updateUser = (userData) => {
    setUser(prev => ({ ...prev, ...userData }));
  };

  // Компоненты перерендериваются только при изменении нужных им данных
}
```

---

##  Оптимизация изображений

###  Ленивая загрузка изображений:
```jsx
import React, { useState, useRef, useEffect } from 'react';

function LazyImage({ src, alt, placeholder }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className="lazy-image">
      {isInView && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          style={{ opacity: isLoaded ? 1 : 0 }}
        />
      )}
      {!isLoaded && placeholder}
    </div>
  );
}
```

---

##  Web Workers для тяжелых вычислений

###  Использование Web Workers:
```jsx
// worker.js
self.onmessage = function(e) {
  const { data } = e.data;
  
  // Тяжелые вычисления
  const result = data.map(item => {
    // Сложная обработка данных
    return processItem(item);
  });
  
  self.postMessage({ result });
};

// React компонент
function DataProcessor({ data }) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const processData = useCallback(() => {
    setLoading(true);
    const worker = new Worker('/worker.js');
    
    worker.postMessage({ data });
    
    worker.onmessage = (e) => {
      setResult(e.data.result);
      setLoading(false);
      worker.terminate();
    };
  }, [data]);

  return (
    <div>
      <button onClick={processData} disabled={loading}>
        {loading ? 'Обработка...' : 'Обработать данные'}
      </button>
      {result && <div>Результат: {result.length} элементов</div>}
    </div>
  );
}
```

---

##  Инструменты для анализа производительности

###  React DevTools Profiler:
```jsx
import { Profiler } from 'react';

function onRenderCallback(id, phase, actualDuration) {
  console.log('Component:', id);
  console.log('Phase:', phase);
  console.log('Duration:', actualDuration);
}

function App() {
  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <ExpensiveComponent />
    </Profiler>
  );
}
```

###  Измерение производительности:
```jsx
import { useState, useEffect } from 'react';

function PerformanceMonitor() {
  const [metrics, setMetrics] = useState({});

  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === 'measure') {
          setMetrics(prev => ({
            ...prev,
            [entry.name]: entry.duration
          }));
        }
      });
    });

    observer.observe({ entryTypes: ['measure'] });

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <h3>Метрики производительности:</h3>
      {Object.entries(metrics).map(([name, duration]) => (
        <div key={name}>
          {name}: {duration.toFixed(2)}ms
        </div>
      ))}
    </div>
  );
}
```

---

##  Итог

**Оптимизация производительности React** требует комплексного подхода и правильного применения инструментов.

**Ключевые принципы:**
- Используйте React.memo для предотвращения ненужных рендеров
- Применяйте useMemo и useCallback для мемоизации
- Реализуйте ленивую загрузку для больших приложений
- Оптимизируйте списки с правильными ключами
- Разделяйте состояние на логические части

##  ЗАДАЧИ

Задачи для практики: `оптимизация производительности React`

---

###  Задача 1: Оптимизируйте компонент списка
Создайте оптимизированный компонент списка пользователей, который:
- Использует React.memo для предотвращения ненужных рендеров
- Применяет useMemo для фильтрации и сортировки
- Имеет поиск по имени пользователя

<details>
<summary> Решение</summary>

```jsx
import React, { useState, useMemo, memo } from 'react';

const UserItem = memo(({ user }) => {
  console.log(`Рендеринг пользователя: ${user.name}`);
  return (
    <div className="user-item">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <p>Возраст: {user.age}</p>
    </div>
  );
});

function OptimizedUserList({ users }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const filteredAndSortedUsers = useMemo(() => {
    console.log('Фильтрация и сортировка пользователей...');
    
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'age') {
        return a.age - b.age;
      }
      return 0;
    });
  }, [users, searchTerm, sortBy]);

  return (
    <div className="user-list">
      <div className="controls">
        <input
          type="text"
          placeholder="Поиск по имени..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">По имени</option>
          <option value="age">По возрасту</option>
        </select>
      </div>
      
      <div className="users">
        {filteredAndSortedUsers.map(user => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

export default OptimizedUserList;
```

</details>

---

###  Задача 2: Создайте мемоизированный компонент с useCallback
Создайте компонент счетчика с кнопками, который:
- Использует useCallback для мемоизации функций
- Предотвращает ненужные рендеры дочерних компонентов
- Имеет отдельные кнопки для увеличения, уменьшения и сброса

<details>
<summary> Решение</summary>

```jsx
import React, { useState, useCallback, memo } from 'react';

const CounterButton = memo(({ onClick, children, disabled = false }) => {
  console.log(`Рендеринг кнопки: ${children}`);
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
});

function OptimizedCounter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const increment = useCallback(() => {
    setCount(prev => prev + step);
  }, [step]);

  const decrement = useCallback(() => {
    setCount(prev => prev - step);
  }, [step]);

  const reset = useCallback(() => {
    setCount(0);
  }, []);

  const double = useCallback(() => {
    setCount(prev => prev * 2);
  }, []);

  return (
    <div className="counter">
      <h2>Счетчик: {count}</h2>
      <div className="step-control">
        <label>
          Шаг: 
          <input
            type="number"
            value={step}
            onChange={(e) => setStep(Number(e.target.value))}
            min="1"
          />
        </label>
      </div>
      
      <div className="buttons">
        <CounterButton onClick={decrement}>
          -{step}
        </CounterButton>
        <CounterButton onClick={increment}>
          +{step}
        </CounterButton>
        <CounterButton onClick={double}>
          ×2
        </CounterButton>
        <CounterButton onClick={reset}>
          Сброс
        </CounterButton>
      </div>
    </div>
  );
}

export default OptimizedCounter;
```

</details>

---

###  Задача 3: Реализуйте ленивую загрузку компонентов
Создайте приложение с ленивой загрузкой, которое:
- Загружает компоненты только при необходимости
- Показывает индикатор загрузки
- Имеет несколько "тяжелых" компонентов

<details>
<summary> Решение</summary>

```jsx
import React, { Suspense, lazy, useState } from 'react';

// Ленивая загрузка компонентов
const HeavyChart = lazy(() => import('./HeavyChart'));
const DataTable = lazy(() => import('./DataTable'));
const ImageGallery = lazy(() => import('./ImageGallery'));

// Компонент-заглушка для загрузки
const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
    <p>Загрузка компонента...</p>
  </div>
);

function LazyLoadingApp() {
  const [activeTab, setActiveTab] = useState('chart');

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'chart':
        return <HeavyChart />;
      case 'table':
        return <DataTable />;
      case 'gallery':
        return <ImageGallery />;
      default:
        return <div>Выберите компонент</div>;
    }
  };

  return (
    <div className="lazy-app">
      <nav className="tabs">
        <button
          className={activeTab === 'chart' ? 'active' : ''}
          onClick={() => setActiveTab('chart')}
        >
          График
        </button>
        <button
          className={activeTab === 'table' ? 'active' : ''}
          onClick={() => setActiveTab('table')}
        >
          Таблица
        </button>
        <button
          className={activeTab === 'gallery' ? 'active' : ''}
          onClick={() => setActiveTab('gallery')}
        >
          Галерея
        </button>
      </nav>

      <div className="content">
        <Suspense fallback={<LoadingSpinner />}>
          {renderActiveComponent()}
        </Suspense>
      </div>
    </div>
  );
}

// Примеры "тяжелых" компонентов
const HeavyChart = () => (
  <div className="chart">
    <h2>Тяжелый график</h2>
    <p>Этот компонент загружается только при необходимости</p>
    {/* Здесь был бы сложный график */}
  </div>
);

const DataTable = () => (
  <div className="table">
    <h2>Таблица данных</h2>
    <p>Большая таблица с данными</p>
    {/* Здесь была бы большая таблица */}
  </div>
);

const ImageGallery = () => (
  <div className="gallery">
    <h2>Галерея изображений</h2>
    <p>Коллекция изображений</p>
    {/* Здесь была бы галерея */}
  </div>
);

export default LazyLoadingApp;
```

</details>

---

###  Задача 4: Оптимизируйте производительность формы
Создайте оптимизированную форму с множественными полями, которая:
- Использует useMemo для валидации
- Применяет useCallback для обработчиков
- Предотвращает ненужные рендеры полей

<details>
<summary> Решение</summary>

```jsx
import React, { useState, useMemo, useCallback, memo } from 'react';

const FormField = memo(({ label, value, onChange, error, type = 'text' }) => {
  console.log(`Рендеринг поля: ${label}`);
  
  return (
    <div className="form-field">
      <label>{label}:</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={error ? 'error' : ''}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
});

function OptimizedForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});

  // Мемоизированная валидация
  const validation = useMemo(() => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Имя обязательно';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Фамилия обязательна';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Некорректный email';
    }

    if (!formData.age) {
      newErrors.age = 'Возраст обязателен';
    } else if (isNaN(formData.age) || formData.age < 0 || formData.age > 120) {
      newErrors.age = 'Некорректный возраст';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Телефон обязателен';
    }

    return newErrors;
  }, [formData]);

  // Мемоизированные обработчики
  const handleFieldChange = useCallback((field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    
    if (Object.keys(validation).length === 0) {
      console.log('Форма отправлена:', formData);
      alert('Форма успешно отправлена!');
    } else {
      setErrors(validation);
    }
  }, [formData, validation]);

  const isFormValid = Object.keys(validation).length === 0;

  return (
    <form onSubmit={handleSubmit} className="optimized-form">
      <h2>Оптимизированная форма</h2>
      
      <FormField
        label="Имя"
        value={formData.firstName}
        onChange={handleFieldChange('firstName')}
        error={errors.firstName}
      />
      
      <FormField
        label="Фамилия"
        value={formData.lastName}
        onChange={handleFieldChange('lastName')}
        error={errors.lastName}
      />
      
      <FormField
        label="Email"
        type="email"
        value={formData.email}
        onChange={handleFieldChange('email')}
        error={errors.email}
      />
      
      <FormField
        label="Возраст"
        type="number"
        value={formData.age}
        onChange={handleFieldChange('age')}
        error={errors.age}
      />
      
      <FormField
        label="Телефон"
        type="tel"
        value={formData.phone}
        onChange={handleFieldChange('phone')}
        error={errors.phone}
      />
      
      <button type="submit" disabled={!isFormValid}>
        Отправить
      </button>
    </form>
  );
}

export default OptimizedForm;
```

</details>

---

###  Задача 5: Создайте виртуализированный список
Создайте компонент для отображения большого списка (10000+ элементов), который:
- Использует виртуализацию для производительности
- Отображает только видимые элементы
- Поддерживает прокрутку и поиск

<details>
<summary> Решение</summary>

```jsx
import React, { useState, useMemo, useCallback, memo } from 'react';

// Виртуализированный элемент списка
const VirtualizedItem = memo(({ item, style, isVisible }) => {
  if (!isVisible) {
    return <div style={style} />;
  }

  return (
    <div style={style} className="virtual-item">
      <div className="item-content">
        <h4>{item.name}</h4>
        <p>{item.email}</p>
        <span className="item-id">ID: {item.id}</span>
      </div>
    </div>
  );
});

function VirtualizedList({ items, itemHeight = 80, containerHeight = 400 }) {
  const [scrollTop, setScrollTop] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  // Фильтрация элементов
  const filteredItems = useMemo(() => {
    if (!searchTerm) return items;
    
    return items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [items, searchTerm]);

  // Вычисление видимых элементов
  const visibleItems = useMemo(() => {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / itemHeight) + 1,
      filteredItems.length
    );

    return filteredItems.slice(startIndex, endIndex).map((item, index) => ({
      ...item,
      index: startIndex + index
    }));
  }, [filteredItems, scrollTop, itemHeight, containerHeight]);

  const handleScroll = useCallback((e) => {
    setScrollTop(e.target.scrollTop);
  }, []);

  const totalHeight = filteredItems.length * itemHeight;

  return (
    <div className="virtualized-list">
      <div className="search-container">
        <input
          type="text"
          placeholder="Поиск по имени или email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="results-count">
          Найдено: {filteredItems.length} из {items.length}
        </span>
      </div>

      <div
        className="scroll-container"
        style={{ height: containerHeight, overflow: 'auto' }}
        onScroll={handleScroll}
      >
        <div style={{ height: totalHeight, position: 'relative' }}>
          {visibleItems.map(item => (
            <VirtualizedItem
              key={item.id}
              item={item}
              style={{
                position: 'absolute',
                top: item.index * itemHeight,
                height: itemHeight,
                width: '100%'
              }}
              isVisible={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Генератор тестовых данных
function generateTestData(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Пользователь ${i + 1}`,
    email: `user${i + 1}@example.com`,
    age: Math.floor(Math.random() * 50) + 18
  }));
}

function VirtualizedListApp() {
  const [data] = useState(() => generateTestData(10000));

  return (
    <div className="app">
      <h2>Виртуализированный список</h2>
      <p>Отображение {data.length} элементов с виртуализацией</p>
      <VirtualizedList items={data} />
    </div>
  );
}

export default VirtualizedListApp;
```

</details>

---

###  Задача 6: Оптимизируйте компонент с тяжелыми вычислениями
Создайте компонент, который выполняет тяжелые вычисления, используя:
- useMemo для кэширования результатов
- Web Worker для фоновых вычислений
- Индикатор загрузки

<details>
<summary> Решение</summary>

```jsx
import React, { useState, useMemo, useCallback, useEffect } from 'react';

// Web Worker для тяжелых вычислений
const createWorker = () => {
  const workerCode = `
    self.onmessage = function(e) {
      const { numbers, operation } = e.data;
      
      let result;
      const startTime = performance.now();
      
      switch (operation) {
        case 'fibonacci':
          result = numbers.map(n => fibonacci(n));
          break;
        case 'prime':
          result = numbers.map(n => isPrime(n));
          break;
        case 'factorial':
          result = numbers.map(n => factorial(n));
          break;
        default:
          result = numbers;
      }
      
      const endTime = performance.now();
      
      self.postMessage({
        result,
        duration: endTime - startTime
      });
    };
    
    function fibonacci(n) {
      if (n <= 1) return n;
      return fibonacci(n - 1) + fibonacci(n - 2);
    }
    
    function isPrime(n) {
      if (n < 2) return false;
      for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
      }
      return true;
    }
    
    function factorial(n) {
      if (n <= 1) return 1;
      return n * factorial(n - 1);
    }
  `;

  const blob = new Blob([workerCode], { type: 'application/javascript' });
  return new Worker(URL.createObjectURL(blob));
};

function HeavyComputationComponent() {
  const [numbers, setNumbers] = useState([10, 15, 20, 25, 30]);
  const [operation, setOperation] = useState('fibonacci');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState(0);
  const [worker, setWorker] = useState(null);

  // Мемоизированная обработка чисел
  const processedNumbers = useMemo(() => {
    return numbers.map(n => parseInt(n)).filter(n => !isNaN(n) && n > 0);
  }, [numbers]);

  // Инициализация Web Worker
  useEffect(() => {
    const newWorker = createWorker();
    setWorker(newWorker);

    newWorker.onmessage = (e) => {
      const { result: workerResult, duration: workerDuration } = e.data;
      setResult(workerResult);
      setDuration(workerDuration);
      setLoading(false);
    };

    return () => {
      newWorker.terminate();
    };
  }, []);

  const handleCompute = useCallback(() => {
    if (!worker || processedNumbers.length === 0) return;

    setLoading(true);
    setResult(null);
    worker.postMessage({
      numbers: processedNumbers,
      operation
    });
  }, [worker, processedNumbers, operation]);

  const addNumber = useCallback(() => {
    setNumbers(prev => [...prev, '']);
  }, []);

  const updateNumber = useCallback((index, value) => {
    setNumbers(prev => prev.map((n, i) => i === index ? value : n));
  }, []);

  const removeNumber = useCallback((index) => {
    setNumbers(prev => prev.filter((_, i) => i !== index));
  }, []);

  return (
    <div className="heavy-computation">
      <h2>Тяжелые вычисления</h2>
      
      <div className="controls">
        <div className="operation-selector">
          <label>
            Операция:
            <select value={operation} onChange={(e) => setOperation(e.target.value)}>
              <option value="fibonacci">Числа Фибоначчи</option>
              <option value="prime">Проверка на простоту</option>
              <option value="factorial">Факториал</option>
            </select>
          </label>
        </div>

        <div className="numbers-input">
          <h3>Числа для обработки:</h3>
          {numbers.map((num, index) => (
            <div key={index} className="number-input">
              <input
                type="number"
                value={num}
                onChange={(e) => updateNumber(index, e.target.value)}
                placeholder="Введите число"
              />
              <button onClick={() => removeNumber(index)}>×</button>
            </div>
          ))}
          <button onClick={addNumber}>Добавить число</button>
        </div>

        <button 
          onClick={handleCompute} 
          disabled={loading || processedNumbers.length === 0}
        >
          {loading ? 'Вычисление...' : 'Вычислить'}
        </button>
      </div>

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Выполняются тяжелые вычисления...</p>
        </div>
      )}

      {result && !loading && (
        <div className="results">
          <h3>Результаты:</h3>
          <p className="duration">Время выполнения: {duration.toFixed(2)}ms</p>
          <div className="result-list">
            {processedNumbers.map((num, index) => (
              <div key={index} className="result-item">
                <span className="input">{num}</span>
                <span className="arrow">→</span>
                <span className="output">{result[index]}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default HeavyComputationComponent;
```

</details>

---

 Эти задачи помогут освоить различные техники оптимизации производительности React-приложений!

---
