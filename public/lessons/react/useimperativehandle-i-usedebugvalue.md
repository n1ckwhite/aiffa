#  useImperativeHandle и useDebugValue

**useImperativeHandle** — позволяет настроить публичный API компонента, доступный через `ref` (работает совместно с `React.forwardRef`).

**useDebugValue** — добавляет пользовательскую подпись в React DevTools для отладки пользовательских хуков.

---

##  useImperativeHandle

###  Зачем нужен?
- Ограничить и структурировать то, что доступно внешним компонентам через `ref`.
- Спрятать внутренние детали реализации и оставить только нужные методы.
- Используется внутри компонента, обёрнутого в `forwardRef`.

###  Синтаксис
```jsx
useImperativeHandle(ref, () => ({ /* публичные методы/свойства */ }), [deps]);
```

---

##  useDebugValue

###  Зачем нужен?
- Помогает отлаживать пользовательские хуки — показывает их текущее состояние в DevTools.
- Можно форматировать значение для удобного чтения.

###  Синтаксис
```jsx
useDebugValue(value);
useDebugValue(value, v => `State: ${v}`);
```

##  ЗАДАЧИ

Задачи для практики: `useImperativeHandle`, `useDebugValue`

---

###  Задача 1: Публичные методы ввода
Сделайте у компонента методы `focus()` и `clear()` доступными извне через `ref`.

<details>
<summary> Решение</summary>

```jsx
import React, { useRef, forwardRef, useImperativeHandle } from 'react';

const CustomInput = forwardRef((props, ref) => {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    clear: () => { if (inputRef.current) inputRef.current.value = ''; }
  }), []);

  return <input ref={inputRef} {...props} />;
});

export default function App() {
  const inputRef = useRef(null);

  return (
    <div>
      <CustomInput ref={inputRef} placeholder="Введите текст" />
      <button onClick={() => inputRef.current?.focus()}>Фокус</button>
      <button onClick={() => inputRef.current?.clear()}>Очистить</button>
    </div>
  );
}
```

</details>

---

###  Задача 2: Модалка с управлением через ref
Откройте/закройте модалку методами `open()` и `close()`.

<details>
<summary> Решение</summary>

```jsx
import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';

const Modal = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
    close: () => setOpen(false)
  }), []);

  if (!open) return null;

  return (
    <div className="modal">
      <div className="modal__content">
        <h3>Модальное окно</h3>
        <button onClick={() => setOpen(false)}>Закрыть</button>
      </div>
    </div>
  );
});

export default function App() {
  const modalRef = useRef(null);

  return (
    <div>
      <button onClick={() => modalRef.current?.open()}>Открыть модалку</button>
      <Modal ref={modalRef} />
    </div>
  );
}
```

</details>

---

###  Задача 3: useDebugValue для пользовательского хука
Покажите понятную подпись состояния в DevTools для хука `useToggle`.

<details>
<summary> Решение</summary>

```jsx
import React, { useState, useDebugValue } from 'react';

function useToggle(initial = false) {
  const [on, setOn] = useState(initial);
  useDebugValue(on ? 'ON' : 'OFF');
  return { on, toggle: () => setOn(v => !v) };
}

export default function App() {
  const { on, toggle } = useToggle();
  return <button onClick={toggle}>{on ? 'Включено' : 'Выключено'}</button>;
}
```

</details>

---

###  Задача 4: Форматирование useDebugValue
Отображайте человекочитаемую информацию о подключении в DevTools.

<details>
<summary> Решение</summary>

```jsx
import React, { useState, useDebugValue, useEffect } from 'react';

function useConnectionStatus() {
  const [online, setOnline] = useState(navigator.onLine);
  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => {
      window.removeEventListener('online', on);
      window.removeEventListener('offline', off);
    };
  }, []);
  useDebugValue(online, v => (v ? ' Online' : ' Offline'));
  return online;
}

export default function App() {
  const online = useConnectionStatus();
  return <div>Сеть: {online ? 'Online' : 'Offline'}</div>;
}
```

</details>

---

 Эти мини-задачи показывают, как ограничить публичный API компонента через `useImperativeHandle` и как улучшить отладку пользовательских хуков через `useDebugValue`.

---
