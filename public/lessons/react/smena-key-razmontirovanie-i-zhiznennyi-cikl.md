#  Смена `key`: размонтирование и жизненный цикл

Изменение `key` у элемента/компонента сообщает React, что это совершенно новый экземпляр. Старый полностью размонтируется, новый — монтируется с нуля. Это не обновление, а замена узла.

---

##  Что происходит при смене `key`

- Старый экземпляр удаляется (вызовы очисток и `componentWillUnmount`).
- Новый экземпляр создаётся заново (конструктор/эффекты, `componentDidMount`).
- Локальное состояние и рефы внутри компонента теряются и инициализируются заново.
- DOM-узел заменяется: фокус/скролл/позиция caret могут сброситься.

---

##  Жизненный цикл

### Классовый компонент
- Старый: `componentWillUnmount`
- Новый: `constructor` → `static getDerivedStateFromProps?` → `render` → `componentDidMount`
- `componentDidUpdate` не вызывается (нет обновления — смонтирован новый экземпляр)

### Функциональный компонент
- Старый: вызовы `cleanup` у всех активных `useLayoutEffect` и `useEffect`, затем размонтирование
- Новый: тело компонента → `useLayoutEffect` → отрисовка → `useEffect`

---

##  Зачем менять `key`

- **Сброс состояния** сложного виджета/формы одним действием
- **Перезапуск анимации** или шагов мастера
- **Переинициализация** после смены исходных данных, когда обновления недостаточно

Когда не стоит: для обычного обновления пропсов/состояния — это дороже и ломает непрерывность UI.

---

##  Правила ключей в списках

- Используйте стабильные уникальные `id`, а не индексы массива
- Сохраняйте `key`, пока элемент логически тот же; меняйте только для осознанной переинициализации

##  ЗАДАЧИ

Задачи для практики: `смена key`

---

###  Задача 1: Сброс формы через смену key
Сбросьте форму к начальному состоянию, изменив `key` корневого компонента формы.

<details>
<summary> Решение</summary>

```jsx
import React, { useState } from 'react';

function Form() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  return (
    <form>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Имя" />
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
    </form>
  );
}

export default function FormContainer() {
  const [version, setVersion] = useState(0);
  return (
    <div>
      <button onClick={() => setVersion(v => v + 1)}>Сбросить форму</button>
      <Form key={version} />
    </div>
  );
}
```

</details>

---

###  Задача 2: Перезапуск анимации
Смените `key`, чтобы анимация проигрывалась заново.

<details>
<summary> Решение</summary>

```jsx
import React, { useState } from 'react';

function AnimatedBox() {
  return (
    <div style={{
      width: 100,
      height: 100,
      background: 'tomato',
      animation: 'spin 1s linear'
    }} />
  );
}

export default function Replay() {
  const [k, setK] = useState(0);
  return (
    <div>
      <button onClick={() => setK(k + 1)}>Повторить</button>
      <AnimatedBox key={k} />
    </div>
  );
}
```

</details>

---

###  Задача 3: Демонстрация жизненного цикла (классы)
Покажите логи `unmount → mount` при смене `key` у классового компонента.

<details>
<summary> Решение</summary>

```jsx
import React, { Component, useState } from 'react';

class LifeDemo extends Component {
  componentDidMount() { console.log('mount'); }
  componentWillUnmount() { console.log('unmount'); }
  render() { return <div>key: {this.props.k}</div>; }
}

export default function App() {
  const [k, setK] = useState(1);
  return (
    <div>
      <button onClick={() => setK(k + 1)}>Change key</button>
      <LifeDemo key={k} k={k} />
    </div>
  );
}
```

</details>

---

###  Задача 4: Сохранить/потерять фокус при смене key
Покажите, что смена `key` сбрасывает фокус и значение неконтролируемого инпута.

<details>
<summary> Решение</summary>

```jsx
import React, { useState, useRef, useEffect } from 'react';

function Uncontrolled() {
  const ref = useRef(null);
  useEffect(() => { ref.current?.focus(); }, []);
  return <input ref={ref} placeholder="Печатайте, затем смените key" />;
}

export default function Demo() {
  const [k, setK] = useState(0);
  return (
    <div>
      <button onClick={() => setK(k + 1)}>Сменить key</button>
      <Uncontrolled key={k} />
    </div>
  );
}
```

</details>

---

 Рекомендации:

- Смена `key` = намеренный полный перезапуск компонента и его поддерева.
- Используйте как инструмент сброса/переинициализации; не применяйте для обычных обновлений.
- В списках — выбирайте стабильные уникальные ключи и не используйте индексы массива.

---