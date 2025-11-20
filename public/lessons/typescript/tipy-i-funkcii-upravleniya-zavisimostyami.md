#  Типы и функции управления зависимостями в TypeScript

**Управление зависимостями** — это важная концепция в TypeScript, которая позволяет оптимизировать производительность приложений, кэшировать результаты вычислений и предотвращать ненужные пересчеты. В этом файле мы разберем типы и функции, которые помогают эффективно работать с зависимостями.

---

##  Базовые типы для зависимостей

###  DependencyList
```typescript
type DependencyList = ReadonlyArray<unknown>;
```

**Описание:**
- **`ReadonlyArray`** — неизменяемый массив, элементы которого нельзя изменить после создания
- **`unknown`** — тип, который может содержать любое значение (более безопасная альтернатива `any`)
- **Использование:** для передачи списка зависимостей в функции оптимизации

**Примеры использования:**
```typescript
// Валидные списки зависимостей
const deps1: DependencyList = [1, 2, 3];
const deps2: DependencyList = ['hello', 'world', 42];
const deps3: DependencyList = [{ id: 1 }, { name: 'test' }];
const deps4: DependencyList = []; // пустой массив

// Ошибка компиляции - нельзя изменить элементы
// deps1[0] = 10; // Error: Index signature in type 'readonly unknown[]' only permits reading
```

---

##  Функция U - Кэширование вычислений

###  Сигнатура функции
```typescript
function U<T>(factory: () => T, deps: DependencyList | undefined): T;
```

**Аргументы:**
- **`factory: () => T`** — функция-фабрика, которая возвращает значение типа `T`
- **`deps: DependencyList | undefined`** — необязательный список зависимостей

**Возвращаемое значение:**
- **`T`** — результат выполнения `factory`, кэшированный на основе зависимостей

###  Принцип работы
```typescript
function U<T>(factory: () => T, deps: DependencyList | undefined): T {
    // Внутренний кэш для хранения результатов
    const cache = new Map<string, { value: T; deps: DependencyList }>();
    
    // Создаем ключ на основе зависимостей
    const key = deps ? JSON.stringify(deps) : 'no-deps';
    
    // Проверяем, есть ли кэшированный результат
    const cached = cache.get(key);
    if (cached && arraysEqual(cached.deps, deps || [])) {
        return cached.value;
    }
    
    // Вычисляем новое значение
    const value = factory();
    
    // Сохраняем в кэш
    cache.set(key, { value, deps: deps || [] });
    
    return value;
}

// Вспомогательная функция для сравнения массивов
function arraysEqual(a: unknown[], b: unknown[]): boolean {
    if (a.length !== b.length) return false;
    return a.every((val, index) => val === b[index]);
}
```

###  Примеры использования
```typescript
// Кэширование дорогих вычислений
const expensiveValue = U(() => {
    console.log('Выполняется дорогое вычисление...');
    return Math.random() * 1000;
}, [dependency1, dependency2]);

// Кэширование создания объектов
const user = U(() => {
    console.log('Создается пользователь...');
    return {
        id: Date.now(),
        name: 'Иван',
        email: 'ivan@example.com'
    };
}, [userId, userData]);

// Кэширование без зависимостей
const constantValue = U(() => {
    console.log('Создается константа...');
    return 'Hello World';
}, undefined);
```

---

##  Функция u2 - Оптимизация функций

###  Сигнатура функции
```typescript
function u2<T extends Function>(callback: T, deps: DependencyList): T;
```

**Аргументы:**
- **`callback: T`** — функция, которая будет оптимизирована
- **`deps: DependencyList`** — список зависимостей (обязательный)

**Возвращаемое значение:**
- **`T`** — оптимизированная версия функции `callback`

###  Принцип работы
```typescript
function u2<T extends Function>(callback: T, deps: DependencyList): T {
    // Внутренний кэш для хранения оптимизированных функций
    const cache = new Map<string, { fn: T; deps: DependencyList }>();
    
    // Создаем ключ на основе зависимостей
    const key = JSON.stringify(deps);
    
    // Проверяем, есть ли кэшированная функция
    const cached = cache.get(key);
    if (cached && arraysEqual(cached.deps, deps)) {
        return cached.fn;
    }
    
    // Создаем оптимизированную функцию
    const optimizedFn = ((...args: any[]) => {
        console.log('Выполняется оптимизированная функция...');
        return callback(...args);
    }) as T;
    
    // Сохраняем в кэш
    cache.set(key, { fn: optimizedFn, deps });
    
    return optimizedFn;
}
```

