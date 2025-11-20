#  Union и Intersection типы в TypeScript

**Union (объединение)** и **Intersection (пересечение)** типов позволяют создавать сложные структуры данных, комбинируя типы. Это мощный инструмент для обеспечения гибкости и строгой типизации одновременно.

---

##  Union (Объединение) типов

###  Описание
Union-тип позволяет переменной принимать значение одного из нескольких типов. Обозначается вертикальной чертой `|`.

```typescript
let value: string | number;
value = "Hello"; // Допустимо
value = 42;      // Допустимо
// value = true; // Ошибка: тип 'boolean' не является частью объединения
```

###  Функции с несколькими возможными аргументами
```typescript
function printId(id: string | number): void {
    if (typeof id === "string") {
        console.log(`ID (строка): ${id.toUpperCase()}`);
    } else {
        console.log(`ID (число): ${id}`);
    }
}

printId("abc123"); // ID (строка): ABC123
printId(123);      // ID (число): 123
```

###  Объединение типов с объектами
```typescript
type Dog = { breed: string; bark: () => void };
type Cat = { breed: string; meow: () => void };

function handlePet(pet: Dog | Cat) {
    if ("bark" in pet) {
        pet.bark();
    } else {
        pet.meow();
    }
}
```

###  Преимущества Union-типов
- **Повышают гибкость** функции, позволяя ей работать с разными типами
- **Уменьшают дублирование** кода, объединяя похожие случаи

---

##  Intersection (Пересечение) типов

###  Описание
Intersection-тип объединяет несколько типов в один, который должен соответствовать всем указанным типам одновременно. Обозначается символом амперсанда `&`.

```typescript
type Person = { name: string; age: number };
type Employee = { company: string };

type WorkingPerson = Person & Employee;

const worker: WorkingPerson = {
    name: "Alice",
    age: 30,
    company: "Acme Corp",
};
```

###  Объединение свойств нескольких типов
```typescript
type Coordinates = { x: number; y: number };
type NamedPoint = Coordinates & { name: string };

const point: NamedPoint = {
    x: 10,
    y: 20,
    name: "Point A",
};
```

###  Смешивание интерфейсов
```typescript
interface Admin {
    permissions: string[];
}

interface User {
    email: string;
}

type AdminUser = Admin & User;

const admin: AdminUser = {
    permissions: ["read", "write"],
    email: "admin@example.com",
};
```

###  Преимущества Intersection-типов
- **Позволяют гибко комбинировать** свойства, уменьшая избыточность
- **Упрощают управление** сложными структурами объектов

---

##  Сравнение Union и Intersection

| Свойство | Union (Объединение) | Intersection (Пересечение) |
|----------|---------------------|----------------------------|
| **Значение переменной** | Может быть одного из указанных типов | Должно удовлетворять всем типам |
| **Использование** | Для описания альтернатив | Для объединения характеристик |
| **Синтаксис** | `A \| B` | `A & B` |
| **Пример** | `string \| number` | `Person & Employee` |

---

##  Комбинация Union и Intersection

```typescript
type Fish = { swim: () => void };
type Bird = { fly: () => void };
type Human = { walk: () => void };

type Animal = Fish | Bird | (Fish & Bird); // Может быть рыбой, птицей или их гибридом

const hybrid: Fish & Bird = {
    swim: () => console.log("Swimming"),
    fly: () => console.log("Flying"),
};
```

---

##  Когда использовать?

###  Union типы:
- Когда нужно описать переменную, которая может быть одним из нескольких типов
- Для функций, работающих с разными типами данных
- При обработке API ответов с разными форматами

###  Intersection типы:
- Когда объект должен объединять характеристики нескольких типов
- Для создания сложных структур с комбинированной функциональностью
- При миксинах и расширении существующих типов

---

##  Практические примеры

###  Union в API ответах
```typescript
type ApiResponse = 
    | { success: true; data: any }
    | { success: false; error: string };

function handleResponse(response: ApiResponse) {
    if (response.success) {
        console.log(response.data);
    } else {
        console.error(response.error);
    }
}
```

###  Intersection для миксинов
```typescript
type Timestamped = { createdAt: Date; updatedAt: Date };
type Identifiable = { id: string };
type SoftDeletable = { deletedAt: Date | null };

type BaseEntity = Timestamped & Identifiable & SoftDeletable;

interface User extends BaseEntity {
    name: string;
    email: string;
}
```

---

##  Итог

**Union и Intersection типы** — это мощные инструменты TypeScript для создания гибких и строго типизированных структур данных. Они позволяют комбинировать типы различными способами, обеспечивая при этом безопасность типов и улучшая читаемость кода.

**Ключевые принципы:**
- Используйте Union для альтернативных типов
- Применяйте Intersection для объединения характеристик
- Комбинируйте оба подхода для сложных случаев
- Выбирайте подходящий тип в зависимости от задачи

##  ЗАДАЧИ

Вот набор задач, чтобы лучше понять `Union и Intersection типы в TypeScript`:

---

###  Задача 1: Создание Union типа для статуса

 Создайте Union тип `Status` и функцию `getStatusMessage`:
- Статусы: 'loading', 'success', 'error'
- Функция возвращает соответствующее сообщение
- Обработка всех возможных статусов

```typescript
// Создайте тип Status = 'loading' | 'success' | 'error'
// Функция getStatusMessage(status: Status): string
// Возвращает сообщение для каждого статуса
```

<details>
<summary> Решение</summary>

```typescript
type Status = 'loading' | 'success' | 'error';

function getStatusMessage(status: Status): string {
    switch(status) {
        case 'loading': return 'Загрузка...';
        case 'success': return 'Успешно!';
        case 'error': return 'Ошибка!';
    }
}
```

</details>

---

###  Задача 2: Создание Intersection типа для пользователя

 Создайте Intersection тип `UserWithRole`:
- Объедините базовые данные пользователя и роль
- Поля: name, email, role, permissions
- Создайте объект с полным набором свойств

```typescript
// Создайте типы Person и Role
// Intersection тип UserWithRole = Person & Role
// Создайте объект user с всеми свойствами
```

<details>
<summary> Решение</summary>

```typescript
type Person = { name: string; email: string };
type Role = { role: string; permissions: string[] };
type UserWithRole = Person & Role;

const user: UserWithRole = {
    name: 'John',
    email: 'john@example.com',
    role: 'admin',
    permissions: ['read', 'write']
};
```

</details>

---

 Эти задачи помогут понять принципы работы с Union и Intersection типами в TypeScript.

---
