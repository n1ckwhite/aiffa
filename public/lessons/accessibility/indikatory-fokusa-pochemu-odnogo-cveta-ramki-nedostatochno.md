#  Индикаторы фокуса: почему одного цвета рамки недостаточно

Изменение только цвета рамки для `:focus` часто недостаточно из‑за проблем с контрастом, цветовой слепоты и различных настроек пользователей. Нужны заметные визуальные изменения: толщина, тени, фон, размер — не только цвет.

---

##  Короткое резюме
- **Проблема**: цвет рамки может быть незаметен для многих пользователей.
- **Причины**: низкий контраст, дальтонизм, кастомные темы, маленькие элементы.
- **Решение**: комбинировать несколько визуальных изменений (толщина, тени, фон).
- **Что уметь**: создавать заметные индикаторы, тестировать контраст, учитывать разные условия. 

---

##  Почему одного цвета недостаточно

### 1) Проблемы с контрастом
```css
/*  ПЛОХО: слабый контраст */
button:focus {
  border-color: lightblue; /* На светлом фоне незаметно */
}

button:focus {
  border-color: #ddd; /* Контраст < 3:1 */
}
```

**Кто страдает:**
- Пользователи с низким зрением.
- Пользователи в ярких условиях (солнце, яркий экран).
- Пользователи старых мониторов с плохой цветопередачей.

### 2) Цветовая слепота (дальтонизм)
```css
/*  ПРОБЛЕМАТИЧНО: полагается только на цвет */
button:focus {
  border-color: red; /* Дальтоники могут не различить */
}
```

**Статистика:** ~8% мужчин и ~0.5% женщин имеют цветовую слепоту.

### 3) Кастомные темы и настройки
```css
/* Может быть переопределено пользовательскими стилями */
button:focus {
  border-color: blue;
}
```

**Проблемы:**
- Тёмные темы.
- Высококонтрастные режимы.
- Пользовательские CSS.
- Режимы для слабовидящих.

### 4) Маленькие элементы
```css
/*  На маленьких элементах изменение незаметно */
.small-checkbox:focus {
  border-color: blue; /* 1px рамка на 16px элементе */
}
```

---

##  Требования WCAG к индикаторам фокуса

### Success Criterion 2.4.7: Focus Visible (AA)
- **Контраст**: минимум 3:1 между индикатором и соседними цветами.
- **Заметность**: индикатор должен быть очевиден для всех пользователей.
- **Постоянство**: не должен исчезать при взаимодействии.

### Success Criterion 2.4.11: Focus Not Obscured (AAA)
- Индикатор не должен перекрываться другими элементами.

---

##  Лучшие практики для индикаторов

###  Комбинируйте несколько изменений
```css
button:focus-visible {
  outline: none;
  border-color: #007acc;           /* Цвет */
  border-width: 2px;               /* Толщина */
  box-shadow: 0 0 0 2px rgba(0, 122, 204, 0.3); /* Тень */
  background-color: rgba(0, 122, 204, 0.1);     /* Фон */
}
```

###  Используйте outline с offset
```css
button:focus-visible {
  outline: 2px solid #007acc;
  outline-offset: 2px; /* Отступ для лучшей видимости */
}
```

###  Анимация (с учётом prefers-reduced-motion)
```css
@media (prefers-reduced-motion: no-preference) {
  button:focus-visible {
    outline: 2px solid #007acc;
    transition: outline-color 0.2s ease;
    animation: focus-pulse 1s ease-in-out;
  }
  
  @keyframes focus-pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.02); }
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

##  Примеры для разных элементов

### Кнопки
```css
button:focus-visible {
  outline: none;
  box-shadow: 
    0 0 0 2px #fff,           /* Белая обводка */
    0 0 0 4px #007acc,        /* Цветная рамка */
    0 2px 8px rgba(0, 0, 0, 0.2); /* Тень для глубины */
}
```

### Поля ввода
```css
input:focus,
textarea:focus {
  outline: none;
  border: 2px solid #007acc;
  box-shadow: 0 0 0 2px rgba(0, 122, 204, 0.2);
  background-color: rgba(0, 122, 204, 0.05);
}
```

### Ссылки в тексте
```css
a:focus-visible {
  outline: 2px solid #007acc;
  outline-offset: 2px;
  border-radius: 2px;
  background-color: rgba(0, 122, 204, 0.1);
  text-decoration: underline;
  text-decoration-thickness: 2px;
}
```

### Маленькие элементы (чекбоксы, радио)
```css
input[type="checkbox"]:focus,
input[type="radio"]:focus {
  outline: none;
  box-shadow: 
    0 0 0 2px #fff,
    0 0 0 4px #007acc;
  transform: scale(1.1); /* Небольшое увеличение */
}
```

---

##  Тестирование индикаторов фокуса

### Ручное тестирование
1. **Навигация клавиатурой** — Tab по всем элементам.
2. **Разные темы** — светлая, тёмная, высококонтрастная.
3. **Симуляция дальтонизма** — используйте DevTools или расширения.
4. **Разные размеры экрана** — мобильные, планшеты, десктоп.

### Автоматическая проверка контраста
```js
function checkFocusContrast(element) {
  element.focus();
  const styles = getComputedStyle(element);
  
  // Получаем цвета индикатора и фона
  const indicatorColor = styles.outlineColor || styles.borderColor;
  const backgroundColor = styles.backgroundColor;
  
  // Вычисляем контраст (упрощённо)
  const contrast = calculateContrast(indicatorColor, backgroundColor);
  
  return contrast >= 3; // WCAG AA требует минимум 3:1
}