###  Примеры использования
```typescript
// Оптимизация обработчика событий
const handleClick = u2((event: MouseEvent) => {
    console.log('Клик обработан:', event.target);
}, [userId, userRole]);

// Оптимизация функции фильтрации
const filterUsers = u2((users: User[], searchTerm: string) => {
    return users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
}, [filterOptions, sortOrder]);

// Оптимизация функции валидации
const validateForm = u2((formData: FormData) => {
    const errors: string[] = [];
    
    if (!formData.email.includes('@')) {
        errors.push('Некорректный email');
    }
    
    if (formData.password.length < 8) {
        errors.push('Пароль должен содержать минимум 8 символов');
    }
    
    return errors;
}, [validationRules, requiredFields]);
```

---

##  Практические применения

###  React-подобные хуки
```typescript
// useMemo аналог
function useMemo<T>(factory: () => T, deps: DependencyList): T {
    return U(factory, deps);
}

// useCallback аналог
function useCallback<T extends Function>(callback: T, deps: DependencyList): T {
    return u2(callback, deps);
}

// Использование
const expensiveValue = useMemo(() => {
    return computeExpensiveValue(a, b);
}, [a, b]);

const handleSubmit = useCallback((data: FormData) => {
    submitForm(data);
}, [formConfig, validationRules]);
```

###  Оптимизация производительности
```typescript
class DataProcessor {
    private cache = new Map<string, any>();
    
    // Кэширование результатов обработки
    processData<T>(data: T[], processor: (item: T) => any, deps: DependencyList) {
        const key = JSON.stringify(deps);
        
        if (this.cache.has(key)) {
            return this.cache.get(key);
        }
        
        const result = data.map(processor);
        this.cache.set(key, result);
        
        return result;
    }
    
    // Оптимизация функций обработки
    createProcessor<T>(processor: (item: T) => any, deps: DependencyList) {
        return u2(processor, deps);
    }
}
```

###  Управление состоянием
```typescript
interface StateManager<T> {
    getState(): T;
    setState(newState: T): void;
    subscribe(callback: (state: T) => void, deps: DependencyList): () => void;
}

class OptimizedStateManager<T> implements StateManager<T> {
    private state: T;
    private subscribers = new Map<string, (state: T) => void>();
    
    constructor(initialState: T) {
        this.state = initialState;
    }
    
    getState(): T {
        return this.state;
    }
    
    setState(newState: T): void {
        this.state = newState;
        this.notifySubscribers();
    }
    
    subscribe(callback: (state: T) => void, deps: DependencyList): () => void {
        const key = JSON.stringify(deps);
        const optimizedCallback = u2(callback, deps);
        
        this.subscribers.set(key, optimizedCallback);
        
        return () => {
            this.subscribers.delete(key);
        };
    }
    
    private notifySubscribers(): void {
        this.subscribers.forEach(callback => callback(this.state));
    }
}
```

---

##  Расширенные возможности

###  Типизированные зависимости
```typescript
// Строго типизированный список зависимостей
type TypedDependencyList<T extends readonly unknown[]> = ReadonlyArray<T[number]>;

// Функция с типизированными зависимостями
function typedU<T, D extends readonly unknown[]>(
    factory: () => T, 
    deps: TypedDependencyList<D>
): T {
    return U(factory, deps);
}

// Использование
const result = typedU(() => {
    return 'Hello World';
}, [1, 2, 3] as const); // deps имеет тип readonly [1, 2, 3]
```

