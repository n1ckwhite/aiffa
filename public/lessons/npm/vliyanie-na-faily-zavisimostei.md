#  Влияние на файлы зависимостей

Команды `npm ci` и `npm install` имеют разные подходы к работе с файлами зависимостей, такими как `package-lock.json` и `yarn.lock`. Понимание этих различий критически важно для правильного управления зависимостями.

---

##  Влияние на package-lock.json

###  npm ci и package-lock.json

**Принцип работы:**
- Устанавливает зависимости строго на основе `package-lock.json`
- Игнорирует `package.json` при установке
- Использует только версии пакетов из lock-файла

**Поведение:**
```bash
# npm ci строго следует package-lock.json
npm ci

# Если package-lock.json неактуален - ошибка
# → Error: The package-lock.json file is out of sync with package.json
```

**Ключевые особенности:**
-  **Не изменяет** package-lock.json
-  **Требует** обязательного наличия файла
-  **Удаляет** node_modules перед установкой
-  **Гарантирует** воспроизводимость

###  npm install и package-lock.json

**Принцип работы:**
- Устанавливает зависимости на основе `package-lock.json`
- Проверяет `package.json` на изменения
- Может обновлять lock-файл при необходимости

**Поведение:**
```bash
# npm install может обновлять package-lock.json
npm install

# Добавление новой зависимости
npm install new-package

# Обновление существующей зависимости
npm install package@latest
```

**Ключевые особенности:**
-  **Может изменять** package-lock.json
-  **Работает** без lock-файла
-  **Сохраняет** node_modules
-  **Обеспечивает** гибкость

---

##  Сравнение поведения

###  Таблица сравнения

| Аспект | npm ci | npm install |
|--------|--------|-------------|
| **Источник зависимостей** | Только package-lock.json | package-lock.json + package.json |
| **Обновление lock-файла** | Не обновляет | Может обновлять |
| **Удаление node_modules** | Автоматически удаляет | Не удаляет |
| **Требования** | Обязательно package-lock.json | package.json достаточно |
| **Скорость** | Быстрее | Медленнее |
| **Предсказуемость** | Высокая | Средняя |
| **Гибкость** | Низкая | Высокая |

###  Сценарии использования

**npm ci подходит для:**
```bash
# CI/CD пайплайны
npm ci

# Продакшн деплои
npm ci --only=production

# Тестирование стабильности
npm ci && npm test

# Контейнеризация
# Dockerfile
COPY package*.json ./
RUN npm ci
```

**npm install подходит для:**
```bash
# Разработка
npm install

# Добавление зависимостей
npm install lodash

# Обновление пакетов
npm install package@latest

# Удаление зависимостей
npm uninstall package
```

---

##  Влияние на yarn.lock

###  Работа с Yarn

**yarn install:**
```bash
# Устанавливает зависимости на основе yarn.lock
yarn install

# Если yarn.lock актуален - используется он
# Если package.json изменен - обновляется yarn.lock
```

**yarn upgrade:**
```bash
# Обновляет зависимости согласно package.json
yarn upgrade

# Обновляет yarn.lock
# Может изменить версии пакетов
```

###  Сравнение с npm

**Аналогии:**
- `yarn install` ≈ `npm install`
- `yarn upgrade` ≈ `npm update`
- `yarn.lock` ≈ `package-lock.json`

**Различия:**
- Yarn создает `yarn.lock` вместо `package-lock.json`
- Yarn имеет более детерминированный алгоритм разрешения
- Yarn быстрее в некоторых сценариях

---

##  Практические примеры

###  Сценарий 1: Разработка с npm install

**Рабочий процесс:**
```bash
# 1. Клонирование репозитория
git clone <repository>
cd <project>

# 2. Установка зависимостей
npm install

# 3. Добавление новой зависимости
npm install axios

# 4. Проверка изменений
git diff package-lock.json

# 5. Коммит изменений
git add package*.json
git commit -m "Add axios dependency"
```

**Результат:**
- `package-lock.json` обновлен
- `node_modules` содержит новые пакеты
- Зависимости готовы для разработки

###  Сценарий 2: CI/CD с npm ci

**GitHub Actions:**
```yaml
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
      - run: npm ci
      - run: npm test
      - run: npm run build
```

**Результат:**
- `package-lock.json` не изменен
- `node_modules` пересоздан
- Воспроизводимая установка

###  Сценарий 3: Обновление зависимостей

**С npm install:**
```bash
# 1. Проверка устаревших пакетов
npm outdated

# 2. Обновление всех пакетов
npm update

# 3. Обновление конкретного пакета
npm install lodash@latest

# 4. Проверка изменений
git diff package-lock.json
```

