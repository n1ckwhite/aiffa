#  Управление состоянием в React Native
**Состояние — центральная часть приложения: от локального `useState` до глобальных сторасторов вроде Redux/Zustand и специализированных решений для серверных данных (React Query).**

---

##  Подходы к состоянию
- **Локальное состояние**: `useState`, `useReducer` внутри компонента.
- **Подъём состояния**: общий родитель хранит данные для нескольких дочерних компонентов.
- **Глобальное состояние**: Context API, Redux, MobX, Recoil, Zustand.
- **Серверное состояние**: React Query/TanStack Query — кеширование, рефетч, синхронизация.

---

##  Локальное состояние: useState
Подходит для изолированных UI‑состояний.

```jsx
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <View>
      <Text>Счётчик: {count}</Text>
      <Button title="+" onPress={() => setCount(c => c + 1)} />
    </View>
  );
}
```

---

##  Подъём состояния (Lifting State Up)
Перенесите состояние в ближайшего общего родителя.

```jsx
function Parent() {
  const [value, setValue] = React.useState('');
  return (
    <View>
      <ChildInput onChange={setValue} />
      <ChildDisplay value={value} />
    </View>
  );
}

function ChildInput({ onChange }) {
  return <TextInput placeholder="Введите" onChangeText={onChange} />;
}

function ChildDisplay({ value }) {
  return <Text>Вы ввели: {value}</Text>;
}
```

---

##  Context API: глобально без проп‑дрилла
Встроенный инструмент для разделяемого состояния.

```jsx
import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
}

export function UserProfile() {
  const { user, setUser } = useContext(AppContext);
  return (
    <View>
      {user ? <Text>Привет, {user.name}</Text> : <Button title="Войти" onPress={() => setUser({ name: 'Алексей' })} />}
    </View>
  );
}
```

---

##  useReducer: сложная логика в компоненте
Похоже на Redux‑подход, но локально.

```jsx
import React, { useReducer } from 'react';

const initial = { count: 0 };
function reducer(state, action) {
  switch (action.type) {
    case 'inc': return { count: state.count + 1 };
    case 'dec': return { count: state.count - 1 };
    default: return state;
  }
}

export function ReducerCounter() {
  const [state, dispatch] = useReducer(reducer, initial);
  return (
    <View>
      <Text>Счётчик: {state.count}</Text>
      <Button title="+" onPress={() => dispatch({ type: 'inc' })} />
      <Button title="-" onPress={() => dispatch({ type: 'dec' })} />
    </View>
  );
}
```

---

##  Redux: централизованный стор
Полезен в больших проектах с большим количеством связанного состояния.

```bash
npm install redux react-redux
```

```jsx
// store.js
import { createStore } from 'redux';
const initial = { count: 0 };
function reducer(state = initial, action) {
  switch (action.type) {
    case 'inc': return { count: state.count + 1 };
    case 'dec': return { count: state.count - 1 };
    default: return state;
  }
}
export const store = createStore(reducer);
```

```jsx
// Root.js
import { Provider } from 'react-redux';
import { store } from './store';

export function Root() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
```

```jsx
// Counter.js
import { useSelector, useDispatch } from 'react-redux';

export function Counter() {
  const count = useSelector(s => s.count);
  const dispatch = useDispatch();
  return (
    <View>
      <Text>Счётчик: {count}</Text>
      <Button title="+" onPress={() => dispatch({ type: 'inc' })} />
      <Button title="-" onPress={() => dispatch({ type: 'dec' })} />
    </View>
  );
}
```

---

##  Альтернативы: MobX, Recoil, Zustand, React Query
- **MobX**: реактивные observable‑сущности и декораторы (или makeAutoObservable).
- **Recoil**: атомы/селекторы для графа зависимостей.
- **Zustand**: минималистичный глобальный стор на основе hooks.
- **React Query**: серверное состояние (фетчинг/кеш/рефетч/инвалидация).

---

##  Итог
- Для локального UI — `useState`/`useReducer`; для разделяемого — Context/Redux/Zustand.
- Серверные данные ведите отдельным слоем (React Query).
- Выбор подхода определяется сложностью приложения и требованиями команды.

