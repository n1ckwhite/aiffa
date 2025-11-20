#  Этап 27 — Сетки из колонок и строк

Создание сетки — один из самых частых и важных приёмов в вёрстке интерфейсов. Сетка позволяет организовать элементы в упорядоченную структуру: по строкам, по колонкам, с равными отступами и выравниванием. В CSS есть два основных подхода: **CSS Grid** и **Flexbox**. Оба актуальны, но работают немного по-разному.

---

##  Вариант 1: Сетка с использованием **CSS Grid**

CSS Grid — это мощный инструмент для построения сеток, где вы заранее задаёте количество строк и колонок и легко управляете их размерами.

###  Пример: сетка 3×2 (3 колонки, 2 строки)

 HTML:

```html
<div class="grid-container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
  <div class="item">5</div>
  <div class="item">6</div>
</div>
```

 CSS:

```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);   /* 3 равные колонки */
  grid-template-rows: repeat(2, 100px);    /* 2 строки по 100px */
  gap: 10px;                               /* расстояние между ячейками */
  padding: 10px;
}

.item {
  background-color: #4CAF50;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  font-weight: bold;
}
```

 **Как это работает**:

* `display: grid;` превращает контейнер в сетку.
* `repeat(3, 1fr)` создаёт 3 колонки, каждая из которых занимает 1/3 ширины.
* `grid-template-rows` задаёт фиксированную высоту строк.
* `gap` задаёт отступы между ячейками.
* Каждому элементу можно указать свою позицию или позволить разместиться автоматически.

---

##  Вариант 2: Сетка с использованием **Flexbox**

Flexbox тоже позволяет выстраивать элементы в ряды и колонки, но он лучше подходит для линейных макетов (в одну строку или в одну колонку). Однако с `flex-wrap` можно имитировать сетку.

 HTML (тот же):

```html
<div class="flex-container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
  <div class="item">5</div>
  <div class="item">6</div>
</div>
```

 CSS:

```css
.flex-container {
  display: flex;
  flex-wrap: wrap; /* перенос элементов на новые строки */
  gap: 10px;
  padding: 10px;
}

.item {
  width: calc(33.333% - 10px); /* 3 элемента в строке с учётом gap */
  height: 100px;
  background-color: #4CAF50;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  font-weight: bold;
}
```

 **Как это работает**:

* `flex-wrap: wrap;` позволяет элементам переноситься на следующую строку.
* `calc(33.333% - 10px)` — хитрость, чтобы поместить три элемента в строку с учётом отступов.
* Flexbox распределяет элементы по одной оси (горизонтальной), остальное мы регулируем вручную.

---

##  Что выбрать: Grid или Flexbox?

|                   | Grid                                     | Flexbox                                       |
| ----------------- | ---------------------------------------- | --------------------------------------------- |
| Управление сеткой | Полный контроль над строками и колонками | Упрощённое размещение в ряду                  |
| Разметка          | Подходит для сеток, таблиц, галерей      | Подходит для горизонтальных списков, карточек |
| Адаптивность      | Гибкая, особенно с `auto-fill`, `minmax` | Гибкая, но требует расчётов (`calc()`)        |

---

##  Адаптивные паттерны на Grid

###  Автозаполнение карточек: `auto-fit` + `minmax`
```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}
.card { min-height: 140px; }
```

> Колонки заполняют строку автоматически, карточки не становятся меньше 220px.

###  Фиксированный сайдбар + резиновый контент
```css
.layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 24px;
}
```

###  Области (areas) вместо вложенных обёрток
```css
.page {
  display: grid;
  grid-template:
    "header header" 60px
    "sidebar main"  1fr
    "footer footer" 60px / 240px 1fr;
}
.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }
```

---

##  Подсказки и подводные камни

- `gap` работает и в Grid, и в Flexbox. Для старых браузеров может потребоваться фоллбек.
- В Flex имитация сетки часто требует `min-width`/`flex-basis` и `wrap`. Grid проще для двумерных макетов.
- В Grid проценты и `fr` сочетаются с `minmax()` для контроля минимальной ширины.

---

##  Полезные ссылки

- MDN — CSS Grid: https://developer.mozilla.org/ru/docs/Web/CSS/CSS_grid_layout
- MDN — Grid areas: https://developer.mozilla.org/ru/docs/Web/CSS/grid-template-areas
- web.dev — Learn Grid: https://web.dev/learn/css/grid/

##  Итог

* Используйте **Grid**, когда заранее известна структура строк и колонок.
* Используйте **Flexbox**, если нужно просто равномерно разложить элементы в одну строку или колонку.

---