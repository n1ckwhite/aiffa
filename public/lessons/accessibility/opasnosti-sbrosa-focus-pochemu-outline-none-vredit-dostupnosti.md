#  Опасности сброса :focus — почему outline: none вредит доступности

Сброс стилей `:focus` (особенно `outline: none`) без альтернативы делает интерфейс недоступным для клавиатурных пользователей и нарушает WCAG. Всегда заменяйте стандартный индикатор на кастомный, а не просто убирайте.

---

##  Короткое резюме
- **Проблема**: `outline: none` убирает единственный визуальный ориентир для клавиатурной навигации.
- **Последствия**: нарушение доступности, WCAG, потеря пользователей.
- **Решение**: заменять стандартный индикатор на кастомный, использовать `:focus-visible`.
- **Что уметь**: создавать заметные индикаторы фокуса, тестировать только клавиатурой. 

---

##  Почему это опасно

### 1) Потеря ориентации для клавиатурных пользователей
```css
/*  ОПАСНО: пользователи теряют ориентир */
button:focus {
  outline: none;
}
```

**Кто страдает:**
- Пользователи с моторными нарушениями.
- Пользователи, предпочитающие клавиатуру.
- Пользователи скринридеров с остаточным зрением.
- Пользователи на устройствах без мыши.

### 2) Нарушение стандартов WCAG
**WCAG 2.1 Success Criterion 2.4.7**: «Focus Visible» требует видимого индикатора фокуса.

**Уровень соответствия:** AA (обязательный для большинства сайтов).

### 3) Проблемы с частичной потерей зрения
Пользователи с низким зрением полагаются на контрастные индикаторы фокуса для навигации.

### 4) Общее ухудшение UX
Даже обычные пользователи теряются без визуальных подсказок о текущем фокусе.

---

##  Частые анти‑паттерны

###  Полное удаление индикатора
```css
/* Делает сайт недоступным */
*:focus {
  outline: none;
}

button:focus,
a:focus,
input:focus {
  outline: none;
}
```

###  Сброс без замены
```css
/* Убираем, но не заменяем */
.custom-button:focus {
  outline: none;
  /* Нет альтернативного индикатора! */
}
```

###  Слабый контраст
```css
/* Индикатор есть, но его не видно */
button:focus {
  outline: 1px solid #f0f0f0; /* Слишком светлый */
}
```

---

##  Правильные решения

###  Замена на кастомный индикатор
```css
button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5);
  border-color: #007acc;
}
```

###  Использование :focus-visible
```css
/* Убираем outline для всех фокусов */
button:focus {
  outline: none;
}

/* Показываем только при клавиатурной навигации */
button:focus-visible {
  outline: 2px solid #007acc;
  outline-offset: 2px;
}
```

###  Комбинированный подход
```css
/* Базовые стили */
button {
  border: 2px solid transparent;
  transition: border-color 0.2s ease;
}

/* Фокус для всех способов */
button:focus {
  outline: none;
  border-color: #007acc;
}

/* Дополнительный индикатор для клавиатуры */
button:focus-visible {
  box-shadow: 0 0 0 2px rgba(0, 122, 204, 0.3);
}
```

---

##  Требования к индикаторам фокуса

### Контрастность
**Минимум 3:1** между индикатором и фоном (WCAG 2.1 AA).
```css
/*  Хороший контраст */
button:focus-visible {
  outline: 2px solid #0066cc; /* Контраст > 3:1 на белом фоне */
}

/*  Плохой контраст */
button:focus-visible {
  outline: 1px solid #cccccc; /* Контраст < 3:1 */
}
```

### Размер и заметность
**Минимум 2px** толщина для хорошей видимости.
```css
button:focus-visible {
  outline: 2px solid #007acc;
  outline-offset: 2px; /* Отступ для лучшей видимости */
}
```

### Анимация (опционально)
```css
@media (prefers-reduced-motion: no-preference) {
  button:focus-visible {
    outline: 2px solid #007acc;
    transition: outline-color 0.2s ease;
  }
}
```

---

##  Специальные случаи

### Поля ввода
```css
/* Поля ввода должны показывать фокус всегда */
input:focus,
textarea:focus,
select:focus {
  outline: none;
  border-color: #007acc;
  box-shadow: 0 0 0 2px rgba(0, 122, 204, 0.2);
}
```

### Ссылки в тексте
```css
/* Ссылки в контенте */
a:focus-visible {
  outline: 2px solid #007acc;
  outline-offset: 2px;
  border-radius: 2px;
}
```

### Кастомные элементы
```css
/* Элементы с role */
[role="button"]:focus-visible,
[role="tab"]:focus-visible {
  outline: 2px solid #007acc;
  outline-offset: 2px;
}
```

