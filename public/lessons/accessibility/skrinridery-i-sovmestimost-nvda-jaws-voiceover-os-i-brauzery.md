#  Скринридеры и совместимость: NVDA, JAWS, VoiceOver + ОС и браузеры

Каждый скринридер оптимизирован для определённых ОС и браузеров: NVDA/JAWS — Windows + Chrome/Firefox, VoiceOver — macOS/iOS + Safari. Для качественного тестирования A11Y нужно покрывать основные комбинации.

---

##  Короткое резюме
- **NVDA/JAWS**: только Windows, лучше всего с Chrome/Firefox/Edge.
- **VoiceOver**: только Apple (macOS/iOS), оптимален с Safari.
- **Кроссплатформенность**: каждый SR привязан к своей экосистеме.
- **Что уметь**: тестировать в основных комбинациях, знать особенности каждого SR. 

---

##  Основные скринридеры и их экосистемы

### NVDA (NonVisual Desktop Access)
**ОС:** только Windows (7, 8, 10, 11)
**Лучшие браузеры:**
- Chrome — отличная совместимость, быстрые обновления
- Firefox — популярен среди разработчиков A11Y
- Edge (Chromium) — хорошая поддержка

**Особенности:**
- Бесплатный и открытый
- Активное сообщество разработчиков
- Частые обновления

```html
<!-- Хорошо работает в NVDA -->
<button aria-expanded="false" aria-controls="menu">
  Меню
</button>
<ul id="menu" hidden>
  <li><a href="/home">Главная</a></li>
</ul>
```

### JAWS (Job Access With Speech)
**ОС:** только Windows (10, 11 рекомендуется)
**Лучшие браузеры:**
- Chrome — отличная поддержка
- Edge (Chromium) — высокая совместимость
- Firefox — работает хорошо
- IE — поддерживается, но устарел

**Особенности:**
- Коммерческий продукт (дорогой)
- Широко используется в корпорациях
- Мощные возможности настройки

### VoiceOver
**ОС:** только Apple (macOS, iOS, iPadOS)
**Лучшие браузеры:**
- Safari — идеальная интеграция
- Chrome — хорошая поддержка
- Firefox — базовая поддержка

**Особенности:**
- Встроен в систему (бесплатный)
- Глубокая интеграция с ОС
- Уникальные жесты и команды

```html
<!-- VoiceOver хорошо читает роторы -->
<nav role="navigation" aria-label="Основная навигация">
  <ul>
    <li><a href="/">Главная</a></li>
    <li><a href="/about">О нас</a></li>
  </ul>
</nav>
```

---

##  Таблица совместимости

| Скринридер | ОС | Браузеры | Статус | Примечания |
|------------|----|-----------|---------|-----------| 
| **NVDA** | Windows | Chrome  Firefox  Edge  | Бесплатный | Лучший выбор для разработчиков |
| **JAWS** | Windows | Chrome  Edge  Firefox  | Платный | Корпоративный стандарт |
| **VoiceOver** | macOS/iOS | Safari  Chrome  Firefox  | Встроенный | Только Apple экосистема |
| **Narrator** | Windows | Edge  Chrome  | Встроенный | Базовая функциональность |
| **TalkBack** | Android | Chrome  | Встроенный | Мобильная платформа |
| **Orca** | Linux | Firefox  Chromium  | Бесплатный | Открытая альтернатива |

**Легенда:**  Отлично,  Работает с ограничениями,  Не поддерживается

---

##  Рекомендации по тестированию

### Минимальный набор для тестирования
1. **Windows + NVDA + Chrome** — самая популярная комбинация
2. **macOS + VoiceOver + Safari** — стандарт для Apple
3. **Windows + JAWS + Edge** — корпоративная среда

### Расширенное тестирование
```js
// Определение скринридера (приблизительно)
function detectScreenReader() {
  // Проверка через доступные API
  if (window.speechSynthesis) {
    return 'Возможно используется SR';
  }
  
  // Проверка специфичных индикаторов
  if (navigator.userAgent.includes('NVDA')) return 'NVDA';
  if (window.navigator.userAgent.includes('JAWS')) return 'JAWS';
  
  return 'Неизвестно';
}
```

### Автоматизация тестирования
```js
// Тестирование с axe-core
import { axe } from 'axe-core';

async function testAccessibility() {
  const results = await axe.run();
  
  // Проверяем специфичные для SR проблемы
  const srIssues = results.violations.filter(violation => 
    violation.tags.includes('screen-reader')
  );
  
  return srIssues;
}
```

---

##  Особенности разных комбинаций

### Windows + NVDA + Chrome
```html
<!-- Отлично работает -->
<div role="tablist">
  <button role="tab" aria-selected="true">Вкладка 1</button>
  <button role="tab" aria-selected="false">Вкладка 2</button>
</div>
```

**Плюсы:**
- Быстрая поддержка новых ARIA‑атрибутов
- Активное сообщество
- Бесплатный доступ

**Минусы:**
- Может быть нестабилен в бета‑версиях
- Зависит от обновлений Chrome

### macOS + VoiceOver + Safari
```html
<!-- VoiceOver любит чёткую структуру -->
<main role="main">
  <h1>Заголовок страницы</h1>
  <nav role="navigation">
    <h2>Навигация</h2>
    <ul>
      <li><a href="/">Главная</a></li>
    </ul>
  </nav>
</main>
```

**Плюсы:**
- Глубокая интеграция с ОС
- Стабильная работа
- Уникальные возможности навигации

**Минусы:**
- Только Apple устройства
- Медленнее внедряет новые стандарты

