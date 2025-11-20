#  Функциональные и классовые компоненты

**В React существует два основных типа компонентов: функциональные и классовые.** Оба типа могут выполнять схожие задачи, такие как рендеринг интерфейса и управление состоянием, но между ними есть важные различия в синтаксисе, возможностях и подходе к разработке.

---

##  Что такое функциональные компоненты?

###  Основные характеристики:
- **Простые JavaScript-функции** — принимают props и возвращают JSX
- **Современный подход** — рекомендуемый способ с React 16.8+
- **Хуки** — используют useState, useEffect и другие хуки
- **Компактность** — меньше кода, проще для понимания

###  Простой пример:
```jsx
import React from 'react';

function Welcome({ name }) {
  return <h1>Привет, {name}!</h1>;
}

export default Welcome;
```

---

##  Что такое классовые компоненты?

###  Основные характеристики:
- **ES6 классы** — расширяют React.Component
- **Методы жизненного цикла** — componentDidMount, componentDidUpdate и др.
- **this.state** — управление состоянием через this.setState()
- **Традиционный подход** — использовался до появления хуков

###  Простой пример:
```jsx
import React, { Component } from 'react';

class Welcome extends Component {
  render() {
    return <h1>Привет, {this.props.name}!</h1>;
  }
}

export default Welcome;
```

---

##  Сравнение компонентов

###  Таблица различий:

| Особенность | Функциональные | Классовые |
|-------------|----------------|-----------|
| **Синтаксис** | JavaScript функции | ES6 классы |
| **Состояние** | useState хук | this.state |
| **Жизненный цикл** | useEffect хук | Методы жизненного цикла |
| **Props** | Параметры функции | this.props |
| **Размер кода** | Компактный | Более объемный |
| **Читаемость** | Высокая | Средняя |

---

##  Управление состоянием

###  1. Функциональные компоненты (с хуками)
**Используют useState для управления состоянием.**

####  Пример:
```jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('Пользователь');

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h2>Счетчик: {count}</h2>
      <p>Пользователь: {name}</p>
      <button onClick={increment}>Увеличить</button>
      <button onClick={() => setName('Новое имя')}>
        Изменить имя
      </button>
    </div>
  );
}
```

###  2. Классовые компоненты
**Используют this.state и this.setState для управления состоянием.**

####  Пример:
```jsx
import React, { Component } from 'react';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      name: 'Пользователь'
    };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  changeName = () => {
    this.setState({ name: 'Новое имя' });
  };

  render() {
    return (
      <div>
        <h2>Счетчик: {this.state.count}</h2>
        <p>Пользователь: {this.state.name}</p>
        <button onClick={this.increment}>Увеличить</button>
        <button onClick={this.changeName}>
          Изменить имя
        </button>
      </div>
    );
  }
}
```

---

##  Методы жизненного цикла

###  1. Классовые компоненты
**Имеют встроенные методы жизненного цикла.**

####  Пример:
```jsx
import React, { Component } from 'react';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: true
    };
  }

  componentDidMount() {
    // Выполняется после монтирования
    this.fetchUser();
  }

  componentDidUpdate(prevProps) {
    // Выполняется после обновления
    if (prevProps.userId !== this.props.userId) {
      this.fetchUser();
    }
  }

  componentWillUnmount() {
    // Выполняется перед размонтированием
    console.log('Компонент будет удален');
  }

  fetchUser = async () => {
    try {
      const response = await fetch(`/api/users/${this.props.userId}`);
      const user = await response.json();
      this.setState({ user, loading: false });
    } catch (error) {
      this.setState({ loading: false });
    }
  };

  render() {
    if (this.state.loading) {
      return <div>Загрузка...</div>;
    }

    return (
      <div>
        <h2>{this.state.user?.name}</h2>
        <p>{this.state.user?.email}</p>
      </div>
    );
  }
}
```

###  2. Функциональные компоненты (с useEffect)
**Используют useEffect для управления жизненным циклом.**

####  Пример:
```jsx
import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Аналог componentDidMount
    fetchUser();
  }, []); // Пустой массив = выполнить один раз

  useEffect(() => {
    // Аналог componentDidUpdate
    if (userId) {
      fetchUser();
    }
  }, [userId]); // Выполнить при изменении userId

  useEffect(() => {
    // Аналог componentWillUnmount
    return () => {
      console.log('Компонент будет удален');
    };
  }, []);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/users/${userId}`);
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error('Ошибка загрузки пользователя:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div>
      <h2>{user?.name}</h2>
      <p>{user?.email}</p>
    </div>
  );
}
```

---

##  Обработка событий

###  1. Функциональные компоненты
**Прямое использование функций и стрелочных функций.**

####  Пример:
```jsx
import React, { useState } from 'react';

