#  Естественно фокусируемые элементы: кто получает фокус всегда

Некоторые HTML‑элементы фокусируются автоматически независимо от способа взаимодействия (мышь, клавиатура, программно). Это формы, ссылки с `href`, элементы с `tabindex` и `contenteditable`. Они составляют основу клавиатурной навигации.

---

##  Короткое резюме
- **Естественно фокусируемые**: `input`, `button`, `a[href]`, `select`, `textarea` — фокус из коробки.
- **Принудительно фокусируемые**: любой элемент с `tabindex`, `contenteditable`.
- **Зачем знать**: понимать, какие элементы участвуют в Tab‑навигации без дополнительных атрибутов.
- **Что уметь**: использовать нативную фокусируемость, не добавлять лишний `tabindex`. 

---

##  Естественно фокусируемые элементы

### Элементы форм
Всегда фокусируются при клике, Tab‑навигации или `element.focus()`:
```html
<input type="text" placeholder="Текст">
<input type="email" placeholder="Email">
<input type="password" placeholder="Пароль">
<input type="checkbox" id="agree">
<input type="radio" name="choice" value="1">
<textarea placeholder="Комментарий"></textarea>
<select>
  <option>Вариант 1</option>
  <option>Вариант 2</option>
</select>
<button type="button">Кнопка</button>
```

**Исключение**: `<input type="hidden">` — не фокусируется.

### Ссылки с href
```html
<a href="/page">Ссылка с переходом</a> <!-- Фокусируется -->
<a>Ссылка без href</a> <!-- НЕ фокусируется -->
```

### Элементы с contenteditable
```html
<div contenteditable="true">Редактируемый текст</div>
<p contenteditable="true">Редактируемый абзац</p>
```

---

##  Принудительно фокусируемые элементы

### С tabindex
```html
<!-- Добавляется в Tab-навигацию -->
<div tabindex="0" role="button">Кастомная кнопка</div>

<!-- Программный фокус, но не в Tab-навигации -->
<div tabindex="-1" id="modal-content">Содержимое модалки</div>

<!-- Принудительный порядок (используйте осторожно) -->
<span tabindex="1">Первый в фокусе</span>
```

### Медиа‑элементы с controls
```html
<video controls src="video.mp4"></video>
<audio controls src="audio.mp3"></audio>
```

---

##  НЕ фокусируются по умолчанию

### Обычные элементы контента
```html
<div>Обычный блок</div>
<p>Абзац</p>
<span>Текст</span>
<img src="photo.jpg" alt="Фото">
<h1>Заголовок</h1>
```

### Ссылки без href
```html
<a>Не ссылка</a>
<a name="anchor">Якорь (устаревший)</a>
```

### Отключённые элементы
```html
<button disabled>Отключённая кнопка</button>
<input disabled placeholder="Отключённое поле">
```

---

##  Практические примеры

### Проверка фокусируемости
```js
function isFocusable(element) {
  // Естественно фокусируемые теги
  const focusableTags = ['input', 'button', 'select', 'textarea', 'a'];
  
  // Проверяем тег
  if (focusableTags.includes(element.tagName.toLowerCase())) {
    // Дополнительные проверки
    if (element.tagName.toLowerCase() === 'input' && element.type === 'hidden') {
      return false;
    }
    if (element.tagName.toLowerCase() === 'a' && !element.href) {
      return false;
    }
    return !element.disabled;
  }
  
  // Проверяем tabindex
  const tabindex = element.getAttribute('tabindex');
  if (tabindex !== null && tabindex !== '-1') {
    return true;
  }
  
  // Проверяем contenteditable
  if (element.contentEditable === 'true') {
    return true;
  }
  
  return false;
}
```

### Сбор всех фокусируемых элементов
```js
function getFocusableElements(container = document) {
  const selector = [
    'input:not([type="hidden"]):not([disabled])',
    'button:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'a[href]',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]',
    'video[controls]',
    'audio[controls]'
  ].join(', ');
  
  return Array.from(container.querySelectorAll(selector));
}
```

### Фокус‑трап для модального окна
```js
function createFocusTrap(modal) {
  const focusableElements = getFocusableElements(modal);
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  
  modal.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  });
  
  // Фокус на первый элемент при открытии
  firstElement?.focus();
}
```

---

##  Особенности и нюансы

### Скрытые элементы
```html
<!-- НЕ фокусируются, даже если обычно фокусируемы -->
<button hidden>Скрытая кнопка</button>
<input style="display: none" placeholder="Скрытое поле">
<a href="/page" style="visibility: hidden">Невидимая ссылка</a>
```

### Элементы вне viewport
```html
<!-- Фокусируются, но могут быть не видны -->
<button style="position: absolute; left: -9999px;">За экраном</button>
```

### Вложенность и делегирование
```html
<!-- Фокус получает input, не div -->
<div onclick="handleClick()">
  <input type="text" placeholder="Поле внутри div">
</div>
```

