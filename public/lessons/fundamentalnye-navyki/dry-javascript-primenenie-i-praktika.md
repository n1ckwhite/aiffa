#  Принцип DRY и его применение в JavaScript

##  Что такое DRY и зачем он нужен?

**DRY (Don't Repeat Yourself — «Не повторяйся»)** — это принцип программирования, который гласит: не допускайте дублирования информации и логики в коде. Каждый фрагмент знаний или бизнес-логики должен быть реализован только в одном месте. Это делает код проще для понимания, сопровождения и тестирования, а также снижает вероятность ошибок.

---

##  Как применять DRY в JavaScript

1. **Функции и методы**
   - Выносите повторяющийся код в отдельные функции. Это облегчает переиспользование и изменение логики.
   ```javascript
   function calculateArea(width, height) {
       return width * height;
   }
   const area1 = calculateArea(5, 10);
   const area2 = calculateArea(3, 7);
   ```
2. **Объектно-ориентированное программирование**
   - Используйте классы и объекты для объединения общих свойств и методов.
   ```javascript
   class Shape {
       constructor(width, height) {
           this.width = width;
           this.height = height;
       }
       area() {
           return this.width * this.height;
       }
   }
   const rectangle = new Shape(5, 10);
   const square = new Shape(4, 4);
   ```
3. **Модули и библиотеки**
   - Выделяйте повторяющийся код в отдельные модули или библиотеки для переиспользования в разных частях приложения.
   ```javascript
   // dateUtils.js
   export function formatDate(date) {
       return date.toISOString().split('T')[0];
   }
   // main.js
   import { formatDate } from './dateUtils.js';
   const today = new Date();
   console.log(formatDate(today));
   ```
4. **Шаблоны и компоненты**
   - В современных фреймворках (React, Vue) используйте переиспользуемые компоненты для UI.
   ```javascript
   function Button({ label }) {
       return `<button>${label}</button>`;
   }
   const button1 = Button({ label: 'Save' });
   const button2 = Button({ label: 'Cancel' });
   ```
5. **Конфигурация и параметры**
   - Используйте переменные и конфигурационные файлы вместо жёстко закодированных значений.
   ```javascript
   const config = {
       apiUrl: 'https://api.example.com',
       timeout: 5000,
   };
   function fetchData(endpoint) {
       return fetch(`${config.apiUrl}/${endpoint}`, { timeout: config.timeout });
   }
   ```
6. **Рефакторинг и тесты**
   - Регулярно ищите и устраняйте дублирование, покрывайте функции тестами, чтобы убедиться, что изменения не ломают логику.

---

##  Почему важно следовать DRY?

- **Проще поддерживать**: Изменения вносятся в одном месте, что снижает риск ошибок.
- **Меньше багов**: Дублирование — частый источник расхождений и багов.
- **Быстрее развитие**: Код становится компактнее, легче масштабируется и тестируется.
- **Легче работать в команде**: Все знают, где искать и менять бизнес-логику.

---

##  Итог

- DRY — это про чистоту, гибкость и надёжность кода.
- Следуйте принципу DRY, чтобы делать проекты проще в поддержке и развитии.
- Любое дублирование — повод задуматься о рефакторинге!

##  ЗАДАЧИ

Задачи по теме `применения DRY в JavaScript`:

---

###  Задача 1: Устраните дублирование в функциях
Дан код:
```javascript
function greetMorning(name) {
    return 'Доброе утро, ' + name + '!';
}
function greetEvening(name) {
    return 'Добрый вечер, ' + name + '!';
}
```
Сделайте код соответствующим принципу DRY.
<details>
<summary> Решение</summary>

```javascript
function greet(timeOfDay, name) {
    return `Добрый ${timeOfDay}, ${name}!`;
}
```
</details>

---

###  Задача 2: Вынесите повторяющийся код в функцию
В коде ниже повторяется логика подсчёта площади:
```javascript
const area1 = 5 * 10;
const area2 = 3 * 7;
```
Как сделать код лучше?
<details>
<summary> Решение</summary>

```javascript
function calculateArea(width, height) {
    return width * height;
}
const area1 = calculateArea(5, 10);
const area2 = calculateArea(3, 7);
```
</details>

---

###  Задача 3: Используйте компонент вместо копирования разметки
В приложении на React есть два похожих блока:
```javascript
<div className="alert">Ошибка!</div>
<div className="alert">Успех!</div>
```
Как сделать код более DRY?
<details>
<summary> Решение</summary>

```javascript
function Alert({ message }) {
    return <div className="alert">{message}</div>;
}
// <Alert message="Ошибка!" />
// <Alert message="Успех!" />
```
</details>

---

###  Задача 4: Используйте конфигурацию вместо жёстко закодированных значений
В коде несколько раз встречается строка 'https://api.example.com'. Как поступить по DRY?
<details>
<summary> Решение</summary>

```javascript
const API_URL = 'https://api.example.com';
function fetchData(endpoint) {
    return fetch(`${API_URL}/${endpoint}`);
}
```
</details>

---

###  Задача 5: Устраните дублирование в тестах
В тестах повторяется подготовка одинаковых данных:
```javascript
const user = { name: 'Anna', age: 25 };
// ...тест 1
const user = { name: 'Anna', age: 25 };
// ...тест 2
```
Как сделать код лучше?
<details>
<summary> Решение</summary>

```javascript
const user = { name: 'Anna', age: 25 };
// ...тест 1
// ...тест 2
```
</details>

---

###  Задача 6: Найдите дублирование в проекте
Опишите два признака, что в проекте нарушается принцип DRY.
<details>
<summary> Решение</summary>

1. Одинаковые фрагменты кода встречаются в разных файлах или функциях.
2. Изменения в бизнес-логике приходится вносить в нескольких местах.
```
</details>

---

 Практикуйте DRY — и ваши проекты станут чище, гибче и удобнее для развития!

--- 