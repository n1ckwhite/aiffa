#  Скрытые элементы и доступность (hidden, aria-hidden, sr-only)

Скрытые элементы помогают дать дополнительную информацию для экранных читалок, упростить навигацию и управлять видимостью динамического контента — при этом не мешая обычным пользователям.

---

##  Короткое резюме
- **О чём**: способы скрытия, влияние на читалки, когда что использовать.
- **Зачем**: сделать интерфейс предсказуемым для всех, включая пользователей AT.
- **Что уметь**: отличать «скрыть визуально» от «скрыть для читалок», синхронизировать `aria-*` и состояние UI. 

---

##  Как скрывать элементы и как это влияет на A11Y

- `display: none` / `hidden`: элемент исключён из визуального и доступного дерева. Скринридер его не видит.
- `visibility: hidden`: невидим, место занимает; скринридер обычно не озвучивает.
- `aria-hidden="true"`: видим визуально, но исключён для читалок (скрыт только для AT).
- `.sr-only` (визуально скрыт): невидим визуально, но доступен для читалок.
- «за экран» (absolute + offscreen/clip): вариант `.sr-only`, лучше использовать проверенную утилиту.

Пример `.sr-only`:
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}
```

---

##  Когда использовать скрытые элементы

### 1) Дополнительные описания для читалок
```html
<button class="icon-button" aria-label="Поиск">
  <img src="search-icon.svg" alt="" />
  <span class="sr-only">Поиск</span>
  
</button>
```

### 2) Скрытые заголовки для навигации
```html
<h1 class="sr-only">Главная страница</h1>
```

### 3) Временное исключение контента
```html
<div hidden id="dropdown-menu">…</div>
```

### 4) Инструкции/подсказки для форм (через `aria-describedby`)
```html
<label for="username">Имя пользователя</label>
<input id="username" aria-describedby="username-help" type="text" />
<span id="username-help" class="sr-only">Введите уникальное имя пользователя.</span>
```

### 5) Динамические статусы и ошибки
```html
<div id="error-message" role="alert" class="sr-only">Произошла ошибка. Повторите попытку.</div>
```

---

##  Пример с раскрывающимся меню
```html
<button aria-expanded="false" aria-controls="menu">Открыть меню</button>
<ul id="menu" hidden>
  <li><a href="#item1">Элемент 1</a></li>
  <li><a href="#item2">Элемент 2</a></li>
</ul>
<script>
document.querySelector('button').addEventListener('click', function () {
  const menu = document.getElementById('menu');
  const expanded = this.getAttribute('aria-expanded') === 'true';
  this.setAttribute('aria-expanded', String(!expanded));
  menu.hidden = expanded;
});
</script>
```

---

##  Практические правила
- Используйте нативную семантику; скрывайте только при реальной необходимости.
- Для скрытия от читалок предпочитайте `aria-hidden="true"` (когда элемент должен остаться видимым визуально).
- Не используйте одновременно `aria-hidden="true"` на контейнере и интерактивные элементы внутри — они станут недоступны для AT.
- Для живых сообщений используйте `role="status"` или `role="alert"`/`aria-live`.
- Тестируйте: клавиатура, VoiceOver/NVDA/JAWS, axe/Lighthouse.

> Важно: `display:none`/`hidden` полностью убирают элемент для AT; используйте их для неактивного контента, который не должен озвучиваться.

---

##  Итог
- Скрытые элементы — инструмент, а не «костыль». При правильном применении они повышают понятность и не ломают навигацию.
- Различайте «скрыть визуально» (`.sr-only`) и «скрыть для AT» (`aria-hidden`).
- Синхронизируйте видимость с `aria-*` и событиями UI. 

##  ЗАДАЧИ

Набор задач для практики `скрытые элементы и A11Y`:

---

###  Задача 1: Доступное имя иконки
 Есть кнопка с иконкой поиска. Обеспечьте доступное имя и корректное скрытие вспомогательного текста.

```html
<button class="icon-button">
  <img src="search.svg" alt="Поиск" />
</button>
```

<details>
<summary> Решение</summary>

```html
<button class="icon-button" aria-label="Поиск">
  <img src="search.svg" alt="" />
  <span class="sr-only">Поиск</span>
</button>
```

</details>

---

###  Задача 2: Подсказка к полю через `aria-describedby`
 Сделайте невидимую визуально подсказку, чтобы скринридер её читал.

```html
<label for="email">E-mail</label>
<input id="email" type="email" />
```

<details>
<summary> Решение</summary>

```html
<label for="email">E-mail</label>
<input id="email" type="email" aria-describedby="email-help" />
<span id="email-help" class="sr-only">Мы никогда не делимся вашим адресом.</span>
```

</details>

---

###  Задача 3: Управление видимостью меню
 Синхронизируйте `aria-expanded` и атрибут `hidden` у меню.

```html
<button aria-expanded="false" aria-controls="m">Меню</button>
<ul id="m" hidden>
  <li>1</li>
  <li>2</li>
</ul>
```

<details>
<summary> Решение</summary>

```js
const btn = document.querySelector('button[aria-controls="m"]');
const list = document.getElementById('m');
btn.addEventListener('click', () => {
  const exp = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', String(!exp));
  list.hidden = exp;
});
```

</details>

---

###  Задача 4: Живые сообщения
 Покажите невидимый визуально блок, который будет озвучиваться как статус.

```html
<div id="status" role="status" class="sr-only"></div>
```

<details>
<summary> Решение</summary>

```js
const status = document.getElementById('status');
function reportSaved(){ status.textContent = 'Сохранено'; }
```

</details>

---

##  Самопроверка

1. Отличается ли `aria-hidden="true"` от `hidden`?

<details>
<summary> Вывод</summary>
Да. `aria-hidden` скрывает от AT, оставляя визуально; `hidden` полностью убирает элемент (как `display:none`).
</details>

2. Должен ли элемент с `.sr-only` быть фокусируемым?

<details>
<summary> Вывод</summary>
Обычно нет. Фокусируемыми должны быть интерактивные элементы; `sr-only` используют для текстов/лейблов/описаний.
</details>

3. Можно ли ставить `aria-hidden="true"` на контейнер модалки?

<details>
<summary> Вывод</summary>
Нежелательно, если внутри есть интерактив. Это скроет всё от AT. Лучше управлять фокусом и инертностью фона.
</details>

---

 Эти задачи помогают закрепить: различие методов скрытия, правильное применение `.sr-only`/`aria-hidden` и синхронизацию видимости с `aria-*` в динамических сценариях.

---