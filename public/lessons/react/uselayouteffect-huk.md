#  useLayoutEffect хук

**useLayoutEffect** — хук, который выполняется синхронно после изменений DOM, но до отрисовки браузером. Полезен для:
- измерения размеров/позиции элементов;
- синхронизации изменений DOM перед отрисовкой;
- предотвращения мерцаний интерфейса.

---

##  Отличия от useEffect

| Критерий | useEffect | useLayoutEffect |
|----------|-----------|-----------------|
| **Время выполнения** | Асинхронно, после отрисовки | Синхронно, до отрисовки |
| **Производительность** | Не блокирует рендер | Блокирует рендер |
| **Применение** | API, подписки, таймеры | Измерения, работа с DOM |

---

##  Синтаксис

```jsx
useLayoutEffect(() => {
  // логика
}, [deps]);
```

- Выполняется синхронно после DOM-мутаций.
- Блокирует отрисовку до завершения.

---

##  Когда использовать?

- Измерения элементов после изменения.
- Изменения стилей на основе размеров.
- Предотвращение визуальных мерцаний.

** Используйте осторожно** — может замедлить отрисовку.

##  ЗАДАЧИ

Задачи для практики: `useLayoutEffect`

---

###  Задача 1: Измерение размеров элемента
Измерьте размеры элемента сразу после рендера.

<details>
<summary> Решение</summary>

```jsx
import React, { useLayoutEffect, useRef, useState } from 'react';

function MeasureBox() {
  const boxRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const { width, height } = boxRef.current.getBoundingClientRect();
    setSize({ width, height });
  }, []);

  return (
    <div>
      <div
        ref={boxRef}
        style={{ width: '200px', height: '100px', background: 'lightblue' }}
      >
        Элемент
      </div>
      <p>Размер: {size.width}×{size.height}px</p>
    </div>
  );
}
```

</details>

---

###  Задача 2: Изменение стиля на основе размера
Измените цвет элемента, если его ширина больше 150px.

<details>
<summary> Решение</summary>

```jsx
import React, { useLayoutEffect, useRef, useState } from 'react';

function ColorBySize() {
  const boxRef = useRef(null);
  const [color, setColor] = useState('lightblue');

  useLayoutEffect(() => {
    if (boxRef.current.offsetWidth > 150) {
      setColor('lightgreen');
    }
  }, []);

  return (
    <div
      ref={boxRef}
      style={{
        width: '200px',
        height: '100px',
        background: color,
        transition: 'background 0.3s'
      }}
    >
      Элемент
    </div>
  );
}
```

</details>

---

###  Задача 3: Сравнение с useEffect
Покажите разницу между useEffect и useLayoutEffect.

<details>
<summary> Решение</summary>

```jsx
import React, { useLayoutEffect, useEffect, useRef, useState } from 'react';

function Comparison() {
  const boxRef = useRef(null);
  const [layoutColor, setLayoutColor] = useState('lightblue');
  const [effectColor, setEffectColor] = useState('lightblue');

  useLayoutEffect(() => {
    console.log('useLayoutEffect - до отрисовки');
    setLayoutColor('lightgreen');
  }, []);

  useEffect(() => {
    console.log('useEffect - после отрисовки');
    setEffectColor('lightcoral');
  }, []);

  return (
    <div>
      <div
        ref={boxRef}
        style={{
          width: '200px',
          height: '100px',
          background: layoutColor,
          margin: '10px'
        }}
      >
        useLayoutEffect
      </div>
      <div
        style={{
          width: '200px',
          height: '100px',
          background: effectColor,
          margin: '10px'
        }}
      >
        useEffect
      </div>
    </div>
  );
}
```

</details>

---

###  Задача 4: Позиционирование элемента
Расположите элемент по центру экрана.

<details>
<summary> Решение</summary>

```jsx
import React, { useLayoutEffect, useRef, useState } from 'react';

function CenteredBox() {
  const boxRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    const box = boxRef.current;
    const { width, height } = box.getBoundingClientRect();
    
    setPosition({
      top: (window.innerHeight - height) / 2,
      left: (window.innerWidth - width) / 2
    });
  }, []);

  return (
    <div
      ref={boxRef}
      style={{
        position: 'fixed',
        top: position.top,
        left: position.left,
        width: '200px',
        height: '100px',
        background: 'lightblue',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      По центру
    </div>
  );
}
```

</details>

---

 Эти мини-задачи показывают основные кейсы `useLayoutEffect` — измерения, изменения стилей, сравнение с `useEffect` и позиционирование.

---