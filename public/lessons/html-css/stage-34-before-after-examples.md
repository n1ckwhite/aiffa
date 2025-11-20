#  Этап 34 — ::before и ::after: примеры

Псевдо-элементы `::before` и `::after` — мощные инструменты CSS, которые позволяют добавлять контент перед или после содержимого элемента без изменения HTML-разметки. Они широко используются для создания декоративных элементов, дополнительного контента и визуальных эффектов.

---

##  Основные принципы работы

### Что такое `::before` и `::after`?
- **`::before`** — добавляет контент **перед** содержимым элемента
- **`::after`** — добавляет контент **после** содержимого элемента
- Оба псевдо-элемента **инлайновые** по умолчанию
- Требуют свойство `content` для отображения

### Синтаксис:
```css
.element::before {
  content: "текст или символ";
  /* другие стили */
}

.element::after {
  content: "";
  /* другие стили */
}
```

---

##  Пример 1: Добавление кавычек к цитате

### HTML:
```html
<blockquote class="quote">Это пример цитаты с красивым оформлением.</blockquote>
```

### CSS:
```css
.quote {
  position: relative;
  font-style: italic;
  padding: 20px;
  background: #f9f9f9;
  border-left: 4px solid #1976d2;
  margin: 20px 0;
}

.quote::before {
  content: "\201C"; /* Открывающая кавычка */
  font-size: 3em;
  color: #1976d2;
  position: absolute;
  left: -15px;
  top: -10px;
  font-family: serif;
}

.quote::after {
  content: "\201D"; /* Закрывающая кавычка */
  font-size: 3em;
  color: #1976d2;
  position: absolute;
  right: -15px;
  bottom: -20px;
  font-family: serif;
}
```

---

##  Пример 2: Создание декоративной линии под заголовком

### HTML:
```html
<h2 class="title">Красивый заголовок</h2>
```

### CSS:
```css
.title {
  position: relative;
  text-align: center;
  margin: 30px 0;
  color: #333;
}

.title::after {
  content: "";
  display: block;
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #1976d2, #42a5f5);
  margin: 15px auto;
  border-radius: 2px;
}
```

---

##  Пример 3: Использование для иконок

### HTML:
```html
<button class="icon-button">Поиск</button>
<a href="#" class="icon-link">Скачать файл</a>
```

### CSS:
```css
.icon-button {
  position: relative;
  padding: 10px 20px 10px 40px;
  background: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.icon-button::before {
  content: "";
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
}

.icon-link {
  position: relative;
  padding-left: 25px;
  text-decoration: none;
  color: #1976d2;
}

.icon-link::before {
  content: "⬇";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}
```

---

##  Пример 4: Эффект подсветки при наведении

### HTML:
```html
<div class="highlight-box">Наведи на меня курсор!</div>
```

### CSS:
```css
.highlight-box {
  position: relative;
  padding: 20px;
  background: #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}

.highlight-box::after {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
  transition: left 0.5s ease;
}

.highlight-box:hover::after {
  left: 100%;
}
```

---

##  Пример 5: Нумерация списков

### HTML:
```html
<ul class="numbered-list">
  <li>Первый пункт списка</li>
  <li>Второй пункт списка</li>
  <li>Третий пункт списка</li>
</ul>
```

### CSS:
```css
.numbered-list {
  list-style: none;
  padding: 0;
  counter-reset: item;
}

.numbered-list li {
  position: relative;
  padding: 10px 0 10px 40px;
  margin: 5px 0;
  background: #f9f9f9;
  border-radius: 4px;
}

.numbered-list li::before {
  content: counter(item);
  counter-increment: item;
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: #1976d2;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
}
```

---

##  Пример 6: Создание треугольников

### HTML:
```html
<div class="tooltip">Подсказка</div>
```

### CSS:
```css
.tooltip {
  position: relative;
  background: #333;
  color: white;
  padding: 10px;
  border-radius: 4px;
  margin: 20px;
}

.tooltip::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 20px;
  border: 8px solid transparent;
  border-top-color: #333;
}
```

---

##  Пример 7: Эффект "галочки" для чекбоксов

### HTML:
```html
<label class="custom-checkbox">
  <input type="checkbox">
  <span>Согласен с условиями</span>
</label>
```

### CSS:
```css
.custom-checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.custom-checkbox input {
  display: none;
}

.custom-checkbox span {
  position: relative;
  padding-left: 30px;
}

.custom-checkbox span::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  border: 2px solid #ddd;
  border-radius: 3px;
  background: white;
}

.custom-checkbox input:checked + span::after {
  content: "";
  position: absolute;
  left: 4px;
  top: 50%;
  transform: translateY(-50%);
  color: #1976d2;
  font-weight: bold;
}
```

---

##  Советы по использованию

###  Рекомендации:
- **Всегда указывайте `content`** — даже если пустой (`content: ""`)
- **Используйте `position: relative`** для родительского элемента
- **Помните о доступности** — псевдо-элементы не читаются скринридерами
- **Тестируйте на разных браузерах** — поддержка может отличаться

###  Избегайте:
- Слишком сложных эффектов, которые могут замедлить страницу
- Использования для критически важного контента
- Чрезмерного количества псевдо-элементов на одном элементе

---

##  Итог

Псевдо-элементы `::before` и `::after` — незаменимые инструменты для создания декоративных элементов и визуальных эффектов. Они позволяют добавлять контент без изменения HTML, что делает код более чистым и поддерживаемым.

---

##  Полезные ссылки

- MDN — ::before: https://developer.mozilla.org/ru/docs/Web/CSS/::before
- MDN — ::after: https://developer.mozilla.org/ru/docs/Web/CSS/::after
- MDN — content: https://developer.mozilla.org/ru/docs/Web/CSS/content

---

> Осторожно:
> - Псевдо‑элементы не участвуют в доступности — не вставляйте через них важные тексты/иконки без aria‑меток.
> - Помните про `content`: без него `::before/::after` не отрисуются.

---

> Подсказка:
> - Ставьте `position: relative` родителю при абсолютном позиционировании псевдо‑элементов.
> - Для сложных иконок используйте SVG‑background или инлайновый SVG вместо `content`.