###  Мемоизация с глубоким сравнением
```typescript
function deepEqual(a: unknown, b: unknown): boolean {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (typeof a !== typeof b) return false;
    
    if (typeof a === 'object') {
        const aObj = a as Record<string, unknown>;
        const bObj = b as Record<string, unknown>;
        
        const aKeys = Object.keys(aObj);
        const bKeys = Object.keys(bObj);
        
        if (aKeys.length !== bKeys.length) return false;
        
        return aKeys.every(key => deepEqual(aObj[key], bObj[key]));
    }
    
    return false;
}

function deepU<T>(factory: () => T, deps: DependencyList | undefined): T {
    const cache = new Map<string, { value: T; deps: DependencyList }>();
    
    const key = deps ? JSON.stringify(deps) : 'no-deps';
    const cached = cache.get(key);
    
    if (cached && deepEqual(cached.deps, deps || [])) {
        return cached.value;
    }
    
    const value = factory();
    cache.set(key, { value, deps: deps || [] });
    
    return value;
}
```

---

##  Лучшие практики

###  Принципы использования
- **Используйте `U` для дорогих вычислений** — кэшируйте результаты, которые требуют много ресурсов
- **Используйте `u2` для функций** — оптимизируйте функции, которые передаются как пропсы
- **Правильно определяйте зависимости** — включайте только те значения, которые влияют на результат
- **Избегайте мутации зависимостей** — используйте `ReadonlyArray` для предотвращения изменений

###  Отладка и профилирование
```typescript
function debugU<T>(factory: () => T, deps: DependencyList | undefined, name: string): T {
    console.log(`[DEBUG] ${name}: Вычисление с зависимостями:`, deps);
    const start = performance.now();
    
    const result = U(factory, deps);
    
    const end = performance.now();
    console.log(`[DEBUG] ${name}: Выполнено за ${end - start}ms`);
    
    return result;
}

// Использование
const value = debugU(() => {
    return expensiveCalculation();
}, [a, b], 'expensiveCalculation');
```

##  ЗАДАЧИ

Вот набор задач, чтобы лучше понять `типы и функции управления зависимостями в TypeScript`:

---

###  Задача 1: Создание системы кэширования с зависимостями

 Создайте класс `CacheManager` для кэширования результатов функций:
- Кэширование результатов на основе зависимостей
- Инвалидация кэша при изменении зависимостей
- Поддержка TTL (время жизни) для записей
- Статистика использования кэша

```typescript
// Создайте класс CacheManager:
// set(key, value, deps, ttl?) - сохраняет значение с зависимостями
// get(key, deps) - получает значение если зависимости не изменились
// invalidate(key) - удаляет запись из кэша
// getStats() - возвращает статистику кэша

// Пример использования:
// const cache = new CacheManager();
// cache.set('user', userData, [userId, userRole], 30000);
// const cachedUser = cache.get('user', [userId, userRole]);
```

<details>
<summary> Решение</summary>

