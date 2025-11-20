#  Использование итератора в JavaScript

## Как работает `Symbol.iterator`

Каждый итерируемый объект в JavaScript должен реализовать специальный метод с ключом `Symbol.iterator`. Этот метод возвращает **итератор** — объект с методом `next()`, который будет вызываться при каждой итерации.

```javascript
const iterableObject = {
  [Symbol.iterator]() {
    let step = 0;
    return {
      next() {
        step++;
        if (step === 1) return { value: 'Привет', done: false };
        if (step === 2) return { value: 'мир', done: false };
        return { done: true };
      }
    };
  }
};

for (const word of iterableObject) {
  console.log(word); // Привет, мир
}
```

---

## Создание собственных итерируемых структур

Вы можете превращать любой объект в итерируемый, реализовав `Symbol.iterator`. Это особенно полезно для своих структур данных, которые должны вести себя «как массивы».

```javascript
const range = {
  start: 1,
  end: 5,
  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;
    return {
      next() {
        if (current <= end) {
          return { value: current++, done: false };
        } else {
          return { done: true };
        }
      }
    };
  }
};

for (const num of range) {
  console.log(num); // 1 2 3 4 5
}
```

---

## Практическое применение

###  1. Фильтрация данных вручную

Можно обрабатывать только нужные значения, создавая свой фильтр внутри итератора:

```javascript
const evenNumbers = {
  from: 1,
  to: 10,
  [Symbol.iterator]() {
    let current = this.from;
    const to = this.to;
    return {
      next() {
        while (current <= to) {
          const value = current++;
          if (value % 2 === 0) {
            return { value, done: false };
          }
        }
        return { done: true };
      }
    };
  }
};

for (const n of evenNumbers) {
  console.log(n); // 2 4 6 8 10
}
```

---

###  2. Совмещение с другими API

Итераторы можно использовать с любыми механизмами, которые принимают итерируемые объекты:

* Spread: `[...myIterator]`
* `Array.from(myIterator)`
* Деструктуризация

```javascript
const iterable = {
  [Symbol.iterator]() {
    let i = 0;
    return {
      next() {
        return i < 3 ? { value: i++, done: false } : { done: true };
      }
    };
  }
};

console.log([...iterable]); // [0, 1, 2]
```

---

## Рекурсивные итерируемые объекты

Можно создавать итерируемые структуры, которые **вложены** друг в друга:

```javascript
const tree = {
  value: 1,
  children: [
    { value: 2 },
    {
      value: 3,
      children: [
        { value: 4 },
        { value: 5 }
      ]
    }
  ],
  [Symbol.iterator]() {
    const stack = [this];
    return {
      next() {
        if (stack.length === 0) return { done: true };
        const node = stack.pop();
        if (node.children) {
          for (let i = node.children.length - 1; i >= 0; i--) {
            stack.push(node.children[i]);
          }
        }
        return { value: node.value, done: false };
      }
    };
  }
};

for (const v of tree) {
  console.log(v); // 1, 2, 3, 4, 5
}
```

---

## Ручная итерация

Иногда бывает полезно вызывать `next()` вручную, например, для пошаговой отладки или при особых условиях:

```javascript
const iterator = ['a', 'b', 'c'][Symbol.iterator]();

console.log(iterator.next().value); // a
console.log(iterator.next().value); // b
// какие-то другие действия...
console.log(iterator.next().value); // c
```

---

## Объединение итераторов

Можно объединять несколько итераторов в один:

```javascript
function* combine(...iterables) {
  for (const iterable of iterables) {
    yield* iterable;
  }
}

const a = [1, 2];
const b = 'XY';

for (const val of combine(a, b)) {
  console.log(val); // 1, 2, 'X', 'Y'
}
```

---

##  Итог

Использование итераторов в JavaScript выходит далеко за рамки перебора массивов. Это мощный инструмент:

* для построения сложных коллекций,
* пошагового управления итерацией,
* фильтрации и трансформации данных,
* ленивых вычислений,
* и многого другого.

---

##  ЗАДАЧИ
Задачи по теме `Использование итератора`

---

Отлично! Вот переработанные задачи с ошибками и **расширенным описанием решения**, которое показывается при раскрытии `<details>`. Каждая задача теперь содержит не просто код-решение, а **объяснение, почему так работает** и как правильно.

---

###  **Задача 5: Ошибка в `this` внутри итератора**

 Что выведет код? И почему?

```javascript
const range = {
  from: 1,
  to: 3,
  [Symbol.iterator]() {
    let current = this.from;
    return {
      next() {
        if (current <= this.to) {
          return { value: current++, done: false };
        }
        return { done: true };
      }
    };
  }
};

for (const num of range) {
  console.log(num);
}
```

