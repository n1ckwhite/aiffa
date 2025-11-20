#  Жизненный цикл компонентов React

**Жизненный цикл компонента React** — это последовательность этапов, которые проходит компонент с момента создания до удаления. Понимание жизненного цикла критически важно для правильного управления состоянием, побочными эффектами и производительностью приложений.

---

##  Этапы жизненного цикла

###  1. Монтирование (Mounting)
**Компонент создаётся и добавляется в DOM.**

####  Классовые компоненты:
```jsx
class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null, loading: true };
    console.log('1. Constructor - инициализация состояния');
  }

  static getDerivedStateFromProps(props, state) {
    console.log('2. getDerivedStateFromProps - синхронизация с пропсами');
    return null;
  }

  componentDidMount() {
    console.log('4. componentDidMount - компонент смонтирован');
    // API запросы, подписки, инициализация
    this.fetchUser();
  }

  render() {
    console.log('3. Render - отрисовка компонента');
    if (this.state.loading) return <div>Загрузка...</div>;
    
    return (
      <div>
        <h2>{this.state.user?.name}</h2>
        <p>{this.state.user?.email}</p>
      </div>
    );
  }
}
```

####  Функциональные компоненты:
```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Component mounted - компонент смонтирован');
    
    // API запросы, подписки, инициализация
    fetchUser(userId).then(data => {
      setUser(data);
      setLoading(false);
    });
  }, []); // Пустой массив = только при монтировании

  if (loading) return <div>Загрузка...</div>;
  
  return (
    <div>
      <h2>{user?.name}</h2>
      <p>{user?.email}</p>
    </div>
  );
}
```

###  2. Обновление (Updating)
**Компонент обновляется при изменении пропсов или состояния.**

####  Классовые компоненты:
```jsx
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  static getDerivedStateFromProps(props, state) {
    console.log('1. getDerivedStateFromProps - обновление');
    return null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('2. shouldComponentUpdate - проверка необходимости обновления');
    // Оптимизация: предотвращаем ненужные рендеры
    return nextState.count !== this.state.count;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('4. getSnapshotBeforeUpdate - снимок перед обновлением');
    // Сохраняем позицию прокрутки
    return this.listRef.current?.scrollHeight;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('6. componentDidUpdate - компонент обновлён');
    // Побочные эффекты после обновления
    if (snapshot) {
      this.listRef.current.scrollTop = snapshot;
    }
  }

  render() {
    console.log('3. Render - перерисовка компонента');
    return (
      <div>
        <p>Счётчик: {this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Увеличить
        </button>
      </div>
    );
  }
}
```

####  Функциональные компоненты:
```jsx
function Counter({ initialCount }) {
  const [count, setCount] = useState(initialCount);
  const [prevCount, setPrevCount] = useState(initialCount);

  useEffect(() => {
    console.log('Component updated - компонент обновлён');
    // Побочные эффекты после обновления
    document.title = `Счётчик: ${count}`;
  }, [count]); // Выполняется при изменении count

  useEffect(() => {
    console.log('Count changed from', prevCount, 'to', count);
    setPrevCount(count);
  }, [count, prevCount]);

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

###  3. Размонтирование (Unmounting)
**Компонент удаляется из DOM.**

####  Классовые компоненты:
```jsx
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { seconds: 0 };
    this.timerId = null;
  }

  componentDidMount() {
    this.timerId = setInterval(() => {
      this.setState(prev => ({ seconds: prev.seconds + 1 }));
    }, 1000);
  }

  componentWillUnmount() {
    console.log('Component will unmount - компонент будет размонтирован');
    // Очистка ресурсов
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  render() {
    return <div>Секунды: {this.state.seconds}</div>;
  }
}
```

####  Функциональные компоненты:
```jsx
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timerId = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    // Функция очистки
    return () => {
      console.log('Component will unmount - компонент будет размонтирован');
      clearInterval(timerId);
    };
  }, []); // Пустой массив = только при монтировании

  return <div>Секунды: {seconds}</div>;
}
```

---

##  Сравнение подходов

###  Таблица методов жизненного цикла

| Этап | Классовые компоненты | Функциональные компоненты |
|------|---------------------|---------------------------|
| **Монтирование** | constructor → getDerivedStateFromProps → render → componentDidMount | useEffect(() => {}, []) |
| **Обновление** | getDerivedStateFromProps → shouldComponentUpdate → render → getSnapshotBeforeUpdate → componentDidUpdate | useEffect(() => {}, [deps]) |
| **Размонтирование** | componentWillUnmount | return () => {} из useEffect |

###  Преимущества хуков:
```jsx
// Классовый компонент (многословно)
class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null, loading: true };
  }

  componentDidMount() {
    this.fetchUser();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.fetchUser();
    }
  }

  componentWillUnmount() {
    // Очистка
  }

  fetchUser = () => {
    // Логика
  }

  render() {
    // JSX
  }
}

