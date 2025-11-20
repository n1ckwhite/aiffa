#  `this` в стрелочных функциях: как это работает и в чём отличия

Контекст `this` — одно из самых обсуждаемых понятий в JavaScript. Особенно интересно посмотреть, как он работает в **стрелочных функциях** по сравнению с обычными.

##  `this` в обычных функциях

У обычных функций `this` зависит от **контекста вызова**:

#### 1. Вызов напрямую
```js
function showThis() {
    console.log(this);
}
showThis(); // В браузере: Window (в Node.js: global)
```

#### 2. Вызов как метод объекта
```js
const obj = {
    value: 42,
    showValue: function() {
        console.log(this.value);
    }
};
obj.showValue(); // 42
```

#### 3. Использование в конструкторе
```js
function Person(name) {
    this.name = name;
}
const john = new Person('John');
console.log(john.name); // John
```

#### 4. Явное указание контекста через `call`, `apply`, `bind`
```js
function greet() {
    console.log(this.name);
}
const user = { name: 'Alice' };
greet.call(user); // Alice
```

---

##  `this` в стрелочных функциях

Стрелочные функции **не создают свой собственный `this`**. Вместо этого они **захватывают `this` из окружающего лексического контекста**, т.е. оттуда, где были объявлены.

### Пример:
```js
const obj = {
    value: 42,
    showValue: function() {
        setTimeout(() => {
            console.log(this.value); // `this` указывает на `obj`
        }, 1000);
    }
};
obj.showValue(); // 42
```

---

##  Ключевые отличия

| Особенность                        | Обычные функции                          | Стрелочные функции                         |
|-----------------------------------|------------------------------------------|--------------------------------------------|
| Как определяется `this`           | Зависит от **контекста вызова**          | **Лексически** — при определении функции   |
| Свой `this`                       | Да                                       | Нет                                        |
| Использование в объектах          | Подходит                                 | Нежелательно, может вести к ошибкам        |
| Удобство в коллбэках и асинхроне | Могут требовать `bind` или сохранение `this` | Упрощают сохранение контекста              |

---

##  Важно помнить

Стрелочные функции **неподходящие как методы объекта**, если вам нужен доступ к `this` этого объекта.

####  Неправильно:
```js
const obj = {
    value: 42,
    showValue: () => {
        console.log(this.value);
    }
};
obj.showValue(); // undefined (или ошибка в strict mode)
```

---

##  Итог

- Стрелочные функции **наследуют `this`** из окружающего контекста.
- Это делает их идеальными для **вложенных функций**, **асинхронных вызовов** (`setTimeout`, `Promise`, события и т.д.).
- Но они **не годятся** в качестве методов объекта, если вы хотите, чтобы `this` ссылался на сам объект.

---

##  ЗАДАЧИ

---

###  Задача 1: Контекст в обычной функции
 Пойми, что происходит при вызове обычной функции вне объекта.

```javascript
function showThis() {
    console.log(this);
}
showThis();
```

<details>
<summary> Вывод</summary>

```
В браузере — window, в Node.js — global.
```

Объяснение:

Когда функция вызывается без объекта, она выполняется в глобальном контексте. `this` ссылается на глобальный объект, если не используется строгий режим `'use strict'`.

</details>

---

###  Задача 2: Метод объекта
 Проверь, как `this` работает при вызове метода через объект.

```javascript
const user = {
    name: 'Alice',
    greet: function() {
        console.log(`Hello, ${this.name}`);
    }
};
user.greet();
```

<details>
<summary> Вывод</summary>

```javascript
Hello, Alice
```

Объяснение:

Метод вызывается через объект `user.greet()`, значит `this` внутри метода указывает на объект `user`.

</details>

---

###  Задача 3: Стрелочная функция внутри метода
 Разберись, как стрелочные функции захватывают `this` из окружающего контекста.

```javascript
const user = {
    name: 'Bob',
    greet: function() {
        const sayHi = () => {
            console.log(this.name);
        };
        sayHi();
    }
};
user.greet();
```

<details>
<summary> Вывод</summary>

```javascript
Bob
```

Объяснение:

Стрелочная функция не имеет своего`this`, она захватывает его из внешнего контекста, а в данном случае это обычный метод объекта, где `this` — это user.

</details>

---

###  Задача 4: Потеря контекста
 Узнай, что произойдёт, если метод объекта передать как обычную функцию.

```javascript
const person = {
    name: 'Eva',
    sayName: function() {
        console.log(this.name);
    }
};

const say = person.sayName;
say(); // ?
```

<details>
<summary> Вывод</summary>