---

##  Тестирование доступности фокуса

### Ручное тестирование
1. **Отключите мышь** — навигируйтесь только клавиатурой.
2. **Используйте Tab/Shift+Tab** — проверьте видимость фокуса.
3. **Проверьте контраст** — индикатор должен быть заметен.
4. **Тестируйте в разных браузерах** — поведение может отличаться.

### Автоматические инструменты
```js
// Проверка наличия индикатора фокуса
function checkFocusIndicator(element) {
  element.focus();
  const styles = getComputedStyle(element);
  
  const hasOutline = styles.outline !== 'none';
  const hasBoxShadow = styles.boxShadow !== 'none';
  const hasBorder = styles.borderColor !== 'transparent';
  
  return hasOutline || hasBoxShadow || hasBorder;
}
```

---

##  Практические правила
- **Никогда не используйте `outline: none`** без альтернативного индикатора.
- **Тестируйте только клавиатурой** — отключите мышь на время тестирования.
- **Обеспечьте контраст 3:1** минимум для индикаторов фокуса.
- **Используйте `:focus-visible`** для лучшего UX.
- **Учитывайте `prefers-reduced-motion`** при добавлении анимаций.

> Важно: индикатор фокуса — не украшение, а критически важный элемент доступности.

---

##  Итог
- Сброс `:focus` без замены — серьёзная проблема доступности.
- Всегда предоставляйте альтернативный индикатор с достаточным контрастом.
- Тестируйте навигацию только клавиатурой регулярно. 

##  ЗАДАЧИ

Набор задач для практики безопасной работы с фокусом:

---

###  Задача 1: Исправить опасный сброс
 Код убирает индикатор фокуса без замены. Исправьте это.

```css
button:focus {
  outline: none;
}
```

<details>
<summary> Решение</summary>

```css
button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5);
}

/* Или лучше с :focus-visible */
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

###  Задача 2: Улучшить контраст
 Индикатор фокуса слишком слабый. Сделайте его заметнее.

```css
button:focus-visible {
  outline: 1px solid #e0e0e0;
}
```

<details>
<summary> Решение</summary>

```css
button:focus-visible {
  outline: 2px solid #0066cc; /* Более контрастный цвет */
  outline-offset: 2px; /* Отступ для лучшей видимости */
}
```

</details>

---

###  Задача 3: Разные стили для разных элементов
 Настройте фокус: кнопки — только при клавиатуре, поля ввода — всегда.

```css
/* Настройте стили */
```

<details>
<summary> Решение</summary>

```css
/* Кнопки: фокус только при клавиатурной навигации */
button:focus {
  outline: none;
}

button:focus-visible {
  outline: 2px solid #007acc;
  outline-offset: 2px;
}

/* Поля ввода: фокус всегда виден */
input:focus,
textarea:focus,
select:focus {
  outline: none;
  border-color: #007acc;
  box-shadow: 0 0 0 2px rgba(0, 122, 204, 0.2);
}
```

</details>

---

###  Задача 4: Проверка доступности
 Создайте функцию для проверки наличия индикатора фокуса.

```js
function hasFocusIndicator(element) {
  // Ваш код
}
```

<details>
<summary> Решение</summary>

```js
function hasFocusIndicator(element) {
  element.focus();
  const styles = getComputedStyle(element);
  
  // Проверяем различные способы индикации фокуса
  const hasOutline = styles.outline !== 'none' && styles.outlineWidth !== '0px';
  const hasBoxShadow = styles.boxShadow !== 'none';
  const hasBorderChange = styles.borderColor !== 'transparent';
  const hasBackgroundChange = styles.backgroundColor !== 'transparent';
  
  return hasOutline || hasBoxShadow || hasBorderChange || hasBackgroundChange;
}
```

</details>

---

##  Самопроверка

1. Можно ли использовать `outline: none` без альтернативного индикатора?

<details>
<summary> Вывод</summary>
Нет. Это нарушает доступность и делает навигацию невозможной для клавиатурных пользователей.
</details>

2. Какой минимальный контраст нужен для индикатора фокуса?

<details>
<summary> Вывод</summary>
Минимум 3:1 между индикатором и фоном согласно WCAG 2.1 AA.
</details>

3. В чём преимущество `:focus-visible` над `:focus`?

<details>
<summary> Вывод</summary>
`:focus-visible` показывает индикатор только когда ожидается (клавиатура), убирая «шум» от кликов мыши.
</details>

---

 Эти задачи помогают закрепить: важность индикаторов фокуса, правильную замену стандартных стилей и создание доступных интерфейсов для всех пользователей.

---
