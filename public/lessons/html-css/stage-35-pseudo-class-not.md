#  Этап 35 — Псевдокласс :not()

Псевдокласс `:not()` — мощный инструмент CSS, который позволяет выбирать элементы, **не соответствующие** определённому селектору. Это особенно полезно для исключения определённых элементов из стилизации или применения стилей к группе элементов с исключениями.

---

##  Основные принципы работы

### Что такое `:not()`?
- **Назначение:** Выбор элементов, которые НЕ соответствуют указанному селектору
- **Синтаксис:** `:not(селектор)`
- **Поддержка:** Можно использовать с любыми CSS-селекторами
- **Специфичность:** Равна специфичности самого селектора внутри скобок

### Базовый синтаксис:
```css
/* Выбор всех элементов, кроме указанных */
элемент:not(селектор) {
  /* стили */
}

/* Можно комбинировать с другими селекторами */
.class:not(.исключение) {
  /* стили */
}
```

---

##  Специфичность и сочетание с :is() / :where()

- Специфичность `:not(X)` равна специфичности селектора `X`.
- `:is(A,B)` берёт максимальную специфичность среди A и B.
- `:where(A,B)` всегда имеет нулевую специфичность (удобно как «несущий» контейнер для сложных списков).

```css
/* Жёстко: специфичность как у .btn */
.list :not(.btn) { margin: 0; }

/* Мягко: нулевая специфичность селекторной группы */
.list :where(:not(.btn)) { margin: 0; }

/* Комбинирование для читаемости */
button:is(:not(.primary), :disabled) { opacity: .6; }
```

> Для управляемых каскадов используйте `:where()` вокруг больших групп, чтобы не повышать специфичность.

---

##  Пример 1: Стилизация всех параграфов, кроме одного

### HTML:
```html
<p>Первый параграф с обычным стилем.</p>
<p>Второй параграф с обычным стилем.</p>
<p class="exclude">Третий параграф (исключён из стилизации).</p>
<p>Четвёртый параграф с обычным стилем.</p>
```

### CSS:
```css
p:not(.exclude) {
  color: #1976d2;
  font-weight: 500;
  padding: 10px;
  border-left: 3px solid #1976d2;
  background: #f5f5f5;
}

.exclude {
  color: #666;
  font-style: italic;
}
```

---

##  Пример 2: Стилизация всех кнопок, кроме отключённых

### HTML:
```html
<button class="btn">Обычная кнопка</button>
<button class="btn disabled">Отключённая кнопка</button>
<button class="btn">Активная кнопка</button>
<button class="btn disabled">Ещё одна отключённая</button>
```

### CSS:
```css
.btn:not(.disabled) {
  background: #1976d2;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.btn:not(.disabled):hover {
  background: #1565c0;
}

.disabled {
  background: #ccc !important;
  color: #666 !important;
  cursor: not-allowed;
  opacity: 0.6;
}
```

---

##  Пример 3: Стилизация всех элементов списка, кроме специальных

### HTML:
```html
<ul class="task-list">
  <li>Обычная задача</li>
  <li class="special">Важная задача</li>
  <li>Ещё одна обычная задача</li>
  <li class="special">Критическая задача</li>
  <li>Простая задача</li>
</ul>
```

### CSS:
```css
.task-list li:not(.special) {
  background: #f9f9f9;
  padding: 8px 12px;
  margin: 4px 0;
  border-radius: 4px;
  border-left: 3px solid #ddd;
}

.special {
  background: #fff3cd !important;
  border-left: 3px solid #ffc107 !important;
  font-weight: bold;
}
```

---

##  Пример 4: Стилизация всех дочерних элементов, кроме заголовков

### HTML:
```html
<div class="content">
  <h1>Главный заголовок</h1>
  <p>Первый параграф с текстом.</p>
  <h2>Подзаголовок</h2>
  <p>Второй параграф с информацией.</p>
  <ul>
    <li>Элемент списка 1</li>
    <li>Элемент списка 2</li>
  </ul>
  <h3>Меньший заголовок</h3>
  <p>Последний параграф.</p>
</div>
```

