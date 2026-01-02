# Тесты в React: минимальный набор, который реально нужен

## Что тестировать первым

### 1) Бизнес-логика и критичный UI

- авторизация
- оплата
- формы

### 2) Компоненты, которые часто ломают

## Пример (псевдо)

```ts
type Result = { ok: boolean; error?: string };

const validateEmail = (value: string): Result => {
  if (!value.includes("@")) return { ok: false, error: "Invalid email" };
  return { ok: true };
};
```

## Заключение

Минимальный набор тестов + дисциплина в CI дают больше пользы, чем “100% покрытие любой ценой”.


