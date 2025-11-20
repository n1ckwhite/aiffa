#  Операторы сравнения

Они **сравнивают два значения** и возвращают булево значение:

* `true`, если условие сравнения выполняется
* `false`, если нет

---

## Таблица операторов сравнения

| Оператор | Назначение                             | Пример        | Результат |
| -------- | -------------------------------------- | ------------- | --------- |
| `==`     | Равно (не строго, с приведением типов) | `5 == '5'`    | `true`    |
| `===`    | Строго равно (без приведения типов)    | `5 === '5'`   | `false`   |
| `!=`     | Не равно (не строго)                   | `0 != false`  | `false`   |
| `!==`    | Строго не равно                        | `0 !== false` | `true`    |
| `>`      | Больше                                 | `10 > 7`      | `true`    |
| `<`      | Меньше                                 | `3 < 5`       | `true`    |
| `>=`     | Больше или равно                       | `5 >= 5`      | `true`    |
| `<=`     | Меньше или равно                       | `2 <= 3`      | `true`    |

---

## Подробные примеры

###  1. `==` (нестрогое равенство)

```javascript
console.log('5' == 5);          // true  — строка '5' приводится к числу
console.log(null == undefined); // true  — специальный случай
console.log(false == 0);        // true  — false становится 0
```

###  2. `===` (строгое равенство)

```javascript
console.log('5' === 5);          // false — разные типы
console.log(null === undefined); // false
console.log(true === 1);         // false
```

###  3. `!=` (нестрогое неравенство)

```javascript
console.log(5 != '5');     // false — равны после преобразования
console.log(null != undefined); // false — равны
```

###  4. `!==` (строгое неравенство)

```javascript
console.log(5 !== '5');         // true  — разные типы
console.log(null !== undefined); // true
```

###  5. `>` и `<`

```javascript
console.log(10 > 5);      // true
console.log('a' > 'b');   // false — лексикографическое сравнение
```

###  6. `>=` и `<=`

```javascript
console.log(5 >= 5);      // true
console.log(2 <= 1);      // false
```

---

##  Важные нюансы

* **Нестрогие операторы (`==`, `!=`)** выполняют **преобразование типов** — это может приводить к неожиданным результатам.
* **Строгие операторы (`===`, `!==`)** сравнивают **и значение, и тип**.
* При работе с `null` и `undefined`:

    * `null == undefined` → `true`
    * `null === undefined` → `false`

---

##  Рекомендации

* Используйте **строгие операторы** (`===` и `!==`) по умолчанию.
* Избегайте `==` и `!=`, если только вы **осознанно** не хотите неявного преобразования типов.
* Проверяйте типы явно, если поведение критично.

---

##  Итог

* Операторы сравнения позволяют сравнивать значения и возвращают логический результат: `true` или `false`.
* В JavaScript есть **строгие (`===`, `!==`)** и **нестрогие (`==`, `!=`)** операторы.
  Строгие сравнивают **и значение, и тип**, нестрогие — **только значение** (с приведением типов).
* Сравнение чисел, строк, `null`, `undefined`, `boolean` и других типов может иметь **особенности**, особенно при нестрогом сравнении.
* **Рекомендуется** по умолчанию использовать **строгие операторы**, чтобы избежать ошибок, связанных с неявным преобразованием типов.
* Операторы `>`, `<`, `>=`, `<=` сравнивают значения чисел и строк (лексикографически).

---

##  ЗАДАЧИ

Задачи по теме `Операторы сравнения`

---

###  Задача 1: Строгое и нестрогое сравнение

Проверьте разницу между `==` и `===` при сравнении чисел, строк и логических значений.

```javascript
console.log(0 == false);  
console.log(0 === false); 
console.log('' == false); 
console.log('' === false);
```

<details>
<summary> Вывод</summary>

```javascript
console.log(0 == false);   // true — false преобразуется в 0
console.log(0 === false);  // false — типы разные (number и boolean)
console.log('' == false);  // true — пустая строка приводится к false
console.log('' === false); // false — типы разные
```

`==` выполняет приведение типов, `===` — нет.

</details>

---

###  Задача 2: Сравнение строк

Сравнение строк в JavaScript происходит посимвольно по Unicode. Проверьте результат.

