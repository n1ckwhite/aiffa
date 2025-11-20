#  Передача данных между компонентами в React

**Передача данных между компонентами** — это фундаментальная концепция React, которая определяет, как компоненты обмениваются информацией. Понимание различных способов передачи данных критически важно для создания эффективных и масштабируемых приложений.

---

##  Основные способы передачи данных

###  1. Props (Свойства)
**Что это:** Механизм передачи данных от родительского компонента к дочернему.

####  Преимущества:
- Односторонний поток данных
- Неизменяемость props
- Переиспользование компонентов
- Простота использования

####  Пример:
```jsx
// Родительский компонент
function ParentComponent() {
  const user = { name: 'Иван', age: 30 };
  
  return (
    <div>
      <h1>Профиль пользователя</h1>
      <UserCard user={user} />
    </div>
  );
}

// Дочерний компонент
function UserCard({ user }) {
  return (
    <div className="user-card">
      <h2>{user.name}</h2>
      <p>Возраст: {user.age}</p>
    </div>
  );
}
```

###  2. State (Состояние)
**Что это:** Локальное состояние компонента для хранения изменяемых данных.

####  Преимущества:
- Локальность данных
- Автоматический рендер
- Иммутабельность
- Простое управление

####  Пример:
```jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div>
      {isVisible && <p>Счётчик: {count}</p>}
      <button onClick={() => setCount(count + 1)}>
        Увеличить
      </button>
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? 'Скрыть' : 'Показать'}
      </button>
    </div>
  );
}
```

###  3. Callback функции
**Что это:** Функции для передачи данных от дочернего компонента к родительскому.

####  Преимущества:
- Обратная связь
- Делегирование логики
- Гибкость передачи данных
- Простота реализации

####  Пример:
```jsx
// Родительский компонент
function ParentComponent() {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    console.log('Выбран элемент:', item);
  };

  return (
    <div>
      <h2>Выбранный элемент: {selectedItem?.name || 'Ничего не выбрано'}</h2>
      <ItemSelector onItemSelect={handleItemSelect} />
    </div>
  );
}

// Дочерний компонент
function ItemSelector({ onItemSelect }) {
  const items = ['Яблоко', 'Банан', 'Апельсин'];

  return (
    <div>
      {items.map(item => (
        <button 
          key={item} 
          onClick={() => onItemSelect({ name: item, id: Date.now() })}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
```

###  4. Context API
**Что это:** Механизм для передачи данных через дерево компонентов без props.

####  Преимущества:
- Решение prop drilling
- Глобальная передача данных
- Простота использования
- Производительность

####  Пример:
```jsx
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <header style={{ 
      backgroundColor: theme === 'light' ? '#fff' : '#333',
      color: theme === 'light' ? '#333' : '#fff'
    }}>
      <h1>Тема: {theme}</h1>
      <button onClick={toggleTheme}>Сменить тему</button>
    </header>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Header />
      <MainContent />
    </ThemeProvider>
  );
}
```

---

##  Дополнительные способы

###  5. Redux и другие библиотеки
**Что это:** Централизованное управление состоянием для сложных приложений.

####  Преимущества:
- Централизованное состояние
- Предсказуемые обновления
- Инструменты разработчика
- Масштабируемость

####  Пример:
```jsx
import { useSelector, useDispatch } from 'react-redux';

function UserProfile() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const updateProfile = (data) => {
    dispatch({ type: 'UPDATE_USER', payload: data });
  };

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <button onClick={() => updateProfile({ role: 'admin' })}>
        Сделать администратором
      </button>
    </div>
  );
}
```

###  6. Локальное хранилище
**Что это:** Сохранение данных в localStorage или sessionStorage.

####  Преимущества:
- Персистентность данных
- Простота использования
- Доступность из любого компонента
- Автономность

####  Пример:
```jsx
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Тема: {theme}
    </button>
  );
}
```

---

##  Сравнение методов передачи данных

###  Props vs State vs Context

| Характеристика | Props | State | Context |
|----------------|-------|-------|---------|
| **Направление** | ⭐⭐ Родитель → Дочерний | ⭐⭐ Локально | ⭐⭐⭐⭐⭐ Глобально |
| **Изменяемость** | ⭐ Неизменяемы | ⭐⭐⭐⭐⭐ Изменяемы | ⭐⭐⭐ Изменяемы |
| **Производительность** | ⭐⭐⭐⭐⭐ Отличная | ⭐⭐⭐⭐ Хорошая | ⭐⭐⭐ Средняя |
| **Сложность** | ⭐⭐ Простая | ⭐⭐⭐ Средняя | ⭐⭐⭐⭐ Сложная |
| **Применение** | ⭐⭐⭐⭐⭐ Компоненты | ⭐⭐⭐⭐ Формы | ⭐⭐⭐ Настройки |

