# A11y: focus-visible без боли

## Почему `:focus-visible`

`:focus-visible` показывается в основном при клавиатурной навигации — это то, что нам нужно.

```css
button:focus-visible,
a:focus-visible {
  outline: 3px solid #60a5fa;
  outline-offset: 3px;
}
```

## Практика

### Тестируй табом

Проверь путь Tab/Shift+Tab на ключевых страницах.

## Заключение

Стабильный, контрастный и предсказуемый фокус — это маленькая правка, которая сильно улучшает UX.