### Windows + JAWS + Edge
**Плюсы:**
- Корпоративная поддержка
- Мощные настройки
- Стабильность

**Минусы:**
- Высокая стоимость
- Сложность настройки

---

##  Практические советы для разработчиков

### Приоритизация тестирования
1. **Начните с NVDA + Chrome** — покрывает ~60% пользователей SR
2. **Добавьте VoiceOver + Safari** — для пользователей Apple
3. **Проверьте JAWS + Edge** — для корпоративных клиентов

### Общие принципы совместимости
```html
<!-- Работает везде: чёткая семантика -->
<form>
  <label for="email">Email</label>
  <input id="email" type="email" required aria-describedby="email-help">
  <div id="email-help">Мы не передаём email третьим лицам</div>
</form>

<!-- Работает везде: стандартные роли -->
<nav aria-label="Основная навигация">
  <ul>
    <li><a href="/" aria-current="page">Главная</a></li>
    <li><a href="/about">О нас</a></li>
  </ul>
</nav>
```

### Избегайте специфичных хаков
```html
<!--  ПЛОХО: хак для конкретного SR -->
<div class="nvda-only">Только для NVDA</div>

<!--  ХОРОШО: универсальный подход -->
<div class="sr-only">Для всех скринридеров</div>
```

---

##  Альтернативные скринридеры

### Мобильные платформы
- **TalkBack** (Android) + Chrome
- **VoiceOver** (iOS) + Safari
- **Voice Assistant** (Samsung) + Samsung Internet

### Linux
- **Orca** + Firefox/Chromium
- **Speakup** (консольный)

### Встроенные в ОС
- **Narrator** (Windows) — базовая функциональность
- **ChromeVox** (Chrome OS) — веб‑ориентированный

---

##  Практические правила
- **Тестируйте в основных комбинациях** — NVDA+Chrome, VoiceOver+Safari, JAWS+Edge
- **Используйте стандартную семантику** — она работает везде
- **Избегайте SR‑специфичных решений** — стремитесь к универсальности
- **Автоматизируйте базовые проверки** — axe, Lighthouse, Pa11y
- **Привлекайте реальных пользователей** — ничто не заменит живое тестирование

> Важно: каждый SR имеет особенности, но хорошая семантика работает везде.

---

##  Итог
- Каждый скринридер привязан к своей экосистеме ОС и браузеров.
- Тестируйте в основных комбинациях для максимального покрытия.
- Стандартная семантика — ключ к кроссплатформенной совместимости. 

##  ЗАДАЧИ

Набор задач для практики тестирования с разными скринридерами:

---

###  Задача 1: Выбор комбинации для тестирования
 У вас есть веб‑приложение для корпоративных клиентов. Какие 3 комбинации SR+браузер приоритетны?

<details>
<summary> Решение</summary>

1. **JAWS + Edge** — корпоративный стандарт
2. **NVDA + Chrome** — популярная бесплатная альтернатива
3. **VoiceOver + Safari** — для пользователей Mac в офисе

</details>

---

###  Задача 2: Универсальная разметка
 Создайте форму, которая хорошо работает во всех основных скринридерах.

```html
<!-- Ваша разметка -->
```

<details>
<summary> Решение</summary>

```html
<form>
  <fieldset>
    <legend>Контактная информация</legend>
    
    <label for="name">Имя *</label>
    <input id="name" type="text" required aria-describedby="name-help">
    <div id="name-help">Введите ваше полное имя</div>
    
    <label for="email">Email *</label>
    <input id="email" type="email" required aria-describedby="email-help">
    <div id="email-help">Мы не передаём email третьим лицам</div>
    
    <button type="submit">Отправить</button>
  </fieldset>
</form>
```

</details>

---

###  Задача 3: Проверка совместимости
 Напишите функцию для проверки базовой A11Y‑совместимости элемента.

```js
function checkA11yCompatibility(element) {
  // Ваш код
}
```

<details>
<summary> Решение</summary>

```js
function checkA11yCompatibility(element) {
  const issues = [];
  
  // Проверяем доступное имя
  const accessibleName = element.getAttribute('aria-label') || 
                        element.textContent || 
                        element.getAttribute('alt');
  if (!accessibleName && element.tagName !== 'DIV') {
    issues.push('Отсутствует доступное имя');
  }
  
  // Проверяем роль
  const role = element.getAttribute('role') || element.tagName.toLowerCase();
  if (role === 'div' && element.onclick) {
    issues.push('Интерактивный div без роли');
  }
  
  // Проверяем фокусируемость
  const tabindex = element.getAttribute('tabindex');
  const isFocusable = element.matches('button, a[href], input, select, textarea') || 
                     tabindex === '0';
  if (element.onclick && !isFocusable) {
    issues.push('Интерактивный элемент не фокусируется');
  }
  
  return {
    compatible: issues.length === 0,
    issues: issues
  };
}
```

</details>

---

##  Самопроверка

1. Может ли NVDA работать на macOS?

<details>
<summary> Вывод</summary>
Нет. NVDA разработан исключительно для Windows и не портирован на другие ОС.
</details>

2. Какой браузер лучше всего работает с VoiceOver?

<details>
<summary> Вывод</summary>
Safari — он глубоко интегрирован с VoiceOver и обеспечивает лучший UX.
</details>

3. Какая минимальная комбинация покрывает большинство пользователей SR?

<details>
<summary> Вывод</summary>
NVDA + Chrome (Windows) и VoiceOver + Safari (macOS) — покрывают ~80% пользователей.
</details>

---

 Эти задачи помогают закрепить: выбор правильных комбинаций для тестирования, создание универсальной разметки и понимание экосистем скринридеров.

---