###  Когда использовать каждый метод

| Сценарий | Рекомендуемый метод | Причина |
|----------|---------------------|---------|
| **Передача данных вниз** | Props | Простота и производительность |
| **Локальные изменения** | State | Естественность React |
| **Глобальные настройки** | Context | Избежание prop drilling |
| **Сложное состояние** | Redux | Централизация и масштабируемость |
| **Персистентные данные** | LocalStorage | Сохранение между сессиями |

---

##  Лучшие практики

###  7. Оптимизация производительности
**Использование useCallback и useMemo для оптимизации:**

####  Преимущества:
- Предотвращение ненужных рендеров
- Оптимизация callback функций
- Кэширование вычислений
- Улучшение производительности

####  Пример:
```jsx
import React, { useState, useCallback, useMemo } from 'react';

function UserList({ users, onUserSelect }) {
  const [filter, setFilter] = useState('');

  // Оптимизация callback функции
  const handleUserSelect = useCallback((user) => {
    onUserSelect(user);
  }, [onUserSelect]);

  // Оптимизация вычислений
  const filteredUsers = useMemo(() => {
    return users.filter(user => 
      user.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [users, filter]);

  return (
    <div>
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Поиск пользователей..."
      />
      <ul>
        {filteredUsers.map(user => (
          <li key={user.id} onClick={() => handleUserSelect(user)}>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

###  8. Обработка ошибок
**Безопасная передача данных с проверками:**

####  Преимущества:
- Предотвращение ошибок
- Улучшение UX
- Отладка проблем
- Надёжность приложения

####  Пример:
```jsx
function SafeUserCard({ user, onEdit, onDelete }) {
  // Проверка наличия данных
  if (!user || !user.name) {
    return <div className="error">Данные пользователя недоступны</div>;
  }

  // Безопасные callback функции
  const handleEdit = () => {
    if (typeof onEdit === 'function') {
      onEdit(user);
    }
  };

  const handleDelete = () => {
    if (typeof onDelete === 'function' && window.confirm('Удалить пользователя?')) {
      onDelete(user.id);
    }
  };

  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>Email: {user.email || 'Не указан'}</p>
      <div className="actions">
        <button onClick={handleEdit}>Редактировать</button>
        <button onClick={handleDelete} className="danger">Удалить</button>
      </div>
    </div>
  );
}
```

---

##  Итог

**Передача данных между компонентами** в React предоставляет множество способов для эффективного обмена информацией. Выбор правильного метода зависит от конкретной задачи и архитектуры приложения.

Ключевые принципы передачи данных:
- Props для простой передачи вниз
- State для локального управления
- Callbacks для обратной связи
- Context для глобальных данных
- Redux для сложного состояния

##  ЗАДАЧИ

Вот набор задач, чтобы лучше понять `передачу данных между компонентами`:

---

###  Задача 1: Создание компонента списка задач

 Создайте компонент `TodoList`, который принимает массив задач через props и отображает их. Добавьте возможность отмечать задачи как выполненные.

```jsx
// Создайте компонент TodoList, который:
// 1. Принимает массив задач через props
// 2. Отображает каждую задачу с чекбоксом
// 3. Позволяет отмечать задачи как выполненные
// 4. Использует callback для обновления состояния
```

<details>
<summary> Решение</summary>

```jsx
// Решение:

function TodoList({ todos, onToggleTodo }) {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <li key={todo.id} className="todo-item">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggleTodo(todo.id)}
          />
          <span style={{ 
            textDecoration: todo.completed ? 'line-through' : 'none' 
          }}>
            {todo.text}
          </span>
        </li>
      ))}
    </ul>
  );
}

// Родительский компонент
function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Изучить React', completed: false },
    { id: 2, text: 'Создать приложение', completed: true }
  ]);

  const handleToggleTodo = (todoId) => {
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === todoId 
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  return (
    <div>
      <h1>Список задач</h1>
      <TodoList todos={todos} onToggleTodo={handleToggleTodo} />
    </div>
  );
}

// Ключевые моменты:
// 1. Props для передачи данных (todos)
// 2. State для управления состоянием
// 3. Callback для обновления (onToggleTodo)
// 4. Иммутабельное обновление состояния
```

</details>

---

###  Задача 2: Компонент формы с валидацией

 Создайте компонент `LoginForm`, который управляет состоянием формы и валидирует ввод. Используйте локальное состояние для управления формой.

```jsx
// Создайте форму входа, которая:
// 1. Управляет состоянием полей email и password
// 2. Валидирует ввод (email обязателен, пароль минимум 6 символов)
// 3. Отображает ошибки валидации
// 4. Отправляет данные через callback
```

<details>
<summary> Решение</summary>

```jsx
function LoginForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Очистка ошибки при вводе
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email некорректен';
    }
    
    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен содержать минимум 6 символов';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      try {
        await onSubmit(formData);
      } catch (error) {
        setErrors({ submit: 'Ошибка входа' });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Введите email"
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <span className="error-text">{errors.email}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="password">Пароль:</label>
        <input
          id="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Введите пароль"
          className={errors.password ? 'error' : ''}
        />
        {errors.password && <span className="error-text">{errors.password}</span>}
      </div>
      
      {errors.submit && <div className="error-text">{errors.submit}</div>}
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Вход...' : 'Войти'}
      </button>
    </form>
  );
}

