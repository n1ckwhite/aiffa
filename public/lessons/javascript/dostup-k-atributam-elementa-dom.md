#  Доступ к атрибутам элемента DOM

В JavaScript есть несколько способов работать с атрибутами HTML-элементов — получать, изменять или удалять их.

---

###  1. `getAttribute()` — получение значения атрибута

Метод `getAttribute` позволяет получить значение любого атрибута у DOM-элемента.

```html
<div id="myDiv" data-info="some info" class="my-class"></div>
```

```javascript
const div = document.getElementById('myDiv');
const className = div.getAttribute('class');
const dataInfo = div.getAttribute('data-info');

console.log(className); // "my-class"
console.log(dataInfo);  // "some info"
```

 *Подходит для всех атрибутов, включая нестандартные и `data-*`.*

---

###  2. Свойства элемента

Некоторые атрибуты доступны напрямую через свойства объекта DOM-элемента:

```html
<input type="text" id="myInput" value="Hello, World!">
```

```javascript
const input = document.getElementById('myInput');
console.log(input.value); // "Hello, World!"
console.log(input.id);    // "myInput"
```

*Работает с `id`, `value`, `href`, `className`, `checked` и др.*

---

###  3. `setAttribute()` — установка/изменение атрибута

С помощью `setAttribute` можно создать новый или изменить существующий атрибут:

```javascript
const div = document.getElementById('myDiv');
div.setAttribute('data-info', 'new info');
div.setAttribute('class', 'new-class');

console.log(div.getAttribute('data-info')); // "new info"
console.log(div.getAttribute('class'));     // "new-class"
```

*Универсальный способ задать атрибут с любым именем.*

---

###  4. `removeAttribute()` — удаление атрибута

Удаляет атрибут у выбранного элемента:

```javascript
const div = document.getElementById('myDiv');
div.removeAttribute('class');

console.log(div.getAttribute('class')); // null
```

*После удаления атрибут перестаёт существовать в HTML.*

---

##  Итог

| Действие   | Метод/свойство            | Применение                         |
| ---------- | ------------------------- | ---------------------------------- |
| Получить   | `getAttribute(name)`      | Для любых атрибутов                |
| Получить   | `element.property`        | Для стандартных (id, value и т.п.) |
| Установить | `setAttribute(name, val)` | Добавить или изменить              |
| Удалить    | `removeAttribute(name)`   | Удалить полностью                  |

 Эти методы позволяют **гибко управлять атрибутами HTML-элементов** в DOM — особенно полезно при работе с динамическими интерфейсами и `data-*` атрибутами.

---

##  ЗАДАЧИ

Задачи по теме `Работа с атрибутами в DOM`

---

###  **Задача 1: Получение атрибута**

Получи значение атрибута `src` и выведи его в консоль.

```html
<img id="myImage" src="cat.jpg" alt="Котик">
```

<details>
<summary> Решение</summary>

```javascript
const img = document.getElementById('myImage');
console.log(img.getAttribute('src')); // "cat.jpg"
```

</details>

---

###  **Задача 2: Установка атрибута**

Добавь атрибут `href` со значением `"https://example.com"`.

```html
<a id="myLink">Сайт</a>
```

<details>
<summary> Решение</summary>

```javascript
const link = document.getElementById('myLink');
link.setAttribute('href', 'https://example.com');
```

</details>

---

###  **Задача 3: Удаление атрибута**

Удали атрибут `disabled`, чтобы сделать поле активным.

```html
<input id="myInput" type="text" disabled>
```

<details>
<summary> Решение</summary>

```javascript
const input = document.getElementById('myInput');
input.removeAttribute('disabled');
```

</details>

---

###  **Задача 4: Использование `data-атрибутов`**

Получи значение `data-id` и `data-role` и выведи их в консоль.

```html
<button id="btn" data-id="42" data-role="admin">Нажми</button>
```

<details>
<summary> Решение</summary>

```javascript
const btn = document.getElementById('btn');
console.log(btn.getAttribute('data-id'));   // "42"
console.log(btn.getAttribute('data-role')); // "admin"
```

</details>

---

###  **Задача 5: Работа со свойствами**

Выведи в консоль `value` и `type` через свойства.

```html
<input id="email" type="email" value="test@example.com">
```

<details>
<summary> Решение</summary>

```javascript
const emailInput = document.getElementById('email');
console.log(emailInput.value); // "test@example.com"
console.log(emailInput.type);  // "email"
```

</details>

---

###  **Задача 6: Перезапись класса**

Замени `class` на `"new-class"`.

```html
<div id="box" class="old-class"></div>
```

<details>
<summary> Решение</summary>

```javascript
const box = document.getElementById('box');
box.setAttribute('class', 'new-class');
```

</details>

---

###  **Задача 7: Проверка наличия атрибута**

Проверь, есть ли у элемента атрибут `required`.

```html
<input id="check" required>
```

<details>
<summary> Решение</summary>

```javascript
const input = document.getElementById('check');
console.log(input.hasAttribute('required')); // true
```

</details>

---

 Эти задачи помогут лучше понять:

* как **получать** стандартные и пользовательские атрибуты;
* как **менять, добавлять и удалять** их программно;
* как использовать свойства DOM-элементов для часто используемых атрибутов.

---
