#  Разница между `innerText` и `innerHTML` в JavaScript

В JavaScript оба свойства используются для работы с содержимым элементов DOM. Однако они работают **по-разному** и применяются в разных ситуациях.

---

###  `innerText`

*  **Что делает:** возвращает или устанавливает **только видимый текст** элемента (без HTML-тегов).
*  **Учитывает стили:** скрытый (`display: none`) текст **не будет включён**.
*  **Безопасность:** безопаснее, т.к. **не интерпретирует HTML**.
*  **Когда использовать:** когда вам нужен **чистый текст**, без HTML-разметки.

#### Пример:

```html
<div id="textBlock">
  <p>Hello, <strong>world</strong>!</p>
</div>
<script>
  const block = document.getElementById('textBlock');
  console.log(block.innerText); // "Hello, world!"
</script>
```

---

###  `innerHTML`

* **Что делает:** возвращает или устанавливает **весь HTML-код** внутри элемента, включая теги.
* **Полный доступ к структуре:** можно **вставлять HTML** прямо как строку.
* **Опасность:** если использовать с пользовательским вводом — возможны **XSS-атаки**.
* **Когда использовать:** если нужно **получить или изменить HTML-структуру**.

#### Пример:

```html
<div id="htmlBlock">
  <p>Hello, <strong>world</strong>!</p>
</div>
<script>
  const block = document.getElementById('htmlBlock');
  console.log(block.innerHTML); // "<p>Hello, <strong>world</strong>!</p>"
</script>
```

---

###  Сравнение

| Свойство    | Возвращает HTML | Возвращает только текст | Учитывает стили | Безопасно для пользовательского ввода |
| ----------- | --------------- | ----------------------- | --------------- | ------------------------------------- |
| `innerText` |                |                        |                |                                      |
| `innerHTML` |                |                        |                |                                      |

---

##  Итог

* Используйте **`innerText`**, если работаете **только с текстом** и хотите исключить любые HTML-теги.
* Используйте **`innerHTML`**, если нужно **получить или задать HTML-разметку**, но **будьте осторожны** с вводом от пользователей — валидируйте его.

##  ЗАДАЧИ

Задачи по теме `innerText` и `innerHTML`

---

###  **Задача 1: Получение текста с помощью `innerText`**

`innerText` возвращает **только текст** — HTML-теги игнорируются.

```html
<div id="message">
  <p>Добро <strong>пожаловать</strong>!</p>
</div>
```

<details>
<summary> Решение</summary>

```javascript
const message = document.getElementById('message');
console.log(message.innerText); // Добро пожаловать!
```

</details>

---

###  **Задача 2: Получение HTML с помощью `innerHTML`**

`innerHTML` возвращает **HTML-разметку** внутри элемента.

```html
<div id="info">
  <p>Цена: <strong>100₽</strong></p>
</div>
```

<details>
<summary> Решение</summary>

```javascript
const info = document.getElementById('info');
console.log(info.innerHTML); // <p>Цена: <strong>100₽</strong></p>
```

</details>

---

###  **Задача 3: Замена содержимого с помощью `innerText`**

`innerText` заменяет содержимое **только текстом**.

```html
<div id="textBlock">Старый текст</div>
```

<details>
<summary> Решение</summary>

```javascript
const block = document.getElementById('textBlock');
block.innerText = 'Новый текст'; // Просто текст, без HTML
```

</details>

---

###  **Задача 4: Вставка HTML с помощью `innerHTML`**

`innerHTML` позволяет вставить HTML-теги как строку — они будут **интерпретированы** браузером.

```html
<div id="output"></div>
```

<details>
<summary> Решение</summary>

```javascript
const output = document.getElementById('output');
output.innerHTML = '<p><em>Привет, мир!</em></p>';
```

</details>

---

 Задачи показывают, когда использовать `innerText` (для текста без HTML) и когда `innerHTML` (для работы с HTML).

---