```javascript
console.log('apple' > 'banana'); 
console.log('abc' < 'abd');      
console.log('2' > '12');         
```

<details>
<summary> Вывод</summary>

```javascript
console.log('apple' > 'banana'); // false — 'a' < 'b'
console.log('abc' < 'abd');      // true  — 'c' < 'd'
console.log('2' > '12');         // true  — '2' > '1' при лексикографическом сравнении
```

Строки сравниваются не как числа, а как последовательность символов.

</details>

---

###  Задача 3: Сравнение с `null`

Изучите, как `null` ведёт себя при сравнении с числом и при равенстве.

```javascript
console.log(null == 0);  
console.log(null > 0);   
console.log(null >= 0);  
```

<details>
<summary> Вывод</summary>

```javascript
console.log(null == 0);  // false — null равен только undefined
console.log(null > 0);   // false — null преобразуется в 0, но 0 > 0 — false
console.log(null >= 0);  // true  — 0 >= 0 — true
```

Поведение `null` в сравнении и равенстве отличается — это часто вызывает ошибки.

</details>

---

###  Задача 4: Сравнение с `undefined`

Проверьте поведение `undefined` при сравнении с числом.

```javascript
console.log(undefined == 0);  
console.log(undefined > 0);   
console.log(undefined < 0);   
```

<details>
<summary> Вывод</summary>

```javascript
console.log(undefined == 0);  // false — undefined равен только null
console.log(undefined > 0);   // false — undefined → NaN → сравнение с числом = false
console.log(undefined < 0);   // false — то же самое
```

`undefined` при сравнении с числами превращается в `NaN`, а `NaN` не даёт true ни в одном сравнении.

</details>

---

###  Задача 5: Undefined и Null

Сравните `undefined` и `null` и изучите типы данных.

```javascript
let a;
let b = null;

console.log(a == b);  
console.log(a === b); 
console.log(typeof a); 
console.log(typeof b); 
```

<details>
<summary> Вывод</summary>

```javascript
console.log(a == b);    // true — оба считаются "пустыми"
console.log(a === b);   // false — типы разные
console.log(typeof a);  // "undefined"
console.log(typeof b);  // "object" — историческая особенность JavaScript
```

`null` и `undefined` равны только при нестрогом сравнении. `typeof null` — "object".

</details>

---

###  Задача 6: Работа с Symbol

Создайте два уникальных символа с одинаковым описанием и сравните их.

```javascript
const obj1 = {};
const obj2 = {};

const id1 = Symbol("id");
const id2 = Symbol("id");

obj1[id1] = "Object 1";
obj2[id2] = "Object 2";

console.log(id1 === id2); 
console.log(obj1[id1]);   
console.log(obj2[id2]);   
```

<details>
<summary> Решение</summary>

```javascript
console.log(id1 === id2); // false — Symbol всегда уникален
console.log(obj1[id1]);   // "Object 1"
console.log(obj2[id2]);   // "Object 2"
```

Даже с одинаковым описанием, `Symbol("id") !== Symbol("id")`.

</details>

---

###  Задача 7: Логика в `if`

Проверьте, выполнится ли блок `if`, если условие — непустая строка `"0"`.

```javascript
if ("0") {
  console.log("Выполнится?");
} else {
  console.log("Не выполнится?");
}
```

<details>
<summary> Вывод</summary>

```javascript
// Выполнится
```

Непустая строка `"0"` — **truthy**, значит `if` сработает.

</details>

---

###  Задача 8: Сравнение объектов

Проверьте, равны ли два объекта с одинаковыми значениями, но созданные отдельно.

```javascript
const obj1 = { value: 10 };
const obj2 = { value: 10 };

console.log(obj1 == obj2);  
console.log(obj1 === obj2); 
```

<details>
<summary> Вывод</summary>

```javascript
console.log(obj1 == obj2);  // false — разные ссылки в памяти
console.log(obj1 === obj2); // false — идентичное поведение
```

Объекты сравниваются **по ссылке**, а не по содержимому.

</details>

---

 Эти задачи помогут вам закрепить знания об операторах сравнения, типах данных и особенностях преобразования в JavaScript.

---


