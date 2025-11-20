#  useRef хук

**useRef** — хук, который возвращает объект с полем `.current`. Значение в `.current` сохраняется между рендерами, но его изменение не вызывает перерендер. Используется для:
- доступа к DOM-элементам;
- хранения мутабельного состояния, не влияющего на рендер;
- сохранения предыдущих значений пропсов/состояния.

---

##  Синтаксис

```jsx
const ref = useRef(initialValue);
// ref.current — текущее значение
```

- `initialValue` — начальное значение для `.current`.
- Объект `ref` стабилен между рендерами.

---

##  Ключевые особенности

- Изменение `.current` не вызывает рендер.
- Значение не теряется между рендерами.
- Полезен для работы с DOM, таймерами, предыдущими значениями.

##  ЗАДАЧИ

Задачи для практики: `useRef`

---

###  Задача 1: Фокус на поле ввода
Создайте кнопку, которая устанавливает фокус на поле ввода.

<details>
<summary> Решение</summary>

```jsx
import React, { useRef } from 'react';

function FocusInput() {
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="Введите текст" />
      <button onClick={handleFocus}>Фокус</button>
    </div>
  );
}
```

</details>

---

###  Задача 2: Счётчик без рендера
Создайте счётчик, который увеличивается, но не вызывает рендер.

<details>
<summary> Решение</summary>

```jsx
import React, { useRef, useState } from 'react';

function SilentCounter() {
  const countRef = useRef(0);
  const [render, setRender] = useState(0);

  const increment = () => {
    countRef.current += 1;
    console.log('Счётчик:', countRef.current);
  };

  const forceRender = () => {
    setRender(r => r + 1);
  };

  return (
    <div>
      <p>Счётчик: {countRef.current}</p>
      <button onClick={increment}>+1</button>
      <button onClick={forceRender}>Рендер</button>
    </div>
  );
}
```

</details>

---

###  Задача 3: Предыдущее значение
Сохраните предыдущее значение состояния.

<details>
<summary> Решение</summary>

```jsx
import React, { useState, useRef, useEffect } from 'react';

function PreviousValue() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef();

  useEffect(() => {
    prevCountRef.current = count;
  });

  return (
    <div>
      <p>Текущий: {count}</p>
      <p>Предыдущий: {prevCountRef.current}</p>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
    </div>
  );
}
```

</details>

---

###  Задача 4: Очистка таймера
Создайте таймер, который можно остановить через реф.

<details>
<summary> Решение</summary>

```jsx
import React, { useRef, useState } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);

  const start = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
  };

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <div>
      <p>Секунды: {seconds}</p>
      <button onClick={start}>Старт</button>
      <button onClick={stop}>Стоп</button>
    </div>
  );
}
```

</details>

---

 Эти мини-задачи показывают основные кейсы `useRef` — доступ к DOM, мутабельное состояние, предыдущие значения и очистка таймеров.

---