### CSS:
```css
.content > *:not(h1, h2, h3) {
  font-size: 16px;
  line-height: 1.6;
  color: #333;
  margin-bottom: 15px;
}

.content h1, .content h2, .content h3 {
  color: #1976d2;
  margin: 20px 0 10px 0;
}
```

---

##  Пример 5: Стилизация всех ссылок, кроме внешних

### HTML:
```html
<nav class="navigation">
  <a href="/home">Главная</a>
  <a href="/about">О нас</a>
  <a href="https://external-site.com" class="external">Внешняя ссылка</a>
  <a href="/contact">Контакты</a>
  <a href="https://another-site.com" class="external">Другая внешняя ссылка</a>
</nav>
```

### CSS:
```css
.navigation a:not(.external) {
  color: #1976d2;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 4px;
  transition: background 0.3s ease;
}

.navigation a:not(.external):hover {
  background: #e3f2fd;
}

.external {
  color: #666 !important;
  opacity: 0.7;
}

.external::after {
  content: " ↗";
  font-size: 12px;
}
```

---

##  Пример 6: Стилизация всех полей ввода, кроме отключённых

### HTML:
```html
<form class="contact-form">
  <input type="text" placeholder="Ваше имя" required>
  <input type="email" placeholder="Email" required>
  <input type="text" placeholder="Компания">
  <input type="tel" placeholder="Телефон" disabled>
  <textarea placeholder="Сообщение" required></textarea>
  <input type="text" placeholder="Дополнительная информация">
</form>
```

### CSS:
```css
.contact-form input:not([disabled]),
.contact-form textarea:not([disabled]) {
  width: 100%;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.contact-form input:not([disabled]):focus,
.contact-form textarea:not([disabled]):focus {
  border-color: #1976d2;
  outline: none;
}

.contact-form input[disabled] {
  background: #f5f5f5;
  color: #999;
  cursor: not-allowed;
}
```

---

##  Пример 7: Стилизация всех карточек, кроме выделенных

### HTML:
```html
<div class="cards-container">
  <div class="card">Обычная карточка</div>
  <div class="card featured">Выделенная карточка</div>
  <div class="card">Ещё одна обычная карточка</div>
  <div class="card featured">Вторая выделенная карточка</div>
  <div class="card">Последняя обычная карточка</div>
</div>
```

### CSS:
```css
.cards-container .card:not(.featured) {
  background: white;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.cards-container .card:not(.featured):hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.featured {
  background: linear-gradient(135deg, #1976d2, #42a5f5) !important;
  color: white !important;
  border: none !important;
  box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3) !important;
}
```

---

##  Советы по использованию

###  Рекомендации:
- **Используйте для исключений** — когда нужно применить стили ко всем элементам, кроме нескольких
- **Комбинируйте с другими селекторами** — для более точной выборки
- **Помните о специфичности** — `:not()` наследует специфичность внутреннего селектора
- **Тестируйте в браузерах** — поддержка может отличаться в старых версиях

###  Избегайте:
- Слишком сложных селекторов внутри `:not()`
- Использования для критически важных стилей
- Чрезмерного вложения `:not()` селекторов

###  Полезные комбинации:
```css
/* Все элементы, кроме первого и последнего */
.item:not(:first-child):not(:last-child) { }

/* Все кнопки, кроме отключённых и с классом warning */
button:not(.disabled):not(.warning) { }

/* Все параграфы, кроме тех, что внутри .sidebar */
p:not(.sidebar p) { }
```

---

##  Подводные камни

- Слишком длинные списки исключений ухудшают читаемость — попробуйте упрощать через классы.
- Помните про специфичность: `:not(.class)` может перебить простые правила, но уступит более специфичным селекторам.
- В старых браузерах сложные селекторы внутри `:not()` могли работать нестабильно — держите их короче.

---

##  Полезные ссылки

- MDN — :not(): https://developer.mozilla.org/ru/docs/Web/CSS/:not
- MDN — :is() и :where(): https://developer.mozilla.org/ru/docs/Web/CSS/:is

---

##  Итог

Псевдокласс `:not()` — незаменимый инструмент для создания исключений в CSS. Он позволяет писать более чистый и читаемый код, избегая дублирования стилей и упрощая поддержку кода.

---