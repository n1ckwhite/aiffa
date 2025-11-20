#  Проблемы с npm ci и их решения

`npm ci` — это мощный инструмент для установки зависимостей, однако в некоторых ситуациях его использование может привести к проблемам. Понимание этих проблем и способов их решения критически важно для эффективного использования команды.

---

##  Основные проблемы npm ci

###  Проблема 1: Отсутствие package-lock.json

**Описание проблемы:**
Если в проекте нет файла `package-lock.json`, команда `npm ci` не сможет выполниться, так как она требует этот файл для работы.

**Симптомы:**
```bash
npm ci
# → Error: npm ci can only install packages when a package-lock.json is present.
```

**Причины:**
- Файл не был создан при инициализации проекта
- Файл был случайно удален
- Файл не был закоммичен в репозиторий

**Решение:**
```bash
# 1. Создание package-lock.json
npm install

# 2. Проверка создания файла
ls -la package-lock.json

# 3. Коммит в репозиторий
git add package-lock.json
git commit -m "Add package-lock.json"

# 4. Теперь можно использовать npm ci
npm ci
```

**Профилактика:**
- Всегда коммитьте `package-lock.json` в репозиторий
- Добавьте `package-lock.json` в `.gitignore` исключения
- Настройте pre-commit хуки для проверки наличия файла

---

###  Проблема 2: Неактуальный package-lock.json

**Описание проблемы:**
Если `package-lock.json` устарел по сравнению с `package.json`, `npm ci` не установит новые зависимости, что приведет к ошибкам о недостающих пакетах.

**Симптомы:**
```bash
npm ci
# → Error: The package-lock.json file is out of sync with package.json
```

**Причины:**
- Добавлены новые зависимости в `package.json`
- Изменены версии зависимостей
- Удалены зависимости из `package.json`
- Файлы были изменены вручную

**Решение:**
```bash
# 1. Синхронизация файлов
npm install

# 2. Проверка изменений
git diff package-lock.json

# 3. Коммит обновленного файла
git add package-lock.json
git commit -m "Update package-lock.json"

# 4. Теперь можно использовать npm ci
npm ci
```

**Профилактика:**
- Всегда запускайте `npm install` после изменения `package.json`
- Коммитьте оба файла одновременно
- Используйте линтеры для проверки синхронизации

---

###  Проблема 3: Неподдерживаемые версии пакетов

**Описание проблемы:**
Если в `package-lock.json` указаны версии пакетов, которые больше не поддерживаются или удалены из реестра, `npm ci` не сможет установить такие зависимости.

**Симптомы:**
```bash
npm ci
# → Error: npm ERR! 404 Not Found: <package-name>@<version>
# → Error: npm ERR! 404 Not Found: <package-name>@<version>
```

**Причины:**
- Пакет был удален из npm реестра
- Версия пакета больше не доступна
- Пакет был переименован или перемещен
- Проблемы с сетью или реестром

**Решение:**
```bash
# 1. Проверка устаревших пакетов
npm outdated

# 2. Обновление до стабильных версий
npm update

# 3. Поиск альтернатив для недоступных пакетов
npm search <alternative-package>

# 4. Удаление проблемных зависимостей
npm uninstall <problematic-package>

# 5. Обновление package-lock.json
npm install

# 6. Тестирование установки
npm ci
```

**Профилактика:**
- Регулярно проверяйте актуальность зависимостей
- Используйте стабильные версии пакетов
- Настройте автоматические проверки безопасности
- Документируйте альтернативы для критических пакетов

---

###  Проблема 4: Конфликты с окружением

**Описание проблемы:**
В некоторых случаях `npm ci` может привести к проблемам с окружением, особенно если существуют специфические настройки или скрипты, которые должны выполняться при установке.

**Симптомы:**
```bash
npm ci
# → Error: npm ERR! Failed to execute install script
# → Error: npm ERR! Missing environment variable: <VAR_NAME>
```

**Причины:**
- Отсутствуют переменные окружения
- Неправильные права доступа
- Конфликты с системными пакетами
- Проблемы с Node.js версией

