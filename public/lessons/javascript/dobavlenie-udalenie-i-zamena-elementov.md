#  Работа с DOM: добавление, удаление и замена элементов

JavaScript позволяет гибко управлять структурой HTML-документа через DOM. Ниже приведены основные методы для **добавления**, **удаления** и **замены** элементов.

---

### **1. Добавление элемента**

Чтобы добавить новый элемент в DOM, сначала нужно его создать с помощью `document.createElement`, затем вставить в нужное место.

####  `appendChild()` — добавляет элемент в конец родителя

```html
<div id="container">
    <p>Первый параграф</p>
</div>

<script>
    const container = document.getElementById('container');
    const newParagraph = document.createElement('p');
    newParagraph.textContent = 'Второй параграф';
    container.appendChild(newParagraph);
</script>
```

*Добавляет элемент в конец указанного родительского узла.*

---

####  `insertBefore()` — вставляет элемент перед другим элементом

```javascript
const newParagraph = document.createElement('p');
newParagraph.textContent = 'Новый параграф перед первым';
const firstParagraph = container.firstChild;
container.insertBefore(newParagraph, firstParagraph);
```

*Вставляет `newParagraph` перед `firstParagraph` в пределах `container`.*

---

####  `insertAdjacentElement()` — вставка по позициям

```javascript
const newParagraph = document.createElement('p');
newParagraph.textContent = 'Параграф в начале контейнера';
container.insertAdjacentElement('afterbegin', newParagraph);
```

*Позволяет вставлять в начало (`afterbegin`), конец (`beforeend`), перед (`beforebegin`) или после (`afterend`) элемента.*

---

### **2. Удаление элемента**

Удалить элемент можно как напрямую, так и через родителя.

####  `remove()` — удаляет сам элемент

```html
<p id="toRemove">Удалите меня</p>

<script>
    const elem = document.getElementById('toRemove');
    elem.remove();
</script>
```

*Удаляет сам себя из DOM.*

---

####  `parentNode.removeChild()` — удаление через родителя

```javascript
const container = document.getElementById('container');
const toRemove = document.getElementById('toRemove');
container.removeChild(toRemove);
```

*Полезно в старых браузерах, которые не поддерживают `remove()`.*

---

### **3. Замена элемента**

####  `replaceChild()` — заменяет один дочерний элемент другим

```html
<div id="container">
    <p id="oldParagraph">Старый параграф</p>
</div>

<script>
    const oldParagraph = document.getElementById('oldParagraph');
    const newParagraph = document.createElement('p');
    newParagraph.textContent = 'Новый параграф';
    container.replaceChild(newParagraph, oldParagraph);
</script>
```

*Метод `replaceChild(newNode, oldNode)` заменяет `oldNode` на `newNode` внутри родителя.*

---

##  Итог

| Действие   | Метод                   | Поддержка                   |
| ---------- | ----------------------- | --------------------------- |
| Добавление | `appendChild`           |  Стандартный способ        |
| Добавление | `insertBefore`          |  Гибкость позиционирования |
| Добавление | `insertAdjacentElement` |  Удобные позиции           |
| Удаление   | `remove`                |  Современно и просто       |
| Удаление   | `removeChild`           |  Универсальный способ      |
| Замена     | `replaceChild`          |  Надёжный способ           |

---

 **Примечание:** Всегда сначала создавайте элемент (`createElement`), задавайте ему содержимое (`textContent`, `innerHTML`, `classList` и т.д.), а затем вставляйте в DOM.

##  ЗАДАЧИ

Задачи по теме `Добавление, удаление и замена элементов в DOM`

---

###  Задача 1: Добавление параграфа

Добавьте новый параграф с текстом `"Это добавленный текст"` в конец блока `#content`.

```html
<div id="content">
    <p>Начальный текст</p>
</div>
```

<details>
<summary> Решение</summary>

```javascript
const content = document.getElementById('content');
const newParagraph = document.createElement('p');
newParagraph.textContent = 'Это добавленный текст';
content.appendChild(newParagraph);
```

*`appendChild` добавляет элемент в конец родителя.*

</details>

---

###  Задача 2: Вставка перед элементом

Создайте параграф `"Элемент 0"` и вставьте его **перед существующим** `p` в блоке `#list`.

```html
<div id="list">
    <p>Элемент 1</p>
</div>
```

<details>
<summary> Решение</summary>

```javascript
const list = document.getElementById('list');
const newElem = document.createElement('p');
newElem.textContent = 'Элемент 0';
list.insertBefore(newElem, list.firstChild);
```

*`insertBefore(new, existing)` вставляет перед существующим узлом.*

</details>

---

###  Задача 3: Удаление элемента

Удалите элемент `li` с ID `to-delete` из DOM.

```html
<ul id="menu">
    <li id="to-delete">Удалить меня</li>
</ul>
```

<details>
<summary> Решение</summary>

```javascript
const li = document.getElementById('to-delete');
li.remove();
```

*Метод `remove()` удаляет элемент.*

</details>

---

###  Задача 4: Замена элемента

Замените элемент с ID `old` на новый `p` с текстом `"Новый текст"`.

```html
<div id="box">
    <p id="old">Старый текст</p>
</div>
```

<details>
<summary> Решение</summary>

```javascript
const oldElem = document.getElementById('old');
const newElem = document.createElement('p');
newElem.textContent = 'Новый текст';
const box = document.getElementById('box');
box.replaceChild(newElem, oldElem);
```

*`replaceChild(new, old)` заменяет один дочерний элемент на другой.*

</details>

---

###  Задача 5: Вставка с `insertAdjacentElement()`

Вставьте новый `p` с текстом `"Вставлен перед"` в **начало** блока `#wrapper`.

```html
<div id="wrapper">
    <p>Контент</p>
</div>
```

<details>
<summary> Решение</summary>

```javascript
const wrapper = document.getElementById('wrapper');
const p = document.createElement('p');
p.textContent = 'Вставлен перед';
wrapper.insertAdjacentElement('afterbegin', p);
```

*`insertAdjacentElement('afterbegin', ...)` вставляет сразу после открытия тега.*

</details>

---

 Эти действия позволяют динамически управлять содержимым страницы — добавлять новые блоки, изменять структуру интерфейса и реагировать на действия пользователя.

---
