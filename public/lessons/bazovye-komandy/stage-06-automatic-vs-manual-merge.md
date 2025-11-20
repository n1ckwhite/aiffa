#  Автоматическое и ручное слияние

Красивая и понятная памятка: когда Git сольёт всё сам, а когда попросит вашей помощи — и что делать в каждом случае.

---

## TLDR

| Ситуация | Что делает Git | Что делаем мы |
| --- | --- | --- |
| Изменены разные строки/файлы | Сливает автоматически | Ничего, обычный merge или pull |
| Одна и та же строка изменена в двух ветках | Конфликт | Разрешаем руками и коммитим |
| Файл удалён в одной ветке и изменён в другой | Конфликт | Решаем: удалить или оставить изменения |
| Сложная история (много merge/rebase) | Возможны конфликты | Разбираем по файлам, тестируем |

> Совет: перед merge обновляйте ветку (`git fetch` → `git rebase origin/main`). Это уменьшит шанс ручного разрешения конфликтов в PR.

> Важно: не делайте `rebase` публичных веток (например, `main`). Переписывание истории сломает чужие репозитории.

---

## Когда Git объединит сам (авто‑merge)

1) Разные строки одного файла или разные файлы.

```bash
# feature/login редактирует строку 10
# feature/ui     редактирует строку 200
# Итог: конфликтов нет
```

2) Добавления в разные части проекта.

```bash
# Ветка A добавляет файл src/api/user.ts
# Ветка B добавляет компонент src/components/Card.tsx
# Итог: git merge проходит без конфликтов
```

3) Независимые изменения в разных ветках.

---

## Когда потребуется ручное вмешательство

1) Одна и та же строка изменена по‑разному.

```txt
<<<<<<< HEAD
title = 'Hello!'
=======
title = 'Hi!'
>>>>>>> feature/greetings
```

2) Файл удалён в одной ветке и изменён в другой.

3) Любые пересекающиеся изменения, влияющие на одни и те же участки кода.

4) Сложная история: серия merge, rebase, cherry-pick.

---

## Алгоритм: как грамотно слить изменения

1. Обновить локальные ссылки на удалённые ветки

```bash
git fetch origin
```

2. Перейти в свою рабочую ветку и обновить её относительно целевой

```bash
git checkout feature/x
git merge origin/main   # или git rebase origin/main
```

3. Если есть конфликты — разрешить

```bash
git status                 # какие файлы конфликтуют
# правим файлы, удаляем маркеры <<<<<<< ======= >>>>>>>
git add <file1> <file2>
git commit                 # завершить merge
# rebase: git rebase --continue
```

4. Проверить проект (линтеры/тесты) и отправить изменения

```bash
git push
```

> Нужен откат попытки? Для merge используйте `git merge --abort`, для rebase — `git rebase --abort`.

---

## Быстрый справочник по разрешению конфликтов

```bash
# оставить «наши» изменения целиком
git checkout --ours   path/to/file

# оставить «их» изменения целиком
git checkout --theirs path/to/file

# добавить файл в индекс после ручной правки
git add path/to/file

# посмотреть, что ещё конфликтует
git status
```

Полезно: в IDE есть визуальные инструменты сравнения («Accept Current/Incoming Change» и т.п.).

---

##  Полезные ссылки

- Git — merge: https://git-scm.com/docs/git-merge
- Pro Git — Basic Branching and Merging: https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging
- Pro Git — Rebasing: https://git-scm.com/book/en/v2/Git-Branching-Rebasing

---

## Разворачиваем темы (подробности)

<details><summary>Что такое <em>fast‑forward merge</em>?</summary>

Когда ваша ветка строго «надстраивается» над целевой (например, `main` не ушёл вперёд), Git просто сдвигает указатель ветки — без merge‑коммита.

```bash
# если история линейная, то это fast-forward
git checkout main
git merge feature/login  # создастся НЕ merge-коммит, просто сдвиг
```

Плюсы: чистая, линейная история. Минус: сложнее видеть, когда именно ветка была слита.

</details>

<details><summary>Merge vs Rebase — что выбрать на практике?</summary>

- **Merge** сохраняет ветвления, наглядно показывает, где ветка вошла в `main`. Быстро и безопасно.
- **Rebase** переписывает коммиты, делая историю линейной. Отлично для фич‑веток перед merge, но не делайте rebase публичных веток.

Рекомендация: делайте `git rebase origin/main` в личных фич‑ветках перед merge; в `main` вливайте через merge (или squash‑merge в PR).

</details>

<details><summary>Инструменты для разрешения конфликтов (ссылки)</summary>

- [Git — раздел «Basic Merge Conflicts»](https://git-scm.com/docs/git-merge#_how_conflicts_are_presented)
- [Pro Git, глава «Ветвление — Основы»](https://git-scm.com/book/ru/v2/%D0%92%D0%B5%D1%82%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B2-Git-%D0%9E%D1%81%D0%BD%D0%BE%D0%B2%D1%8B)
- [Atlassian Git Tutorials — Merge vs Rebase](https://www.atlassian.com/git/tutorials/merging-vs-rebasing)
- [VS Code — Resolve merge conflicts](https://code.visualstudio.com/docs/sourcecontrol/overview#_merge-conflicts)

</details>

<details><summary>Чек‑лист перед <code>git push</code></summary>

1. `git fetch` → подтянуть удалённые изменения.
2. `git rebase origin/main` или `git merge origin/main` — обновить ветку.
3. Разрешить конфликты, прогнать тесты/линтеры, собрать проект.
4. Просмотреть diff ещё раз: `git diff --cached`.
5. Пушим: `git push`.

</details>

---

## Примеры

### Автоматическое слияние

```bash
# main
console.log('Hello');

# feature
console.log('Hello');
console.log('New feature!');

# после merge
console.log('Hello');
console.log('New feature!');
```

### Конфликтное слияние

```txt
# main
console.log('Hello!')

# feature
console.log('Hi!')

# после git merge — появятся маркеры в файле
<<<<<<< HEAD
console.log('Hello!')
=======
console.log('Hi!')
>>>>>>> feature
```

---

## Памятка перед merge/push

- Обновите базовую ветку: `git fetch` → `git merge origin/main` или `git rebase origin/main`.
- Разрешайте конфликты сразу — не копите.
- Запустите тесты/линтеры, проверьте сборку.
- Дайте понятный message коммита после разрешения конфликтов.

<details>
<summary>[ШПАРГАЛКА] Команды для «быстрого ручного мерджа»</summary>

```bash
git fetch origin
git checkout feature/x
git rebase origin/main   # или git merge origin/main
# решаем конфликты →
git add -A
git rebase --continue    # или git commit
git push
```

</details>

---

## Итог

- Авто‑слияние происходит, когда изменения не пересекаются.
- При пересечениях решаем вручную с помощью маркеров конфликтов.
- Чистая история и раннее обновление веток существенно снижают вероятность конфликтов.

---