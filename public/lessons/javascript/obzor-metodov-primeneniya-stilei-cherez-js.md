#  Обзор методов применения стилей через JavaScript

###  1. **Прямое изменение через `element.style`**

* Удобно для динамического задания отдельных CSS-свойств.
* Поддерживает только inline-стили.

```javascript
element.style.backgroundColor = 'red';
element.style.border = '1px solid black';
```

###  2. **Работа с `classList`**

* Предпочтительный способ: стили определяются в CSS, логика — в JS.
* Методы: `.add()`, `.remove()`, `.toggle()`, `.contains()`.

```javascript
element.classList.add('active');
element.classList.toggle('hidden');
```

###  3. **Изменение CSS-переменных**

* Полезно, если вы используете дизайн-токены или адаптивную тему.

```javascript
document.documentElement.style.setProperty('--accent-color', 'tomato');
```

###  4. **Создание и вставка CSS-правил**

* Позволяет динамически добавлять CSS-правила в документ.

```javascript
const style = document.createElement('style');
style.textContent = '#box { color: white; background: black; }';
document.head.appendChild(style);
```

---

##  Итог

| Цель                               | Рекомендуемый способ      |
| ---------------------------------- | ------------------------- |
| Изменить 1–2 свойства на лету      | `element.style.property`  |
| Применить заранее заданные стили   | `element.classList.add()` |
| Поддержка тем / адаптивный дизайн  | CSS-переменные (`--vars`) |
| Генерация стилей на основе условий | `createElement('style')`  |


##  ЗАДАЧИ

Задачи по теме `Применение стилей к элементам DOM через JavaScript`

---

###  Задача 1: Изменить цвет текста через `style`

```html
<p id="text">Привет, мир!</p>
```

<details>
<summary> Решение</summary>

```javascript
const text = document.getElementById('text');
text.style.color = 'red';
```

Установили цвет текста с помощью `element.style.color`.

</details>

---

###  Задача 2: Изменить фон и отступы внутри блока

```html
<div id="box">Контейнер</div>
```

<details>
<summary> Решение</summary>

```javascript
const box = document.getElementById('box');
box.style.backgroundColor = 'lightblue';
box.style.padding = '20px';
```

Добавили фон и внутренний отступ через `style`.

</details>

---

###  Задача 3: Добавить класс к элементу

```html
<style>
  .highlight {
    background-color: yellow;
    font-weight: bold;
  }
</style>

<p id="para">Абзац текста</p>
```

<details>
<summary> Решение</summary>

```javascript
const para = document.getElementById('para');
para.classList.add('highlight');
```

Применили готовый CSS-класс с помощью `classList.add`.

</details>

---

###  Задача 4: Переключить класс при клике

При клике переключаем класс `active`.

```html
<style>
  .active {
    color: green;
  }
</style>

<button id="btn">Нажми</button>
```

<details>
<summary> Решение</summary>

```javascript
const btn = document.getElementById('btn');
btn.addEventListener('click', () => {
  btn.classList.toggle('active');
});
```

</details>

---

###  Задача 5: Изменить CSS-переменную

Изменить глобальную CSS-переменную через `setProperty`.

```html
<style>
  :root {
    --main-color: gray;
  }
  div {
    color: var(--main-color);
  }
</style>

<div>Текст с переменной</div>
```

<details>
<summary> Решение</summary>

```javascript
document.documentElement.style.setProperty('--main-color', 'blue');
```

</details>

---

###  Задача 6: Динамически вставить CSS-правило

Добавить стили через созданный элемент `<style>` в `<head>`.

```html
<div id="custom">Динамический стиль</div>
```

<details>
<summary> Решение</summary>

```javascript
const style = document.createElement('style');
style.textContent = '#custom { color: purple; font-style: italic; }';
document.head.appendChild(style);
```

</details>

---

 Знание способов применения стилей через `JavaScript` — будь то прямое изменение свойства `style`, добавление и переключение CSS-классов, работа с CSS-переменными или динамическое создание стилей — позволяет гибко и эффективно управлять внешним видом элементов на странице в реальном времени.

---
