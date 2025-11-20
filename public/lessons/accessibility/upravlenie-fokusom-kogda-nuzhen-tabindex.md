#  Управление фокусом: когда нужен tabindex

`tabindex` управляет участием элемента в клавиатурной навигации. Используйте осмысленно: `0` — добавить в таб‑цикл, `-1` — исключить, но оставить программный фокус. Положительные значения (1+) — редко и осторожно.

---

##  Короткое резюме
- **tabindex="0"**: добавляет элемент в естественный порядок табуляции.
- **tabindex="-1"**: исключает из Tab, но позволяет программный фокус.
- **tabindex="1+"**: принудительный порядок (используйте редко).
- **Что уметь**: не ломать естественную навигацию, добавлять фокус только интерактивным элементам. 

---

##  Значения tabindex

### `tabindex="0"` — добавить в таб‑цикл
Элемент участвует в естественном порядке табуляции.
```html
<div tabindex="0" role="button" onclick="action()">Кастомная кнопка</div>
```

### `tabindex="-1"` — программный фокус
Элемент не участвует в Tab, но может получить фокус через JS.
```html
<div tabindex="-1" id="modal-content">Содержимое модалки</div>
<script>
  document.getElementById('modal-content').focus();
</script>
```

### `tabindex="1+"` — принудительный порядок
Элементы с положительными значениями фокусируются первыми, в порядке возрастания.
```html
<!-- Порядок фокуса: 1 → 2 → естественный порядок остальных -->
<input tabindex="2" placeholder="Второй">
<input tabindex="1" placeholder="Первый">
<button>Третий (естественный порядок)</button>
```

---

##  Когда обязательно нужен tabindex

### 1) Кастомные интерактивные элементы
```html
<!-- div как кнопка -->
<div tabindex="0" role="button" onclick="save()">Сохранить</div>

<!-- span как ссылка -->
<span tabindex="0" role="link" onclick="navigate()">Перейти</span>
```

### 2) Элементы с ARIA‑ролями
```html
<!-- Пункты меню -->
<ul role="menu">
  <li tabindex="0" role="menuitem">Создать</li>
  <li tabindex="0" role="menuitem">Редактировать</li>
</ul>

<!-- Вкладки -->
<div role="tablist">
  <div tabindex="0" role="tab" aria-selected="true">Вкладка 1</div>
  <div tabindex="-1" role="tab">Вкладка 2</div>
</div>
```

### 3) Программное управление фокусом
```html
<!-- Модальное окно -->
<div id="modal" tabindex="-1" role="dialog">
  <h2>Заголовок модалки</h2>
  <button onclick="closeModal()">Закрыть</button>
</div>

<script>
function openModal() {
  document.getElementById('modal').focus();
}
</script>
```

### 4) Skip‑ссылки и вспомогательная навигация
```html
<a href="#main" tabindex="0" class="skip-link">Перейти к содержимому</a>
<main id="main" tabindex="-1">
  <!-- Основной контент -->
</main>
```

---

##  Когда НЕ нужен tabindex

### Нативные интерактивные элементы
```html
<!-- УЖЕ фокусируемы по умолчанию -->
<button>Кнопка</button>
<a href="/page">Ссылка</a>
<input type="text">
<select><option>Выбор</option></select>
<textarea></textarea>
```

### Неинтерактивные элементы
```html
<!-- НЕ добавляйте tabindex к чисто информационным элементам -->
<p>Обычный текст</p> <!-- tabindex НЕ нужен -->
<div>Контейнер</div> <!-- tabindex НЕ нужен -->
<img src="photo.jpg" alt="Фото"> <!-- tabindex НЕ нужен -->
```

---

##  Частые сценарии

### Модальное окно с фокус‑трапом
```html
<div id="modal" tabindex="-1" role="dialog" aria-labelledby="modal-title">
  <h2 id="modal-title">Подтверждение</h2>
  <p>Вы уверены?</p>
  <button onclick="confirm()">Да</button>
  <button onclick="closeModal()">Отмена</button>
</div>

<script>
function openModal() {
  const modal = document.getElementById('modal');
  modal.focus();
  // Добавить фокус-трап для удержания фокуса внутри модалки
}
</script>
```

### Кастомный выпадающий список
```html
<div class="dropdown">
  <button aria-expanded="false" aria-haspopup="listbox">Выберите опцию</button>
  <ul role="listbox" hidden>
    <li tabindex="0" role="option">Опция 1</li>
    <li tabindex="0" role="option">Опция 2</li>
    <li tabindex="0" role="option">Опция 3</li>
  </ul>
</div>
```