```typescript
interface CacheEntry<T> {
    value: T;
    deps: DependencyList;
    timestamp: number;
    ttl?: number;
}

class CacheManager {
    private cache = new Map<string, CacheEntry<any>>();
    private stats = {
        hits: 0,
        misses: 0,
        sets: 0,
        invalidations: 0
    };

    // Сохранение значения в кэш
    set<T>(key: string, value: T, deps: DependencyList, ttl?: number): void {
        const entry: CacheEntry<T> = {
            value,
            deps: [...deps], // создаем копию массива
            timestamp: Date.now(),
            ttl
        };

        this.cache.set(key, entry);
        this.stats.sets++;
        
        console.log(` Кэш: сохранено значение для ключа "${key}"`);
    }

    // Получение значения из кэша
    get<T>(key: string, deps: DependencyList): T | null {
        const entry = this.cache.get(key);
        
        if (!entry) {
            this.stats.misses++;
            console.log(` Кэш: промах для ключа "${key}"`);
            return null;
        }

        // Проверяем TTL
        if (entry.ttl && Date.now() - entry.timestamp > entry.ttl) {
            this.cache.delete(key);
            this.stats.misses++;
            console.log(`⏰ Кэш: истек TTL для ключа "${key}"`);
            return null;
        }

        // Проверяем зависимости
        if (!this.depsEqual(entry.deps, deps)) {
            this.stats.misses++;
            console.log(` Кэш: зависимости изменились для ключа "${key}"`);
            return null;
        }

        this.stats.hits++;
        console.log(` Кэш: попадание для ключа "${key}"`);
        return entry.value;
    }

    // Удаление записи из кэша
    invalidate(key: string): boolean {
        const deleted = this.cache.delete(key);
        if (deleted) {
            this.stats.invalidations++;
            console.log(` Кэш: инвалидирован ключ "${key}"`);
        }
        return deleted;
    }

    // Очистка устаревших записей
    cleanup(): number {
        const now = Date.now();
        let cleaned = 0;

        for (const [key, entry] of this.cache.entries()) {
            if (entry.ttl && now - entry.timestamp > entry.ttl) {
                this.cache.delete(key);
                cleaned++;
            }
        }

        if (cleaned > 0) {
            console.log(` Кэш: очищено ${cleaned} устаревших записей`);
        }

        return cleaned;
    }

    // Получение статистики
    getStats() {
        const total = this.stats.hits + this.stats.misses;
        const hitRate = total > 0 ? (this.stats.hits / total * 100).toFixed(2) : 0;

        return {
            ...this.stats,
            total,
            hitRate: `${hitRate}%`,
            size: this.cache.size
        };
    }

    // Проверка равенства зависимостей
    private depsEqual(deps1: DependencyList, deps2: DependencyList): boolean {
        if (deps1.length !== deps2.length) return false;
        
        return deps1.every((dep, index) => {
            const otherDep = deps2[index];
            
            // Простое сравнение для примитивов
            if (dep === otherDep) return true;
            
            // Глубокое сравнение для объектов
            if (typeof dep === 'object' && typeof otherDep === 'object') {
                return this.deepEqual(dep, otherDep);
            }
            
            return false;
        });
    }

    // Глубокое сравнение объектов
    private deepEqual(obj1: unknown, obj2: unknown): boolean {
        if (obj1 === obj2) return true;
        if (obj1 == null || obj2 == null) return false;
        if (typeof obj1 !== typeof obj2) return false;
        
        if (typeof obj1 === 'object') {
            const obj1Record = obj1 as Record<string, unknown>;
            const obj2Record = obj2 as Record<string, unknown>;
            
            const keys1 = Object.keys(obj1Record);
            const keys2 = Object.keys(obj2Record);
            
            if (keys1.length !== keys2.length) return false;
            
            return keys1.every(key => 
                this.deepEqual(obj1Record[key], obj2Record[key])
            );
        }
        
        return false;
    }

    // Получение всех ключей
    getKeys(): string[] {
        return Array.from(this.cache.keys());
    }

    // Очистка всего кэша
    clear(): void {
        this.cache.clear();
        this.stats = { hits: 0, misses: 0, sets: 0, invalidations: 0 };
        console.log(' Кэш: полностью очищен');
    }

    // Получение информации о записи
    getEntryInfo(key: string) {
        const entry = this.cache.get(key);
        if (!entry) return null;

        return {
            key,
            hasValue: true,
            deps: entry.deps,
            age: Date.now() - entry.timestamp,
            ttl: entry.ttl,
            isExpired: entry.ttl ? Date.now() - entry.timestamp > entry.ttl : false
        };
    }
}

// Демонстрация использования
const cache = new CacheManager();

// Сохранение данных с зависимостями
const userData = { id: 1, name: 'Иван', role: 'admin' };
cache.set('user', userData, [1, 'admin'], 30000); // TTL 30 секунд

// Получение данных
const cachedUser = cache.get('user', [1, 'admin']);
console.log('Кэшированный пользователь:', cachedUser);

// Изменение зависимостей
const updatedUser = cache.get('user', [1, 'user']); // другая роль
console.log('Обновленный пользователь:', updatedUser); // null

// Статистика
console.log('Статистика кэша:', cache.getStats());

module.exports = CacheManager;
```

</details>

---

###  Задача 2: Создание системы мемоизации функций

 Создайте систему для мемоизации функций с зависимостями:
- Мемоизация результатов функций
- Автоматическая инвалидация при изменении зависимостей
- Поддержка асинхронных функций
- Группировка функций по категориям

```typescript
// Создайте класс MemoizationManager:
// memoize(fn, deps, category?) - мемоизирует функцию
// invalidateCategory(category) - инвалидирует все функции категории
// getMemoizedResult(fn, deps) - получает мемоизированный результат
// getStats() - возвращает статистику мемоизации

// Пример использования:
// const memo = new MemoizationManager();
// const expensiveFn = memo.memoize(computeExpensive, [a, b], 'computations');
// const result = expensiveFn();
```

