# CSS Grid — короткая шпаргалка

## Минимальный шаблон

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}
```

## Три полезных приёма

### 1) Автоколонки

```css
grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
```

### 2) Явное позиционирование

```css
.item {
  grid-column: 1 / span 2;
}
```

## Заключение

Grid окупается, когда макет сложнее “просто список”.