// Функциональный компонент (лаконично)
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser(userId);
  }, [userId]); // Автоматически при изменении userId

  return (
    // JSX
  );
}
```

---

##  Практические примеры

###  1. API запросы
```jsx
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Только при монтировании

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

###  2. Подписки и таймеры
```jsx
function RealTimeCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Подписка на WebSocket
    const socket = new WebSocket('ws://localhost:8080');
    
    socket.onmessage = (event) => {
      setCount(JSON.parse(event.data).count);
    };

    // Таймер для fallback
    const timer = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);

    // Очистка при размонтировании
    return () => {
      socket.close();
      clearInterval(timer);
    };
  }, []);

  return <div>Счётчик: {count}</div>;
}
```

###  3. Синхронизация с пропсами
```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  // Обновление при изменении userId
  useEffect(() => {
    if (userId) {
      fetchUser(userId).then(setUser);
    }
  }, [userId]); // Зависимость от userId

  // Синхронизация с внешним состоянием
  useEffect(() => {
    if (user) {
      document.title = `Профиль: ${user.name}`;
    }
  }, [user]); // Зависимость от user

  return (
    <div>
      {user ? (
        <div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      ) : (
        <div>Загрузка...</div>
      )}
    </div>
  );
}
```

---

##  Оптимизация жизненного цикла

###  React.memo для предотвращения лишних рендеров
```jsx
const ExpensiveComponent = React.memo(({ data, onUpdate }) => {
  console.log('ExpensiveComponent rendered');
  
  return (
    <div>
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
});

// Компонент перерендерится только при изменении props
```

###  useMemo для мемоизации вычислений
```jsx
function UserDashboard({ users, filter }) {
  // Мемоизация отфильтрованных пользователей
  const filteredUsers = useMemo(() => {
    console.log('Filtering users...');
    return users.filter(user => 
      user.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [users, filter]); // Пересчитывается только при изменении зависимостей

  return (
    <div>
      <p>Найдено: {filteredUsers.length}</p>
      {filteredUsers.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
```

###  useCallback для мемоизации функций
```jsx
function TodoList({ todos, onToggle, onDelete }) {
  // Мемоизация функций обработчиков
  const handleToggle = useCallback((id) => {
    onToggle(id);
  }, [onToggle]);

  const handleDelete = useCallback((id) => {
    onDelete(id);
  }, [onDelete]);

  return (
    <ul>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}
```

---

##  Обработка ошибок

###  Error Boundaries (классовые компоненты)
```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
    // Отправка ошибки в сервис мониторинга
  }

  render() {
    if (this.state.hasError) {
      return <h1>Что-то пошло не так.</h1>;
    }

    return this.props.children;
  }
}

// Использование
<ErrorBoundary>
  <UserProfile userId={1} />
</ErrorBoundary>
```

---

##  Итог

**Жизненный цикл компонентов** — это фундаментальная концепция React, которая позволяет управлять состоянием, побочными эффектами и производительностью приложений. Современные хуки упрощают работу с жизненным циклом и делают код более читаемым и поддерживаемым.

Ключевые принципы:
- Используйте useEffect для побочных эффектов
- Правильно указывайте зависимости в массиве
- Не забывайте об очистке ресурсов
- Применяйте оптимизации для предотвращения лишних рендеров

##  ЗАДАЧИ