##  ЗАДАЧИ
Задачи для практики: `useState`, подъём, Context, useReducer, Redux/Zustand, React Query

---

###  Задача 1: Инкремент с локальным состоянием
Соберите счётчик на `useState` с кнопками +/− и кнопкой «Сброс».

<details>
<summary> Решение</summary>

```jsx
function LocalCounter() {
  const [count, setCount] = React.useState(0);
  return (
    <View>
      <Text>{count}</Text>
      <Button title="+" onPress={() => setCount(c => c + 1)} />
      <Button title="-" onPress={() => setCount(c => c - 1)} />
      <Button title="Сброс" onPress={() => setCount(0)} />
    </View>
  );
}
```

</details>

---

###  Задача 2: Подъём состояния
Сделайте поле ввода и предпросмотр в двух дочерних компонентах, состояние — у родителя.

<details>
<summary> Решение</summary>

```jsx
function Parent() {
  const [value, setValue] = React.useState('');
  return (
    <View>
      <ChildInput onChange={setValue} />
      <ChildPreview value={value} />
    </View>
  );
}
function ChildInput({ onChange }) { return <TextInput onChangeText={onChange} />; }
function ChildPreview({ value }) { return <Text>Предпросмотр: {value}</Text>; }
```

</details>

---

###  Задача 3: Context — авторизация пользователя
Создайте контекст с `user` и `login/logout`; отрисуйте строку состояния и кнопку входа/выхода.

<details>
<summary> Решение</summary>

```jsx
const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null);
  const login = () => setUser({ name: 'Alex' });
  const logout = () => setUser(null);
  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

function Header() {
  const { user, login, logout } = React.useContext(AuthContext);
  return user ? (
    <Button title="Выйти" onPress={logout} />
  ) : (
    <Button title="Войти" onPress={login} />
  );
}
```

</details>

---

###  Задача 4: useReducer — корзина
Реализуйте редьюсер корзины: `add`, `remove`, `clear` и отрисуйте список.

<details>
<summary> Решение</summary>

```jsx
function cartReducer(state, action) {
  switch (action.type) {
    case 'add': return [...state, action.item];
    case 'remove': return state.filter(x => x.id !== action.id);
    case 'clear': return [];
    default: return state;
  }
}

function Cart() {
  const [items, dispatch] = React.useReducer(cartReducer, []);
  return (
    <View>
      {items.map(i => <Text key={i.id}>{i.title}</Text>)}
      <Button title="Очистить" onPress={() => dispatch({ type: 'clear' })} />
    </View>
  );
}
```

</details>

---

###  Задача 5: Redux или Zustand — глобальный счётчик
Поднимите глобальный стор и подключите компонент к состоянию.

<details>
<summary> Решение</summary>

```jsx
// Вариант Zustand
import create from 'zustand';
const useStore = create(set => ({ count: 0, inc: () => set(s => ({ count: s.count + 1 })) }));

function ZCounter() {
  const { count, inc } = useStore();
  return (<View><Text>{count}</Text><Button title="+" onPress={inc} /></View>);
}
```

</details>

---

###  Задача 6: React Query — загрузка и кеш пользователей
Настройте `@tanstack/react-query`, загрузите список пользователей, покажите состояния загрузки/ошибки.

<details>
<summary> Решение</summary>

```bash
npm install @tanstack/react-query
```

```jsx
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import axios from 'axios';

const client = new QueryClient();

function Users() {
  const { data, isLoading, error } = useQuery({ queryKey: ['users'], queryFn: () => axios.get('https://api.example.com/users').then(r => r.data) });
  if (isLoading) return <Text>Загрузка...</Text>;
  if (error) return <Text>Ошибка</Text>;
  return data.map(u => <Text key={u.id}>{u.name}</Text>);
}

export function App() {
  return (
    <QueryClientProvider client={client}>
      <Users />
    </QueryClientProvider>
  );
}
```

</details>

---

 Эти задачи помогут отработать основные стратегии управления состоянием: от локальной логики до глобальных сторасторов и серверного состояния.

---


