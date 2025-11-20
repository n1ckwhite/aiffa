#  Поиск совпадений с регулярным выражением: методы `match()` и `exec()` в JavaScript

---

##  Определение и назначение

В JavaScript для поиска совпадений с регулярным выражением в строке используются методы:
- **`String.prototype.match()`** — ищет совпадения по регулярному выражению и возвращает массив совпадений или `null`.
- **`RegExp.prototype.exec()`** — выполняет поиск по регулярному выражению и возвращает подробную информацию о каждом совпадении.

Эти методы позволяют находить отдельные слова, шаблоны, группы символов и анализировать текст.

---

##  Как работает `match()`

Метод `match()` применяется к строке и принимает регулярное выражение:

```javascript
const str = "hello world, hello universe";
const regex = /hello/g; // глобальный поиск
const matches = str.match(regex);
console.log(matches); // ["hello", "hello"]
```

- Если регулярное выражение с флагом `g`, возвращается массив всех совпадений.
- Без флага `g` — массив с первым совпадением и группами, либо `null`.

### Пример с захватывающими группами

```javascript
const str = "John Doe, Jane Doe, Jim Beam";
const regex = /(\w+) (\w+)/g;
const matches = str.match(regex);
console.log(matches); // ["John Doe", "Jane Doe", "Jim Beam"]
```

---

##  Как работает `exec()`

Метод `exec()` вызывается у регулярного выражения и принимает строку:

```javascript
const str = "hello world, hello universe";
const regex = /hello/g;
let match;
while ((match = regex.exec(str)) !== null) {
  console.log(match);
}
// [ 'hello', index: 0, input: 'hello world, hello universe', groups: undefined ]
// [ 'hello', index: 13, input: 'hello world, hello universe', groups: undefined ]
```

- `exec()` возвращает массив с совпадением, индексом и группами.
- При каждом вызове ищет следующее совпадение (если есть флаг `g`).
- Для поиска всех совпадений обычно используют цикл `while`.

### Пример с группами

```javascript
const str = "2023-01-01, 2024-12-31";
const regex = /(\d{4})-(\d{2})-(\d{2})/g;
let match;
while ((match = regex.exec(str)) !== null) {
  console.log(`Год: ${match[1]}, Месяц: ${match[2]}, День: ${match[3]}`);
}
// Год: 2023, Месяц: 01, День: 01
// Год: 2024, Месяц: 12, День: 31
```

---

##  Сравнение методов

| Метод   | Где вызывается         | Что возвращает                | Когда использовать           |
|---------|------------------------|-------------------------------|-----------------------------|
| match   | у строки               | массив совпадений или null    | Быстрый поиск, простые задачи|
| exec    | у регулярного выражения| массив с деталями совпадения  | Подробный разбор, группы     |

---

##  Итог

- Для поиска совпадений с регулярным выражением используйте `match()` (просто и быстро) или `exec()` (подробно и гибко).
- `match()` удобен для получения всех совпадений сразу.
- `exec()` позволяет поэтапно разбирать совпадения, получать индексы и группы.
- Оба метода — основа для анализа и обработки текста в JavaScript!

##  ЗАДАЧИ

Задачи по теме `поиска совпадений с регулярными выражениями в JavaScript`:

---

###  Задача 1: Найти все email-адреса в строке
Дана строка:
```javascript
const text = "Почты: ivan@mail.ru, petya@gmail.com, test@ya.ru";
```
Найдите все email-адреса с помощью `match()`.
<details><summary> Решение</summary>

```javascript
const emails = text.match(/[\w.-]+@[\w.-]+\.[a-z]{2,}/gi);
console.log(emails); // ["ivan@mail.ru", "petya@gmail.com", "test@ya.ru"]
```
</details>

---

###  Задача 2: Извлечь годы из дат
Дана строка:
```javascript
const dates = "2020-01-01, 2021-12-31, 2022-05-15";
```
С помощью `exec()` и цикла выведите все года.
<details><summary> Решение</summary>

```javascript
const regex = /(\d{4})-(\d{2})-(\d{2})/g;
let match;
while ((match = regex.exec(dates)) !== null) {
  console.log(match[1]); // 2020, 2021, 2022
}
```
</details>

---

###  Задача 3: Проверить наличие слова
Проверьте, есть ли в строке слово "JavaScript" (без учета регистра).
<details><summary> Решение</summary>

```javascript
const str = "Изучаем JavaScript и регулярные выражения!";
const found = str.match(/javascript/i) !== null;
console.log(found); // true
```
</details>

---

###  Задача 4: Найти все числа в тексте
Дана строка:
```javascript
const str = "В 2020 году было 365 дней, а в 2021 — 365, в 2022 — 365.";
```
Найдите все числа с помощью `match()`.
<details><summary> Решение</summary>

```javascript
const numbers = str.match(/\d+/g);
console.log(numbers); // ["2020", "365", "2021", "365", "2022", "365"]
```
</details>

---

###  Задача 5: Извлечь имена из строки
Дана строка:
```javascript
const str = "Anna, Boris, Ivan";
```
С помощью `match()` получите массив имен.
<details><summary> Решение</summary>

```javascript
const names = str.match(/\w+/g);
console.log(names); // ["Anna", "Boris", "Ivan"]
```
</details>

---

 Продолжайте тренироваться — и регулярные выражения станут вашим мощным инструментом! 

--- 