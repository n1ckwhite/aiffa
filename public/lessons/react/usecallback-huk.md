#  useCallback хук

**useCallback** — хук для мемоизации функций. Возвращает ту же ссылку на функцию между рендерами, пока не изменятся зависимости. Это помогает:
- предотвращать лишние рендеры мемоизированных дочерних компонентов;
- стабилизировать зависимости в других хуках (`useEffect`, `useMemo`);
- уменьшать создание новых обработчиков в списках.

---

##  Когда использовать useCallback?

- Передаёте функцию в дочерний компонент с `React.memo`.
- Функция используется в зависимостях `useEffect`/`useMemo`.
- Массово создаёте обработчики (списки, таблицы) и хотите сократить пересоздание функций.

Когда не нужно: функция дешевая и не влияет на дочерние компоненты — излишняя сложность без профита.

---

##  Синтаксис

```jsx
const memoizedHandler = useCallback(() => {
  // логика
}, [deps]);
```

- Первый аргумент — функция-обработчик.
- Второй — массив зависимостей; при их изменении вернётся новая функция.

---

##  Частые ошибки и предосторожности

- Указывайте все зависимости, используемые внутри колбэка.
- Для сеттеров состояния предпочитайте функциональный вариант: `setCount(prev => prev + 1)` — это уменьшает список зависимостей.
- Не заменяет `useMemo` для значений: `useCallback` — для функций, `useMemo` — для значений.

##  ЗАДАЧИ

Задачи для практики: `useCallback`

---

###  Задача 1: Стабилизируйте обработчик клика
Стабилизируйте обработчик и предотвратите лишний рендер ребёнка.

<details>
<summary> Решение</summary>

```jsx
import React, { useState, useCallback } from 'react';

const Child = React.memo(({ onClick }) => {
  console.log('Child render');
  return <button onClick={onClick}>Нажми</button>;
});

function App() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
      <Child onClick={handleClick} />
    </div>
  );
}
```

</details>

---

###  Задача 2: Колбэк в зависимостях эффекта
Используйте `useCallback`, чтобы эффект не перезапускался из-за новой ссылки функции.

<details>
<summary> Решение</summary>

```jsx
import React, { useState, useEffect, useCallback } from 'react';

function Timer() {
  const [count, setCount] = useState(0);

  const tick = useCallback(() => {
    setCount(c => c + 1);
  }, []);

  useEffect(() => {
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [tick]);

  return <p>Seconds: {count}</p>;
}
```

</details>

---

###  Задача 3: Обработчики в списке
Стабилизируйте обработчик клика по элементу списка.

<details>
<summary> Решение</summary>

```jsx
import React, { useCallback } from 'react';

function List({ items, onItemClick }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          <button onClick={() => onItemClick(item.id)}>{item.name}</button>
        </li>
      ))}
    </ul>
  );
}

export default function App() {
  const items = [
    { id: 1, name: 'A' },
    { id: 2, name: 'B' },
  ];

  const handleItemClick = useCallback((id) => {
    console.log('clicked id:', id);
  }, []);

  return <List items={items} onItemClick={handleItemClick} />;
}
```

</details>

---

###  Задача 4: Передача колбэка в мемо-компонент
Совместите `React.memo` и `useCallback`, чтобы избежать лишних рендеров.

<details>
<summary> Решение</summary>

```jsx
import React, { useState, useCallback } from 'react';

const Row = React.memo(({ item, onSelect }) => {
  console.log('Row render:', item.id);
  return (
    <div>
      {item.name} <button onClick={() => onSelect(item.id)}>Выбрать</button>
    </div>
  );
});

export default function Table() {
  const [selected, setSelected] = useState(null);
  const data = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ];

  const handleSelect = useCallback((id) => {
    setSelected(id);
  }, []);

  return (
    <div>
      <p>Выбрано: {selected ?? 'ничего'}</p>
      {data.map(item => (
        <Row key={item.id} item={item} onSelect={handleSelect} />)
      )}
    </div>
  );
}
```

</details>

---

 Эти мини-задачи показывают типичные кейсы `useCallback` без лишнего кода — стабилизация обработчиков, зависимостей эффектов и работа со списками.

---