function calculateContrast(color1, color2) {
  // Реализация расчёта контраста по WCAG
  // Возвращает число от 1 до 21
}
```

### Инструменты для проверки
- **axe DevTools** — автоматическая проверка контраста.
- **Lighthouse** — аудит доступности.
- **Colour Contrast Analyser** — ручная проверка цветов.
- **Sim Daltonism** — симуляция цветовой слепоты.

---

##  Адаптация под разные условия

### Высококонтрастный режим
```css
@media (prefers-contrast: high) {
  button:focus-visible {
    outline: 3px solid;
    outline-offset: 2px;
    background-color: highlight;
    color: highlighttext;
  }
}
```

### Тёмная тема
```css
@media (prefers-color-scheme: dark) {
  button:focus-visible {
    outline: 2px solid #66b3ff;
    box-shadow: 0 0 0 2px rgba(102, 179, 255, 0.3);
  }
}
```

### Мобильные устройства
```css
@media (hover: none) and (pointer: coarse) {
  button:focus-visible {
    outline: 3px solid #007acc; /* Толще для сенсорных экранов */
    outline-offset: 3px;
  }
}
```

---

##  Практические правила
- **Не полагайтесь только на цвет** — добавляйте форму, размер, тени.
- **Обеспечьте контраст 3:1** минимум для индикаторов.
- **Тестируйте в разных условиях** — темы, размеры, симуляция дальтонизма.
- **Используйте несколько визуальных изменений** одновременно.
- **Учитывайте пользовательские настройки** — `prefers-*` медиа‑запросы.

> Важно: хороший индикатор фокуса заметен всем пользователям в любых условиях.

---

##  Итог
- Одного цвета рамки недостаточно из‑за контраста, дальтонизма и настроек.
- Комбинируйте толщину, тени, фон, размер для заметности.
- Тестируйте в разных условиях и с разными пользователями. 

##  ЗАДАЧИ

Набор задач для практики создания заметных индикаторов фокуса:

---

###  Задача 1: Улучшить слабый индикатор
 Индикатор фокуса слишком слабый. Сделайте его заметнее без изменения только цвета.

```css
button:focus {
  border-color: lightblue;
}
```

<details>
<summary> Решение</summary>

```css
button:focus-visible {
  outline: none;
  border: 2px solid #007acc;           /* Толще и контрастнее */
  box-shadow: 0 0 0 2px rgba(0, 122, 204, 0.3); /* Дополнительная тень */
  background-color: rgba(0, 122, 204, 0.1);     /* Лёгкий фон */
}
```

</details>

---

###  Задача 2: Индикатор для маленького элемента
 Создайте заметный индикатор фокуса для маленького чекбокса (16x16px).

```css
input[type="checkbox"] {
  width: 16px;
  height: 16px;
}
```

<details>
<summary> Решение</summary>

```css
input[type="checkbox"]:focus {
  outline: none;
  box-shadow: 
    0 0 0 2px #fff,           /* Белая обводка */
    0 0 0 4px #007acc;        /* Цветная рамка */
  transform: scale(1.1);      /* Небольшое увеличение */
}
```

</details>

---

###  Задача 3: Адаптивный индикатор
 Создайте индикатор, который адаптируется к тёмной теме и высокому контрасту.

```css
button:focus-visible {
  /* Базовый стиль */
}
```

<details>
<summary> Решение</summary>

```css
/* Базовый стиль */
button:focus-visible {
  outline: 2px solid #007acc;
  outline-offset: 2px;
}

/* Тёмная тема */
@media (prefers-color-scheme: dark) {
  button:focus-visible {
    outline-color: #66b3ff;
    box-shadow: 0 0 0 2px rgba(102, 179, 255, 0.3);
  }
}

/* Высокий контраст */
@media (prefers-contrast: high) {
  button:focus-visible {
    outline: 3px solid;
    outline-offset: 3px;
  }
}
```

</details>

---

###  Задача 4: Проверка контраста
 Создайте функцию для проверки достаточности контраста индикатора фокуса.

```js
function checkFocusContrast(element) {
  // Ваш код
}
```

<details>
<summary> Решение</summary>

```js
function checkFocusContrast(element) {
  element.focus();
  const styles = getComputedStyle(element);
  
  // Проверяем наличие заметных изменений
  const hasOutline = styles.outline !== 'none' && styles.outlineWidth !== '0px';
  const hasBoxShadow = styles.boxShadow !== 'none';
  const hasThickBorder = parseInt(styles.borderWidth) >= 2;
  const hasBackgroundChange = styles.backgroundColor !== 'transparent';
  
  // Считаем индикатор достаточным, если есть несколько изменений
  const changesCount = [hasOutline, hasBoxShadow, hasThickBorder, hasBackgroundChange]
    .filter(Boolean).length;
  
  return changesCount >= 2; // Минимум 2 визуальных изменения
}
```

</details>

---

##  Самопроверка

1. Почему изменение только цвета рамки может быть недостаточно?

<details>
<summary> Вывод</summary>
Из‑за проблем с контрастом, цветовой слепоты, кастомных тем и маленького размера элементов.
</details>

2. Какой минимальный контраст требуется для индикаторов фокуса?

<details>
<summary> Вывод</summary>
Минимум 3:1 между индикатором и соседними цветами согласно WCAG 2.1 AA.
</details>

3. Какие визуальные изменения лучше комбинировать для индикатора фокуса?

<details>
<summary> Вывод</summary>
Толщину рамки, тени, изменение фона, размера элемента — не только цвет.
</details>

---

 Эти задачи помогают закрепить: создание заметных индикаторов фокуса, учёт различных условий просмотра и обеспечение доступности для всех пользователей.

---