```javascript
undefined
```

Объяснение:

Метод `sayName` был присвоен переменной и вызван вне объекта, потеряв связанный с ним контекст.
`this` теперь указывает на глобальный объект `или undefined` в `'strict mode'`.
</details>

---

###  Задача 5: bind и стрелочные функции
 Проверь, работает ли bind для стрелочной функции.

```javascript
const obj = {
    value: 100,
    method: () => {
        console.log(this.value);
    }
};

const bound = obj.method.bind({ value: 200 });
bound(); // ?
```

<details>
<summary> Вывод</summary>

```javascript
undefined
```

Объяснение:

Стрелочные функции игнорируют `bind`, `call`, `apply` — их `this` берётся из места, где они были объявлены.
Здесь `this` не указывает на `obj`.
</details>

---

###  Задача 6: setTimeout и стрелочная функция
 Проверь, как стрелочные функции помогают сохранить контекст в асинхронном коде.

```javascript
const counter = {
    count: 0,
    increment() {
        setTimeout(() => {
            this.count++;
            console.log(this.count);
        }, 100);
    }
};
counter.increment();
```

<details>
<summary> Вывод</summary>

```javascript
1
```

Объяснение:

Стрелочная функция внутри `setTimeout` захватывает `this` из метода `increment`, где `this` указывает на` counter`.
</details>

---

###  Задача 7: Стрелочные функции как методы
Найди ошибку при использовании стрелочной функции как метода объекта.

```javascript
const calculator = {
    value: 10,
    add: () => {
        console.log(this.value + 5);
    }
};
calculator.add();
```

<details>
<summary> Вывод</summary>

```
NaN (или undefined + 5)
```

Объяснение:

Метод задан стрелочной функцией, которая не захватывает `this` из объекта `calculator`, а берёт его из глобальной области (где `value` не определено).
</details>

---

###  Задача 8: Вложенные функции и this
 Объясни, почему обычная вложенная функция не видит значение из родительского метода.

```javascript
const obj = {
    x: 42,
    outer() {
        function inner() {
            console.log(this.x);
        }
        inner();
    }
};
obj.outer();
```

<details>
<summary> Вывод</summary>

```javascript
undefined
```

Объяснение:

`inner` — обычная функция, вызванная без объекта, `this` — глобальный объект.
Чтобы исправить, можно:

- сделать `inner` стрелочной функцией
- использовать `.bind(this)`
- сохранить `const self = this`
</details>

---

###  Задача 9: Передача метода без контекста
 Найди способ сохранить `this` при передаче метода в `setTimeout`.

```javascript
const user = {
    name: 'Mike',
    logName() {
        console.log(this.name);
    }
};

setTimeout(user.logName, 1000);
```

<details>
<summary> Вывод</summary>

```javascript
undefined
```

Объяснение:

Метод `logName` теряет контекст при передаче в `setTimeout`. `this` больше не указывает на `user`.

Варианты решения:
- `setTimeout(user.logName.bind(user), 1000);`
-  `setTimeout(() => user.logName(), 1000);`
</details>

---

###  Задача 10: Почини стрелочную функцию в методе
 Найди способ сохранить `this` при передаче метода в `setTimeout`.

Нужно получить `Hello, Anna`

```javascript
const user = {
    name: 'Anna',
    greet: () => {
        console.log(`Hello, ${this.name}`);
    }
};
user.greet();
```

<details>
<summary> Решение</summary>

- Использовать обычную функцию
```javascript
const user = {
    name: 'Anna',
    greet() {
        console.log(`Hello, ${this.name}`);
    }
};

user.greet(); // Hello, Anna
```

- Обернуть в стрелочную функцию, но не сам метод
```javascript
const user = {
    name: 'Anna',
    greet() {
        const sayHello = () => {
            console.log(`Hello, ${this.name}`);
        };
        sayHello();
    }
};

user.greet(); // Hello, Anna

```

</details>

---

###  Задача 11: Почини стрелочную функцию в методе
Убедись, что метод работает правильно, даже когда передан как колбэк.

```javascript
const person = {
    age: 30,
    showAge() {
        console.log(this.age);
    }
};

// Нужно исправить:
setTimeout(person.showAge, 1000);
```

<details>
<summary> Решение</summary>

```javascript
setTimeout(() => person.showAge(), 1000);
// или
setTimeout(person.showAge.bind(person), 1000);

```
</details>

---

 Эти задачи помогут на практике разобраться, как работает `this` в стрелочных функциях, и почувствовать разницу между ними и обычными функциями — особенно в методах объектов, колбэках и асинхронном коде.

---