function Form() {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Отправлено:', input);
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Введите текст"
      />
      <button type="submit">Отправить</button>
    </form>
  );
}
```

###  2. Классовые компоненты
**Используют методы класса и привязку this.**

####  Пример:
```jsx
import React, { Component } from 'react';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = { input: '' };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('Отправлено:', this.state.input);
  };

  handleChange = (e) => {
    this.setState({ input: e.target.value });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.input}
          onChange={this.handleChange}
          placeholder="Введите текст"
        />
        <button type="submit">Отправить</button>
      </form>
    );
  }
}
```

---

##  Преимущества и недостатки

###  **Функциональные компоненты:**

**Преимущества:**
- **Простота** — легче понимать и писать
- **Меньше кода** — нет constructor, методов жизненного цикла
- **Хуки** — гибкое управление состоянием и эффектами
- **Производительность** — лучше оптимизируются React
- **Современность** — рекомендуемый подход

**Недостатки:**
- **Кривая обучения** — нужно изучать хуки
- **Сложность** — для очень сложной логики могут быть менее читаемыми

###  **Классовые компоненты:**

**Преимущества:**
- **Традиционность** — знакомый подход для разработчиков
- **Методы жизненного цикла** — четкое разделение логики
- **this** — явное управление контекстом

**Недостатки:**
- **Сложность** — больше кода, сложнее понимать
- **this** — проблемы с привязкой контекста
- **Устаревание** — не рекомендуются для новых проектов

---

##  Когда использовать что?

###  **Используйте функциональные компоненты когда:**
- Создаете новый проект
- Компонент простой или средней сложности
- Нужны хуки для управления состоянием
- Важна производительность и читаемость

###  **Используйте классовые компоненты когда:**
- Работаете со старым кодом
- Нужны специфические методы жизненного цикла
- Команда привыкла к классовому подходу
- Используете Error Boundaries

---

##  Миграция с классов на функции

###  Пример миграции:

**Было (классовый компонент):**
```jsx
class UserCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false
    };
  }

  toggleExpanded = () => {
    this.setState({ isExpanded: !this.state.isExpanded });
  };

  render() {
    return (
      <div>
        <h3>{this.props.user.name}</h3>
        {this.state.isExpanded && (
          <p>{this.props.user.email}</p>
        )}
        <button onClick={this.toggleExpanded}>
          {this.state.isExpanded ? 'Скрыть' : 'Показать'}
        </button>
      </div>
    );
  }
}
```

**Стало (функциональный компонент):**
```jsx
function UserCard({ user }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <h3>{user.name}</h3>
      {isExpanded && (
        <p>{user.email}</p>
      )}
      <button onClick={toggleExpanded}>
        {isExpanded ? 'Скрыть' : 'Показать'}
      </button>
    </div>
  );
}
```

---

##  Итог

**Функциональные компоненты с хуками** — современный и рекомендуемый подход в React.

**Ключевые моменты:**
- Используйте функциональные компоненты для новых проектов
- Хуки заменяют методы жизненного цикла
- useState для состояния, useEffect для побочных эффектов
- Классовые компоненты — для legacy кода

##  ЗАДАЧИ

Задачи для практики: `функциональные и классовые компоненты`

---

###  Задача 1: Создайте функциональный компонент счетчика
Создайте функциональный компонент, который:
- Использует useState для хранения значения счетчика
- Имеет кнопки для увеличения, уменьшения и сброса
- Отображает текущее значение

<details>
<summary> Решение</summary>

```jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div className="counter">
      <h2>Счетчик: {count}</h2>
      <div className="buttons">
        <button onClick={decrement}>-</button>
        <button onClick={reset}>Сброс</button>
        <button onClick={increment}>+</button>
      </div>
    </div>
  );
}

export default Counter;
```

</details>

---

###  Задача 2: Создайте классовый компонент таймера
Создайте классовый компонент, который:
- Использует this.state для хранения времени
- Запускает таймер при монтировании (componentDidMount)
- Останавливает таймер при размонтировании (componentWillUnmount)
- Отображает прошедшее время в секундах

<details>
<summary> Решение</summary>

```jsx
import React, { Component } from 'react';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 0
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState(prevState => ({
        seconds: prevState.seconds + 1
      }));
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <div className="timer">
        <h2>Прошло времени: {this.state.seconds} сек</h2>
      </div>
    );
  }
}

export default Timer;
```

</details>

---

###  Задача 3: Миграция с класса на функцию
Переведите следующий классовый компонент в функциональный:

```jsx
class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      errors: {}
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, email } = this.state;
    
    if (!name || !email) {
      this.setState({
        errors: { message: 'Все поля обязательны' }
      });
      return;
    }

    console.log('Данные:', { name, email });
    this.setState({ name: '', email: '', errors: {} });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
          placeholder="Имя"
        />
        <input
          type="email"
          name="email"
          value={this.state.email}
          onChange={this.handleChange}
          placeholder="Email"
        />
        {this.state.errors.message && (
          <p className="error">{this.state.errors.message}</p>
        )}
        <button type="submit">Отправить</button>
      </form>
    );
  }
}
```

<details>
<summary> Решение</summary>

```jsx
import React, { useState } from 'react';

function UserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'name') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name || !email) {
      setErrors({ message: 'Все поля обязательны' });
      return;
    }

    console.log('Данные:', { name, email });
    setName('');
    setEmail('');
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
        placeholder="Имя"
      />
      <input
        type="email"
        name="email"
        value={email}
        onChange={handleChange}
        placeholder="Email"
      />
      {errors.message && (
        <p className="error">{errors.message}</p>
      )}
      <button type="submit">Отправить</button>
    </form>
  );
}

export default UserForm;
```

</details>

---

###  Задача 4: Создайте компонент с useEffect
Создайте функциональный компонент, который:
- Загружает список пользователей с API
- Показывает индикатор загрузки
- Обрабатывает ошибки
- Использует useEffect для загрузки данных

<details>
<summary> Решение</summary>

```jsx
import React, { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Имитация API запроса
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
          throw new Error('Ошибка загрузки пользователей');
        }
        
        const userData = await response.json();
        setUsers(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Пустой массив = выполнить один раз

  if (loading) {
    return <div>Загрузка пользователей...</div>;
  }

  if (error) {
    return <div className="error">Ошибка: {error}</div>;
  }

  return (
    <div className="user-list">
      <h2>Список пользователей</h2>
      {users.map(user => (
        <div key={user.id} className="user-item">
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <p>{user.phone}</p>
        </div>
      ))}
    </div>
  );
}

export default UserList;
```

</details>

---

###  Задача 5: Сравнение производительности
Создайте два компонента (функциональный и классовый), которые:
- Отображают список из 1000 элементов
- Имеют кнопку для обновления списка
- Измеряют время рендеринга

<details>
<summary> Решение</summary>

```jsx
import React, { useState, Component } from 'react';

// Функциональный компонент
function FunctionalList() {
  const [items, setItems] = useState([]);
  const [renderTime, setRenderTime] = useState(0);

  const generateItems = () => {
    const startTime = performance.now();
    
    const newItems = Array.from({ length: 1000 }, (_, i) => ({
      id: i,
      value: Math.random()
    }));
    
    setItems(newItems);
    
    const endTime = performance.now();
    setRenderTime(endTime - startTime);
  };

  return (
    <div>
      <h3>Функциональный компонент</h3>
      <p>Время рендеринга: {renderTime.toFixed(2)}ms</p>
      <button onClick={generateItems}>Генерировать элементы</button>
      <div className="list">
        {items.map(item => (
          <div key={item.id}>{item.value.toFixed(4)}</div>
        ))}
      </div>
    </div>
  );
}

// Классовый компонент
class ClassList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      renderTime: 0
    };
  }

  generateItems = () => {
    const startTime = performance.now();
    
    const newItems = Array.from({ length: 1000 }, (_, i) => ({
      id: i,
      value: Math.random()
    }));
    
    this.setState({ items: newItems });
    
    const endTime = performance.now();
    this.setState({ renderTime: endTime - startTime });
  };

  render() {
    return (
      <div>
        <h3>Классовый компонент</h3>
        <p>Время рендеринга: {this.state.renderTime.toFixed(2)}ms</p>
        <button onClick={this.generateItems}>Генерировать элементы</button>
        <div className="list">
          {this.state.items.map(item => (
            <div key={item.id}>{item.value.toFixed(4)}</div>
          ))}
        </div>
      </div>
    );
  }
}

// Главный компонент для сравнения
function PerformanceComparison() {
  return (
    <div className="comparison">
      <h2>Сравнение производительности</h2>
      <div className="components">
        <FunctionalList />
        <ClassList />
      </div>
    </div>
  );
}

export default PerformanceComparison;
```

</details>

---

###  Задача 6: Создайте компонент с жизненным циклом
Создайте функциональный компонент, который:
- Подписывается на события window при монтировании
- Отображает текущую позицию мыши
- Отписывается от событий при размонтировании
- Использует useEffect для управления подписками

<details>
<summary> Решение</summary>

```jsx
import React, { useState, useEffect } from 'react';

function MouseTracker() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isTracking, setIsTracking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    if (isTracking) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Очистка при размонтировании или изменении isTracking
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isTracking]);

  const toggleTracking = () => {
    setIsTracking(!isTracking);
  };

  return (
    <div className="mouse-tracker">
      <h3>Отслеживание мыши</h3>
      <p>Статус: {isTracking ? 'Активно' : 'Неактивно'}</p>
      <p>Позиция: X: {mousePosition.x}, Y: {mousePosition.y}</p>
      <button onClick={toggleTracking}>
        {isTracking ? 'Остановить' : 'Начать'} отслеживание
      </button>
    </div>
  );
}

export default MouseTracker;
```

</details>

---

 Эти задачи помогут понять различия между функциональными и классовыми компонентами, их особенности и лучшие практики использования!

---