Вот набор задач, чтобы лучше понять `жизненный цикл компонентов React`:

---

###  Задача 1: Анализ порядка выполнения методов

 Проследите порядок выполнения методов жизненного цикла для следующего компонента. Определите, какие методы будут вызваны и в каком порядке.

```jsx
class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    console.log('1. Constructor');
    this.state = { user: null };
  }

  static getDerivedStateFromProps(props, state) {
    console.log('2. getDerivedStateFromProps');
    return null;
  }

  componentDidMount() {
    console.log('4. componentDidMount');
    this.fetchUser();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('6. componentDidUpdate');
  }

  componentWillUnmount() {
    console.log('7. componentWillUnmount');
  }

  render() {
    console.log('3. Render');
    return <div>User Profile</div>;
  }

  fetchUser() {
    // API запрос
  }
}

// Использование:
<UserProfile userId={1} />
```

<details>
<summary> Вывод</summary>

```jsx
// Порядок выполнения при монтировании:

// 1. Constructor
// - Инициализация состояния
// - Привязка методов

// 2. getDerivedStateFromProps
// - Синхронизация состояния с пропсами
// - Вызывается перед render

// 3. Render
// - Отрисовка JSX
// - Создание Virtual DOM

// 4. componentDidMount
// - Компонент добавлен в DOM
// - API запросы, подписки

// При обновлении (если изменится userId):
// 2. getDerivedStateFromProps
// 3. Render
// 6. componentDidUpdate

// При размонтировании:
// 7. componentWillUnmount
// - Очистка ресурсов

// Вывод: методы выполняются в строгом порядке
// согласно этапам жизненного цикла
```

</details>

---

###  Задача 2: Создание компонента с правильным жизненным циклом

 Создайте компонент, который демонстрирует все этапы жизненного цикла. Компонент должен:
- Загружать данные пользователя при монтировании
- Обновляться при изменении userId
- Очищать ресурсы при размонтировании
- Показывать статус загрузки

```jsx
// Создайте компонент UserProfile, который:
// - Принимает userId как prop
// - Загружает данные пользователя с API
// - Показывает загрузку, ошибку или данные
// - Логирует все этапы жизненного цикла
// - Очищает ресурсы при размонтировании

// API: fetch(`/api/users/${userId}`)
```

<details>
<summary> Решение</summary>

```jsx
import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Монтирование и обновление при изменении userId
  useEffect(() => {
    console.log(' Effect triggered - userId:', userId);
    
    let isMounted = true; // Флаг для предотвращения утечек памяти

    const fetchUser = async () => {
      try {
        console.log(' Fetching user data...');
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/users/${userId}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const userData = await response.json();
        
        // Проверяем, что компонент всё ещё смонтирован
        if (isMounted) {
          console.log(' User data loaded:', userData);
          setUser(userData);
          setLoading(false);
        }
      } catch (err) {
        console.error(' Error fetching user:', err);
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    if (userId) {
      fetchUser();
    }

    // Функция очистки (размонтирование)
    return () => {
      console.log(' Cleanup - component will unmount or userId changed');
      isMounted = false; // Предотвращаем обновление состояния
    };
  }, [userId]); // Зависимость от userId

  // Синхронизация с внешним состоянием
  useEffect(() => {
    if (user) {
      console.log(' Updating document title');
      document.title = `Профиль: ${user.name}`;
    }
  }, [user]);

  console.log(' Render - UserProfile component');

  if (loading) {
    return (
      <div className="user-profile loading">
        <div className="spinner">⏳</div>
        <p>Загрузка профиля пользователя...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-profile error">
        <h3> Ошибка загрузки</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          Попробовать снова
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="user-profile empty">
        <p>Пользователь не найден</p>
      </div>
    );
  }

  return (
    <div className="user-profile">
      <h2> {user.name}</h2>
      <div className="user-info">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Возраст:</strong> {user.age}</p>
        <p><strong>Город:</strong> {user.city}</p>
      </div>
      <div className="user-actions">
        <button onClick={() => console.log('Редактировать профиль')}>
           Редактировать
        </button>
        <button onClick={() => console.log('Отправить сообщение')}>
           Сообщение
        </button>
      </div>
    </div>
  );
}

// Использование:
function App() {
  const [currentUserId, setCurrentUserId] = useState(1);

  return (
    <div>
      <div className="controls">
        <button onClick={() => setCurrentUserId(1)}>Пользователь 1</button>
        <button onClick={() => setCurrentUserId(2)}>Пользователь 2</button>
        <button onClick={() => setCurrentUserId(3)}>Пользователь 3</button>
      </div>
      
      <UserProfile userId={currentUserId} />
    </div>
  );
}
```

