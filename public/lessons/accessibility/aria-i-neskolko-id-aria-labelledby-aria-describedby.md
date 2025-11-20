#  ARIA и несколько ID: aria-labelledby, aria-describedby

Атрибуты `aria-labelledby` и `aria-describedby` могут ссылаться на несколько элементов одновременно — просто перечислите их ID через пробел. Скринридер прочитает содержимое всех указанных элементов в порядке перечисления.

---

##  Короткое резюме
- **О чём**: как связать элемент с несколькими источниками имени/описания.
- **Зачем**: собрать полное имя или описание из разных частей интерфейса.
- **Что уметь**: правильно перечислять ID через пробел, следить за порядком и логикой. 

---

##  Синтаксис с несколькими ID
```html
<!-- Один ID -->
<input aria-labelledby="label1">

<!-- Несколько ID через пробел -->
<input aria-labelledby="label1 label2 label3">
<input aria-describedby="help1 help2">
```

Скринридер прочитает содержимое всех элементов в указанном порядке.

---

##  Практические примеры

### Составное имя элемента
```html
<div id="first-name">Имя</div>
<div id="required">обязательно</div>
<input type="text" aria-labelledby="first-name required">
```
Скринридер: «Имя обязательно».

### Заголовок + подзаголовок
```html
<h1 id="main-title">Настройки профиля</h1>
<p id="subtitle">Управление личными данными</p>
<section aria-labelledby="main-title subtitle">
  <input type="text" placeholder="Имя пользователя">
</section>
```
Скринридер: «Настройки профиля Управление личными данными».

### Множественные описания
```html
<label for="pwd" id="pwd-label">Пароль</label>
<input id="pwd" type="password" 
       aria-labelledby="pwd-label"
       aria-describedby="pwd-help pwd-strength pwd-warning">

<div id="pwd-help">Минимум 8 символов</div>
<div id="pwd-strength">Средняя сложность</div>
<div id="pwd-warning">Не используйте личные данные</div>
```
Скринридер прочитает: «Пароль» + все три описания.

---

##  Порядок и логика

### Порядок имеет значение
```html
<span id="currency">₽</span>
<span id="amount">1000</span>
<input aria-labelledby="amount currency"> <!-- «1000 ₽» -->
<input aria-labelledby="currency amount"> <!-- «₽ 1000» -->
```

### Логическая группировка
```html
<!-- Хорошо: логичный порядок -->
<h2 id="section-title">Контактная информация</h2>
<p id="section-desc">Укажите способы связи</p>
<fieldset aria-labelledby="section-title section-desc">
  <input type="email" placeholder="Email">
</fieldset>

<!-- Плохо: нелогичный порядок -->
<fieldset aria-labelledby="section-desc section-title">
  <!-- «Укажите способы связи Контактная информация» — странно -->
</fieldset>
```

---

##  Частые сценарии

### Форма с дополнительной информацией
```html
<div id="form-title">Регистрация</div>
<div id="form-step">Шаг 1 из 3</div>
<form aria-labelledby="form-title form-step">
  <input type="text" placeholder="Имя">
</form>
```

### Карточка товара
```html
<h3 id="product-name">iPhone 15</h3>
<span id="product-price">99 990 ₽</span>
<span id="product-status">В наличии</span>
<button aria-labelledby="product-name product-price product-status">
  Купить
</button>
```
Скринридер: «iPhone 15 99 990 ₽ В наличии Купить».

### Составное описание ошибки
```html
<input id="email" type="email" 
       aria-describedby="email-format email-required email-error">

<div id="email-format">Формат: user@example.com</div>
<div id="email-required">Поле обязательно для заполнения</div>
<div id="email-error" hidden>Неверный формат email</div>
```

---

##  Важные правила
- **Все ID должны существовать**: ссылки на несуществующие элементы игнорируются.
- **Уникальность ID**: каждый ID должен быть уникальным на странице.
- **Логичный порядок**: располагайте ID в том порядке, в котором должен читаться текст.
- **Динамические изменения**: если элементы скрываются/показываются, содержимое автоматически обновляется.

### Динамическое управление
```js
const input = document.getElementById('username');
const error = document.getElementById('username-error');

function showError() {
  error.hidden = false;
  // aria-describedby уже указывает на error, содержимое обновится автоматически
}
```

---

##  Практические советы
- Не дублируйте информацию: если элемент уже имеет видимый `label`, не повторяйте его в `aria-labelledby`.
- Тестируйте порядок чтения с реальными скринридерами.
- Для длинных списков ID группируйте логически связанные элементы.
- Используйте осмысленные ID, отражающие назначение элемента.

> Важно: `aria-labelledby` переопределяет другие способы именования (включая `aria-label` и `<label>`).

---

##  Итог
- Несколько ID через пробел — мощный способ создания составных имён и описаний.
- Следите за порядком и логикой чтения.
- Тестируйте с реальными AT для проверки восприятия. 

##  ЗАДАЧИ

Набор задач для практики `aria-*` с несколькими ID:

---

###  Задача 1: Составное имя поля
 Создайте поле «Имя (обязательно)» из двух отдельных элементов.

```html
<div id="name-label">Имя</div>
<div id="required-mark">обязательно</div>
<input type="text">
```

<details>
<summary> Решение</summary>

```html
<div id="name-label">Имя</div>
<div id="required-mark">обязательно</div>
<input type="text" aria-labelledby="name-label required-mark">
```

</details>

---

###  Задача 2: Карточка с ценой
 Кнопка должна читаться как «Товар A 1000 рублей Купить».

```html
<h3 id="item-name">Товар A</h3>
<span id="item-price">1000 рублей</span>
<button>Купить</button>
```

<details>
<summary> Решение</summary>

```html
<h3 id="item-name">Товар A</h3>
<span id="item-price">1000 рублей</span>
<button aria-labelledby="item-name item-price">Купить</button>
```

</details>

---

###  Задача 3: Множественные подсказки
 Поле пароля должно иметь три описания: требования, сила, предупреждение.

```html
<input type="password" placeholder="Пароль">
<div id="pwd-req">Минимум 8 символов</div>
<div id="pwd-strength">Слабый пароль</div>
<div id="pwd-warn">Избегайте личных данных</div>
```

<details>
<summary> Решение</summary>

```html
<input type="password" placeholder="Пароль" 
       aria-describedby="pwd-req pwd-strength pwd-warn">
<div id="pwd-req">Минимум 8 символов</div>
<div id="pwd-strength">Слабый пароль</div>
<div id="pwd-warn">Избегайте личных данных</div>
```

</details>

---

##  Самопроверка

1. Как разделяются несколько ID в `aria-labelledby`?

<details>
<summary> Вывод</summary>
Пробелами: `aria-labelledby="id1 id2 id3"`.
</details>

2. Влияет ли порядок ID на порядок чтения?

<details>
<summary> Вывод</summary>
Да. Скринридер читает содержимое элементов в том порядке, в котором перечислены ID.
</details>

3. Что происходит, если один из ID не существует?

<details>
<summary> Вывод</summary>
Несуществующий ID игнорируется, остальные работают нормально.
</details>

---

 Эти задачи помогают закрепить: создание составных имён и описаний, правильный порядок ID и связывание элементов для богатого контекста AT.

---