### Управление фокусом во вкладках
```html
<div role="tablist">
  <button role="tab" tabindex="0" aria-selected="true">Активная</button>
  <button role="tab" tabindex="-1" aria-selected="false">Неактивная</button>
  <button role="tab" tabindex="-1" aria-selected="false">Неактивная</button>
</div>

<script>
// При переключении вкладок: активная получает tabindex="0", остальные — tabindex="-1"
</script>
```

---

##  Опасности и анти‑паттерны

###  Положительные значения без нужды
```html
<!-- ПЛОХО: ломает естественный порядок -->
<input tabindex="3" placeholder="Имя">
<input tabindex="1" placeholder="Email"> <!-- Фокус сначала сюда -->
<input tabindex="2" placeholder="Телефон">
```

###  tabindex на неинтерактивных элементах
```html
<!-- ПЛОХО: создаёт путаницу -->
<p tabindex="0">Обычный текст, который зачем-то фокусируется</p>
```

###  Забытый tabindex="-1"
```html
<!-- ПЛОХО: элемент недоступен с клавиатуры -->
<div tabindex="-1" role="button" onclick="action()">Кнопка</div>
<!-- Должно быть tabindex="0" для интерактивного элемента -->
```

---

##  Практические правила
- **Нативные элементы первым делом**: `button`, `a[href]`, `input` уже фокусируемы.
- **tabindex="0"** для кастомных интерактивных элементов.
- **tabindex="-1"** для программного фокуса (модалки, skip‑targets).
- **Избегайте положительных значений** — они ломают естественный порядок.
- **Тестируйте клавиатурой**: Tab должен идти логично и предсказуемо.

> Важно: `tabindex` не делает элемент интерактивным — добавляйте обработчики событий и ARIA‑роли.

---

##  Итог
- `tabindex` — инструмент управления фокусом, не злоупотребляйте.
- Предпочитайте естественный порядок табуляции.
- Тестируйте навигацию с клавиатуры и скринридерами. 

##  ЗАДАЧИ

Набор задач для практики `tabindex`:

---

###  Задача 1: Кастомная кнопка
 Сделайте `div` доступным с клавиатуры как кнопку.

```html
<div role="button" onclick="save()">Сохранить</div>
```

<details>
<summary> Решение</summary>

```html
<div tabindex="0" role="button" onclick="save()">Сохранить</div>
```
Добавьте обработку Enter/Space для полной функциональности.

</details>

---

###  Задача 2: Модальное окно
 Настройте фокус для модального окна, которое должно получать фокус программно.

```html
<div id="modal" role="dialog">
  <h2>Заголовок</h2>
  <button onclick="close()">Закрыть</button>
</div>
```

<details>
<summary> Решение</summary>

```html
<div id="modal" tabindex="-1" role="dialog">
  <h2>Заголовок</h2>
  <button onclick="close()">Закрыть</button>
</div>

<script>
function openModal() {
  document.getElementById('modal').focus();
}
</script>
```

</details>

---

###  Задача 3: Исправить порядок табуляции
 Исправьте нарушенный порядок фокуса.

```html
<input tabindex="3" placeholder="Фамилия">
<input tabindex="1" placeholder="Имя">
<input tabindex="2" placeholder="Отчество">
```

<details>
<summary> Решение</summary>

```html
<input placeholder="Имя">
<input placeholder="Отчество">
<input placeholder="Фамилия">
```
Уберите `tabindex` — естественный порядок в DOM логичнее.

</details>

---

##  Самопроверка

1. Когда использовать `tabindex="0"` vs `tabindex="-1"`?

<details>
<summary> Вывод</summary>
`tabindex="0"` — для участия в Tab‑навигации; `tabindex="-1"` — для программного фокуса без Tab.
</details>

2. Нужен ли `tabindex` для элемента `<button>`?

<details>
<summary> Вывод</summary>
Нет. `<button>` уже фокусируем по умолчанию.
</details>

3. Почему избегать положительных значений `tabindex`?

<details>
<summary> Вывод</summary>
Они нарушают естественный порядок и могут запутать пользователей.
</details>

---

 Эти задачи помогают закрепить: правильное использование `tabindex`, управление фокусом и сохранение логичного порядка клавиатурной навигации.

---
