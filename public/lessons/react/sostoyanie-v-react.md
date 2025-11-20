#  Состояние в React

**Состояние (State)** в React — это объект, который хранит динамические данные компонента. Оно определяет, как компонент выглядит и ведёт себя в определённый момент времени. При изменении состояния React автоматически перерендеривает компонент.

---

##  Что такое состояние?

###  Основные характеристики:
- **Динамические данные** — изменяются в процессе работы приложения
- **Локальность** — доступно только в текущем компоненте
- **Иммутабельность** — нельзя изменять напрямую
- **Автоматический рендер** — при изменении компонент обновляется

###  Простой пример:
```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Счётчик: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Увеличить
      </button>
    </div>
  );
}
```

---

##  Использование состояния

###  1. Классовые компоненты
**Состояние объявляется в конструкторе и изменяется через setState.**

####  Пример:
```jsx
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  increment = () => {
    this.setState(prevState => ({
      count: prevState.count + 1
    }));
  };

  render() {
    return (
      <div>
        <p>Счётчик: {this.state.count}</p>
        <button onClick={this.increment}>Увеличить</button>
      </div>
    );
  }
}
```

###  2. Функциональные компоненты
**Используется хук useState для управления состоянием.**

####  Пример:
```jsx
import React, { useState } from 'react';

function UserProfile() {
  const [name, setName] = useState('Иван');
  const [age, setAge] = useState(30);

  return (
    <div>
      <p>Имя: {name}</p>
      <p>Возраст: {age}</p>
      <button onClick={() => setAge(age + 1)}>
        Увеличить возраст
      </button>
    </div>
  );
}
```

---

##  Ключевые принципы

###  Иммутабельность
**Никогда не изменяйте состояние напрямую.**

####  Правильно:
```jsx
// Создаём новый объект
setUser(prevUser => ({
  ...prevUser,
  age: prevUser.age + 1
}));

// Создаём новый массив
setItems(prevItems => [...prevItems, newItem]);
```

####  Неправильно:
```jsx
//  Прямое изменение
user.age = user.age + 1;
items.push(newItem);
```

###  Асинхронность setState
**setState работает асинхронно, используйте функцию для вычислений.**

####  Пример:
```jsx
// Правильно - используем функцию
this.setState(prevState => ({
  count: prevState.count + 1
}));

// Неправильно - может работать некорректно
this.setState({ count: this.state.count + 1 });
```

---

##  Практические примеры

###  Управление формами
```jsx
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Имя"
      />
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Сообщение"
      />
    </form>
  );
}
```

###  Управление списками
```jsx
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos(prev => [...prev, {
        id: Date.now(),
        text: inputValue,
        completed: false
      }]);
      setInputValue('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id 
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  };

  return (
    <div>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Новая задача"
      />
      <button onClick={addTodo}>Добавить</button>
      
      <ul>
        {todos.map(todo => (
          <li 
            key={todo.id}
            onClick={() => toggleTodo(todo.id)}
            style={{ 
              textDecoration: todo.completed ? 'line-through' : 'none' 
            }}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

##  Лучшие практики

###  Что делать:
- Храните только необходимые данные
- Используйте иммутабельные обновления
- Разбивайте сложное состояние на простые части
- Используйте функции для вычислений в setState

###  Чего избегать:
- Прямого изменения состояния
- Хранения вычисляемых значений
- Слишком сложной структуры состояния
- Неправильных зависимостей в useEffect

---

##  Итог

**Состояние** — это основа динамических интерфейсов в React. Оно позволяет создавать интерактивные компоненты, которые реагируют на действия пользователя. Правильное использование состояния делает приложения отзывчивыми и предсказуемыми.

Ключевые принципы:
- Состояние иммутабельно
- setState асинхронно
- Минимизируйте количество состояний
- Используйте правильные паттерны обновления

##  ЗАДАЧИ

Вот набор задач, чтобы лучше понять `состояние в React`:

---

###  Задача 1: Создание счётчика с несколькими состояниями

 Создайте компонент счётчика, который имеет несколько состояний: значение счётчика, шаг изменения и максимальное значение. Добавьте кнопки для изменения шага.

```jsx
// Создайте компонент AdvancedCounter, который:
// - Отображает текущее значение счётчика
// - Позволяет изменять шаг (1, 5, 10)
// - Имеет максимальное значение (100)
// - Показывает прогресс-бар
// - Сбрасывает счётчик при достижении максимума
```

<details>
<summary> Решение</summary>

```jsx
import React, { useState, useEffect } from 'react';

