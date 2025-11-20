#  Пример упрощения кода на JavaScript с помощью принципа KISS

##  Как KISS помогает упростить реальный код?

Рассмотрим пример функции, которая определяет, является ли число чётным или нечётным, и выводит соответствующее сообщение.

---

### Исходный код (сложный)

```javascript
function checkEvenOdd(num) {
    if (typeof num !== 'number') {
        return 'Input is not a number';
    } else {
        if (num % 2 === 0) {
            return 'The number is even';
        } else {
            return 'The number is odd';
        }
    }
}
console.log(checkEvenOdd(4)); // The number is even
console.log(checkEvenOdd(5)); // The number is odd
console.log(checkEvenOdd('a')); // Input is not a number
```

---

### Упрощённый код (с использованием KISS)

```javascript
function checkEvenOdd(num) {
    if (typeof num !== 'number') {
        return 'Input is not a number';
    }
    return num % 2 === 0 ? 'The number is even' : 'The number is odd';
}
console.log(checkEvenOdd(4)); // The number is even
console.log(checkEvenOdd(5)); // The number is odd
console.log(checkEvenOdd('a')); // Input is not a number
```

---

##  Объяснение изменений

1. **Устранение лишних вложенных условий**: Вместо двух уровней вложенности `if` используется тернарный оператор для определения чётности числа. Это делает код короче и легче воспринимаемым.
2. **Сохранение проверки типа**: Проверка на тип входного значения сохранена для корректной работы функции.
3. **Читаемость**: Код стал более линейным и простым для понимания, что соответствует принципу KISS.

---

##  Итог

- Принцип KISS помогает упростить код без потери функциональности.
- Простые решения делают код легче для поддержки и тестирования.
- Всегда ищите возможность сделать код короче и понятнее!

##  ЗАДАЧИ

Задачи по теме `упрощение кода с помощью KISS`:

---

###  Задача 1: Упростите функцию проверки делимости
Дан код:
```javascript
function isDivisibleByThree(num) {
    if (typeof num !== 'number') {
        return false;
    } else {
        if (num % 3 === 0) {
            return true;
        } else {
            return false;
        }
    }
}
```
Сделайте его проще, следуя принципу KISS.
<details>
<summary> Решение</summary>

```javascript
function isDivisibleByThree(num) {
    return typeof num === 'number' && num % 3 === 0;
}
```
</details>

---

###  Задача 2: Упростите обработку массива
Дан код:
```javascript
const arr = [1, 2, 3, 4, 5];
let result = [];
for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) {
        result.push(arr[i] * 10);
    }
}
```
Упростите его с помощью стандартных методов массива.
<details>
<summary> Решение</summary>

```javascript
const result = arr.filter(n => n % 2 === 0).map(n => n * 10);
```
</details>

---

###  Задача 3: Минимизируйте дублирование в функции приветствия
Дан код:
```javascript
function sayHelloToAnna() {
    return 'Hello, Anna!';
}
function sayHelloToIvan() {
    return 'Hello, Ivan!';
}
```
Сделайте код проще и универсальнее.
<details>
<summary> Решение</summary>

```javascript
function sayHello(name) {
    return `Hello, ${name}!`;
}
```
</details>

---

###  Задача 4: Уберите лишние проверки
Дан код:
```javascript
function getStatus(isActive) {
    if (isActive === true) {
        return 'Active';
    } else {
        return 'Inactive';
    }
}
```
Упростите функцию.
<details>
<summary> Решение</summary>

```javascript
function getStatus(isActive) {
    return isActive ? 'Active' : 'Inactive';
}
```
</details>

---

 Практикуйте KISS — и ваш код всегда будет радовать вас и коллег своей чистотой и простотой!

--- 