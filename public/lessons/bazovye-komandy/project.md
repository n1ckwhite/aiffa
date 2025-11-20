Пройдите полный цикл работы с Git: от создания ветки до merge через Pull Request. После проекта вы уверенно выполните базовые операции, сможете оформить PR и разрешить простой конфликт.

## Что вы сделаете

1. Создадите репозиторий и настроите `README.md`.
2. Добавите `.gitignore` для Node.js.
3. Создадите ветку `feature/*`, внесёте изменения и сделаете коммит.
4. Отправите ветку на GitHub и создадите Pull Request.
5. Выполните merge (Merge Commit).
6. Смоделируете и решите простой конфликт.

> Подсказка: Используйте одинаковый стиль коммитов — императив и префиксы:  
> `feat: ...`, `fix: ...`, `docs: ...`.

## Подготовка

Создайте пустой публичный репозиторий на GitHub, затем инициализируйте локально:

```bash
git init
git remote add origin <HTTPS-или-SSH-URL>
echo "# mini-git-workflow" > README.md
git add README.md
git commit -m "chore: init repository with README"
git push -u origin main
```

Добавьте базовый `.gitignore`:

```bash
curl -sL https://raw.githubusercontent.com/github/gitignore/main/Node.gitignore > .gitignore
git add .gitignore
git commit -m "chore: add Node.js .gitignore"
git push
```

## Шаги проекта

1) Создайте ветку фичи:

```bash
git switch -c feature/welcome-section
```

2) Внесите изменения (например, добавьте файл `docs/welcome.md` и ссылку на него в `README.md`), затем закоммитьте:

```bash
git add .
git commit -m "feat: add welcome section and link in README"
git push -u origin HEAD
```

3) Создайте Pull Request на GitHub из своей ветки в `main`. В описании коротко напишите что изменили.

4) Выполните merge PR кнопкой “Merge pull request” → “Create a merge commit”.

<details>
  <summary>Как смоделировать конфликт</summary>

  Самый простой способ — изменить одну и ту же строку в `README.md` по‑разному в двух ветках:

  1. На ветке `main` измените строку и закоммитьте.
  2. Вернитесь в ветку `feature/*`, измените её иначе и тоже закоммитьте.
  3. Попробуйте смёрджить ветку в `main` — получите конфликт.

  Разрешите конфликт локально:

```bash
git switch main
git pull
git merge feature/welcome-section   # появится конфликт
# отредактируйте конфликтный файл(ы), оставив итоговую версию
git add .
git commit                          # завершите merge
git push
```

  После этого обновите PR или создайте новый.
</details>

## Критерии готовности

- Репозиторий опубликован на GitHub.  
- Pull Request смёрджен в `main` через Merge Commit.  
- Конфликт разрешён корректно (если моделировали).  
- История коммитов чистая и понятная (нет лишних “fix typo” подряд — можно squash в ветке до PR).

> Заметка: Держите сообщение коммита информативным.  

## Что отправить на проверку

- Ссылку на репозиторий.  
- Ссылку на Pull Request, который был смёрджен.  
- Коротко: какой конфликт моделировали и как приняли решение о финальной версии.
