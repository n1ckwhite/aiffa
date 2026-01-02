# TypeScript Generics — просто и по делу

## Самая простая форма

```ts
const wrap = <T,>(value: T) => ({ value });

const a = wrap(123); // { value: number }
const b = wrap("hi"); // { value: string }
```

## Зачем это нужно

### Реиспользование без any

```ts
const first = <T,>(items: T[]) => {
  if (items.length === 0) return null;
  return items[0];
};
```

## Заключение

Смотри на generics как на “параметр типа”: он делает API универсальным и безопасным.