// Использование:
function App() {
  const handleLogin = async (credentials) => {
    // Имитация API запроса
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Вход выполнен:', credentials);
  };

  return (
    <div>
      <h1>Вход в систему</h1>
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
}

// Ключевые моменты:
// 1. Локальное состояние для формы (formData)
// 2. Отдельное состояние для ошибок (errors)
// 3. Валидация при отправке
// 4. Callback для отправки данных
// 5. Обработка состояния загрузки
```

</details>

---

###  Задача 3: Создание контекста для пользователя

 Создайте контекст `UserContext` для управления данными пользователя и компонент `UserProfile`, который использует этот контекст.

```jsx
// Создайте контекст, который:
// 1. Хранит данные пользователя
// 2. Предоставляет функции для обновления
// 3. Обрабатывает вход и выход
// 4. Используется в компоненте профиля
```

<details>
<summary> Решение</summary>

```jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Имитация проверки авторизации
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Проверяем токен в localStorage
        const token = localStorage.getItem('authToken');
        if (token) {
          // Имитация API запроса
          const userData = await fetchUserData(token);
          setUser(userData);
        }
      } catch (error) {
        console.error('Ошибка авторизации:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      setLoading(true);
      // Имитация API запроса
      const { user: userData, token } = await loginAPI(credentials);
      
      localStorage.setItem('authToken', token);
      setUser(userData);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  const updateUser = (updates) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  const value = {
    user,
    loading,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

// Кастомный хук для использования контекста
function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser должен использоваться внутри UserProvider');
  }
  return context;
}

// Компонент профиля пользователя
function UserProfile() {
  const { user, updateUser, logout } = useUser();

  const handleRoleChange = () => {
    const newRole = user.role === 'user' ? 'admin' : 'user';
    updateUser({ role: newRole });
  };

  return (
    <div className="user-profile">
      <div className="profile-header">
        <img src={user.avatar} alt={user.name} className="avatar" />
        <h2>{user.name}</h2>
        <p className="email">{user.email}</p>
        <span className={`role role-${user.role}`}>{user.role}</span>
      </div>
      
      <div className="profile-actions">
        <button onClick={handleRoleChange} className="btn-secondary">
          {user.role === 'user' ? 'Сделать администратором' : 'Сделать пользователем'}
        </button>
        <button onClick={logout} className="btn-danger">
          Выйти
        </button>
      </div>
      
      <div className="profile-info">
        <h3>Информация о профиле</h3>
        <p><strong>Дата регистрации:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
        <p><strong>Последний вход:</strong> {new Date(user.lastLogin).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

// Компонент входа
function LoginForm() {
  const { login } = useUser();
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(credentials);
    
    if (!result.success) {
      alert(`Ошибка входа: ${result.error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={credentials.email}
        onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
      />
      <input
        type="password"
        placeholder="Пароль"
        value={credentials.password}
        onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
      />
      <button type="submit">Войти</button>
    </form>
  );
}

// Главное приложение
function App() {
  return (
    <UserProvider>
      <div className="app">
        <Header />
        <main>
          <UserProfile />
        </main>
      </div>
    </UserProvider>
  );
}

// Вспомогательные функции (имитация API)
async function loginAPI(credentials) {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    user: {
      id: 1,
      name: 'Иван Петров',
      email: credentials.email,
      role: 'user',
      avatar: '/avatars/default.jpg',
      createdAt: '2024-01-01',
      lastLogin: new Date().toISOString()
    },
    token: 'fake-jwt-token'
  };
}

async function fetchUserData(token) {
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    id: 1,
    name: 'Иван Петров',
    email: 'ivan@example.com',
    role: 'user',
    avatar: '/avatars/default.jpg',
    createdAt: '2024-01-01',
    lastLogin: new Date().toISOString()
  };
}

// Ключевые моменты:
// 1. Context для глобального состояния пользователя
// 2. Кастомный хук useUser для удобства
// 3. Автоматическая проверка авторизации
// 4. Функции для входа, выхода и обновления
// 5. Обработка состояния загрузки
```

</details>

---

 Эти задачи помогут понять реальные способы передачи данных в React и научиться применять их на практике.

---
