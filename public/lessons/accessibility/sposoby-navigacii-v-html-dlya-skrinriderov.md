#  Способы навигации в HTML для скринридеров

Скринридеры предоставляют множество способов навигации: по заголовкам (H), ссылкам (L), формам (F), ориентирам (D), таблицам (T). Хорошая семантическая структура HTML — основа эффективной навигации для пользователей AT.

---

##  Короткое резюме
- **Семантическая навигация**: заголовки, ссылки, формы, таблицы, ориентиры.
- **Быстрые клавиши**: каждый тип элементов имеет свою букву (H, L, F, T, D).
- **Списки элементов**: Insert+F6/F7 открывают полные списки для обзора.
- **Что уметь**: создавать логичную структуру, тестировать разные способы навигации. 

---

##  Навигация по заголовкам

### Самый популярный способ навигации
```html
<h1>Главная страница</h1>
<h2>Новости</h2>
  <h3>Технологии</h3>
  <h3>Спорт</h3>
<h2>О компании</h2>
  <h3>История</h3>
  <h3>Команда</h3>
```

**Команды:**
- `H` / `Shift+H` — следующий/предыдущий заголовок
- `1-6` / `Shift+1-6` — заголовки конкретного уровня
- `Insert+F6` (JAWS/NVDA) — список всех заголовков

**Почему важно:**
- Создаёт «оглавление» страницы
- Позволяет быстро понять структуру
- Самый быстрый способ перейти к нужному разделу

---

##  Навигация по ссылкам

### Поиск интерактивного контента
```html
<nav aria-label="Основная навигация">
  <a href="/">Главная</a>
  <a href="/catalog">Каталог</a>
  <a href="/about">О нас</a>
</nav>

<main>
  <p>Читайте также: <a href="/article1">статью о веб‑доступности</a></p>
  <p>Скачать: <a href="/guide.pdf">руководство (PDF)</a></p>
</main>
```

**Команды:**
- `L` / `Shift+L` — следующая/предыдущая ссылка
- `Insert+F7` (JAWS/NVDA) — список всех ссылок

**Лучшие практики:**
- Осмысленный текст ссылок (не «читать далее»)
- `aria-current="page"` для текущей страницы
- Описательные ссылки на файлы

---

##  Навигация по формам

### Интерактивные элементы
```html
<form>
  <fieldset>
    <legend>Личная информация</legend>
    
    <label for="name">Имя *</label>
    <input id="name" type="text" required>
    
    <label for="email">Email *</label>
    <input id="email" type="email" required>
    
    <fieldset>
      <legend>Пол</legend>
      <input id="male" type="radio" name="gender" value="male">
      <label for="male">Мужской</label>
      
      <input id="female" type="radio" name="gender" value="female">
      <label for="female">Женский</label>
    </fieldset>
    
    <input id="newsletter" type="checkbox">
    <label for="newsletter">Подписаться на новости</label>
    
    <button type="submit">Отправить</button>
  </fieldset>
</form>
```

**Команды:**
- `F` / `Shift+F` — следующее/предыдущее поле формы
- `B` / `Shift+B` — следующая/предыдущая кнопка
- `R` / `Shift+R` — следующая/предыдущая радиокнопка
- `X` / `Shift+X` — следующий/предыдущий чекбокс
- `C` / `Shift+C` — следующий/предыдущий комбобокс
- `E` / `Shift+E` — следующее/предыдущее поле ввода

---

##  Навигация по ориентирам (Landmarks)

### Структурные области страницы
```html
<header role="banner">
  <h1>Название сайта</h1>
  <nav role="navigation" aria-label="Основная навигация">
    <ul>
      <li><a href="/">Главная</a></li>
    </ul>
  </nav>
</header>

<main role="main">
  <h1>Заголовок страницы</h1>
  <section>
    <h2>Основной контент</h2>
  </section>
  
  <aside role="complementary">
    <h2>Боковая панель</h2>
  </aside>
</main>

<footer role="contentinfo">
  <p>&copy; 2024 Компания</p>
</footer>
```

**Команды:**
- `D` / `Shift+D` — следующий/предыдущий ориентир
- `Insert+Ctrl+;` (JAWS) — список ориентиров

**HTML5 ориентиры:**
- `<header>` → `role="banner"`
- `<nav>` → `role="navigation"`
- `<main>` → `role="main"`
- `<aside>` → `role="complementary"`
- `<footer>` → `role="contentinfo"`
- `<section>` → `role="region"` (с заголовком)

---

##  Навигация по таблицам

