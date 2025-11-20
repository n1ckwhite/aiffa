#  Как JavaScript использует localStorage и sessionStorage для кэширования

В браузере есть два удобных инструмента для хранения данных: `localStorage` и `sessionStorage`. Оба помогают "запоминать" данные прямо на устройстве пользователя. Это называется **кэширование на клиенте**.

###  В чём разница?

| Свойство        | `localStorage`                      | `sessionStorage`            |
| --------------- | ----------------------------------- | --------------------------- |
| ⏳ Срок хранения | Постоянно (пока не удалить вручную) | Только пока открыта вкладка |
|  Объём        | До \~5–10 МБ                        | Примерно столько же         |
|  Доступность  | Во всех вкладках одного сайта       | Только в одной вкладке      |

---

###  Как использовать?

#### Сохранить данные:

```javascript
localStorage.setItem('username', 'Alice');
sessionStorage.setItem('theme', 'dark');
```

#### Прочитать данные:

```javascript
const user = localStorage.getItem('username');  // 'Alice'
const theme = sessionStorage.getItem('theme');  // 'dark'
```

#### Удалить данные:

```javascript
localStorage.removeItem('username');
sessionStorage.removeItem('theme');
```

#### Очистить всё:

```javascript
localStorage.clear();
sessionStorage.clear();
```

---

###  Где это пригодится?

1. **Кэшировать API-ответы**
   Например, вы получили данные с сервера — сохранили их в `localStorage`. При следующем открытии страницы можно использовать кэш, не делая повторный запрос.

   ```javascript
   const loadData = async () => {
     const cache = localStorage.getItem('data');
     if (cache) return JSON.parse(cache);

     const res = await fetch('/api/info');
     const data = await res.json();
     localStorage.setItem('data', JSON.stringify(data));
     return data;
   };
   ```

2. **Сохранять настройки пользователя**
   Например, выбранную тему:

   ```javascript
   localStorage.setItem('theme', 'dark');
   ```

3. **Сохранять форму перед обновлением**
   Если пользователь случайно обновил страницу — не потеряет введённые данные.

   ```javascript
   sessionStorage.setItem('email', form.email.value);
   ```

---

##  Итог

`localStorage` и `sessionStorage` — простые и полезные инструменты для временного хранения данных на стороне клиента. Они позволяют:

* ускорить работу приложения;
* сохранить важные данные между переходами;
* снизить количество запросов к серверу.

Но важно помнить: не храните в них конфиденциальную информацию (например, пароли), и следите за объёмом хранимого.

##  ЗАДАЧИ

Задачи по теме `localStorage` и `sessionStorage`

---

###  Задача 1: Сохрани имя пользователя

 Попроси пользователя ввести имя через `prompt` и сохрани его в `localStorage`.
Если имя уже есть — выведи приветствие.

<details>
<summary> Решение</summary>

```javascript
const name = localStorage.getItem('userName');
if (name) {
  alert(`Привет, ${name}!`);
} else {
  const newName = prompt('Как тебя зовут?');
  if (newName) {
    localStorage.setItem('userName', newName);
  }
}
```

</details>

---

###  Задача 2: Темная и светлая тема

Сделай кнопку, которая будет переключать тему между `light` и `dark`.
Храни текущую тему в `localStorage` и применяй при загрузке страницы.

<details>
<summary> Решение</summary>

```html
<button id="toggle-theme">Переключить тему</button>
```

```javascript
const savedTheme = localStorage.getItem('theme') || 'light';
document.body.className = savedTheme;

document.getElementById('toggle-theme').onclick = () => {
  const newTheme = savedTheme === 'light' ? 'dark' : 'light';
  localStorage.setItem('theme', newTheme);
  location.reload();
};
```

</details>

---

###  Задача 3: Сохраняем данные формы

Сделай форму с `name` и `email`.
Храни введённые данные в `sessionStorage`, чтобы они не терялись при обновлении страницы.

<details>
<summary> Решение</summary>

```html
<form>
  <input type="text" id="name" name="name" placeholder="Имя">
  <input type="email" id="email" name="email" placeholder="Email">
</form>
```

```javascript
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');

nameInput.value = sessionStorage.getItem('name') || '';
emailInput.value = sessionStorage.getItem('email') || '';

nameInput.addEventListener('input', () => {
  sessionStorage.setItem('name', nameInput.value);
});
emailInput.addEventListener('input', () => {
  sessionStorage.setItem('email', emailInput.value);
});
```

</details>

---

###  Задача 4: Кнопка "Выйти"

Сделай кнопку, при нажатии на которую очищается `localStorage` и страница перезагружается.

<details>
<summary> Решение</summary>

```html
<button id="logout">Выйти</button>
```

```javascript
document.getElementById('logout').onclick = () => {
  localStorage.clear();
  location.reload();
};
```

</details>

---

 Такие задачи — отличный старт для освоения клиентского кэширования и построения быстрых, отзывчивых веб-приложений.

---