**С npm ci:**
```bash
# 1. Обновление package.json
# (вручную или через npm install)

# 2. Обновление package-lock.json
npm install

# 3. Тестирование с npm ci
npm ci

# 4. Проверка работоспособности
npm test
```

---

##  Обработка ошибок

###  Ошибки npm ci

**Отсутствие package-lock.json:**
```bash
npm ci
# → Error: npm ci can only install packages when a package-lock.json is present.

# Решение:
npm install
```

**Несоответствие файлов:**
```bash
npm ci
# → Error: The package-lock.json file is out of sync with package.json

# Решение:
npm install
```

###  Ошибки npm install

**Конфликты версий:**
```bash
npm install
# → Error: ERESOLVE overriding peer dependency

# Решение:
npm install --legacy-peer-deps
# или
npm install --force
```

**Проблемы с правами:**
```bash
npm install
# → Error: EACCES: permission denied

# Решение:
sudo chown -R $USER:$GROUP ~/.npm
```

---

##  Лучшие практики

###  Для разработки

**Рекомендации:**
```bash
# 1. Используйте npm install для управления зависимостями
npm install new-package

# 2. Регулярно обновляйте package-lock.json
npm install

# 3. Коммитьте оба файла
git add package*.json
git commit -m "Update dependencies"

# 4. Тестируйте с npm ci
npm ci && npm test
```

###  Для автоматизации

**Рекомендации:**
```bash
# 1. Всегда используйте npm ci в CI/CD
npm ci

# 2. Проверяйте наличие package-lock.json
ls package-lock.json

# 3. Настройте кэширование
# В GitHub Actions:
- uses: actions/setup-node@v2
  with:
    cache: 'npm'

# 4. Мониторьте время установки
time npm ci
```

###  Для команды

**Соглашения:**
- Всегда коммитьте `package-lock.json`
- Используйте `npm ci` для тестирования
- Документируйте изменения зависимостей
- Регулярно обновляйте устаревшие пакеты

---

##  Мониторинг и диагностика

###  Проверка состояния файлов

**Проверка синхронизации:**
```bash
# Проверка соответствия файлов
npm ls --depth=0

# Проверка устаревших пакетов
npm outdated

# Проверка безопасности
npm audit
```

**Анализ зависимостей:**
```bash
# Размер node_modules
du -sh node_modules

# Количество пакетов
npm list --depth=0 | wc -l

# Дублирующиеся пакеты
npm dedupe
```

###  Автоматические проверки

**Pre-commit хук:**
```bash
#!/bin/sh
# Проверка синхронизации
npm ci --silent
npm test
```

**CI/CD проверки:**
```yaml
- name: Check package-lock.json
  run: |
    if [ ! -f package-lock.json ]; then
      echo "package-lock.json is missing"
      exit 1
    fi

- name: Install dependencies
  run: npm ci

- name: Run tests
  run: npm test
```

---

##  Важные замечания

- **package-lock.json** критически важен для npm ci
- **Синхронизация файлов** должна быть регулярной
- **npm ci** не изменяет lock-файл
- **npm install** может обновлять lock-файл
- **Воспроизводимость** обеспечивается npm ci
- **Гибкость** обеспечивается npm install

---

##  Итог

`npm ci` и `npm install` имеют принципиально разные подходы к работе с файлами зависимостей. `npm ci` обеспечивает воспроизводимость и стабильность, а `npm install` предоставляет гибкость для управления зависимостями.

##  ЗАДАЧИ

Задачи по теме `Влияние на файлы зависимостей`:

###  Задача 1: Обновление package-lock.json

Какая команда обновляет package-lock.json при изменении package.json?

<details>
<summary> Решение</summary>

**Правильная команда:**
```bash
npm install
```

**Объяснение:**
- `npm install` проверяет package.json на изменения
- Может обновлять package-lock.json при необходимости
- Синхронизирует файлы зависимостей
- Обеспечивает актуальность lock-файла

</details>

---

###  Задача 2: Строгое следование lock-файлу

Какая команда устанавливает зависимости строго на основе package-lock.json?

<details>
<summary> Решение</summary>

**Правильная команда:**
```bash
npm ci
```

**Объяснение:**
- `npm ci` использует только package-lock.json
- Игнорирует package.json при установке
- Не изменяет lock-файл
- Обеспечивает воспроизводимость

</details>

---

###  Задача 3: Создание package-lock.json

Что делать, если package-lock.json отсутствует, но нужен для npm ci?

<details>
<summary> Решение</summary>

**Правильная команда:**
```bash
npm install
```

**Объяснение:**
- `npm install` создаст package-lock.json
- Работает без lock-файла
- Создает основу для npm ci
- После этого можно использовать npm ci

</details>

---

 Освоив влияние команд на файлы зависимостей, вы сможете эффективно управлять зависимостями в проектах!

---