</details>

---

###  Задача 3: Оптимизация жизненного цикла

 Оптимизируйте следующий компонент, используя техники оптимизации жизненного цикла. Устраните лишние рендеры и улучшите производительность.

```jsx
// Исходный неоптимизированный компонент:
function ProductList({ products, onProductSelect, onProductDelete }) {
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('name');

  // Фильтрация и сортировка при каждом рендере
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
      <input 
        value={filter} 
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Фильтр по названию"
      />
      
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="name">По названию</option>
        <option value="price">По цене</option>
      </select>

      <div className="products">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onSelect={() => onProductSelect(product.id)}
            onDelete={() => onProductDelete(product.id)}
          />
        ))}
      </div>
    </div>
  );
}
```

<details>
<summary> Вывод</summary>

```jsx
import React, { useState, useMemo, useCallback, memo } from 'react';

// Мемоизированный компонент карточки продукта
const ProductCard = memo(({ product, onSelect, onDelete }) => {
  console.log('ProductCard rendered:', product.name);
  
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>Цена: ${product.price}</p>
      <button onClick={onSelect}>Выбрать</button>
      <button onClick={onDelete}>Удалить</button>
    </div>
  );
});

// Оптимизированный компонент списка
function ProductList({ products, onProductSelect, onProductDelete }) {
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('name');

  // Мемоизация отфильтрованного и отсортированного списка
  const processedProducts = useMemo(() => {
    console.log('Processing products...');
    
    let filtered = products.filter(product => 
      product.name.toLowerCase().includes(filter.toLowerCase())
    );

    filtered.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'price') return a.price - b.price;
      return 0;
    });

    return filtered;
  }, [products, filter, sortBy]); // Пересчитывается только при изменении зависимостей

  // Мемоизация функций обработчиков
  const handleSelect = useCallback((productId) => {
    onProductSelect(productId);
  }, [onProductSelect]);

  const handleDelete = useCallback((productId) => {
    onProductDelete(productId);
  }, [onProductDelete]);

  // Мемоизация функций для каждого продукта
  const productHandlers = useMemo(() => {
    return processedProducts.map(product => ({
      product,
      onSelect: () => handleSelect(product.id),
      onDelete: () => handleDelete(product.id)
    }));
  }, [processedProducts, handleSelect, handleDelete]);

  return (
    <div>
      <input 
        value={filter} 
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Фильтр по названию"
      />
      
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="name">По названию</option>
        <option value="price">По цене</option>
      </select>

      <div className="products">
        {productHandlers.map(({ product, onSelect, onDelete }) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelect={onSelect}
            onDelete={onDelete}
          />
        ))}
      </div>
      
      <div className="stats">
        <p>Показано: {processedProducts.length} из {products.length}</p>
      </div>
    </div>
  );
}

// Использование:
function App() {
  const [products] = useState([
    { id: 1, name: 'iPhone', price: 999 },
    { id: 2, name: 'MacBook', price: 1299 },
    { id: 3, name: 'iPad', price: 799 }
  ]);

  const handleProductSelect = useCallback((productId) => {
    console.log('Выбран продукт:', productId);
  }, []);

  const handleProductDelete = useCallback((productId) => {
    console.log('Удалён продукт:', productId);
  }, []);

  return (
    <ProductList
      products={products}
      onProductSelect={handleProductSelect}
      onProductDelete={handleProductDelete}
    />
  );
}
```

</details>

---

 Эти задачи помогут понять принципы жизненного цикла компонентов и научиться оптимизировать React приложения.

---
