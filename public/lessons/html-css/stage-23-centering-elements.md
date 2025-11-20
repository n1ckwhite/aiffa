#  Центрирование в CSS: Flexbox, Grid и другие подходы

Центрирование — частая задача в интерфейсах. Разберём устойчивые приёмы центрирования по горизонтали и вертикали, их ограничения и подводные камни.

---

##  Центрирование с Flexbox (1 элемент/одна строка)

```css
.center {
  display: flex;
  justify-content: center;  /* по главной оси */
  align-items: center;      /* по поперечной оси */
  min-height: 100vh;        /* чтобы было что центрировать по поперечной оси */
}
```

> При `flex-direction: column` оси меняются местами: горизонталь/вертикаль меняются ролями.

---

##  Центрирование нескольких элементов в строке

```css
.row {
  display: flex;
  justify-content: center;  /* центрируем набор элементов по главной оси */
  gap: 12px;                /* расстояния между элементами */
}
```

Если элементы переносятся:
```css
.row-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
}
```

---

##  Центрирование через Grid (универсальный способ)

```css
.grid-center {
  display: grid;
  place-items: center;    /* shorthand для align-items + justify-items */
  min-height: 100vh;
}
```

> Преимущество Grid: одинаково просто центрирует по двум осям, даже если элемент один.

---

##  Центрирование блочного элемента по горизонтали

```css
.block {
  width: max-content;      /* или фиксированная ширина */
  margin-inline: auto;     /* центрирование в потоке */
}
```

---

##  Центрирование абсолютного элемента

```css
.abs-parent {
  position: relative;
  min-height: 300px;
}
.abs-center {
  position: absolute;
  inset: 0;                 /* сокращение top/right/bottom/left: 0 */
  margin: auto;             /* при фиксированных размерах центрирует */
  width: 200px;
  height: 100px;
}
```

Либо с transform:
```css
.abs-center2 {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
}
```

---

##  Подводные камни и советы

- Для вертикального центрирования во Flexbox нужна вычислимая высота контейнера (например, `min-height: 100vh`).
- При длинных строках внутри «центра» задавайте ограничения: `max-width`, перенос слов, `min-width: 0` (во flex-контейнере).
- Используйте `gap`, а не внешние отступы, чтобы не влиять на расчёт выравнивания.
- Для центрирования одного конкретного элемента во Flexbox используйте `align-self`/`margin: auto` на ребёнке.

---

##  Полезные ссылки

- MDN — Flexbox basics: https://developer.mozilla.org/ru/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox
- MDN — CSS Grid Layout: https://developer.mozilla.org/ru/docs/Web/CSS/CSS_Grid_Layout
- Learn Layout — Centering: https://learnlayout.com/centering.html

---

##  Итог

- Flexbox: быстрое центрирование по двум осям в одной строке.
- Grid: кратчайший универсальный способ (`place-items: center`).
- Для специальных случаев есть приёмы с абсолютным позиционированием и `margin: auto`.

---