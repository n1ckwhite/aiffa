---
{
  "slug": "git-pull-vs-fetch-na-praktike",
  "title": "Git pull vs fetch — на практике и без мифов",
  "description": "Разбираем, что происходит под капотом Git, и когда лучше pull, а когда fetch + merge/rebase.",
  "date": "2025-12-06",
  "tags": ["Git", "Практика"],
  "readingTime": "7 мин",
  "coverImage": "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1400&q=80",
  "author": { "name": "aiffadev", "github": "aiffadev" }
}
---

# Git pull vs fetch — на практике

Самое короткое различие:

- **fetch**: забирает изменения, *не трогая* вашу рабочую ветку.
- **pull**: это `fetch` + автоматическая попытка *влить* изменения в текущую ветку.

## Почему fetch безопаснее

Когда вы делаете fetch, вы можете:

- посмотреть историю,
- сравнить изменения,
- осознанно выбрать `merge` или `rebase`.

## Когда pull уместен

Когда вы точно знаете, что хотите обновить текущую ветку *прямо сейчас*, и готовы принять merge/rebase‑результат сразу.

## Практика

1. `git fetch origin`
2. `git log --oneline --decorate --graph --all | head -n 20`
3. Выберите: `git merge origin/main` или `git rebase origin/main`


