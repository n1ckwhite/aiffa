#  tabindex="-1": программный фокус без участия в Tab‑навигации

`tabindex="-1"` исключает элемент из Tab‑последовательности, но позволяет фокусировать его программно через JS. Используется для модальных окон, skip‑ссылок, динамического управления фокусом и временного отключения элементов.

---

##  Короткое резюме
- **Что делает**: убирает элемент из Tab‑навигации, сохраняя программную фокусируемость.
- **Зачем**: управление фокусом в модалках, skip‑ссылки, динамические интерфейсы.
- **Отличие от tabindex="0"**: не участвует в Tab, но `element.focus()` работает.
- **Что уметь**: правильно управлять фокусом, не ломать навигацию, тестировать клавиатурой. 

---

##  Как работает tabindex="-1"

### Исключение из Tab‑последовательности
```html
<button>Кнопка 1</button>
<div tabindex="-1">Пропускается при Tab</div>
<button>Кнопка 2</button>
```
**Результат:** Tab переходит от «Кнопка 1» сразу к «Кнопка 2».

### Программный фокус работает
```html
<div tabindex="-1" id="target">Цель для фокуса</div>
<button onclick="document.getElementById('target').focus()">Фокус на div</button>
```
**Результат:** клик по кнопке фокусирует div, хотя Tab его пропускает.

---

##  Основные применения

### 1) Модальные окна и фокус‑трап
```html
<!-- Контент страницы временно исключён -->
<main tabindex="-1" id="main-content">
  <h1>Основной контент</h1>
  <button>Кнопка в контенте</button>
</main>

<!-- Модалка активна -->
<div class="modal" role="dialog" aria-labelledby="modal-title">
  <h2 id="modal-title">Подтверждение</h2>
  <button onclick="confirm()">Да</button>
  <button onclick="closeModal()">Отмена</button>
</div>

<script>
function openModal() {
  // Исключаем основной контент из навигации
  document.getElementById('main-content').setAttribute('tabindex', '-1');
  
  // Фокус на модалку
  document.querySelector('.modal').focus();
}

function closeModal() {
  // Возвращаем основной контент в навигацию
  document.getElementById('main-content').removeAttribute('tabindex');
}
</script>
```

### 2) Skip‑ссылки и якоря
```html
<!-- Skip-ссылка -->
<a href="#main" class="skip-link">Перейти к содержимому</a>

<!-- Цель для skip-ссылки -->
<main id="main" tabindex="-1">
  <h1>Основное содержимое</h1>
  <p>Контент страницы...</p>
</main>

<style>
.skip-link {
  position: absolute;
  left: -9999px;
}

.skip-link:focus {
  left: 0;
  top: 0;
  background: #000;
  color: #fff;
  padding: 8px;
  z-index: 1000;
}
</style>
```

### 3) Динамическое управление доступностью
```html
<!-- Вкладки: неактивные панели исключены -->
<div role="tablist">
  <button role="tab" aria-selected="true" aria-controls="panel1">Вкладка 1</button>
  <button role="tab" aria-selected="false" aria-controls="panel2">Вкладка 2</button>
</div>

<div role="tabpanel" id="panel1">Активная панель</div>
<div role="tabpanel" id="panel2" tabindex="-1" hidden>Неактивная панель</div>

<script>
function switchTab(activePanel, inactivePanel) {
  // Активная панель участвует в навигации
  activePanel.removeAttribute('tabindex');
  activePanel.hidden = false;
  
  // Неактивная исключается
  inactivePanel.setAttribute('tabindex', '-1');
  inactivePanel.hidden = true;
}
</script>
```

### 4) Временное отключение элементов
```html
<div class="form-section">
  <input type="text" placeholder="Активное поле">
  <input type="text" tabindex="-1" disabled placeholder="Отключённое поле">
  <button tabindex="-1" class="loading">Загрузка...</button>
</div>

<script>
function setLoading(isLoading) {
  const button = document.querySelector('button');
  
  if (isLoading) {
    button.setAttribute('tabindex', '-1');
    button.disabled = true;
    button.textContent = 'Загрузка...';
  } else {
    button.removeAttribute('tabindex');
    button.disabled = false;
    button.textContent = 'Отправить';
  }
}
</script>
```

---

##  Сравнение значений tabindex

| Значение | Tab‑навигация | Программный фокус | Использование |
|----------|---------------|-------------------|---------------|
| `tabindex="0"` |  Участвует |  Работает | Добавить в навигацию |
| `tabindex="-1"` |  Пропускается |  Работает | Программное управление |
| `tabindex="1+"` |  Приоритетный |  Работает | Редко, осторожно |
| Без tabindex | По умолчанию | По умолчанию | Нативное поведение |

---

##  Практические паттерны

### Фокус‑трап для модалки
```js
class FocusTrap {
  constructor(element) {
    this.element = element;
    this.previousFocus = null;
  }
  
  activate() {
    // Сохраняем текущий фокус
    this.previousFocus = document.activeElement;
    
    // Исключаем всё вне модалки
    this.setInert(document.body, true);
    this.setInert(this.element, false);
    
    // Фокус на модалку
    this.element.focus();
  }
  
  deactivate() {
    // Возвращаем доступность
    this.setInert(document.body, false);
    
    // Возвращаем фокус
    if (this.previousFocus) {
      this.previousFocus.focus();
    }
  }
  
  setInert(element, isInert) {
    if (isInert) {
      element.setAttribute('tabindex', '-1');
    } else {
      element.removeAttribute('tabindex');
    }
  }
}
```

