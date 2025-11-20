#  В чем разница между `flex-direction: row` и `flex-direction: column`?

Свойство `flex-direction` в CSS Flexbox определяет **направление размещения flex-элементов** внутри flex-контейнера. Это один из ключевых инструментов для построения гибких макетов.

---

##  Основные значения

### `flex-direction: row`
- **Направление:** Элементы располагаются в строку (горизонтально, слева направо).
- **Главная ось (main axis):** Горизонтальная.
- **Перпендикулярная ось (cross axis):** Вертикальная.
- **Используется по умолчанию.**

```css
.container {
  display: flex;
  flex-direction: row;
}
```

**Визуально:**
```
[ Item 1 ][ Item 2 ][ Item 3 ]
```

---

### `flex-direction: column`
- **Направление:** Элементы располагаются в столбик (вертикально, сверху вниз).
- **Главная ось (main axis):** Вертикальная.
- **Перпендикулярная ось (cross axis):** Горизонтальная.

```css
.container {
  display: flex;
  flex-direction: column;
}
```

**Визуально:**
```
[ Item 1 ]
[ Item 2 ]
[ Item 3 ]
```

---

##  Сравнение и советы

| Свойство                | `row` (по умолчанию)         | `column`                   |
|-------------------------|------------------------------|----------------------------|
| Ориентация              | Горизонтальная               | Вертикальная               |
| Главная ось             | Слева направо                | Сверху вниз                |
| Перпендикулярная ось    | Сверху вниз                  | Слева направо              |
| Применение              | Меню, карточки, галереи      | Списки, формы, колонки     |
| Совместимость           | Все современные браузеры     | Все современные браузеры   |

- **Меняя `flex-direction`, вы меняете смысл свойств `justify-content` и `align-items`!**
  - Для `row`: `justify-content` — по горизонтали, `align-items` — по вертикали.
  - Для `column`: наоборот!
- Можно использовать значения `row-reverse` и `column-reverse` для обратного порядка.

> Информация: Главная ось (main axis) идёт по направлению `flex-direction`; поперечная (cross axis) — перпендикулярно ей. Все выравнивания завязаны на эти оси.

---

##  Пример с переключением направления

```html
<div class="container row">
  <div class="item">A</div>
  <div class="item">B</div>
  <div class="item">C</div>
</div>
<div class="container column">
  <div class="item">A</div>
  <div class="item">B</div>
  <div class="item">C</div>
</div>
```

```css
.container {
  display: flex;
  gap: 10px;
}
.container.row {
  flex-direction: row;
}
.container.column {
  flex-direction: column;
}
.item {
  background: #e0eaff;
  padding: 10px 20px;
  border-radius: 6px;
  border: 1px solid #7dafff;
}
```

---

##  Полезные ссылки

- MDN — Flexbox: https://developer.mozilla.org/ru/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox
- Web.dev — Learn Flexbox: https://web.dev/learn/css/flexbox/

---

##  Итог

Свойство `flex-direction` — это основа для построения как горизонтальных, так и вертикальных макетов. Оно позволяет быстро менять структуру интерфейса без переписывания HTML.

---