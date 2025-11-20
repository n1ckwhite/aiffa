#  Создание регулярных выражений в JavaScript

---

##  Определение

**Регулярное выражение** — это специальный шаблон для поиска и обработки текста. В JavaScript регулярные выражения позволяют находить, проверять, заменять и извлекать фрагменты строк по заданным правилам.

---

##  Как создать регулярное выражение

В JavaScript есть два основных способа создания регулярных выражений:

### 1. Литерал регулярного выражения

Литерал записывается между косыми чертами `/.../` и может содержать флаги:

```javascript
// Простой шаблон для поиска слова "hello"
const regex1 = /hello/;

// С флагами: g — глобальный поиск, i — игнор регистра
const regex2 = /hello/gi;

// Поиск одной или более цифр
const regex3 = /\d+/;
```

### 2. Конструктор RegExp

Позволяет создавать регулярные выражения динамически, используя строки:

```javascript
// Создание из строки
const pattern = "hello";
const regex4 = new RegExp(pattern);

// С флагами
const flags = "gi";
const regex5 = new RegExp(pattern, flags);

// Поиск всех букв
const regex6 = new RegExp("[a-zA-Z]+", "g");
```

> **Когда использовать конструктор?**
> - Если шаблон формируется из переменных или пользовательского ввода.
> - Если флаги или части шаблона определяются динамически.

---

##  Примеры использования

### Пример 1: Проверка наличия совпадения

```javascript
const str = "Hello World!";
const regex = /hello/i; // Игнорируем регистр
console.log(regex.test(str)); // true
```

### Пример 2: Извлечение совпадений

```javascript
const str = "The rain in Spain stays mainly in the plain.";
const regex = /ain/g;
console.log(str.match(regex)); // ["ain", "ain", "ain"]
```

### Пример 3: Замена текста

```javascript
const str = "I like apples";
const regex = /apples/;
console.log(str.replace(regex, "oranges")); // "I like oranges"
```

### Пример 4: Разделение строки

```javascript
const str = "apple,banana,cherry";
const regex = /,/;
console.log(str.split(regex)); // ["apple", "banana", "cherry"]
```

---

##  Итог

- Регулярные выражения можно создавать с помощью литералов (`/шаблон/`) и конструктора (`new RegExp()`).
- Литералы удобны для статических шаблонов, конструктор — для динамических.
- Регулярные выражения применяются для поиска, проверки, замены и разбиения строк.
- Практика с разными способами создания — залог уверенного владения инструментом!


##  ЗАДАЧИ

Задачи по теме `создание регулярных выражений в JavaScript`:

---

###  Задача 1: Проверить наличие слова
Проверьте, содержит ли строка слово "cat" (без учета регистра), используя литерал регулярного выражения.
<details><summary> Решение</summary>

```javascript
const str = "My cat is sleeping.";
const regex = /cat/i;
console.log(regex.test(str)); // true
```
</details>

---

###  Задача 2: Динамический шаблон
Пусть переменная `word = "dog"`. Создайте регулярное выражение для поиска этого слова в строке (без учета регистра), используя конструктор.
<details><summary> Решение</summary>

```javascript
const word = "dog";
const regex = new RegExp(word, "i");
console.log(regex.test("A big Dog!")); // true
```
</details>

---

###  Задача 3: Найти все числа
Дана строка: `"В 2020 году было 366 дней, а в 2021 — 365."`. С помощью литерала регулярного выражения найдите все числа.
<details><summary> Решение</summary>

```javascript
const str = "В 2020 году было 366 дней, а в 2021 — 365.";
const regex = /\d+/g;
console.log(str.match(regex)); // ["2020", "366", "2021", "365"]
```
</details>

---

###  Задача 4: Замена всех пробелов на тире
С помощью конструктора RegExp замените все пробелы в строке на тире.
<details><summary> Решение</summary>

```javascript
const str = "a b c d";
const regex = new RegExp(" ", "g");
console.log(str.replace(regex, "-")); // "a-b-c-d"
```
</details>

---

###  Задача 5: Разделить строку по точке с запятой
Разделите строку `"apple;banana;cherry"` на массив с помощью литерала регулярного выражения.
<details><summary> Решение</summary>

```javascript
const str = "apple;banana;cherry";
const regex = /;/;
console.log(str.split(regex)); // ["apple", "banana", "cherry"]
```
</details>

---

 Продолжайте тренироваться — и регулярные выражения станут вашим надежным инструментом! 

--- 