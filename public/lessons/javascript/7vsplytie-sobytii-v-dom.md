#  Всплытие событий в DOM

###  Что это такое?

**Всплытие событий (event bubbling)** — это механизм распространения событий в DOM. Когда событие происходит на вложенном элементе, оно сначала обрабатывается на этом элементе, а затем поднимается вверх по иерархии DOM, вызывая обработчики на родительских элементах.

---

###  Как это работает?

#### Пример:

```html
<div id="parent">
    <button id="child">Click Me!</button>
</div>
```

```javascript
document.getElementById('parent').addEventListener('click', () => {
    console.log('Parent clicked');
});

document.getElementById('child').addEventListener('click', () => {
    console.log('Child clicked');
});
```

**При клике по кнопке в консоли появится:**

```
Child clicked
Parent clicked
```

Сначала срабатывает обработчик на кнопке (`child`), затем на контейнере (`parent`).

---

###  Как остановить всплытие?

Чтобы остановить распространение события выше по дереву, используйте:

#### `stopPropagation()`

```javascript
document.getElementById('child').addEventListener('click', function(event) {
    console.log('Child clicked');
    event.stopPropagation(); // Остановить всплытие
});
```

#### `stopImmediatePropagation()`

Останавливает всплытие и предотвращает выполнение других обработчиков на этом же элементе:

```javascript
element.addEventListener('click', function(event) {
    event.stopImmediatePropagation();
});
```

---

###  Когда это полезно?

* Чтобы обработчик родительского элемента **не реагировал** на события внутри вложенного.
* Для создания **гибкого управления** событиями в сложных интерфейсах.

---

##  Итог

Всплытие событий позволяет событиям подниматься от цели к предкам. Используя `stopPropagation()` и `stopImmediatePropagation()`, можно точно управлять маршрутом события и исключать нежелательные реакции.

##  ЗАДАЧИ

Задачи по теме `Всплытие событий в DOM`

---

Вот переработанный и единообразно оформленный список задач по теме **всплытие событий в DOM** — с чёткими описаниями, которые точно дают понять, что нужно сделать. Решения находятся под спойлером, чтобы пользователь мог сначала попытаться сам.

---

###  Задача 1: Блокировка всплытия

В документе есть `div#outer`, внутри которого находится `button#inner`. При клике на кнопку должно появляться сообщение `"Button clicked"` и **не должно** появляться сообщение `"Div clicked"`.

```html
<div id="outer">
    <button id="inner">Click me</button>
</div>
```

<details>
<summary> Решение</summary>

```javascript
document.getElementById('outer').addEventListener('click', () => {
    console.log('Div clicked');
});

document.getElementById('inner').addEventListener('click', (e) => {
    console.log('Button clicked');
    e.stopPropagation();
});
```

</details>

Используем `stopPropagation()`, чтобы остановить всплытие события от кнопки к родительскому `div`.

---

###  Задача 2: Делегирование обработчиков

На странице есть список `<ul>` с несколькими `<li>`. Нужно навесить один обработчик **только на `ul`**, который при клике на любую из `li` выводит текст выбранного элемента (например, `Clicked: Item 2`).

```html
<ul id="list">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>
```

<details>
<summary> Решение</summary>

```javascript
document.getElementById('list').addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        console.log('Clicked:', e.target.textContent);
    }
});
```

</details>

Используем всплытие событий и делегирование, чтобы обрабатывать клики на дочерних элементах через родительский.

---

###  Задача 3: Отключение лишних обработчиков

На кнопке `button#btn` навешены два обработчика события `click`. Нужно, чтобы срабатывал только первый и второй не выполнялся.

```html
<button id="btn">Click me</button>
```

<details>
<summary> Решение</summary>

```javascript
const btn = document.getElementById('btn');

btn.addEventListener('click', (e) => {
    console.log('First handler');
    e.stopImmediatePropagation();
});

btn.addEventListener('click', () => {
    console.log('Second handler');
});
```

</details>

Метод `stopImmediatePropagation()` прерывает не только всплытие, но и последующие обработчики на том же элементе.

---

###  Задача 4: Показать цепочку всплытия

**Что нужно сделать:**
Дано три вложенных блока: `#grandparent`, `#parent`, `#child`. Каждый из них должен логировать сообщение при клике. Нужно убедиться, что кликая на `#child`, вы увидите в консоли **последовательность всплытия** от внутреннего элемента к внешнему.

```html
<div id="grandparent">
  <div id="parent">
    <div id="child">Click here</div>
  </div>
</div>
```

<details>
<summary> Решение</summary>

```javascript
document.getElementById('grandparent').addEventListener('click', () => {
    console.log('Grandparent clicked');
});
document.getElementById('parent').addEventListener('click', () => {
    console.log('Parent clicked');
});
document.getElementById('child').addEventListener('click', () => {
    console.log('Child clicked');
});
```

</details>

Всплытие идёт снизу вверх — от `child` к `parent` и далее к `grandparent`.

---

 Управление всплытием — это инструмент, который даёт гибкость в обработке событий и помогает избежать конфликтов между обработчиками разных уровней DOM.

---