### Структурированные данные
```html
<table>
  <caption>Продажи по кварталам</caption>
  <thead>
    <tr>
      <th scope="col">Квартал</th>
      <th scope="col">Продажи</th>
      <th scope="col">Рост</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Q1 2024</th>
      <td>$100,000</td>
      <td>+15%</td>
    </tr>
    <tr>
      <th scope="row">Q2 2024</th>
      <td>$120,000</td>
      <td>+20%</td>
    </tr>
  </tbody>
</table>
```

**Команды:**
- `T` / `Shift+T` — следующая/предыдущая таблица
- `Ctrl+Alt+стрелки` — навигация по ячейкам
- `Ctrl+Alt+Home/End` — первая/последняя ячейка

**Важные атрибуты:**
- `<caption>` — название таблицы
- `scope="col/row"` — связь заголовков с данными
- `<thead>`, `<tbody>` — структура таблицы

---

##  Навигация по спискам

### Структурированный контент
```html
<nav aria-label="Хлебные крошки">
  <ol>
    <li><a href="/">Главная</a></li>
    <li><a href="/catalog">Каталог</a></li>
    <li aria-current="page">Товар</li>
  </ol>
</nav>

<section>
  <h2>Преимущества</h2>
  <ul>
    <li>Быстрая доставка</li>
    <li>Гарантия качества</li>
    <li>Поддержка 24/7</li>
  </ul>
</section>
```

**Команды:**
- `L` — следующий список (в некоторых SR)
- `I` — следующий элемент списка

---

##  Навигация по графике

### Изображения и медиа
```html
<figure>
  <img src="chart.png" alt="График продаж показывает рост на 25% за год">
  <figcaption>Динамика продаж 2024</figcaption>
</figure>

<img src="logo.png" alt="Логотип компании ABC" role="img">

<!-- Декоративное изображение -->
<img src="decoration.png" alt="" role="presentation">
```

**Команды:**
- `G` / `Shift+G` — следующее/предыдущее изображение

**Важно:**
- Осмысленный `alt` для информативных изображений
- Пустой `alt=""` для декоративных
- `role="presentation"` для чисто оформительских

---

##  Текстовая навигация

### Линейное чтение
```html
<article>
  <h1>Заголовок статьи</h1>
  
  <p>Первый абзац с важной информацией.</p>
  
  <p>Второй абзац продолжает тему. 
     <strong>Важное замечание</strong> выделено.</p>
  
  <blockquote>
    <p>Цитата из авторитетного источника.</p>
    <cite>— Автор цитаты</cite>
  </blockquote>
</article>
```

**Команды:**
- `↑/↓` — по строкам
- `Ctrl+←/→` — по словам
- `Ctrl+↑/↓` — по абзацам
- `Page Up/Down` — по экранам

---

##  Списки элементов (Element Lists)

### Быстрый обзор структуры
```js
// Эмуляция списка заголовков (Insert+F6)
function getHeadingsList() {
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  return Array.from(headings).map((h, index) => ({
    level: h.tagName,
    text: h.textContent.trim(),
    index: index + 1
  }));
}

// Эмуляция списка ссылок (Insert+F7)
function getLinksList() {
  const links = document.querySelectorAll('a[href]');
  return Array.from(links).map((link, index) => ({
    text: link.textContent.trim() || link.href,
    href: link.href,
    index: index + 1
  }));
}
```

**Команды для списков:**
- `Insert+F6` — заголовки
- `Insert+F7` — ссылки
- `Insert+F3` — элементы форм
- `Insert+F5` — поля форм
- `Insert+Ctrl+;` — ориентиры

---

##  Практические рекомендации

### Создание навигабельной структуры
```html
<!--  Хорошая структура -->
<header>
  <h1>Название сайта</h1>
  <nav aria-label="Основная навигация">
    <ul>
      <li><a href="/" aria-current="page">Главная</a></li>
      <li><a href="/products">Товары</a></li>
    </ul>
  </nav>
</header>

<main>
  <h1>Каталог товаров</h1>
  
  <nav aria-label="Фильтры">
    <h2>Фильтры</h2>
    <form>
      <fieldset>
        <legend>Категория</legend>
        <!-- фильтры -->
      </fieldset>
    </form>
  </nav>
  
  <section aria-labelledby="results-heading">
    <h2 id="results-heading">Результаты поиска</h2>
    <!-- товары -->
  </section>
</main>
```

### Тестирование навигации
```js
// Проверка логичности структуры заголовков
function validateHeadingStructure() {
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  const issues = [];
  
  let previousLevel = 0;
  headings.forEach((heading, index) => {
    const currentLevel = parseInt(heading.tagName[1]);
    
    if (index === 0 && currentLevel !== 1) {
      issues.push('Первый заголовок должен быть h1');
    }
    
    if (currentLevel > previousLevel + 1) {
      issues.push(`Пропущен уровень: ${heading.tagName} после h${previousLevel}`);
    }
    
    previousLevel = currentLevel;
  });
  
  return issues;
}
```

