#  Interface vs type в TypeScript

В TypeScript и `interface`, и `type` описывают типы. Они пересекаются по возможностям, но имеют важные отличия и типичные области применения.

---

##  Короткое резюме
- **О чём**: различия `interface` и `type`, наследование/расширение, объединения/пересечения.
- **Зачем**: выбирать подходящий инструмент для контракта API, сложных составных типов и совместимости с классами.
- **Что уметь**: расширять интерфейсы, собирать типы через `&`/`|`, осознанно использовать декларативное объединение. 

---

##  Основные отличия 

| Особенность | interface | type |
|------------|-----------|------|
| Назначение | Структуры объектов, контракты API, классы | Любые типы: объекты, примитивы, `union`, `intersection`, алиасы |
| Декларативное объединение |  Да (одно имя можно объявлять несколько раз — объединяются) |  Нет (повторное объявление — ошибка) |
| Расширение | `extends` | Пересечение `&` |
| Объединения `|` |  Не поддерживает в определении интерфейса |  Поддерживает |
| Использование с классами | `implements` поддерживается | `implements` не поддерживается напрямую (но можно пересекать с классом) |

Примечание: модификаторы доступа (`public/protected/private`) применяются в классах; в сигнатурах `interface` можно использовать `readonly`, опциональность `?`, индексные сигнатуры.

---

##  Базовые примеры 

```ts
// interface для формы объекта
interface PersonI {
  name: string;
  age: number;
}

// type как объектный тип
type PersonT = {
  name: string;
  age: number;
};

// type как алиас объединения/примитива
type ID = string | number;
```

###  Декларативное объединение (только interface)
```ts
interface Animal {
  name: string;
}

interface Animal { // объединится с предыдущим объявлением
  age: number;
}

const dog: Animal = { name: "Dog", age: 5 };
```

###  Наследование/расширение
```ts
// interface: extends
interface AnimalI { name: string }
interface DogI extends AnimalI { breed: string }

const d1: DogI = { name: "Buddy", breed: "Golden Retriever" };

// type: пересечение
type AnimalT = { name: string };
type DogT = AnimalT & { breed: string };

const d2: DogT = { name: "Buddy", breed: "Golden Retriever" };
```

###  Объединения только через type
```ts
type Person = { name: string };
type Pet = { type: string };
type PersonOrPet = Person | Pet; // union
```

###  Использование с классами
```ts
interface UserContract {
  name: string;
  age: number;
}

class Employee implements UserContract {
  name: string;
  age: number;
  constructor(name: string, age: number) { this.name = name; this.age = age; }
}

// Через пересечение можно усилить тип экземпляра
type WithId = { id: string };
type EmployeeWithId = Employee & WithId;
```

---

##  Когда использовать? 
- **interface**: стабильные контракты объектов/классов; требуется расширяемость (декларативное объединение) и наследование `extends`.
- **type**: сложные типовые выражения, объединения `|`, пересечения `&`, алиасы примитивов/шаблонных литералов.
- В большинстве случаев интерфейсы удобны для публичных API и моделей, а `type` — для композиции типов и выразительных алиасов.

---

##  Подводные камни и советы 
- Не путайте декларативное объединение интерфейсов с слиянием типов: у `type` этого нет.
- Слишком глубокие пересечения `&` ухудшают читаемость — выносите части в именованные типы.
- Для «формы» объектов выбирайте `interface`, для «арифметики типов» (union/intersection) — `type`.

---

##  Итог
- `interface` — контракты объектов/классов, расширяемы через `extends` и декларативное объединение.
- `type` — универсальные алиасы для любых типов, поддерживают `|` и `&`.
- В публичном API предпочитайте `interface`, для композиции и объединений — `type`.

##  ЗАДАЧИ

Вот набор задач, чтобы лучше понять `interface` и `type` в TypeScript:

---

###  Задача 1: Контракт и реализация через interface
 Опишите контракт `Service` с методами `start(): void` и `status(): 'idle' | 'running'`, реализуйте класс `AppService`.

```ts
// Требования:
// interface Service { start(): void; status(): 'idle' | 'running' }
// class AppService implements Service { ... }
```

<details>
<summary> Решение</summary>

```ts
interface Service {
  start(): void;
  status(): 'idle' | 'running';
}

class AppService implements Service {
  private running = false;
  start(): void { this.running = true; }
  status(): 'idle' | 'running' { return this.running ? 'running' : 'idle'; }
}
```

</details>

---

###  Задача 2: Объединение и пересечение через type
 Создайте `type` для `Success` и `Failure` и объедините их в `ApiResponse`. Затем создайте `type` `Entity` и пересеките с `Timestamped`.

```ts
// Требования:
// type Success = { ok: true; data: unknown }
// type Failure = { ok: false; error: string }
// type ApiResponse = Success | Failure
// type Entity = { id: string }
// type Timestamped = { createdAt: Date; updatedAt: Date }
// type EntityWithTime = Entity & Timestamped
```

<details>
<summary> Решение</summary>

```ts
type Success = { ok: true; data: unknown };
type Failure = { ok: false; error: string };
type ApiResponse = Success | Failure;

type Entity = { id: string };
type Timestamped = { createdAt: Date; updatedAt: Date };
type EntityWithTime = Entity & Timestamped;
```

</details>

---

###  Задача 3: Декларативное объединение интерфейсов
 Объявите интерфейс `Config` в двух местах и объедините поля (`env: 'dev' | 'prod'`, `debug: boolean`), затем создайте переменную с обоими свойствами.

```ts
// Требования:
// interface Config { env: 'dev' | 'prod' }
// interface Config { debug: boolean }
// const cfg: Config = { env: 'dev', debug: true }
```

<details>
<summary> Решение</summary>

```ts
interface Config { env: 'dev' | 'prod' }
interface Config { debug: boolean }

const cfg: Config = { env: 'dev', debug: true };
```

</details>

---

 Эти задачи помогают закрепить: реализацию контрактов классами через `interface`, использование `type` для объединений/пересечений и работу с декларативным объединением интерфейсов.

---
