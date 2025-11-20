#  Наследование и абстрактные классы в TypeScript

**TypeScript** поддерживает объектно-ориентированные принципы, включая наследование, модификаторы доступа и абстрактные классы — во многом аналогично Java/C#. Это позволяет описывать общие контракты и переиспользовать реализацию без дублирования.

---

##  Короткое резюме
- **О чём**: классы, наследование (`extends`), `super`, модификаторы доступа, абстрактные классы (`abstract`).
- **Зачем**: выразительные доменные модели, переиспользование кода, чёткие контракты.
- **Что уметь**: проектировать иерархии, правильно переопределять методы, использовать абстракции для общих шаблонов. 

---

##  Наследование (`extends`) 
Класс-наследник расширяет базовый класс, получая его публичные и защищённые члены. Конструктор наследника вызывает конструктор базового класса через `super(...)`.

```ts
class Animal {
  constructor(public name: string) {}

  makeSound(): void {
    console.log(`${this.name} издаёт звук.`);
  }
}

class Dog extends Animal {
  constructor(name: string, public breed: string) {
    super(name); // вызов конструктора базового класса
  }

  makeSound(): void {
    console.log(`${this.name} (порода: ${this.breed}) лает.`);
  }
}

const genericAnimal = new Animal("Существо");
genericAnimal.makeSound(); // Существо издаёт звук.

const dog = new Dog("Бобик", "Дворняга");
dog.makeSound(); // Бобик (порода: Дворняга) лает.
```

###  Модификаторы доступа
- `public` — доступен везде.
- `protected` — доступен в классе и наследниках.
- `private` — доступен только внутри текущего класса.

```ts
class Parent {
  public publicProperty: string = "Доступно везде";
  protected protectedProperty: string = "Доступно в наследниках";
  private privateProperty: string = "Доступно только в этом классе";
}

class Child extends Parent {
  showProperties(): void {
    console.log(this.publicProperty);    // OK
    console.log(this.protectedProperty); // OK
    // console.log(this.privateProperty); // Ошибка
  }
}
```

###  Переопределение и вызов базового метода
Используйте ту же сигнатуру и при необходимости `super.methodName()`.

```ts
class Base {
  greet(): void {
    console.log("Привет от родителя!");
  }
}

class Derived extends Base {
  greet(): void {
    console.log("Привет от ребёнка!");
    super.greet();
  }
}

new Derived().greet();
// Привет от ребёнка!
// Привет от родителя!
```

---

##  Абстрактные классы (`abstract`) 
Абстрактный класс задаёт общий шаблон и не может быть инстанцирован напрямую. Он может содержать абстрактные методы (без реализации) и обычные методы/поля. Наследники обязаны реализовать все абстрактные методы.

```ts
abstract class Animal {
  constructor(public name: string) {}

  // абстрактный метод — реализуется в наследниках
  abstract makeSound(): void;

  // обычный метод — общий для всех
  move(): void {
    console.log(`${this.name} перемещается.`);
  }
}

class Dog extends Animal {
  constructor(name: string) { super(name); }
  makeSound(): void { console.log(`${this.name} лает.`); }
}

class Cat extends Animal {
  constructor(name: string) { super(name); }
  makeSound(): void { console.log(`${this.name} мяукает.`); }
}

const dog = new Dog("Бобик");
dog.makeSound(); // Бобик лает.
dog.move();      // Бобик перемещается.

const cat = new Cat("Мурка");
cat.makeSound(); // Мурка мяукает.
cat.move();      // Мурка перемещается.

// const a = new Animal("Существо"); // Ошибка: нельзя создать экземпляр абстрактного класса
```

###  Требования к наследникам
- Если наследник не реализует все абстрактные методы, он сам должен быть объявлен как `abstract`.

```ts
abstract class Bird extends Animal {
  // abstract makeSound(): void; // если не реализуем — класс остаётся abstract
}
```

---

##  Сравнение с интерфейсами 

| Особенность | Абстрактный класс | Интерфейс |
|------------|-------------------|-----------|
| Реализация методов | Может содержать реализацию | Не содержит реализации |
| Модификаторы доступа | Поддерживает `public/protected/private` | Всё публичное по контракту |
| Назначение | Общий шаблон + частичная реализация | Описание формы/контракта |
| Наследование/реализация | `extends` (одно базовое), `implements` | `extends` интерфейсы, `implements` классами |

 Практика: используйте интерфейсы для описания структуры данных и контрактов, а абстрактные классы — когда нужна общая реализация и единый жизненный цикл.

