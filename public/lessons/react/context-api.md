#  Context API в React

**Context API** — это механизм React для передачи данных по всему дереву компонентов без необходимости прокидывать их через props на каждом уровне.

---

##  Что такое Context API?

###  Основные характеристики:
- **Глобальная передача данных** — минуя промежуточные компоненты
- **Решение "prop drilling"** — не нужно прокидывать props через все уровни
- **Простота использования** — с хуком useContext
- **Производительность** — обновляются только подписанные компоненты

###  Простой пример:
```jsx
// Создание контекста
const UserContext = createContext();

function App() {
  const [user, setUser] = useState('Иван');
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Profile />
    </UserContext.Provider>
  );
}

function Profile() {
  const { user } = useContext(UserContext);
  return <p>Пользователь: {user}</p>;
}
```

---

##  Как создать и использовать Context?

###  1. Создание контекста
**Создаём контекст с помощью createContext().**

####  Пример:
```jsx
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {}
});
```

###  2. Провайдер (Provider)
**Оборачиваем компоненты в Provider для передачи данных.**

####  Пример:
```jsx
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
```

###  3. Использование useContext
**Получаем данные из контекста в любом дочернем компоненте.**

####  Пример:
```jsx
function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <div style={{ 
      backgroundColor: theme === 'light' ? '#fff' : '#333',
      color: theme === 'light' ? '#333' : '#fff'
    }}>
      <h1>Тема: {theme}</h1>
      <button onClick={toggleTheme}>Сменить тему</button>
    </div>
  );
}
```

---

##  Кастомные хуки для Context

###  Создание безопасного хука
**Создаём кастомный хук для удобства и безопасности.**

####  Пример:
```jsx
function useTheme() {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  
  return context;
}

// Использование:
function MyComponent() {
  const { theme, toggleTheme } = useTheme(); // Безопасно!
  return <div>Текущая тема: {theme}</div>;
}
```

---

##  Множественные контексты

###  Использование нескольких контекстов
**Можно использовать несколько контекстов одновременно.**

####  Пример:
```jsx
const UserContext = createContext();
const SettingsContext = createContext();

function App() {
  return (
    <UserContext.Provider value={{ name: 'Иван' }}>
      <SettingsContext.Provider value={{ lang: 'ru' }}>
        <Dashboard />
      </SettingsContext.Provider>
    </UserContext.Provider>
  );
}

function Dashboard() {
  const { name } = useContext(UserContext);
  const { lang } = useContext(SettingsContext);
  
  return <div>Пользователь: {name}, Язык: {lang}</div>;
}
```

---

##  Оптимизация Context

###  Мемоизация значений
**Используйте useMemo для предотвращения лишних перерендеров.**

####  Пример:
```jsx
function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  
  //  Мемоизируем значение
  const value = useMemo(() => ({
    user,
    setUser
  }), [user]);
  
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}
```

---

##  Когда использовать Context?

###  **Подходящие случаи:**
- **Глобальные настройки**: тема, язык
- **Аутентификация**: данные пользователя
- **UI состояние**: модальные окна
- **Конфигурация**: настройки приложения

###  **Неподходящие случаи:**
- **Частые изменения**: счетчики, анимации
- **Локальное состояние**: формы, поля ввода
- **Большие объемы данных**: списки, таблицы
- **Сложная логика**: лучше Redux, Zustand

---

##  Итог

**Context API** — удобный способ передачи глобальных данных в React приложениях.

**Ключевые моменты:**
- Решает проблему "prop drilling"
- Используйте для глобальных данных
- Создавайте кастомные хуки
- Оптимизируйте с помощью useMemo

##  ЗАДАЧИ

Вот набор задач, чтобы лучше понять `Context в React`:

###  Задача 1: Создайте приложение с темой
Создайте мини-приложение с Context API для переключения темы:

**Требования:**
- Контекст для текущей темы (`light`/`dark`)
- Кнопка для смены темы
- Компонент, который отображает текущую тему
- Стили должны меняться в зависимости от темы

