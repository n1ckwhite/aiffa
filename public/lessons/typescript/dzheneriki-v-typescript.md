#  Дженерики в TypeScript

**Дженерики (или обобщения)** в TypeScript позволяют создавать универсальный и гибкий код, который может работать с разными типами данных, сохраняя при этом строгую типизацию. Вместо перечисления конкретных типов, дженерики вводят параметризованные типы, которые можно адаптировать к любому типу данных в момент использования.

---

##  Зачем нужны дженерики?

###  Проблема перечисления типов
```typescript
//  Плохо - дублирование кода
function identityString(value: string): string {
    return value;
}

function identityNumber(value: number): number {
    return value;
}

function identityBoolean(value: boolean): boolean {
    return value;
}
```

###  Решение с дженериками
```typescript
//  Хорошо - одна универсальная функция
function identity<T>(value: T): T {
    return value;
}

// Использование
const str = identity<string>("hello"); // string
const num = identity<number>(42); // number
const bool = identity<boolean>(true); // boolean
```

---

##  Преимущества дженериков

###  Масштабируемость
- **Одна функция** вместо множества версий
- **Легко добавлять** новые типы
- **Переиспользование кода**

###  Безопасность типов
```typescript
function wrapInArray<T>(value: T): T[] {
    return [value];
}

const wrappedString = wrapInArray("hello"); // string[]
const wrappedNumber = wrapInArray(42); // number[]
```

###  Улучшение читаемости
```typescript
function merge<T, U>(a: T, b: U): T & U {
    return { ...a, ...b };
}

const result = merge({ name: "John" }, { age: 30 });
// result: { name: string; age: number }
```

---

##  Дженерики в React

###  Типизация компонентов
```typescript
type CardProps<T> = {
    data: T;
    render: (item: T) => JSX.Element;
};

function Card<T>({ data, render }: CardProps<T>): JSX.Element {
    return <div>{render(data)}</div>;
}

// Использование
type User = { id: number; name: string };
const user: User = { id: 1, name: "John Doe" };

<Card<User>
    data={user}
    render={(item) => <div>{item.name}</div>}
/>
```

###  Типизация хуков
```typescript
function useArray<T>(initialValue: T[]): [T[], (value: T) => void] {
    const [array, setArray] = React.useState<T[]>(initialValue);

    const addItem = (value: T) => {
        setArray((prev) => [...prev, value]);
    };

    return [array, addItem];
}

// Использование
const [numbers, addNumber] = useArray<number>([]);
addNumber(42); // numbers: [42]
```

###  Типизация контекста
```typescript
const UserContext = React.createContext<User | null>(null);

function useUser<T extends User>() {
    const context = React.useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context as T;
}
```

---

##  Основные паттерны дженериков

###  Ограничения типов
```typescript
interface Lengthwise {
    length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}

logLength("hello"); // OK
logLength([1, 2, 3]); // OK
logLength(42); // Error: number doesn't have length
```

###  Утилиты типов
```typescript
type Partial<T> = {
    [P in keyof T]?: T[P];
};

type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};

type Record<K extends keyof any, T> = {
    [P in K]: T;
};
```

###  Дженерики в классах
```typescript
class Container<T> {
    private items: T[] = [];

    add(item: T): void {
        this.items.push(item);
    }

    get(index: number): T | undefined {
        return this.items[index];
    }
}

const stringContainer = new Container<string>();
const numberContainer = new Container<number>();
```

---

##  Практические примеры

###  API клиент
```typescript
interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
}

async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
    const response = await fetch(url);
    return response.json();
}

// Использование
const userData = await fetchData<User>('/api/users/1');
const postData = await fetchData<Post>('/api/posts/1');
```

###  Формы
```typescript
interface FormField<T> {
    value: T;
    error: string | null;
    onChange: (value: T) => void;
}

function useFormField<T>(initialValue: T): FormField<T> {
    const [value, setValue] = useState<T>(initialValue);
    const [error, setError] = useState<string | null>(null);

    return {
        value,
        error,
        onChange: setValue
    };
}
```

---

##  Итог

**Дженерики** — это мощный инструмент, который позволяет писать универсальный, масштабируемый и строго типизированный код. Они особенно полезны в сложных проектах с многократным использованием компонентов или функций, как это часто встречается в React-приложениях.

**Ключевые принципы:**
- Используйте дженерики для переиспользования кода
- Сохраняйте строгую типизацию
- Применяйте ограничения типов при необходимости
- Создавайте универсальные компоненты и функции

##  ЗАДАЧИ

Вот набор задач, чтобы лучше понять `дженерики в TypeScript`:

---

###  Задача 1: Создание универсального хранилища

 Создайте класс `Storage` с дженериками:
- Сохранение и получение данных любого типа
- Типизированные методы для работы с данными
- Поддержка валидации типов

```typescript
// Создайте класс Storage<T>:
// set(key, value) - сохраняет значение
// get(key) - получает значение
// has(key) - проверяет наличие ключа
// delete(key) - удаляет значение

// Пример использования:
// const storage = new Storage<User>();
// storage.set('user', { id: 1, name: 'John' });
// const user = storage.get('user');
```

<details>
<summary> Решение</summary>

```typescript
class Storage<T> {
    private data = new Map<string, T>();

    set(key: string, value: T): void {
        this.data.set(key, value);
    }

    get(key: string): T | undefined {
        return this.data.get(key);
    }

    has(key: string): boolean {
        return this.data.has(key);
    }

    delete(key: string): boolean {
        return this.data.delete(key);
    }

    clear(): void {
        this.data.clear();
    }

    size(): number {
        return this.data.size;
    }
}

// Использование
const userStorage = new Storage<User>();
userStorage.set('user1', { id: 1, name: 'John' });
const user = userStorage.get('user1');
```

</details>

---

###  Задача 2: Создание типизированного API клиента

 Создайте функцию `apiClient` с дженериками:
- Типизированные HTTP методы
- Автоматическое определение типов ответов
- Поддержка разных эндпоинтов

```typescript
// Создайте функцию apiClient<T>:
// get<T>(url) - GET запрос
// post<T>(url, data) - POST запрос
// put<T>(url, data) - PUT запрос
// delete<T>(url) - DELETE запрос

// Пример использования:
// const user = await apiClient.get<User>('/users/1');
// const newUser = await apiClient.post<User>('/users', userData);
```

<details>
<summary> Решение</summary>

```typescript
async function apiClient() {
    return {
        async get<T>(url: string): Promise<T> {
            const response = await fetch(url);
            return response.json();
        },
        
        async post<T>(url: string, data: any): Promise<T> {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return response.json();
        },
        
        async put<T>(url: string, data: any): Promise<T> {
            const response = await fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return response.json();
        },
        
        async delete<T>(url: string): Promise<T> {
            const response = await fetch(url, { method: 'DELETE' });
            return response.json();
        }
    };
}

// Использование
const client = await apiClient();
const user = await client.get<User>('/users/1');
const newUser = await client.post<User>('/users', userData);
```

</details>

---

 Эти задачи помогут понять принципы работы с дженериками в TypeScript и научиться создавать универсальный типизированный код.

---
