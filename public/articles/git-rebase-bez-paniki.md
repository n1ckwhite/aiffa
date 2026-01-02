# Git rebase без паники

## Когда уместен rebase

- Локальная ветка ещё не расшарена
- Хочешь держать историю линейной

## Базовый сценарий

```bash
git fetch origin
git rebase origin/main
```

### Конфликты

```bash
git status
git add .
git rebase --continue
```

## Заключение

Если сомневаешься — используй merge. Если уверен и ветка локальная — rebase даёт аккуратную историю.


