#  Выравнивание во Flexbox: `justify-content`, `align-items`, `align-content`, `gap`

Flexbox даёт мощные инструменты выравнивания. Разберём, как управлять расположением по главной и поперечной осям, и как учитывать перенос строк.

---

##  Главная ось: `justify-content`

Управляет положением элементов вдоль главной оси (для `row` — горизонталь, для `column` — вертикаль).

| Значение        | Описание                                                 |
| --------------- | -------------------------------------------------------- |
| `flex-start`    | Элементы прижаты к началу контейнера.                    |
| `flex-end`      | Элементы прижаты к концу контейнера.                     |
| `center`        | Элементы размещены по центру.                            |
| `space-between` | Равномерно, без отступов по краям.                        |
| `space-around`  | Равные отступы вокруг каждого элемента.                  |
| `space-evenly`  | Равные отступы между элементами и краями контейнера.     |

```css
.row {
  display: flex;
  justify-content: space-between;
}
```

> Меняя `flex-direction`, вы меняете ось, вдоль которой действует `justify-content`.

---

##  Поперечная ось: `align-items`

Управляет выравниванием элементов по поперечной оси (перпендикулярно главной).

| Значение     | Описание                                                                              |
| ------------ | ------------------------------------------------------------------------------------- |
| `flex-start` | Прижать к началу поперечной оси.                                                      |
| `flex-end`   | Прижать к концу поперечной оси.                                                       |
| `center`     | Центрировать по поперечной оси.                                                       |
| `baseline`   | Выровнять по базовой линии текста.                                                    |
| `stretch`    | Растянуть на всю доступную высоту/ширину (если размеры не заданы).                    |

```css
.toolbar {
  display: flex;
  align-items: center;
}
```

> `stretch` не сработает, если у элементов задана фиксированная высота/ширина по поперечной оси.

---

##  Когда есть несколько строк: `align-content`

Если включён перенос (`flex-wrap: wrap|wrap-reverse`) и появляется несколько строк/колонок, распределение пространства между строками регулирует `align-content`.

```css
.gridish {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between; /* управление распределением строк */
  gap: 12px;                    /* отступы между элементами и строками */
}
```

> `align-content` работает только при наличии 2+ строк и свободного пространства по поперечной оси (нужна явная высота/ширина контейнера).

---

##  Отступы между элементами: `gap`

`gap` добавляет расстояние между flex-элементами (и между строками при `wrap`). Это лучше, чем маргины, так как не ломает вычисления выравнивания.

```css
.list {
  display: flex;
  gap: 16px 24px; /* row-gap column-gap */
}
```

---

##  Частые комбинации

###  Центрирование по двум осям
```css
.center {
  display: flex;
  justify-content: center; /* по главной оси */
  align-items: center;     /* по поперечной оси */
  min-height: 100vh;       /* чтобы было что центрировать по поперечной оси */
}
```

###  Пространство между пунктами меню
```css
.menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

###  Несколько строк с равномерными промежутками
```css
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
  align-content: space-between; /* распределить строки по высоте */
  height: 200px;                /* нужна высота */
}
```

---

##  Подводные камни

- Меняя `flex-direction`, помните, что оси меняются местами: `justify-content` всегда вдоль главной оси.
- `align-content` не работает для одной строки — используйте `align-items`.
- Для выравнивания **отдельного элемента** используйте `align-self`.
- При сложном переносе используйте `gap`, а не маргины, чтобы не влиять на распределение.

---

##  Полезные ссылки

- MDN — Basic concepts of flexbox: https://developer.mozilla.org/ru/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox
- MDN — justify-content: https://developer.mozilla.org/ru/docs/Web/CSS/justify-content
- MDN — align-items: https://developer.mozilla.org/ru/docs/Web/CSS/align-items
- MDN — align-content: https://developer.mozilla.org/ru/docs/Web/CSS/align-content
- MDN — gap: https://developer.mozilla.org/ru/docs/Web/CSS/gap

---

##  Итог

- `justify-content` — по главной оси; `align-items` — по поперечной; `align-content` — распределяет строки при переносе; `gap` — аккуратные отступы.
- Помните об осях: при `column` всё «переезжает» с горизонтали на вертикаль и наоборот.

---