<details>
<summary> Вывод и решение</summary>

```
Uncaught TypeError: Cannot read properties of undefined (reading 'to')
```

**Проблема:**
Метод `next()` вызывается из внутреннего объекта, и в нём `this` больше не указывает на объект `range`, а на сам итератор.

**Решение:**
Нужно сохранить значение `this.to` в отдельную переменную.

```
[Symbol.iterator]() {
  let current = this.from;
  const to = this.to; // сохраняем нужное значение
  return {
    next() {
      if (current <= to) {
        return { value: current++, done: false };
      }
      return { done: true };
    }
  };
}
```

Это стандартная ошибка при использовании `this` внутри вложенных объектов.

</details>

---

###  **Задача 6: Отсутствует `done: true`**

 Что произойдёт при запуске?

```javascript
const loop = {
  [Symbol.iterator]() {
    let i = 0;
    return {
      next() {
        return { value: i++ }; // нет done
      }
    };
  }
};

for (const val of loop) {
  console.log(val);
}
```

<details>
<summary> Вывод и решение</summary>

```
Бесконечный цикл!
```

**Проблема:**
Итератор не сообщает, когда нужно остановиться — отсутствует ключ `done: true`.
По умолчанию `done === false`, и `for...of` идёт в бесконечность.

**Решение:**

Добавьте условие и явно укажите завершение:

```javascript
const loop = {
  [Symbol.iterator]() {
    let i = 0;
    return {
      next() {
        if (i < 5) {
          return { value: i++, done: false };
        }
        return { done: true };
      }
    };
  }
};
```

Никогда не забывайте `done`, особенно если итератор вручную реализован.

</details>

---

###  **Задача 7: Вложенная итерация без `yield*`**

 Что выведет этот код?

```javascript
function* outer() {
  yield 1;
  yield [2, 3];
  yield 4;
}

for (const val of outer()) {
  console.log(val);
}
```

<details>
<summary> Вывод и решение</summary>

```
1
[2, 3]
4
```

**Пояснение:**
Функция-генератор просто возвращает массив `[2, 3]` как единое значение, **не разворачивая его** в отдельные элементы.

**Чтобы "вставить" итератор внутрь другого — используйте `yield*`:**

```javascript
function* outer() {
  yield 1;
  yield* [2, 3]; // развернёт элементы массива
  yield 4;
}
```

`yield*` делегирует выполнение другому итерируемому объекту.

</details>

---

###  **Задача 8: Итератор без `next()`**

 Что произойдёт при выполнении?

```javascript
const broken = {
  [Symbol.iterator]() {
    return {
      notNext() {
        return { value: 42, done: false };
      }
    };
  }
};

for (const val of broken) {
  console.log(val);
}
```

<details>
<summary> Вывод и решение</summary>

```
Uncaught TypeError: result.next is not a function
```

**Проблема:**
Итератор должен реализовывать метод `next()`. Если его нет — `for...of` не сможет итерировать.

**Правильный формат:**

```javascript
const correct = {
  [Symbol.iterator]() {
    let i = 0;
    return {
      next() {
        return i < 3 ? { value: i++, done: false } : { done: true };
      }
    };
  }
};
```

Всегда проверяйте, что возвращаемый объект действительно реализует `next()`.

</details>

---

Отлично! Вот подборка **задач по теме итераторов**, оформленных в твоём стиле с базой `.md`. Каждая задача построена для закрепления материала о `Symbol.iterator`, ручной итерации, кастомных итерируемых объектов и взаимодействии с `for...of`.

---

###  Задача 9: Ручной вызов `iterator.next()`

 Что выведет этот код?

```javascript
const iterator = ['a', 'b'][Symbol.iterator]();

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
```

<details>
<summary> Вывод</summary>

```
{ value: 'a', done: false }
{ value: 'b', done: false }
{ value: undefined, done: true }
```

Это происходит потому, что `Symbol.iterator()` возвращает объект, который поочерёдно выдаёт элементы массива.

</details>

---

###  Задача 10: Кастомный итерируемый объект

 Что выведет этот код?

```javascript
const counter = {
  from: 1,
  to: 3,
  [Symbol.iterator]() {
    let current = this.from;
    return {
      next: () => {
        if (current <= this.to) {
          return { value: current++, done: false };
        }
        return { done: true };
      }
    };
  }
};

for (const value of counter) {
  console.log(value);
}
```

<details>
<summary> Вывод</summary>

```
1
2
3
```

Цикл `for...of` работает с объектом `counter`, потому что он реализует `Symbol.iterator`, возвращая объект с методом `next()`.

</details>

---


 Эти задачи помогут закрепить внимание к деталям, избежать типичных ошибок и уверенно работать с итераторами.