**Решение:**
```jsx
import React, { createContext, useContext, useState } from 'react';

// 1. Создаем контекст
const ThemeContext = createContext();

// 2. Провайдер темы
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

// 3. Кастомный хук
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// 4. Компонент с темой
function Layout() {
  const { theme, toggleTheme } = useTheme();
  
  const styles = {
    backgroundColor: theme === 'light' ? '#ffffff' : '#1a1a1a',
    color: theme === 'light' ? '#000000' : '#ffffff',
    padding: '20px',
    minHeight: '100vh'
  };
  
  return (
    <div style={styles}>
      <h1>Приложение с темой</h1>
      <p>Текущая тема: <strong>{theme}</strong></p>
      <button onClick={toggleTheme}>
        Переключить тему
      </button>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Layout />
    </ThemeProvider>
  );
}
```

###  Задача 2: Система управления пользователем
Создайте систему для управления информацией о пользователе:

**Требования:**
- Контекст UserContext с именем, email и ролью
- Компонент для отображения информации пользователя
- Формы для "входа" и "выхода" из системы

**Решение:**
```jsx
import React, { createContext, useContext, useState } from 'react';

// 1. Контекст пользователя
const UserContext = createContext();

// 2. Провайдер пользователя
function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  
  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);
  
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

// 3. Кастомный хук
function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}

// 4. Форма входа
function LoginForm() {
  const { login } = useUser();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user'
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      login(formData);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <h2>Вход в систему</h2>
      <input
        type="text"
        placeholder="Имя"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
      />
      <select
        value={formData.role}
        onChange={(e) => setFormData({...formData, role: e.target.value})}
      >
        <option value="user">Пользователь</option>
        <option value="admin">Администратор</option>
      </select>
      <button type="submit">Войти</button>
    </form>
  );
}

// 5. Профиль пользователя
function UserProfile() {
  const { user, logout } = useUser();
  
  if (!user) return <LoginForm />;
  
  return (
    <div>
      <h2>Профиль пользователя</h2>
      <p>Имя: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Роль: {user.role}</p>
      <button onClick={logout}>Выйти</button>
    </div>
  );
}

function App() {
  return (
    <UserProvider>
      <UserProfile />
    </UserProvider>
  );
}
```

###  Задача 3: Многоуровневая передача данных
Создайте структуру компонентов, где данные передаются через Context:

**Требования:**
- Структура: App → Layout → Header → UserMenu
- Данные о корзине передаются от App к UserMenu
- Промежуточные компоненты не знают о корзине

**Решение:**
```jsx
import React, { createContext, useContext, useState } from 'react';

// 1. Контекст корзины
const CartContext = createContext();

// 2. Провайдер корзины
function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  
  const addToCart = (item) => {
    setCart(prevCart => [...prevCart, { ...item, id: Date.now() }]);
  };
  
  const getTotalItems = () => cart.length;
  
  return (
    <CartContext.Provider value={{ cart, addToCart, getTotalItems }}>
      {children}
    </CartContext.Provider>
  );
}

// 3. Кастомный хук
function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}

// 4. Главное приложение (уровень 1)
function App() {
  return (
    <CartProvider>
      <Layout />
      <ProductList />
    </CartProvider>
  );
}

// 5. Макет (уровень 2) - не знает о корзине
function Layout() {
  return (
    <div>
      <Header />
      <main>
        <h1>Интернет-магазин</h1>
      </main>
    </div>
  );
}

// 6. Шапка (уровень 3) - не знает о корзине
function Header() {
  return (
    <header>
      <UserMenu />
    </header>
  );
}

// 7. Меню пользователя (уровень 4) - использует данные корзины
function UserMenu() {
  const { getTotalItems } = useCart();
  
  return (
    <div>
       Корзина ({getTotalItems()} товаров)
    </div>
  );
}

// 8. Список товаров
function ProductList() {
  const { addToCart } = useCart();
  
  const products = [
    { name: 'Телефон', price: 25000 },
    { name: 'Ноутбук', price: 45000 }
  ];
  
  return (
    <div>
      <h2>Товары</h2>
      {products.map((product, index) => (
        <div key={index}>
          <h3>{product.name}</h3>
          <p>{product.price}₽</p>
          <button onClick={() => addToCart(product)}>
            В корзину
          </button>
        </div>
      ))}
    </div>
  );
}
```

---

 Эти задачи помогут понять, как использовать Context API для решения реальных задач!

---