### Skip‑ссылка с программным фокусом
```js
function handleSkipLink(event) {
  event.preventDefault();
  
  const targetId = event.target.getAttribute('href').substring(1);
  const target = document.getElementById(targetId);
  
  if (target) {
    // Делаем цель фокусируемой
    target.setAttribute('tabindex', '-1');
    
    // Фокусируем
    target.focus();
    
    // Убираем tabindex после потери фокуса
    target.addEventListener('blur', () => {
      target.removeAttribute('tabindex');
    }, { once: true });
  }
}
```

---

##  Важные нюансы

### Не злоупотребляйте
```html
<!--  ПЛОХО: убираем нативную фокусируемость без причины -->
<button tabindex="-1">Недоступная кнопка</button>

<!--  ХОРОШО: используем disabled для отключения -->
<button disabled>Недоступная кнопка</button>
```

### Синхронизируйте с видимостью
```js
// При скрытии элемента
function hideElement(element) {
  element.hidden = true;
  element.setAttribute('tabindex', '-1');
}

// При показе элемента
function showElement(element) {
  element.hidden = false;
  element.removeAttribute('tabindex');
}
```

### Тестируйте клавиатурой
- Tab должен пропускать элементы с `tabindex="-1"`.
- Программный фокус (`element.focus()`) должен работать.
- Возврат фокуса должен быть логичным.

---

##  Практические правила
- **Используйте для программного управления фокусом**, не для постоянного отключения.
- **Синхронизируйте с видимостью** — скрытые элементы должны иметь `tabindex="-1"`.
- **Возвращайте фокус** после закрытия модалок/меню.
- **Тестируйте только клавиатурой** — навигация должна быть логичной.
- **Не заменяйте `disabled`** — для отключения кнопок используйте `disabled`.

> Важно: `tabindex="-1"` — инструмент управления, а не способ «сломать» доступность.

---

##  Итог
- `tabindex="-1"` исключает из Tab, но сохраняет программную фокусируемость.
- Используйте для модалок, skip‑ссылок, динамического управления.
- Всегда возвращайте фокус и тестируйте клавиатурой. 

##  ЗАДАЧИ

Набор задач для практики `tabindex="-1"`:

---

###  Задача 1: Skip‑ссылка
 Создайте skip‑ссылку, которая фокусирует основной контент программно.

```html
<a href="#main" class="skip-link">Перейти к содержимому</a>
<main id="main">
  <h1>Основной контент</h1>
</main>
```

<details>
<summary> Решение</summary>

```html
<a href="#main" class="skip-link" onclick="handleSkip(event)">Перейти к содержимому</a>
<main id="main" tabindex="-1">
  <h1>Основной контент</h1>
</main>

<script>
function handleSkip(event) {
  event.preventDefault();
  const target = document.getElementById('main');
  target.focus();
}
</script>
```

</details>

---

###  Задача 2: Фокус‑трап для модалки
 При открытии модалки исключите фоновый контент из навигации.

```html
<div id="background">
  <button onclick="openModal()">Открыть модалку</button>
</div>
<div id="modal" hidden>
  <h2>Модальное окно</h2>
  <button onclick="closeModal()">Закрыть</button>
</div>
```

<details>
<summary> Решение</summary>

```js
function openModal() {
  const background = document.getElementById('background');
  const modal = document.getElementById('modal');
  
  // Исключаем фон из навигации
  background.setAttribute('tabindex', '-1');
  
  // Показываем и фокусируем модалку
  modal.hidden = false;
  modal.focus();
}

function closeModal() {
  const background = document.getElementById('background');
  const modal = document.getElementById('modal');
  
  // Возвращаем фон в навигацию
  background.removeAttribute('tabindex');
  
  // Скрываем модалку
  modal.hidden = true;
  
  // Возвращаем фокус
  document.querySelector('button').focus();
}
```

</details>

---

###  Задача 3: Динамическое управление вкладками
 Неактивные панели вкладок должны быть исключены из навигации.

```html
<div role="tablist">
  <button role="tab" data-panel="panel1">Вкладка 1</button>
  <button role="tab" data-panel="panel2">Вкладка 2</button>
</div>
<div id="panel1" role="tabpanel">Панель 1</div>
<div id="panel2" role="tabpanel" hidden>Панель 2</div>
```

<details>
<summary> Решение</summary>

```js
function switchTab(activeTabButton) {
  const allTabs = document.querySelectorAll('[role="tab"]');
  const allPanels = document.querySelectorAll('[role="tabpanel"]');
  const targetPanel = document.getElementById(activeTabButton.dataset.panel);
  
  // Сбрасываем все вкладки
  allTabs.forEach(tab => tab.setAttribute('aria-selected', 'false'));
  allPanels.forEach(panel => {
    panel.hidden = true;
    panel.setAttribute('tabindex', '-1');
  });
  
  // Активируем выбранную
  activeTabButton.setAttribute('aria-selected', 'true');
  targetPanel.hidden = false;
  targetPanel.removeAttribute('tabindex');
}
```

</details>

---

##  Самопроверка

1. В чём разница между `tabindex="-1"` и `tabindex="0"`?

<details>
<summary> Вывод</summary>
`tabindex="-1"` исключает из Tab‑навигации, но позволяет программный фокус. `tabindex="0"` добавляет в Tab‑навигацию.
</details>

2. Можно ли фокусировать элемент с `tabindex="-1"` через JavaScript?

<details>
<summary> Вывод</summary>
Да. `element.focus()` работает, хотя элемент недоступен через Tab.
</details>

3. Когда уместно использовать `tabindex="-1"`?

<details>
<summary> Вывод</summary>
Для программного управления фокусом: модалки, skip‑ссылки, временное отключение, динамические интерфейсы.
</details>

---

 Эти задачи помогают закрепить: программное управление фокусом, создание фокус‑трапов и правильное исключение элементов из Tab‑навигации без потери функциональности.

---