---

##  Лучшие практики

### 1) Используйте нативную фокусируемость
```html
<!--  Хорошо: нативная кнопка -->
<button onclick="save()">Сохранить</button>

<!--  Плохо: лишний tabindex -->
<button tabindex="0" onclick="save()">Сохранить</button>
```

### 2) Не добавляйте фокус неинтерактивным элементам
```html
<!--  Плохо: заголовок не должен фокусироваться -->
<h1 tabindex="0">Заголовок</h1>

<!--  Хорошо: заголовок остаётся заголовком -->
<h1>Заголовок</h1>
```

### 3) Проверяйте доступность отключённых элементов
```html
<!-- Отключённые элементы не фокусируются -->
<button disabled>Недоступно</button>
<input disabled placeholder="Заблокировано">
```

### 4) Тестируйте клавиатурную навигацию
- Tab — переход к следующему фокусируемому элементу.
- Shift+Tab — переход к предыдущему.
- Enter — активация кнопок и ссылок.
- Space — активация кнопок, переключение чекбоксов.

---

##  Практические правила
- **Полагайтесь на нативную фокусируемость** — она работает правильно из коробки.
- **Добавляйте `tabindex` только при необходимости** — для кастомных интерактивных элементов.
- **Тестируйте только клавиатурой** — все функции должны быть доступны.
- **Учитывайте скрытые элементы** — они не участвуют в фокусе.

> Важно: естественно фокусируемые элементы — основа доступной навигации. Не усложняйте без нужды.

---

##  Итог
- Формы, ссылки с `href`, элементы с `tabindex` и `contenteditable` фокусируются всегда.
- Используйте нативную фокусируемость, добавляйте `tabindex` только для кастома.
- Тестируйте клавиатурную навигацию регулярно. 

##  ЗАДАЧИ

Набор задач для практики с фокусируемыми элементами:

---

###  Задача 1: Определить фокусируемые элементы
 Какие из элементов будут фокусироваться при Tab‑навигации?

```html
<div>Блок</div>
<button>Кнопка</button>
<a>Ссылка без href</a>
<a href="/page">Ссылка с href</a>
<input type="hidden" value="скрытое">
<input type="text" placeholder="Текст">
<span tabindex="0">Span с tabindex</span>
```

<details>
<summary> Решение</summary>

Фокусируемые:
- `<button>Кнопка</button>`
- `<a href="/page">Ссылка с href</a>`
- `<input type="text" placeholder="Текст">`
- `<span tabindex="0">Span с tabindex</span>`

НЕ фокусируемые:
- `<div>Блок</div>` (обычный элемент)
- `<a>Ссылка без href</a>` (нет href)
- `<input type="hidden">` (скрытый input)

</details>

---

###  Задача 2: Исправить избыточный tabindex
 Уберите ненужные `tabindex` из кода.

```html
<button tabindex="0">Кнопка</button>
<a href="/home" tabindex="0">Главная</a>
<input type="email" tabindex="0" placeholder="Email">
<div tabindex="0" role="button">Кастомная кнопка</div>
```

<details>
<summary> Решение</summary>

```html
<button>Кнопка</button> <!-- tabindex не нужен -->
<a href="/home">Главная</a> <!-- tabindex не нужен -->
<input type="email" placeholder="Email"> <!-- tabindex не нужен -->
<div tabindex="0" role="button">Кастомная кнопка</div> <!-- tabindex нужен -->
```

</details>

---

###  Задача 3: Создать функцию поиска фокусируемых элементов
 Напишите функцию, которая найдёт все фокусируемые элементы в контейнере.

```js
function getFocusableElements(container) {
  // Ваш код
}
```

<details>
<summary> Решение</summary>

```js
function getFocusableElements(container = document) {
  const selector = [
    'input:not([type="hidden"]):not([disabled])',
    'button:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'a[href]',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]'
  ].join(', ');
  
  return Array.from(container.querySelectorAll(selector))
    .filter(el => {
      // Исключаем скрытые элементы
      const style = getComputedStyle(el);
      return style.display !== 'none' && style.visibility !== 'hidden';
    });
}
```

</details>

---

##  Самопроверка

1. Будет ли фокусироваться `<a>` без атрибута `href`?

<details>
<summary> Вывод</summary>
Нет. Ссылка без `href` не является фокусируемой по умолчанию.
</details>

2. Нужен ли `tabindex="0"` для элемента `<button>`?

<details>
<summary> Вывод</summary>
Нет. `<button>` естественно фокусируем, `tabindex` избыточен.
</details>

3. Что происходит с фокусом у `disabled` элементов?

<details>
<summary> Вывод</summary>
Отключённые элементы (`disabled`) не могут получить фокус и исключаются из Tab‑навигации.
</details>

---

 Эти задачи помогают закрепить: понимание естественной фокусируемости, избежание избыточных атрибутов и создание правильной клавиатурной навигации.

---
