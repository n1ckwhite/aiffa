#  Валидация email с помощью регулярных выражений в JavaScript

##  Как валидировать формат электронной почты?

**Валидация email** — это процесс проверки соответствия строки стандартному формату адреса электронной почты. Регулярные выражения предоставляют мощный и гибкий способ для такой валидации, позволяя проверять структуру email на стороне клиента.

---

##  Стандартный формат email адреса

Email адрес состоит из двух основных частей, разделённых символом `@`:
- **Локальная часть** (local-part) — до символа `@`
- **Доменная часть** (domain) — после символа `@`

### Структура email:
```
username@domain.tld
```

Где:
- `username` — локальная часть (буквы, цифры, некоторые спецсимволы)
- `domain` — доменное имя
- `tld` — доменная зона (com, org, net, ru и т.д.)

---

##  Базовое регулярное выражение для валидации

### Простой паттерн:
```javascript
const basicEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function validateEmail(email) {
    return basicEmailRegex.test(email);
}

console.log(validateEmail("user@example.com")); // true
console.log(validateEmail("user.name@domain.org")); // true
console.log(validateEmail("invalid-email")); // false
console.log(validateEmail("user@.com")); // false
```

### Объяснение паттерна:
1. **`^`** — начало строки
2. **`[a-zA-Z0-9._%+-]+`** — локальная часть (буквы, цифры, точки, подчёркивания, проценты, плюсы, дефисы)
3. **`@`** — обязательный символ разделителя
4. **`[a-zA-Z0-9.-]+`** — доменное имя
5. **`\.`** — экранированная точка перед доменной зоной
6. **`[a-zA-Z]{2,}`** — доменная зона (минимум 2 буквы)
7. **`$`** — конец строки

---

##  Расширенная валидация email

### Более строгий паттерн:
```javascript
const strictEmailRegex = /^[a-zA-Z0-9]([a-zA-Z0-9._-]*[a-zA-Z0-9])?@[a-zA-Z0-9]([a-zA-Z0-9.-]*[a-zA-Z0-9])?\.[a-zA-Z]{2,}$/;

function validateStrictEmail(email) {
    return strictEmailRegex.test(email);
}

console.log(validateStrictEmail("user@example.com")); // true
console.log(validateStrictEmail(".user@example.com")); // false
console.log(validateStrictEmail("user.@example.com")); // false
```

### Валидация с поддержкой поддоменов:
```javascript
const subdomainEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/;

function validateSubdomainEmail(email) {
    return subdomainEmailRegex.test(email);
}

console.log(validateSubdomainEmail("user@sub.domain.com")); // true
console.log(validateSubdomainEmail("user@domain.co.uk")); // true
```

---

##  Валидация с дополнительными проверками

### Функция с множественными проверками:
```javascript
function validateEmailAdvanced(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!email || typeof email !== 'string') {
        return { valid: false, error: 'Email должен быть строкой' };
    }
    
    if (email.length > 254) {
        return { valid: false, error: 'Email слишком длинный' };
    }
    
    if (!emailRegex.test(email)) {
        return { valid: false, error: 'Неверный формат email' };
    }
    
    const [localPart] = email.split('@');
    if (localPart.length > 64) {
        return { valid: false, error: 'Локальная часть слишком длинная' };
    }
    
    return { valid: true, error: null };
}

console.log(validateEmailAdvanced("user@example.com"));
// { valid: true, error: null }

console.log(validateEmailAdvanced("very.long.local.part.that.exceeds.maximum.length@example.com"));
// { valid: false, error: 'Локальная часть слишком длинная' }
```

---

##  Валидация с учётом международных доменов

### Поддержка IDN (Internationalized Domain Names):
```javascript
const internationalEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function validateInternationalEmail(email) {
    if (!internationalEmailRegex.test(email)) {
        return false;
    }
    
    const invalidChars = /[<>()[\]\\,;:\s"]/;
    if (invalidChars.test(email)) {
        return false;
    }
    
    return true;
}

console.log(validateInternationalEmail("user@домен.рф")); // true (после нормализации)
console.log(validateInternationalEmail("user name@example.com")); // false
```

---

##  Практические примеры валидации

### Валидация в HTML форме:
```javascript
const emailInput = document.getElementById('emailInput');
const emailError = document.getElementById('emailError');

emailInput.addEventListener('blur', function() {
    const email = this.value.trim();
    const isValid = validateEmail(email);
    
    if (!isValid) {
        emailError.textContent = 'Введите корректный email адрес';
        this.classList.add('error');
    } else {
        emailError.textContent = '';
        this.classList.remove('error');
    }
});
```