<details>
<summary> Решение</summary>

```typescript
interface MemoizedFunction<T extends Function> {
    fn: T;
    deps: DependencyList;
    category: string;
    lastResult: any;
    callCount: number;
    lastCallTime: number;
}

class MemoizationManager {
    private memoizedFunctions = new Map<string, MemoizedFunction<any>>();
    private categories = new Map<string, Set<string>>();
    private stats = {
        totalCalls: 0,
        cacheHits: 0,
        cacheMisses: 0,
        functionsCreated: 0,
        categoriesCreated: 0
    };

    // Мемоизация функции
    memoize<T extends Function>(
        fn: T, 
        deps: DependencyList, 
        category: string = 'default'
    ): T {
        const key = this.generateFunctionKey(fn, deps);
        
        // Проверяем, не мемоизирована ли уже функция
        if (this.memoizedFunctions.has(key)) {
            console.log(` Функция уже мемоизирована: ${key}`);
            return this.memoizedFunctions.get(key)!.fn;
        }

        // Создаем мемоизированную версию
        const memoizedFn = ((...args: any[]) => {
            this.stats.totalCalls++;
            
            // Проверяем, изменились ли зависимости
            const currentDeps = this.evaluateDependencies(deps);
            const memoized = this.memoizedFunctions.get(key)!;
            
            if (this.depsEqual(memoized.deps, currentDeps)) {
                this.stats.cacheHits++;
                memoized.callCount++;
                memoized.lastCallTime = Date.now();
                console.log(` Мемоизация: попадание для ${key}`);
                return memoized.lastResult;
            }

            // Вычисляем новый результат
            this.stats.cacheMisses++;
            const result = fn(...args);
            
            // Обновляем мемоизированную функцию
            memoized.lastResult = result;
            memoized.deps = [...currentDeps];
            memoized.callCount++;
            memoized.lastCallTime = Date.now();
            
            console.log(` Мемоизация: пересчет для ${key}`);
            return result;
        }) as T;

        // Сохраняем мемоизированную функцию
        const memoizedFunction: MemoizedFunction<T> = {
            fn: memoizedFn,
            deps: [...deps],
            category,
            lastResult: undefined,
            callCount: 0,
            lastCallTime: 0
        };

        this.memoizedFunctions.set(key, memoizedFunction);
        this.addToCategory(key, category);
        this.stats.functionsCreated++;

        console.log(` Мемоизация: создана функция ${key} в категории ${category}`);
        return memoizedFn;
    }

    // Получение мемоизированного результата
    getMemoizedResult<T>(fn: T, deps: DependencyList): any | null {
        const key = this.generateFunctionKey(fn, deps);
        const memoized = this.memoizedFunctions.get(key);
        
        if (!memoized) {
            console.log(` Мемоизация: функция не найдена ${key}`);
            return null;
        }

        const currentDeps = this.evaluateDependencies(deps);
        
        if (this.depsEqual(memoized.deps, currentDeps)) {
            console.log(` Мемоизация: результат найден для ${key}`);
            return memoized.lastResult;
        }

        console.log(` Мемоизация: зависимости изменились для ${key}`);
        return null;
    }

    // Инвалидация категории
    invalidateCategory(category: string): number {
        const categoryFunctions = this.categories.get(category);
        if (!categoryFunctions) {
            console.log(` Мемоизация: категория ${category} не найдена`);
            return 0;
        }

        let invalidated = 0;
        for (const key of categoryFunctions) {
            if (this.memoizedFunctions.delete(key)) {
                invalidated++;
            }
        }

        this.categories.delete(category);
        console.log(` Мемоизация: инвалидирована категория ${category} (${invalidated} функций)`);
        return invalidated;
    }

    // Инвалидация конкретной функции
    invalidateFunction<T>(fn: T, deps: DependencyList): boolean {
        const key = this.generateFunctionKey(fn, deps);
        const deleted = this.memoizedFunctions.delete(key);
        
        if (deleted) {
            // Удаляем из всех категорий
            for (const [category, functions] of this.categories) {
                functions.delete(key);
                if (functions.size === 0) {
                    this.categories.delete(category);
                }
            }
            console.log(` Мемоизация: инвалидирована функция ${key}`);
        }

        return deleted;
    }

    // Получение статистики
    getStats() {
        const totalFunctions = this.memoizedFunctions.size;
        const totalCategories = this.categories.size;
        const hitRate = this.stats.totalCalls > 0 
            ? (this.stats.cacheHits / this.stats.totalCalls * 100).toFixed(2) 
            : 0;

        return {
            ...this.stats,
            totalFunctions,
            totalCategories,
            hitRate: `${hitRate}%`,
            functionsByCategory: this.getFunctionsByCategory()
        };
    }

    // Получение функций по категориям
    getFunctionsByCategory() {
        const result: Record<string, number> = {};
        for (const [category, functions] of this.categories) {
            result[category] = functions.size;
        }
        return result;
    }

    // Получение информации о функции
    getFunctionInfo<T>(fn: T, deps: DependencyList) {
        const key = this.generateFunctionKey(fn, deps);
        const memoized = this.memoizedFunctions.get(key);
        
        if (!memoized) return null;

        return {
            key,
            category: memoized.category,
            callCount: memoized.callCount,
            lastCallTime: memoized.lastCallTime,
            hasResult: memoized.lastResult !== undefined,
            deps: memoized.deps
        };
    }

    // Вспомогательные методы
    private generateFunctionKey<T>(fn: T, deps: DependencyList): string {
        const fnString = fn.toString();
        const depsString = JSON.stringify(deps);
        return `fn_${this.hashCode(fnString + depsString)}`;
    }

    private hashCode(str: string): string {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return Math.abs(hash).toString(36);
    }

    private evaluateDependencies(deps: DependencyList): DependencyList {
        // В реальном приложении здесь может быть логика вычисления зависимостей
        return deps.map(dep => {
            if (typeof dep === 'function') {
                return dep();
            }
            return dep;
        });
    }

    private depsEqual(deps1: DependencyList, deps2: DependencyList): boolean {
        if (deps1.length !== deps2.length) return false;
        return deps1.every((dep, index) => dep === deps2[index]);
    }

    private addToCategory(key: string, category: string): void {
        if (!this.categories.has(category)) {
            this.categories.set(category, new Set());
            this.stats.categoriesCreated++;
        }
        this.categories.get(category)!.add(key);
    }

    // Очистка всех мемоизированных функций
    clear(): void {
        this.memoizedFunctions.clear();
        this.categories.clear();
        this.stats = { 
            totalCalls: 0, 
            cacheHits: 0, 
            cacheMisses: 0, 
            functionsCreated: 0, 
            categoriesCreated: 0 
        };
        console.log(' Мемоизация: все функции очищены');
    }
}

// Демонстрация использования
const memo = new MemoizationManager();

// Создание мемоизированной функции
const computeExpensive = (a: number, b: number) => {
    console.log('Выполняется дорогое вычисление...');
    return a * b + Math.random();
};

const memoizedCompute = memo.memoize(computeExpensive, [1, 2], 'computations');

// Вызовы функции
console.log('Результат 1:', memoizedCompute());
console.log('Результат 2:', memoizedCompute()); // из кэша
console.log('Результат 3:', memoizedCompute()); // из кэша

// Статистика
console.log('Статистика мемоизации:', memo.getStats());

// Инвалидация категории
memo.invalidateCategory('computations');
console.log('Результат после инвалидации:', memoizedCompute()); // пересчет

module.exports = MemoizationManager;
```

</details>

---

 Эти задачи помогут понять принципы управления зависимостями в TypeScript и научиться создавать эффективные системы кэширования и мемоизации.

---

##  Итог

**Типы и функции управления зависимостями** в TypeScript предоставляют мощные инструменты для оптимизации производительности приложений. Используйте `U` для кэширования вычислений и `u2` для оптимизации функций, чтобы создавать более эффективные и отзывчивые приложения.

**Ключевые принципы:**
- Кэшируйте дорогие вычисления
- Оптимизируйте функции с зависимостями
- Используйте типизированные зависимости
- Применяйте глубокое сравнение при необходимости

---