---

##  Распространённые ошибки и подводные камни 
- Переопределение с несовместимым типом возвращаемого значения — соблюдайте сигнатуры.
- Забыли вызвать `super(...)` в конструкторе наследника — особенно при наличии инициализации в базовом классе.
- Смешивание ролей: интерфейсы как «база поведения». Если нужна общая логика — берите абстрактный класс.

##  Итог
- Наследование через `extends` + вызовы `super` для инициализации/общей логики.
- Абстрактные классы задают общий шаблон и частичную реализацию; экземпляры создавать нельзя.
- Интерфейсы описывают форму; абстрактные классы — ещё и поведение.
- Соблюдайте сигнатуры при переопределении и используйте модификаторы доступа осознанно.

##  ЗАДАЧИ

Вот набор задач, чтобы лучше понять `наследование и абстрактные классы в TypeScript`:

---

###  Задача 1: Иерархия транспорта
 Спроектируйте абстрактный класс `Vehicle` c полями `brand`, `model` и абстрактным методом `start()`. Создайте `Car` и `Bike`, реализуйте `start()` по-разному. Добавьте общий метод `info()` в базовый класс.

```ts
// Требования:
// abstract class Vehicle { brand: string; model: string; abstract start(): void; info(): string }
// class Car extends Vehicle { start(): void { ... } }
// class Bike extends Vehicle { start(): void { ... } }
```

<details>
<summary> Решение</summary>

```ts
abstract class Vehicle {
  constructor(public brand: string, public model: string) {}
  abstract start(): void;
  info(): string { return `${this.brand} ${this.model}`; }
}

class Car extends Vehicle {
  start(): void { console.log(`${this.info()} заводится ключом `); }
}

class Bike extends Vehicle {
  start(): void { console.log(`${this.info()} запускается kick-стартером `); }
}

new Car("Toyota", "Corolla").start();
new Bike("Yamaha", "MT-07").start();
```

</details>

---

###  Задача 2: Переопределение с вызовом `super`
 Создайте базовый класс `Logger` с методом `log(message: string)`. Создайте наследника `TimestampLogger`, который добавляет время и вызывает `super.log`.

```ts
// Требования:
// class Logger { log(message: string): void { ... } }
// class TimestampLogger extends Logger { log(message: string): void { ...; super.log(...) } }
```

<details>
<summary> Решение</summary>

```ts
class Logger {
  log(message: string): void {
    console.log(`[LOG] ${message}`);
  }
}

class TimestampLogger extends Logger {
  log(message: string): void {
    const ts = new Date().toISOString();
    super.log(`${ts} — ${message}`);
  }
}

new TimestampLogger().log("Система запущена");
```

</details>

---

###  Задача 3: Абстрактный рендерер
 Создайте `abstract class Renderer` с абстрактным методом `render(data: unknown): string` и обычным методом `renderToConsole(data: unknown)`. Реализуйте `JsonRenderer` и `TableRenderer`.

```ts
// Требования:
// abstract class Renderer { abstract render(data: unknown): string; renderToConsole(data: unknown): void }
// class JsonRenderer extends Renderer { render(...) { ... } }
// class TableRenderer extends Renderer { render(...) { ... } }
```

<details>
<summary> Решение</summary>

```ts
abstract class Renderer {
  abstract render(data: unknown): string;
  renderToConsole(data: unknown): void { console.log(this.render(data)); }
}

class JsonRenderer extends Renderer {
  render(data: unknown): string { return JSON.stringify(data, null, 2); }
}

class TableRenderer extends Renderer {
  render(data: unknown): string {
    if (!Array.isArray(data)) return String(data);
    const rows = data.map((row: any) => Object.values(row).join(" | ")).join("\n");
    return rows;
  }
}

new JsonRenderer().renderToConsole({ a: 1, b: 2 });
new TableRenderer().renderToConsole([{ a: 1, b: 2 }, { a: 3, b: 4 }]);
```

</details>

---

 Эти задачи помогут закрепить наследование, модификаторы доступа, переопределение с вызовом `super`, а также проектирование и реализацию абстрактных классов.

---