**Решение:**
```bash
# 1. Установка переменных окружения
export NODE_ENV=production
export NPM_CONFIG_REGISTRY=https://registry.npmjs.org/

# 2. Проверка прав доступа
sudo chown -R $USER:$GROUP ~/.npm
sudo chown -R $USER:$GROUP node_modules

# 3. Очистка кэша npm
npm cache clean --force

# 4. Проверка версии Node.js
node --version
npm --version

# 5. Альтернативная установка
npm install --ignore-scripts
```

**Профилактика:**
- Документируйте требования к окружению
- Используйте `.env` файлы для переменных
- Настройте CI/CD с правильными переменными
- Тестируйте в разных окружениях

---

##  Дополнительные проблемы

###  Проблема 5: Недостаточно места на диске

**Описание проблемы:**
`npm ci` может не хватить места на диске, особенно при работе с большими проектами.

**Решение:**
```bash
# 1. Проверка свободного места
df -h

# 2. Очистка временных файлов
npm cache clean --force

# 3. Удаление старых node_modules
rm -rf node_modules

# 4. Установка только production зависимостей
npm ci --only=production
```

###  Проблема 6: Сетевые проблемы

**Описание проблемы:**
Проблемы с сетью могут помешать загрузке пакетов.

**Решение:**
```bash
# 1. Проверка подключения к npm
npm ping

# 2. Изменение реестра
npm config set registry https://registry.npmjs.org/

# 3. Использование прокси
npm config set proxy http://proxy.company.com:8080
npm config set https-proxy http://proxy.company.com:8080

# 4. Повторная попытка
npm ci --retry 3
```

---

##  Стратегии предотвращения проблем

###  Лучшие практики

**Для разработки:**
```bash
# 1. Регулярная синхронизация
npm install
git add package*.json
git commit -m "Update dependencies"

# 2. Проверка перед коммитом
npm ci
npm test

# 3. Использование .npmrc
echo "save-exact=true" > .npmrc
```

**Для CI/CD:**
```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
          cache: 'npm'
      - run: npm ci --prefer-offline
      - run: npm test
```

###  Мониторинг и диагностика

**Проверка состояния проекта:**
```bash
# Проверка устаревших пакетов
npm outdated

# Проверка безопасности
npm audit

# Проверка размера node_modules
du -sh node_modules

# Проверка зависимостей
npm list --depth=0
```

**Автоматические проверки:**
```bash
# Pre-commit хук
#!/bin/sh
npm ci --silent
npm test
```

---

##  Альтернативные решения

###  Когда npm ci не подходит

**Использование npm install:**
```bash
# Для разработки
npm install

# Для обновления зависимостей
npm update

# Для добавления новых пакетов
npm install new-package
```

**Использование других менеджеров:**
```bash
# Yarn
yarn install

# pnpm
pnpm install

# Bun
bun install
```

---

##  Важные замечания

- **package-lock.json** критически важен для npm ci
- **Синхронизация файлов** должна быть регулярной
- **Мониторинг зависимостей** помогает избежать проблем
- **Тестирование** в разных окружениях обязательно
- **Документация** требований к окружению важна

---

##  Итог

Хотя `npm ci` предлагает множество преимуществ, важно быть внимательным к его использованию и следить за состоянием файлов `package.json` и `package-lock.json`. Регулярное тестирование и обновление зависимостей поможет избежать большинства проблем.

##  ЗАДАЧИ

Задачи по теме `Проблемы с npm ci и их решения`:

###  Задача 1: Отсутствие package-lock.json

Что делать, если команда npm ci завершается с ошибкой "package-lock.json not found"?

<details>
<summary> Решение</summary>

**Правильная команда:**
```bash
npm install
```

**Объяснение:**
- `npm install` создаст package-lock.json
- После этого можно использовать npm ci
- npm install работает без lock-файла
- Создает основу для последующего использования npm ci

</details>

---

###  Задача 2: Неактуальный package-lock.json

Как синхронизировать package-lock.json с package.json?

<details>
<summary> Решение</summary>

**Правильная команда:**
```bash
npm install
```

**Объяснение:**
- `npm install` обновит package-lock.json
- Синхронизирует файлы согласно package.json
- После этого npm ci будет работать корректно
- Коммитьте обновленный package-lock.json

</details>

---

 Освоив решение проблем с npm ci, вы сможете эффективно использовать команду в любых условиях!

---