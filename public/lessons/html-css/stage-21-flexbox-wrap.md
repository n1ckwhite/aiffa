#  Как работает `flex-wrap`: `nowrap`, `wrap` и `wrap-reverse`

`flex-wrap` управляет тем, **переносятся ли flex-элементы на новые строки/колонки**, когда в контейнере не хватает места. Это ключ к адаптивным гридоподобным рядами без использования CSS Grid.

---

##  Значения

###  `flex-wrap: nowrap` (по умолчанию)
- **Все элементы в одной строке/колонке**.
- При нехватке места: элементы сжимаются (`flex-shrink`) или контейнер даёт прокрутку/переполнение.

```css
.container {
  display: flex;
  flex-wrap: nowrap;
}
```

###  `flex-wrap: wrap`
- **Элементы переносятся на новую строку/колонку**, сохраняя размеры ближе к `flex-basis`.

```css
.container {
  display: flex;
  flex-wrap: wrap;
}
```

###  `flex-wrap: wrap-reverse`
- Перенос в обратном направлении: новая строка появляется **над** предыдущей (для `row`) или **слева** (для `column`).

```css
.container {
  display: flex;
  flex-wrap: wrap-reverse;
}
```

> Направление переносов и то, что считается «новой строкой», зависит от `flex-direction`.

---

##  Управление выравниванием строк: `align-content`

Когда перенос включён (`wrap`/`wrap-reverse`) и появляется несколько строк, промежутки между строками/колонками контролируются `align-content` (по поперечной оси).

```css
.gridish {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between; /* управление распределением строк */
  gap: 12px;
}
```

> `align-content` влияет только когда есть более одной строки и у контейнера есть свободное место по поперечной оси (например, задана высота).

---

##  Практический пример: карточки с переносом

```html
<div class="cards">
  <article class="card">1</article>
  <article class="card">2</article>
  <article class="card">3</article>
  <article class="card">4</article>
  <article class="card">5</article>
  <article class="card">6</article>
</div>
```

```css
.cards {
  display: flex;
  flex-wrap: wrap;           /* разрешаем перенос */
  gap: 16px;                 /* расстояния между карточками */
}
.card {
  flex: 1 1 220px;           /* старт 220px, можно сжать и вырастить */
  min-width: 200px;          /* не сжимать меньше читабельного минимума */
  background: #f6f8ff;
  border: 1px solid #cdd9ff;
  border-radius: 8px;
  padding: 12px;
}
```

---

##  Частые ошибки и подсказки

- **Перенос не работает?** Проверьте, что не оставили `nowrap` по умолчанию.
- **Строки «слипаются» по вертикали?** Используйте `gap` — он работает и между строками при `wrap`.
- **Нет визуального эффекта от `align-content`?** Убедитесь, что строк больше одной и у контейнера есть высота/свободное место по поперечной оси.
- **Слишком сильное сжатие карточек?** Повышайте `flex-basis`/`min-width` или включайте `wrap`.
- **Нужно, чтобы новые строки появлялись сверху?** Используйте `wrap-reverse`.

---

##  Полезные ссылки

- MDN — flex-wrap: https://developer.mozilla.org/ru/docs/Web/CSS/flex-wrap
- MDN — align-content: https://developer.mozilla.org/ru/docs/Web/CSS/align-content
- web.dev — Flexbox basics: https://web.dev/learn/css/flexbox/

---

##  Итог

- `nowrap` держит всё в одной строке/колонке и сжимает элементы.
- `wrap` и `wrap-reverse` позволяют переносить элементы, сохраняя их читабельные размеры и управляя расположением строк.
- Для контроля промежутков используйте `gap`, для выравнивания строк — `align-content`.

---