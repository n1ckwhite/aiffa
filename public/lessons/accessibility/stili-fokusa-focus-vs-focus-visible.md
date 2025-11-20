#  Стили фокуса: :focus vs :focus-visible

`:focus` срабатывает при любом способе фокусировки (мышь, клавиатура, программно). `:focus-visible` — только когда пользователь ожидает видеть индикатор фокуса (обычно клавиатура). Используйте `:focus-visible` для лучшего UX.

---

##  Короткое резюме
- **:focus**: любой фокус (мышь + клавиатура + программный).
- **:focus-visible**: «умный» фокус (только когда индикатор ожидается).
- **Зачем**: убрать визуальный «шум» от кликов мыши, сохранив доступность для клавиатуры.
- **Что уметь**: выбирать подходящий псевдокласс, обеспечивать fallback для старых браузеров. 

---

##  Различия в поведении

### `:focus` — всегда виден
```css
button:focus {
  outline: 2px solid blue;
}
```
**Срабатывает при:**
- Клике мышью 
- Навигации клавиатурой (Tab) 
- Программном фокусе (`element.focus()`) 

### `:focus-visible` — только когда ожидается
```css
button:focus-visible {
  outline: 2px solid blue;
}
```
**Срабатывает при:**
- Клике мышью 
- Навигации клавиатурой (Tab) 
- Программном фокусе (зависит от контекста) 

---

##  Практические примеры

### Проблема с `:focus`
```css
button:focus {
  outline: 3px solid #007acc;
  box-shadow: 0 0 0 2px rgba(0, 122, 204, 0.3);
}
```
**Результат:** при клике мышью кнопка остаётся подсвеченной, что может раздражать.

### Решение с `:focus-visible`
```css
button:focus-visible {
  outline: 3px solid #007acc;
  box-shadow: 0 0 0 2px rgba(0, 122, 204, 0.3);
}

/* Убираем стандартный outline для всех фокусов */
button:focus {
  outline: none;
}
```
**Результат:** индикатор появляется только при клавиатурной навигации.

---

##  Комбинированный подход

### Современный с fallback
```css
/* Убираем стандартный outline */
button:focus {
  outline: none;
}

/* Современные браузеры: только при клавиатурной навигации */
button:focus-visible {
  outline: 2px solid #007acc;
  outline-offset: 2px;
}

/* Fallback для старых браузеров */
button:focus:not(:focus-visible) {
  /* Стили для старых браузеров, не поддерживающих :focus-visible */
}
```

### Полифил для старых браузеров
```css
/* Используем класс .focus-visible из полифила */
button.focus-visible {
  outline: 2px solid #007acc;
}

/* Убираем outline при отсутствии класса */
button:focus:not(.focus-visible) {
  outline: none;
}
```

---

##  Когда что использовать

### Используйте `:focus-visible` для:
- **Кнопок и ссылок** — избегает «шума» от кликов мыши.
- **Форм** — фокус виден при Tab‑навигации, скрыт при кликах.
- **Кастомных элементов** — обеспечивает естественное поведение.

```css
button:focus-visible,
a:focus-visible,
[tabindex]:focus-visible {
  outline: 2px solid #007acc;
  outline-offset: 2px;
}
```

### Используйте `:focus` для:
- **Полей ввода** — пользователи ожидают видеть фокус при клике.
- **Критичных элементов** — когда фокус должен быть всегда виден.
- **Fallback** — для браузеров без поддержки `:focus-visible`.

```css
input:focus,
textarea:focus,
select:focus {
  outline: 2px solid #007acc;
  outline-offset: 1px;
}
```

---

##  Поддержка браузеров и полифил

### Современная поддержка
- **Chrome/Edge**: 86+
- **Firefox**: 85+
- **Safari**: 15.4+

### Полифил для старых браузеров
```html
<script src="https://unpkg.com/focus-visible@5.2.0/dist/focus-visible.min.js"></script>
```

```css
/* Стили с полифилом */
.js-focus-visible button:focus:not(.focus-visible) {
  outline: none;
}

button.focus-visible {
  outline: 2px solid #007acc;
}
```

---

##  Лучшие практики