---

##  Практические правила
- **Используйте семантические теги** — они создают естественные точки навигации
- **Логичная иерархия заголовков** — основа структурной навигации
- **Осмысленные тексты ссылок** — понятны вне контекста
- **Правильная разметка форм** — `label`, `fieldset`, `legend`
- **Тестируйте разные способы** — заголовки, ссылки, формы, ориентиры

> Важно: хорошая семантика делает все способы навигации эффективными автоматически.

---

##  Итог
- Скринридеры предоставляют множество способов навигации по HTML.
- Семантическая структура — основа всех способов навигации.
- Тестируйте разные методы для полного понимания UX. 

##  ЗАДАЧИ

Набор задач для практики `навигации SR`:

---

###  Задача 1: Планирование структуры заголовков
 Создайте логичную иерархию заголовков для страницы интернет‑магазина.

```
Страница: Каталог → Электроника → Смартфоны → iPhone 15
Разделы: Описание, Характеристики, Отзывы, Похожие товары
```

<details>
<summary> Решение</summary>

```html
<h1>iPhone 15</h1>
<nav aria-label="Хлебные крошки">
  <!-- Каталог → Электроника → Смартфоны → iPhone 15 -->
</nav>

<section>
  <h2>Описание</h2>
  <!-- контент -->
</section>

<section>
  <h2>Характеристики</h2>
  <h3>Дисплей</h3>
  <h3>Камера</h3>
  <h3>Производительность</h3>
</section>

<section>
  <h2>Отзывы</h2>
  <!-- отзывы -->
</section>

<section>
  <h2>Похожие товары</h2>
  <!-- товары -->
</section>
```

</details>

---

###  Задача 2: Навигабельная форма
 Создайте форму регистрации, удобную для навигации клавишами F, R, X.

<details>
<summary> Решение</summary>

```html
<form>
  <fieldset>
    <legend>Личная информация</legend>
    
    <label for="name">Имя *</label>
    <input id="name" type="text" required>
    
    <label for="email">Email *</label>
    <input id="email" type="email" required>
  </fieldset>
  
  <fieldset>
    <legend>Пол</legend>
    <input id="male" type="radio" name="gender" value="male">
    <label for="male">Мужской</label>
    
    <input id="female" type="radio" name="gender" value="female">
    <label for="female">Женский</label>
  </fieldset>
  
  <input id="terms" type="checkbox" required>
  <label for="terms">Согласен с условиями *</label>
  
  <input id="newsletter" type="checkbox">
  <label for="newsletter">Подписаться на новости</label>
  
  <button type="submit">Зарегистрироваться</button>
</form>
```

</details>

---

###  Задача 3: Проверка навигации
 Напишите функцию для проверки наличия основных навигационных элементов.

```js
function checkNavigationElements() {
  // Ваш код
}
```

<details>
<summary> Решение</summary>

```js
function checkNavigationElements() {
  const report = {
    headings: document.querySelectorAll('h1, h2, h3, h4, h5, h6').length,
    links: document.querySelectorAll('a[href]').length,
    buttons: document.querySelectorAll('button, input[type="button"], input[type="submit"]').length,
    formFields: document.querySelectorAll('input:not([type="hidden"]), textarea, select').length,
    landmarks: document.querySelectorAll('header, nav, main, aside, footer, [role="banner"], [role="navigation"], [role="main"], [role="complementary"], [role="contentinfo"]').length,
    tables: document.querySelectorAll('table').length,
    images: document.querySelectorAll('img:not([alt=""]):not([role="presentation"])').length
  };
  
  console.log('Навигационные элементы:', report);
  return report;
}
```

</details>

---

##  Самопроверка

1. Какая клавиша используется для навигации по заголовкам?

<details>
<summary> Вывод</summary>
Клавиша `H` (следующий заголовок) и `Shift+H` (предыдущий). Цифры 1‑6 для конкретных уровней.
</details>

2. Чем отличается навигация по ссылкам (L) от навигации по кнопкам (B)?

<details>
<summary> Вывод</summary>
`L` находит элементы `<a href>`, `B` находит `<button>` и `input[type="button/submit"]`. Разные типы интерактивности.
</details>

3. Что такое ориентиры (landmarks) и как по ним навигировать?

<details>
<summary> Вывод</summary>
Структурные области страницы (`header`, `nav`, `main`, `aside`, `footer`). Навигация клавишей `D`.
</details>

---

 Эти задачи помогают закрепить: создание навигабельной структуры, понимание разных способов перемещения по странице и оптимизацию для пользователей скринридеров.

---