function AdvancedCounter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  const [maxValue] = useState(100);

  const increment = () => {
    setCount(prev => {
      const newValue = prev + step;
      return newValue > maxValue ? 0 : newValue; // Сброс при достижении максимума
    });
  };

  const decrement = () => {
    setCount(prev => Math.max(0, prev - step));
  };

  const reset = () => setCount(0);

  const progress = (count / maxValue) * 100;

  return (
    <div className="counter">
      <h2>Продвинутый счётчик</h2>
      
      <div className="counter-display">
        <p>Значение: {count}</p>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <p>Прогресс: {progress.toFixed(1)}%</p>
      </div>

      <div className="step-controls">
        <p>Шаг: {step}</p>
        <button onClick={() => setStep(1)}>1</button>
        <button onClick={() => setStep(5)}>5</button>
        <button onClick={() => setStep(10)}>10</button>
      </div>

      <div className="counter-controls">
        <button onClick={decrement}>-{step}</button>
        <button onClick={reset}>Сброс</button>
        <button onClick={increment}>+{step}</button>
      </div>
    </div>
  );
}
```

</details>

---

###  Задача 2: Управление состоянием формы с валидацией

 Создайте форму регистрации с валидацией полей. Форма должна показывать ошибки и блокировать отправку при неверных данных.

```jsx
// Создайте форму с полями:
// - Имя (минимум 2 символа)
// - Email (валидный формат)
// - Пароль (минимум 6 символов)
// - Подтверждение пароля
// - Кнопка отправки (активна только при валидных данных)
```

<details>
<summary> Вывод</summary>

```jsx
import React, { useState } from 'react';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return value.length < 2 ? 'Имя должно содержать минимум 2 символа' : '';
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? 'Неверный формат email' : '';
      case 'password':
        return value.length < 6 ? 'Пароль должен содержать минимум 6 символов' : '';
      case 'confirmPassword':
        return value !== formData.password ? 'Пароли не совпадают' : '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({ ...prev, [name]: value }));
    
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
    
    // Проверяем валидность всей формы
    const newErrors = { ...errors, [name]: error };
    const hasErrors = Object.values(newErrors).some(error => error !== '');
    const allFieldsFilled = Object.values({ ...formData, [name]: value }).every(field => field !== '');
    
    setIsValid(!hasErrors && allFieldsFilled);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      console.log('Форма отправлена:', formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="registration-form">
      <h2>Регистрация</h2>
      
      <div className="form-group">
        <label>Имя:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label>Пароль:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>

      <div className="form-group">
        <label>Подтверждение пароля:</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
      </div>

      <button type="submit" disabled={!isValid}>
        {isValid ? 'Зарегистрироваться' : 'Заполните все поля правильно'}
      </button>
    </form>
  );
}
```

</details>

---

###  Задача 3: Оптимизация состояния компонента

 Оптимизируйте следующий компонент, используя правильные паттерны работы с состоянием.

```jsx
// Исходный неоптимизированный компонент:
function ProductManager() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Проблемы:
  // 1. Сложная логика фильтрации и сортировки
  // 2. Неэффективные обновления состояния
  // 3. Отсутствие мемоизации

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(filter.toLowerCase())
  );

  filteredProducts.sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'price') return a.price - b.price;
    return 0;
  });

  return (
    <div>
      {/* Контролы и список продуктов */}
    </div>
  );
}
```

<details>
<summary> Вывод</summary>

```jsx
import React, { useState, useMemo, useCallback } from 'react';

function ProductManager() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [selectedProducts, setSelectedProducts] = useState(new Set());

  // Мемоизация отфильтрованных и отсортированных продуктов
  const processedProducts = useMemo(() => {
    let filtered = products.filter(product => 
      product.name.toLowerCase().includes(filter.toLowerCase())
    );

    filtered.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'price') return a.price - b.price;
      return 0;
    });

    return filtered;
  }, [products, filter, sortBy]);

  // Оптимизированные обработчики
  const toggleProductSelection = useCallback((productId) => {
    setSelectedProducts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  }, []);

  const addProduct = useCallback((product) => {
    setProducts(prev => [...prev, { ...product, id: Date.now() }]);
  }, []);

  const removeProduct = useCallback((productId) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    setSelectedProducts(prev => {
      const newSet = new Set(prev);
      newSet.delete(productId);
      return newSet;
    });
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedProducts(new Set());
  }, []);

  return (
    <div className="product-manager">
      <div className="controls">
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Фильтр по названию"
        />
        
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">По названию</option>
          <option value="price">По цене</option>
        </select>

        <button onClick={clearSelection}>
          Очистить выбор ({selectedProducts.size})
        </button>
      </div>

      <div className="products">
        {processedProducts.map(product => (
          <div 
            key={product.id}
            className={`product ${selectedProducts.has(product.id) ? 'selected' : ''}`}
            onClick={() => toggleProductSelection(product.id)}
          >
            <h3>{product.name}</h3>
            <p>Цена: ${product.price}</p>
            <button onClick={(e) => {
              e.stopPropagation();
              removeProduct(product.id);
            }}>
              Удалить
            </button>
          </div>
        ))}
      </div>

      <div className="stats">
        <p>Всего продуктов: {products.length}</p>
        <p>Показано: {processedProducts.length}</p>
        <p>Выбрано: {selectedProducts.size}</p>
      </div>
    </div>
  );
}
```

</details>

---

 Эти задачи помогут понять принципы работы с состоянием и научиться создавать эффективные React компоненты.

---
