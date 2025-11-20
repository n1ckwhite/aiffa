#  Введение в TypeScript

**TypeScript** — это строго типизированный язык программирования, разработанный Microsoft, который является надмножеством JavaScript. TypeScript добавляет статическую типизацию, классы, интерфейсы, декораторы и другие возможности, которые помогают создавать более надежные и масштабируемые приложения.

---

##  Что такое TypeScript?

###  Основные характеристики
- **Надмножество JavaScript** — любой валидный JavaScript код является валидным TypeScript кодом
- **Статическая типизация** — проверка типов на этапе компиляции
- **Компиляция в JavaScript** — TypeScript компилируется в обычный JavaScript
- **Современные возможности** — поддержка ES6+, декораторов, generics

###  Преимущества TypeScript
- **Раннее обнаружение ошибок** — ошибки типов выявляются на этапе разработки
- **Лучшая поддержка IDE** — автодополнение, рефакторинг, навигация по коду
- **Улучшенная читаемость** — типы делают код более понятным
- **Масштабируемость** — легче работать с большими проектами
- **Рефакторинг** — безопасное изменение кода с проверкой типов

---

##  Установка и настройка

###  Установка TypeScript
```bash
# Глобальная установка
npm install -g typescript

# Локальная установка в проект
npm install --save-dev typescript

# Проверка версии
tsc --version
```

###  Компиляция TypeScript
```bash
# Компиляция файла
tsc app.ts

# Компиляция с watch режимом
tsc --watch app.ts

# Компиляция проекта
tsc
```

###  Настройка tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

---

##  Основные типы данных

###  Примитивные типы
```typescript
// Числа
let age: number = 25;
let price: number = 99.99;

// Строки
let name: string = "Иван";
let message: string = `Привет, ${name}!`;

// Булевы значения
let isActive: boolean = true;
let isCompleted: boolean = false;

// null и undefined
let data: null = null;
let value: undefined = undefined;
```

###  Массивы и объекты
```typescript
// Массивы
let numbers: number[] = [1, 2, 3, 4, 5];
let names: Array<string> = ["Анна", "Петр", "Мария"];

// Объекты
let user: { name: string; age: number } = {
  name: "Иван",
  age: 30
};

// Интерфейсы
interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}
```

---

##  Функции и типы

###  Типизация функций
```typescript
// Обычная функция
function add(a: number, b: number): number {
  return a + b;
}

// Стрелочная функция
const multiply = (a: number, b: number): number => a * b;

// Функция с опциональными параметрами
function greet(name: string, age?: number): string {
  if (age) {
    return `Привет, ${name}! Тебе ${age} лет.`;
  }
  return `Привет, ${name}!`;
}

// Функция с параметрами по умолчанию
function createUser(name: string, role: string = "user"): User {
  return { id: Date.now(), name, email: "", isActive: true };
}
```

###  Union типы
```typescript
// Union типы
let id: string | number;
id = "123";
id = 123;

// Literal типы
let status: "loading" | "success" | "error";
status = "loading";
```

---

##  Классы и интерфейсы

###  Классы
```typescript
class Person {
  private name: string;
  protected age: number;
  public email: string;

  constructor(name: string, age: number, email: string) {
    this.name = name;
    this.age = age;
    this.email = email;
  }

  public getName(): string {
    return this.name;
  }

  private validateEmail(email: string): boolean {
    return email.includes("@");
  }
}
```

###  Интерфейсы
```typescript
interface Vehicle {
  brand: string;
  model: string;
  year: number;
  start(): void;
  stop(): void;
}

class Car implements Vehicle {
  brand: string;
  model: string;
  year: number;

  constructor(brand: string, model: string, year: number) {
    this.brand = brand;
    this.model = model;
    this.year = year;
  }

  start(): void {
    console.log(`${this.brand} ${this.model} заведен`);
  }

  stop(): void {
    console.log(`${this.brand} ${this.model} заглушен`);
  }
}
```

---

##  Generics

###  Общие типы
```typescript
// Простой generic
function identity<T>(arg: T): T {
  return arg;
}

let output = identity<string>("Hello");
let number = identity<number>(42);

// Generic интерфейс
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Generic класс
class Container<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  get(index: number): T | undefined {
    return this.items[index];
  }
}
```

---

##  Модули и импорты

###  Экспорт и импорт
```typescript
// math.ts
export function add(a: number, b: number): number {
  return a + b;
}

export const PI = 3.14159;

export default class Calculator {
  multiply(a: number, b: number): number {
    return a * b;
  }
}

// app.ts
import Calculator, { add, PI } from './math';

const calc = new Calculator();
console.log(add(5, 3));
console.log(calc.multiply(4, 2));
console.log(PI);
```

---

##  Утилиты и декораторы

###  Utility типы
```typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// Partial - все свойства опциональны
type PartialUser = Partial<User>;

// Pick - выбираем определенные свойства
type UserPublic = Pick<User, 'id' | 'name' | 'email'>;

// Omit - исключаем определенные свойства
type UserCreate = Omit<User, 'id'>;

// Record - создаем тип с определенными ключами
type UserRoles = Record<string, string[]>;
```

###  Декораторы
```typescript
function log(target: any, propertyName: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  
  descriptor.value = function (...args: any[]) {
    console.log(`Вызов метода ${propertyName} с аргументами:`, args);
    return method.apply(this, args);
  };
}

class Calculator {
  @log
  add(a: number, b: number): number {
    return a + b;
  }
}
```

---

##  Интеграция с JavaScript

###  Постепенная миграция
```typescript
// Можно использовать .js файлы в .ts проекте
// TypeScript автоматически выведет типы

// app.js
function greet(name) {
  return `Hello, ${name}!`;
}

// app.ts
import { greet } from './app.js';
console.log(greet('TypeScript'));
```

###  Declaration файлы
```typescript
// types.d.ts
declare module 'my-library' {
  export function doSomething(): void;
  export const version: string;
}

// Использование
import { doSomething, version } from 'my-library';
```

---

##  Лучшие практики

###  Принципы разработки
- **Используйте strict режим** — включите строгую проверку типов
- **Избегайте `any`** — используйте конкретные типы
- **Создавайте интерфейсы** — для сложных структур данных
- **Используйте generics** — для переиспользуемого кода
- **Документируйте типы** — добавляйте JSDoc комментарии

###  Структура проекта
```
src/
├── types/
│   ├── index.ts
│   └── api.ts
├── components/
│   └── Button.tsx
├── utils/
│   └── helpers.ts
└── app.ts
```

---

##  Итог

**TypeScript** — это мощный инструмент для разработки масштабируемых JavaScript приложений. Он добавляет статическую типизацию, улучшает производительность разработки и помогает создавать более надежный код.

**Ключевые преимущества:**
- Раннее обнаружение ошибок
- Лучшая поддержка IDE
- Улучшенная читаемость кода
- Безопасный рефакторинг
- Масштабируемость проектов

**Начните с простых типов и постепенно изучайте более сложные возможности TypeScript!**

---