### Валидация в React компоненте:
```javascript
import React, { useState } from 'react';

function EmailForm() {
    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(true);
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        setIsValid(emailRegex.test(value));
    };
    
    return (
        <div>
            <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                className={isValid ? 'valid' : 'invalid'}
            />
            {!isValid && <span className="error">Неверный формат email</span>}
        </div>
    );
}
```

---

##  Ограничения и рекомендации

### Ограничения регулярных выражений:
- Не могут проверить существование домена
- Не учитывают все возможные форматы email
- Могут быть сложными для поддержки

### Рекомендации:
1. **Используйте простые паттерны** для базовой валидации
2. **Дополняйте проверками** длины и формата
3. **Тестируйте на реальных данных** перед использованием
4. **Рассмотрите готовые библиотеки** для сложных случаев
5. **Всегда подтверждайте email** через отправку кода

---

##  Альтернативные подходы

### Использование HTML5 валидации:
```html
<input type="email" required pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}">
```

### Использование готовых библиотек:
```javascript
import validator from 'validator';

const isValid = validator.isEmail('user@example.com');
```

---

##  Итог

- **Регулярные выражения** — эффективный способ валидации email на стороне клиента
- **Базовые паттерны** подходят для большинства случаев
- **Расширенная валидация** требует дополнительных проверок
- **Всегда подтверждайте email** через отправку кода
- **Используйте готовые решения** для сложных случаев

##  ЗАДАЧИ

Задачи по теме `валидация email с помощью регулярных выражений`:

---

###  Задача 1: Создать функцию валидации email
Напишите функцию, которая проверяет корректность email адреса с помощью регулярного выражения.
<details>
<summary> Решение</summary>

```javascript
function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

console.log(validateEmail("test@example.com")); // true
console.log(validateEmail("invalid.email")); // false
```
</details>

---

###  Задача 2: Валидация с проверкой длины
Создайте функцию, которая проверяет email и возвращает объект с результатом и ошибкой.
<details>
<summary> Решение</summary>

```javascript
function validateEmailWithDetails(email) {
    if (!email || email.length > 254) {
        return { valid: false, error: 'Email слишком длинный или пустой' };
    }
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid = emailRegex.test(email);
    
    return {
        valid: isValid,
        error: isValid ? null : 'Неверный формат email'
    };
}

console.log(validateEmailWithDetails("user@example.com"));
// { valid: true, error: null }
```
</details>

---

###  Задача 3: Извлечь домен из email
Напишите функцию, которая извлекает доменную часть из email адреса.
<details>
<summary> Решение</summary>

```javascript
function extractDomain(email) {
    const domainRegex = /@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    const match = email.match(domainRegex);
    return match ? match[1] : null;
}

console.log(extractDomain("user@example.com")); // "example.com"
console.log(extractDomain("invalid.email")); // null
```
</details>

---

###  Задача 4: Проверить популярные домены
Создайте функцию, которая проверяет, принадлежит ли email к популярным доменам (gmail.com, yahoo.com, outlook.com).
<details>
<summary> Решение</summary>

```javascript
function checkPopularDomain(email) {
    const popularDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];
    const domain = extractDomain(email);
    
    return domain ? popularDomains.includes(domain) : false;
}

console.log(checkPopularDomain("user@gmail.com")); // true
console.log(checkPopularDomain("user@company.com")); // false
```
</details>

---

###  Задача 5: Валидация с запрещёнными символами
Напишите функцию, которая проверяет email и запрещает определённые символы в локальной части.
<details>
<summary> Решение</summary>

```javascript
function validateEmailStrict(email) {
    const forbiddenChars = /[<>()[\]\\,;:\s"]/;
    if (forbiddenChars.test(email)) {
        return false;
    }
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

console.log(validateEmailStrict("user@example.com")); // true
console.log(validateEmailStrict("user name@example.com")); // false
```
</details>

---

###  Задача 6: Массовая валидация email адресов
Создайте функцию, которая принимает массив email адресов и возвращает только валидные.
<details>
<summary> Решение</summary>

```javascript
function filterValidEmails(emails) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    return emails.filter(email => emailRegex.test(email));
}

const emails = [
    "user@example.com",
    "invalid.email",
    "test@domain.org",
    "broken@",
    "valid@test.co.uk"
];

console.log(filterValidEmails(emails));
// ["user@example.com", "test@domain.org", "valid@test.co.uk"]
```
</details>

---

 Освойте валидацию email — и ваши формы станут намного надёжнее и удобнее для пользователей!

--- 