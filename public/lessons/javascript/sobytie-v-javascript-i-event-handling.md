#  Что такое событие в JavaScript и как работает Event Handling?

В JavaScript **событие** — это сигнал от браузера о том, что что-то произошло. Это может быть клик пользователя, загрузка страницы, ввод текста, движение мыши, нажатие клавиши и многое другое.

**Event Handling (обработка событий)** — это процесс, при котором вы указываете, что делать, когда происходит определённое событие. Это важнейший механизм для создания **интерактивных веб-страниц**.

---

###  Основные понятия

####  1. **Событие (Event)**

Событие возникает при каком-либо действии:

* `click` — пользователь кликнул мышью.
* `dblclick` - двойное нажатие.
* `keydown` — нажата клавиша.
* `submit` — отправка формы.
* `load` — загрузка страницы.
* `mouseover`, `mouseout` — наведение/уход курсора и т. д.

####  2. **Обработчик события (Event Listener)**

Это функция, которая вызывается при наступлении события. Вы можете привязать обработчик к конкретному элементу.

```javascript
element.addEventListener('click', function() {
  // Код, который выполнится при клике
});
```

####  3. **Удаление обработчиков**

Вы также можете удалить обработчик, если он больше не нужен:

```javascript
element.removeEventListener('click', handler);
```

####  4. **Анонимные и именованные функции**

Вы можете использовать анонимные функции (как в примере выше) или именованные:

```javascript
function handleClick() {
  console.log('Clicked!');
}
element.addEventListener('click', handleClick);
```

---

### Поток событий

Когда событие происходит, браузер создаёт **объект события** (`Event object`) и передаёт его обработчику. Он содержит всю информацию о событии: тип, целевой элемент (`event.target`), координаты мыши, нажатые клавиши и т. д.

```javascript
button.addEventListener('click', function(event) {
  console.log(event.target); // элемент, на котором произошло событие
});
```

---

#### Пример: обработка клика

```html
<button id="myBtn">Нажми меня</button>
<script>
  const button = document.getElementById('myBtn');
  button.addEventListener('click', () => {
    alert('Кнопка была нажата!');
  });
</script>
```

---

### Делегирование событий

Вместо назначения обработчиков каждому элементу, можно использовать **делегирование** — назначать обработчик на родительский элемент и проверять, где именно произошло событие.

```javascript
document.body.addEventListener('click', function(event) {
  if (event.target.matches('button')) {
    console.log('Кнопка нажата:', event.target.textContent);
  }
});
```

Это удобно при работе с динамически создаваемыми элементами.

---

### Предотвращение действий по умолчанию и всплытия

* `event.preventDefault()` — отменяет поведение по умолчанию (например, отправку формы).
* `event.stopPropagation()` — останавливает "всплытие" события вверх по DOM-дереву.

---

##  Итог

События лежат в основе **взаимодействия пользователя с веб-приложением**. Понимание событий и умение правильно их обрабатывать позволяет создавать **реактивный, динамичный интерфейс**, который реагирует на действия пользователя в реальном времени.

##  ЗАДАЧИ

Задачи по теме `события Event Handling в JavaScript`

---

###  Задача 1: Клик по кнопке

Создайте кнопку, при клике на которую в консоль выводится сообщение `Кнопка нажата!`.

```html
<button id="btn">Нажми меня</button>
<script>
  // Ваш код здесь
</script>
```

<details>
<summary> Решение</summary>

```javascript
document.getElementById('btn').addEventListener('click', function () {
  console.log('Кнопка нажата!');
});
```

</details>

---

###  Задача 2: Изменение текста при клике

При клике на кнопку измените текст заголовка с `"Привет"` на `"Вы нажали кнопку!"`.

```html
<h1 id="title">Привет</h1>
<button id="change">Нажать</button>
<script>
  // Ваш код здесь
</script>
```

<details>
<summary> Решение</summary>

```javascript
document.getElementById('change').addEventListener('click', function () {
  document.getElementById('title').textContent = 'Вы нажали кнопку!';
});
```

</details>

---

###  Задача 3: Предотвращение отправки формы

Создайте форму с одной кнопкой. При её отправке не должно происходить перезагрузки страницы. Вместо этого выведите `Форма отправлена` в консоль.

```html
<form id="myForm">
  <button type="submit">Отправить</button>
</form>
<script>
  // Ваш код здесь
</script>
```

<details>
<summary> Решение</summary>

```javascript
document.getElementById('myForm').addEventListener('submit', function (e) {
  e.preventDefault();
  console.log('Форма отправлена');
});
```

</details>

---

###  Задача 4: Делегирование событий

Есть список элементов. Выведите текст элемента, по которому кликнули.

```html
<ul id="list">
  <li>Элемент 1</li>
  <li>Элемент 2</li>
  <li>Элемент 3</li>
</ul>
<script>
  // Ваш код здесь
</script>
```

<details>
<summary> Решение</summary>

```javascript
document.getElementById('list').addEventListener('click', function (e) {
  if (e.target.tagName === 'LI') {
    console.log('Вы нажали на:', e.target.textContent);
  }
});
```

</details>

---

###  Задача 5: Двойной клик

Создайте обработчик, который меняет фон страницы на зелёный при **двойном клике**.

```html
<body>
  <script>
    // Ваш код здесь
  </script>
</body>
```

<details>
<summary> Решение</summary>

```javascript
document.body.addEventListener('dblclick', function () {
  document.body.style.backgroundColor = 'green';
});
```

</details>

---

 Эти задачи помогут вам научиться слушать действия пользователя и реагировать на них с помощью JavaScript. Это ключевой шаг к созданию динамичных и интерактивных интерфейсов.

---
