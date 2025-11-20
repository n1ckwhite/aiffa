#  Что такое `z-index` и как он работает

`z-index` в CSS управляет тем, **какой элемент окажется поверх**, если элементы перекрываются. Он отвечает за **ось Z**, то есть глубину (в отличие от X и Y — горизонтали и вертикали).

> Но работает `z-index` только на элементах, у которых есть `position: relative | absolute | fixed | sticky`.

---

###  Как работает `z-index`

> Информация: `z-index` влияет только на позиционированные элементы и внутри одного контекста наложения.

* Элемент должен быть позиционирован (`position ≠ static`)
* Чем **больше значение `z-index`**, тем **выше** элемент "над стеком"
* Можно использовать и **отрицательные значения** — они уйдут "вглубь"
* Если у элементов одинаковый `z-index`, то **побеждает тот, кто ниже по коду**

---

###  Простой пример: кто перекроет кого

```html
<div class="box red"></div>
<div class="box blue"></div>
```

```css
.box {
  position: relative;
  width: 100px;
  height: 100px;
}
.red {
  background: red;
  z-index: 1;
}
.blue {
  background: blue;
  z-index: 2;
  margin-left: -50px; /* сдвигаем, чтобы перекрылись */
}
```

> `blue` окажется поверх `red`, потому что `z-index: 2 > 1`.

---

###  Контекст наложения (stacking context)

Иногда `z-index` "не работает", потому что элемент находится в другом **контексте наложения**.

#### Что создаёт новый контекст:

* `position` + `z-index` (даже `z-index: 0`)
* `opacity < 1`
* `transform`, `filter`, `will-change`, `mix-blend-mode`
* `isolation: isolate`

#### И что это значит:

> Элементы внутри одного контекста "играют" друг с другом, но **не могут перекрыть** элемент из другого контекста, даже с большим `z-index`.

> Совет: Если `z-index` «не работает», проверьте, не создали ли `transform` или `opacity` новый контекст на родителях.

---

###  Пример: три блока в контейнере

```html
<div class="container">
  <div class="box box1"></div>
  <div class="box box2"></div>
  <div class="box box3"></div>
</div>
```

```css
.container {
  position: relative;
  width: 200px;
  height: 200px;
}

.box {
  position: absolute;
  width: 100px;
  height: 100px;
}
.box1 {
  background: red;
  z-index: 1;
}
.box2 {
  background: blue;
  top: 50px;
  z-index: 2;
}
.box3 {
  background: green;
  top: 25px;
  left: 50px;
  z-index: 1;
}
```

>  Все три элемента находятся в **одном контексте**, и порядок определяется только `z-index` и порядком в коде.

---

##  Полезные ссылки

- MDN — z-index: https://developer.mozilla.org/ru/docs/Web/CSS/z-index
- Web.dev — Stacking contexts & z-index: https://web.dev/learn/css/z-index/

---

##  Итог

| Что                | Как работает                                     |
| ------------------ | ------------------------------------------------ |
| Требует `position` | Да (`relative`, `absolute`, `fixed`, `sticky`)   |
| Значения           | Любые целые числа, положительные и отрицательные |
| Контекст наложения | Может "перебить" `z-index`                       |
| Один уровень       | Побеждает тот, кто ниже в HTML                   |

---