### 1) Не убирайте outline полностью
```css
/*  ПЛОХО: убирает доступность */
button:focus {
  outline: none;
}

/*  ХОРОШО: заменяем на кастомный стиль */
button:focus-visible {
  outline: 2px solid #007acc;
}
```

### 2) Обеспечьте достаточный контраст
```css
button:focus-visible {
  outline: 2px solid #007acc; /* Контраст 3:1 минимум */
  outline-offset: 2px;
}
```

### 3) Тестируйте с клавиатурой
- Tab для навигации между элементами.
- Enter/Space для активации кнопок.
- Стрелки для радиокнопок/выпадающих списков.

### 4) Учитывайте `prefers-reduced-motion`
```css
@media (prefers-reduced-motion: no-preference) {
  button:focus-visible {
    outline: 2px solid #007acc;
    transition: outline-color 0.2s ease;
  }
}

@media (prefers-reduced-motion: reduce) {
  button:focus-visible {
    outline: 2px solid #007acc;
    /* Без анимации */
  }
}
```

---

##  Практические правила
- **Предпочитайте `:focus-visible`** для лучшего UX.
- **Не убирайте outline** без замены на кастомный стиль.
- **Тестируйте клавиатурой** — фокус должен быть виден и логичен.
- **Обеспечьте fallback** для старых браузеров.
- **Учитывайте контраст** — минимум 3:1 для индикаторов фокуса.

> Важно: никогда не используйте `outline: none` без предоставления альтернативного индикатора фокуса.

---

##  Итог
- `:focus-visible` улучшает UX, показывая фокус только когда нужно.
- Комбинируйте с fallback для максимальной совместимости.
- Тестируйте доступность с клавиатуры и AT. 

##  ЗАДАЧИ

Набор задач для практики стилей фокуса:

---

###  Задача 1: Улучшить UX кнопки
 Сделайте так, чтобы outline появлялся только при клавиатурной навигации.

```css
button:focus {
  outline: 2px solid blue;
}
```

<details>
<summary> Решение</summary>

```css
button:focus {
  outline: none;
}

button:focus-visible {
  outline: 2px solid blue;
}
```

</details>

---

###  Задача 2: Fallback для старых браузеров
 Добавьте поддержку для браузеров без `:focus-visible`.

```css
button:focus-visible {
  outline: 2px solid #007acc;
}
```

<details>
<summary> Решение</summary>

```css
/* Убираем стандартный outline */
button:focus {
  outline: none;
}

/* Современные браузеры */
button:focus-visible {
  outline: 2px solid #007acc;
}

/* Fallback: если браузер не поддерживает :focus-visible */
.js-focus-visible button:focus:not(.focus-visible) {
  outline: none;
}

button.focus-visible {
  outline: 2px solid #007acc;
}
```

</details>

---

###  Задача 3: Поля ввода vs кнопки
 Настройте фокус: поля ввода — всегда видимый, кнопки — только при клавиатуре.

```css
input, button {
  /* Настройте стили фокуса */
}
```

<details>
<summary> Решение</summary>

```css
/* Поля ввода: фокус всегда виден */
input:focus,
textarea:focus,
select:focus {
  outline: 2px solid #007acc;
  outline-offset: 1px;
}

/* Кнопки: фокус только при клавиатуре */
button:focus {
  outline: none;
}

button:focus-visible {
  outline: 2px solid #007acc;
  outline-offset: 2px;
}
```

</details>

---

##  Самопроверка

1. В чём главное отличие `:focus` от `:focus-visible`?

<details>
<summary> Вывод</summary>
`:focus` срабатывает при любом фокусе; `:focus-visible` — только когда индикатор ожидается (обычно клавиатура).
</details>

2. Безопасно ли использовать `outline: none` с `:focus-visible`?

<details>
<summary> Вывод</summary>
Да, если вы предоставляете альтернативный индикатор через `:focus-visible` и fallback для старых браузеров.
</details>

3. Нужен ли `:focus-visible` для полей ввода?

<details>
<summary> Вывод</summary>
Обычно нет. Пользователи ожидают видеть фокус в полях ввода даже при клике мышью.
</details>

---

 Эти задачи помогают закрепить: правильное использование псевдоклассов фокуса, улучшение UX и обеспечение доступности для всех способов навигации.

---
