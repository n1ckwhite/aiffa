#  Методы доступа к DOM-элементам

JavaScript предоставляет несколько способов найти и получить доступ к HTML-элементам на странице. Они отличаются по способу поиска, типу возвращаемого значения и удобству использования. Ниже приведены наиболее часто используемые методы.

---

###  1. `document.getElementById(id)`

* **Что делает**: Ищет элемент по его `id`.
* **Особенности**: Возвращает **один** элемент или `null`, если ничего не найдено.
* **Тип возвращаемого значения**: `HTMLElement`.

---

###  2. `document.getElementsByClassName(className)`

* **Что делает**: Находит все элементы с указанным классом.
* **Особенности**:

    * Возвращает `HTMLCollection`, похожую на массив, но без методов массива.
    * Результат "живой" — если элементы добавлены/удалены, коллекция обновляется автоматически.

---

###  3. `document.getElementsByTagName(tagName)`

* **Что делает**: Возвращает все элементы с указанным тегом (например, `div`, `p`, `li`).
* **Особенности**: Также возвращает "живую" `HTMLCollection`.

---

###  4. `document.querySelector(selector)`

* **Что делает**: Возвращает **первый** элемент, соответствующий CSS-селектору (например, `.class`, `#id`, `div > p`, `[name=value]` и т. д.).
* **Особенности**:

    * Очень гибкий, так как можно использовать любой валидный CSS-селектор.
    * Возвращает `null`, если ничего не найдено.

---

###  5. `document.querySelectorAll(selector)`

* **Что делает**: Возвращает **все** элементы, соответствующие CSS-селектору.
* **Тип возвращаемого значения**: `NodeList`, который поддерживает `forEach()`, `entries()` и другие методы.
* **Особенности**: Результат **не живой** — если вы измените DOM, `NodeList` не обновится.

---

### Родственные свойства для навигации по дереву DOM

---

###  6. `element.parentNode`

* **Что делает**: Получает родительский узел указанного элемента.
* **Применение**: Полезно при делегировании событий или изменении структуры DOM.

---

###  7. `element.children`

* **Что делает**: Возвращает только дочерние элементы (теги, но не текстовые узлы).
* **Тип**: `HTMLCollection`.

Дополнительно:

* `childNodes` — включает **все** дочерние узлы, включая текст, комментарии и т.д.
* `firstElementChild`, `lastElementChild` — удобные способы обратиться к первому/последнему дочернему элементу.
* `nextElementSibling`, `previousElementSibling` — позволяют перемещаться между соседними элементами.

---

###  Когда что использовать?

| Цель                                 | Метод                      |
| ------------------------------------ | -------------------------- |
| Быстро получить элемент по ID        | `getElementById()`         |
| Получить элементы по классу          | `getElementsByClassName()` |
| Получить элементы по тегу            | `getElementsByTagName()`   |
| Точный выбор с помощью CSS-селектора | `querySelector()`          |
| Множественный выбор с селектором     | `querySelectorAll()`       |

---

##  Итог

Эти методы — основа работы с DOM в JavaScript. Их знание и правильное применение позволяет:

* Изменять содержимое страницы на лету.
* Реагировать на действия пользователя.
* Управлять структурой и визуальным отображением элементов.

Если ты будешь уверенно различать `getElementById`, `querySelector`, `children` и `parentNode` — ты уже на хорошем пути к созданию интерактивных веб-приложений.

##  ЗАДАЧИ

Задачи по теме `Методы доступа к DOM-элементам`

---

###  Задача 1: Получение элемента по ID

Найдите элемент с идентификатором `greeting` и измените его текст на "**Привет, JavaScript!**" с помощью JavaScript.

```html
<p id="greeting">Привет, мир!</p>
```

<details>
<summary> Решение</summary>

```javascript
const element = document.getElementById('greeting');
element.textContent = 'Привет, JavaScript!';
```

Метод `getElementById()` позволяет получить доступ к конкретному элементу по его атрибуту `id`. После этого с помощью свойства `textContent` мы изменяем содержимое параграфа.

</details>

---

###  Задача 2: Работа с классами

Получите все элементы с классом `item` и выведите в консоль текст второго элемента.

```html
<div class="item">Первый</div>
<div class="item">Второй</div>
<div class="item">Третий</div>
```

<details>
<summary> Решение</summary>

```javascript
const items = document.getElementsByClassName('item');
console.log(items[1].textContent); // Второй
```
Метод `getElementsByClassName()` возвращает коллекцию элементов с указанным классом в виде `HTMLCollection`. Мы обращаемся к нужному элементу по индексу, начиная с 0.

</details>

---

###  Задача 3: Использование `querySelector()

Найдите первый элемент с классом `selected` и измените его текст на «**Активный пункт**».

```html
<ul>
    <li class="selected">Выбранный пункт</li>
    <li>Обычный пункт</li>
</ul>
```

<details>
<summary> Решение</summary>

```javascript
const selectedItem = document.querySelector('.selected');
selectedItem.textContent = 'Активный пункт';
```

`querySelector` возвращает первый найденный элемент по CSS-селектору.

</details>

---

###  Задача 4: Перебор с `querySelectorAll()`

Выберите все элементы с классом `menu` и добавьте в конец их текста восклицательный знак.

```html
<ul>
    <li class="menu">Главная</li>
    <li class="menu">О нас</li>
    <li class="menu">Контакты</li>
</ul>
```

<details>
<summary> Решение</summary>

```javascript
const menuItems = document.querySelectorAll('.menu');
menuItems.forEach(item => {
    item.textContent += '!';
});
```

`querySelectorAll` возвращает NodeList — можно использовать `forEach`.

</details>

---

###  Задача 5: Навигация по DOM

По элементу с идентификатором `child` получите родительский элемент и выведите его идентификатор в консоль.

```html
<div id="container">
    <p id="child">Я потомок</p>
</div>
```

<details>
<summary> Решение</summary>

```javascript
const child = document.getElementById('child');
const parent = child.parentNode;
console.log(parent.id); // container
```

Свойство `parentNode` возвращает родительский узел.

</details>

---

###  Задача 6: Доступ к детям

Получите первый дочерний элемент списка с идентификатором `list` и выведите его текст.

```html
<ul id="list">
    <li>Элемент 1</li>
    <li>Элемент 2</li>
</ul>
```

<details>
<summary> Решение</summary>

```javascript
const list = document.getElementById('list');
console.log(list.children[0].textContent); // Элемент 1
```

`children` — коллекция дочерних элементов (не включает текст и комментарии).

</details>

---

 Эти задачи помогут закрепить навыки работы с методами доступа к DOM-элементам в JavaScript и лучше понять, как находить, изменять и управлять содержимым HTML-страницы.

---
