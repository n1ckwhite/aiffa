#  Разделение строк с помощью регулярных выражений в JavaScript

##  Как разделить строку по шаблону?

В JavaScript для разделения строки на подстроки часто используют метод `split()`. Этот метод принимает в качестве аргумента строку-разделитель или регулярное выражение и возвращает массив подстрок. Использование регулярных выражений позволяет гибко управлять процессом разделения, учитывая разные варианты разделителей и сложные шаблоны.

---

##  Примеры использования split с регулярными выражениями

### 1. Разделение по нескольким символам
```javascript
const str = "apple,banana;orange|grape:kiwi";
const regex = /[;,|:]/;
const result = str.split(regex);
console.log(result); // ["apple", "banana", "orange", "grape", "kiwi"]
```

### 2. Разделение по пробелам, запятым и точкам с запятой
```javascript
const str = "apple, banana; orange grape";
const regex = /[ ,;]+/;
const result = str.split(regex);
console.log(result); // ["apple", "banana", "orange", "grape"]
```

### 3. Сохранение разделителей в результате
```javascript
const str = "apple, banana; orange|grape:kiwi";
const regex = /([;,|:])/;
const result = str.split(regex);
console.log(result); 
// ["apple", ",", " banana", ";", " orange", "|", "grape", ":", "kiwi"]
```

### 4. Разделение по нескольким пробелам или табуляциям
```javascript
const str = "one   two\tthree  four";
const regex = /[ \t]+/;
const result = str.split(regex);
console.log(result); // ["one", "two", "three", "four"]
```

### 5. Разделение по словам (использование границ слова)
```javascript
const str = "foo, bar! baz?";
const regex = /\W+/;
const result = str.split(regex);
console.log(result); // ["foo", "bar", "baz", ""]
```

---

##  Советы по использованию split с регулярными выражениями

- Используйте классы символов (`[]`) для задания нескольких разделителей.
- Добавляйте к шаблону квантификаторы (`+`, `*`), чтобы избежать пустых элементов в массиве.
- Если нужно сохранить разделители, используйте группы `()` в регулярном выражении.
- Тестируйте шаблоны на разных строках, чтобы убедиться в корректности разделения.
- Помните, что split не изменяет исходную строку, а возвращает новый массив.

---

##  Итог

- Метод `split()` с регулярными выражениями — мощный инструмент для обработки строк.
- Позволяет гибко разделять строки по любым шаблонам и критериям.
- Практикуйтесь с разными вариантами, чтобы уверенно использовать split в реальных задачах!

##  ЗАДАЧИ

Задачи по теме `split и разделение строк с помощью регулярных выражений`:

---

###  Задача 1: Разделить строку по запятым и точкам с запятой
Дана строка: `'red,green;blue,yellow;orange'`. Разделите её на массив цветов.
<details>
<summary> Решение</summary>

```javascript
const str = 'red,green;blue,yellow;orange';
const result = str.split(/[;,]/);
console.log(result); // [ 'red', 'green', 'blue', 'yellow', 'orange' ]
```
</details>

---

###  Задача 2: Разделить строку по пробелам и табуляциям
Дана строка: `'one\ttwo  three\tfour'`. Получите массив слов.
<details>
<summary> Решение</summary>

```javascript
const str = 'one\ttwo  three\tfour';
const result = str.split(/[ \t]+/);
console.log(result); // [ 'one', 'two', 'three', 'four' ]
```
</details>

---

###  Задача 3: Сохранить разделители в результате
Дана строка: `'cat,dog;bird|fish'`. Разделите её по запятым, точкам с запятой и вертикальным чертам, сохранив разделители.
<details>
<summary> Решение</summary>

```javascript
const str = 'cat,dog;bird|fish';
const result = str.split(/([,;|])/);
console.log(result); // [ 'cat', ',', 'dog', ';', 'bird', '|', 'fish' ]
```
</details>

---

###  Задача 4: Разделить строку по нескольким подряд идущим разделителям
Дана строка: `'a,,b;;;c|d'`. Получите массив без пустых элементов.
<details>
<summary> Решение</summary>

```javascript
const str = 'a,,b;;;c|d';
const result = str.split(/[;,|]+/);
console.log(result); // [ 'a', 'b', 'c', 'd' ]
```
</details>

---

###  Задача 5: Разделить строку на слова
Дана строка: `'Hello, world! How are you?'`. Получите массив слов без знаков препинания.
<details>
<summary> Решение</summary>

```javascript
const str = 'Hello, world! How are you?';
const result = str.split(/\W+/);
console.log(result); // [ 'Hello', 'world', 'How', 'are', 'you', '' ]
```
</details>

---

###  Задача 6: Разделить строку по числам
Дана строка: `'foo1bar2baz3qux'`. Разделите её по цифрам.
<details>
<summary> Решение</summary>

```javascript
const str = 'foo1bar2baz3qux';
const result = str.split(/\d/);
console.log(result); // [ 'foo', 'bar', 'baz', 'qux' ]
```
</details>

---

 Осваивайте split и регулярные выражения — и вы сможете быстро решать любые задачи по разбору и трансформации строк! 

--- 