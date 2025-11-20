#  ARIA: свойства (properties) vs состояния (states)

`aria-*` атрибуты помогают ассистивным технологиям понять, что это за элемент и в каком он состоянии. Условно делятся на: **свойства** (описывают неизменные/долгоиграющие характеристики) и **состояния** (динамически меняются при взаимодействии).

---

##  Короткое резюме
- **Свойства**: описывают элемент, задаются при инициализации, меняются редко.
- **Состояния**: отражают текущую динамику, обновляются при действиях пользователя/приложения.
- **Что уметь**: выбирать правильную категорию и синхронизировать её с UI/JS. 

---

##  Свойства (Properties)
Определяют постоянные характеристики или отношения между элементами.

- `aria-labelledby` — кто называет элемент (ID другого элемента).
- `aria-describedby` — кто даёт дополнительное описание (ID).
- `aria-label` — встроенное текстовое имя, если нет видимого.
- `aria-hidden` — скрыть элемент от AT (не визуально). Значения: `true`/`false`.
- `aria-controls` — указывает связанный управляемый элемент (ID).
- `aria-haspopup` — наличие всплывающего UI: `true`, `menu`, `listbox`, `tree`, `grid`, `dialog`.
- `aria-owns` — объявляет иерархию «владения», если структура не отражена в DOM (используйте осторожно).
- `aria-roledescription` — пояснение к роли (не меняет роль!).

Пример (описания и связи):
```html
<button id="more" aria-controls="panel" aria-expanded="false" aria-haspopup="dialog">Подробнее</button>
<section id="panel" hidden aria-labelledby="more">…</section>
```

---

##  Состояния (States)
Отражают текущую изменяемую характеристику элемента.

- `aria-expanded` — развёрнуто/свёрнуто: `true`/`false`.
- `aria-selected` — выбран/не выбран: `true`/`false`.
- `aria-checked` — для чекбоксов/переключателей: `true`/`false`/`mixed`.
- `aria-pressed` — состояние переключаемой кнопки: `true`/`false`/`mixed`.
- `aria-disabled` — недоступен для взаимодействия: `true`/`false`.
- `aria-busy` — идёт загрузка/операция: `true`/`false`.
- `aria-live` — приоритет озвучивания динамического контента: `off`/`polite`/`assertive`.
- `aria-relevant` — какие изменения сообщать: `additions`/`removals`/`text`/`all`.

Пример (динамика):
```html
<button aria-expanded="false" aria-controls="menu" id="toggle">Меню</button>
<ul id="menu" hidden>…</ul>
<script>
  const t = document.getElementById('toggle');
  const m = document.getElementById('menu');
  t.addEventListener('click', () => {
    const exp = t.getAttribute('aria-expanded') === 'true';
    t.setAttribute('aria-expanded', String(!exp));
    m.hidden = exp;
  });
</script>
```

---

##  Разница кратко
- **Изменяемость**: свойства — стабильны; состояния — меняются часто.
- **Контекст**: свойства — описывают «кто я и к чему привязан»; состояния — «что со мной сейчас».
- **Практика**: свойства задаём при инициализации; состояния обновляем при каждом изменении UI.

---

##  Дополнительные группы по назначению
- **Навигация/отношения**: `aria-labelledby`, `aria-describedby`, `aria-controls`, `aria-owns`.
- **Интерактивность**: `aria-haspopup`, `aria-expanded`, `aria-pressed`.
- **Динамика контента**: `aria-live`, `aria-relevant`, `aria-busy`.
- **Позиция в наборе**: `aria-posinset`, `aria-setsize`.

---

##  Практические правила
- Сначала — нативный тег и поведение; `aria-*` — дополнение.
- Не дублируйте имя: если есть видимый заголовок, предпочитайте `aria-labelledby` вместо `aria-label`.
- Синхронизируйте состояния (`expanded/selected/pressed/checked/disabled`) с визуальным UI.
- Не прячьте интерактив внутри контейнера с `aria-hidden="true"`.
- Для live‑областей не злоупотребляйте `assertive`; чаще подходит `polite`.

> Важно: `aria-roledescription` — только пояснение, не новая роль и не замена `role`.

---

##  Итог
- Свойства описывают элемент и связи; состояния отражают текущие изменения.
- Они работают вместе: свойства задают контекст, состояния — динамику.
- Тестируйте клавиатурой и скринридером; проверяйте axe/Lighthouse. 

##  ЗАДАЧИ

Набор задач для практики `properties vs states`:

---

###  Задача 1: Связать подсказку с полем
 Сделайте так, чтобы скринридер читал скрытую подсказку для поля ввода.

```html
<label for="email">E-mail</label>
<input id="email" type="email" />
<span id="email-help" class="sr-only">Мы не делимся вашим адресом.</span>
```

<details>
<summary> Решение</summary>

```html
<label for="email">E-mail</label>
<input id="email" type="email" aria-describedby="email-help" />
<span id="email-help" class="sr-only">Мы не делимся вашим адресом.</span>
```

</details>

---

###  Задача 2: Disclosure — синхронизировать состояние
 Кнопка разворачивает панель: синхронизируйте `aria-expanded` и `hidden`.

```html
<button id="more" aria-controls="p" aria-expanded="false">Подробнее</button>
<div id="p" hidden>Текст…</div>
```

<details>
<summary> Решение</summary>

```js
const b = document.getElementById('more');
const p = document.getElementById('p');
b.addEventListener('click', () => {
  const exp = b.getAttribute('aria-expanded') === 'true';
  b.setAttribute('aria-expanded', String(!exp));
  p.hidden = exp;
});
```

</details>

---

###  Задача 3: Live‑область
 Организуйте ненавязчивые уведомления об изменениях.

```html
<div id="status" aria-live="polite"></div>
```

<details>
<summary> Решение</summary>

```js
const status = document.getElementById('status');
function reportSaved(){ status.textContent = 'Сохранено'; }
```

</details>

---

##  Самопроверка

1. `aria-label` vs `aria-labelledby` — что выбрать и когда?

<details>
<summary> Вывод</summary>
Если есть видимый заголовок — используйте `aria-labelledby`. `aria-label` — когда видимого имени нет.
</details>

2. К какой категории относится `aria-expanded` и как её обновлять?

<details>
<summary> Вывод</summary>
Это состояние (state). Обновляйте при каждом разворачивании/сворачивании вместе с DOM (`hidden`).
</details>

3. Когда уместно `aria-hidden="true"`?

<details>
<summary> Вывод</summary>
Когда элемент должен быть видим визуально, но скрыт от AT (например, декоративный дубликат текста). Не применяйте к контейнеру с интерактивом.
</details>

---

 Эти задачи помогают закрепить: разграничение свойств и состояний, установку связей и синхронизацию динамики UI с `aria-*`.

---