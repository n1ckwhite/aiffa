#  HTTP 302 Found: временное перенаправление и практика

Код состояния HTTP, который обозначает временное перенаправление, — это **302 Found**. Этот статус-код указывает на то, что запрашиваемый ресурс временно доступен по другому URI, указанному в заголовке Location.

##  Что означает 302 Found

### Основные характеристики
- **Описание**: Ресурс временно доступен по другому URL.
- **Категория**: Редирект (3xx).
- **Временность**: Перенаправление является временным.
- **SEO-влияние**: Не передаёт "вес" со старого URL на новый.

### Ключевые особенности
1. **Временное перенаправление**: Код 302 сигнализирует о том, что перенаправление является временным, и клиент должен продолжать использовать исходный URL для будущих запросов.
2. **SEO значение**: Поисковые системы обычно не передают «вес» (или рейтинг) старого URL новому при использовании 302-редиректов, так как это считается временным решением.
3. **Использование**: Код 302 может использоваться в случаях, когда ресурс временно перемещён, например, во время технического обслуживания или при проведении акций.

---

##  Когда используется 302 Found

### Техническое обслуживание
Когда сайт временно недоступен и пользователей перенаправляют на страницу с информацией о работах.

### Временные акции и кампании
При проведении временных маркетинговых кампаний или специальных предложений.

### A/B тестирование
Для временного перенаправления части пользователей на альтернативную версию страницы.

### Временные изменения контента
Когда контент временно перемещён на другой URL.

---

##  Примеры реализации 302 редиректов

###  Пример 1: Простой 302 редирект (Apache)
```apache
# .htaccess файл
Redirect 302 /maintenance /maintenance-page.html
Redirect 302 /temporary-page /new-temporary-page
```

###  Пример 2: 302 редирект в Node.js
```javascript
app.get('/maintenance', (req, res) => {
  res.status(302)
     .set('Location', '/maintenance-info')
     .send('Found');
});

// Или с дополнительными заголовками
app.get('/maintenance', (req, res) => {
  res.status(302)
     .set({
       'Location': '/maintenance-info',
       'Cache-Control': 'no-cache' // Не кэшировать временный редирект
     })
     .send('Found');
});
```

###  Пример 3: 302 редирект в Express.js
```javascript
// Временные редиректы
const temporaryRedirects = {
  '/old-temp-page': '/new-temp-page',
  '/maintenance': '/maintenance-info',
  '/promo': '/special-offer'
};

app.use((req, res, next) => {
  const newUrl = temporaryRedirects[req.path];
  if (newUrl) {
    return res.redirect(302, newUrl);
  }
  next();
});
```

###  Пример 4: A/B тестирование с 302
```javascript
// A/B тестирование - 50% пользователей на альтернативную версию
app.get('/landing', (req, res) => {
  const isTestGroup = Math.random() < 0.5;
  
  if (isTestGroup) {
    return res.redirect(302, '/landing-variant-b');
  }
  
  // Обычная версия
  res.sendFile('/landing-variant-a.html');
});
```

###  Пример 5: Обработка 302 на клиенте
```javascript
fetch('/temporary-page')
  .then(response => {
    if (response.status === 302) {
      const newUrl = response.headers.get('Location');
      console.log('Временное перенаправление на:', newUrl);
      
      // Следуем редиректу
      return fetch(newUrl);
    }
    return response;
  })
  .then(response => response.text())
  .then(content => {
    console.log('Контент:', content);
  });
```

---

##  Сравнение 302 с другими редиректами

### 302 vs 301
| Аспект | 302 Found | 301 Moved Permanently |
|--------|-----------|----------------------|
| Временность | Временное | Постоянное |
| SEO-влияние | Не передаёт "вес" | Передаёт "вес" |
| Кэширование | Не кэшируется | Кэшируется |
| Применение | Временные изменения | Постоянные изменения |

### 302 vs 307
| Аспект | 302 Found | 307 Temporary Redirect |
|--------|-----------|----------------------|
| Сохранение метода | Не гарантируется | Гарантируется |
| POST → GET | Может измениться | Остаётся POST |
| Применение | Общие временные редиректы | API с сохранением метода |

---

##  Практические сценарии использования

### Техническое обслуживание
```javascript
// Временное перенаправление во время техобслуживания
app.use((req, res, next) => {
  if (isMaintenanceMode) {
    return res.redirect(302, '/maintenance');
  }
  next();
});
```

### Временные акции
```javascript
// Временная акция - перенаправление на специальную страницу
app.get('/product/:id', (req, res) => {
  const productId = req.params.id;
  
  if (hasActivePromo(productId)) {
    return res.redirect(302, `/promo/${productId}`);
  }
  
  // Обычная страница продукта
  res.render('product', { productId });
});
```

### A/B тестирование
```javascript
// A/B тестирование с 302 редиректом
app.get('/homepage', (req, res) => {
  const userId = req.session.userId;
  const variant = getUserVariant(userId);
  
  if (variant === 'B') {
    return res.redirect(302, '/homepage-variant-b');
  }
  
  // Вариант A (контрольный)
  res.render('homepage');
});
```

### Временные изменения контента
```javascript
// Временное перенаправление контента
const temporaryContent = {
  '/old-article': '/new-article-temp',
  '/old-product': '/new-product-temp'
};

app.use((req, res, next) => {
  const tempUrl = temporaryContent[req.path];
  if (tempUrl) {
    return res.redirect(302, tempUrl);
  }
  next();
});
```

---

##  Лучшие практики работы с 302

### На стороне сервера
- Используйте 302 только для временных изменений.
- Не кэшируйте 302 редиректы (Cache-Control: no-cache).
- Предоставляйте заголовок Location с новым URL.
- Логируйте временные редиректы для анализа.

### На стороне клиента
- Следуйте редиректам автоматически.
- Не кэшируйте результаты 302 редиректов.
- Мониторьте эффективность временных редиректов.

###  Пример универсальной обработки
```javascript
async function handleTemporaryRedirects(url) {
  const response = await fetch(url, {
    redirect: 'follow'
  });
  
  if (response.status === 302) {
    console.log('Временное перенаправление:', response.url);
    // Не кэшируем результат
    return response;
  }
  
  return response;
}
```

---

##  Мониторинг и аналитика

### Логирование 302 редиректов
```javascript
// Логирование временных редиректов
app.use((req, res, next) => {
  const originalUrl = req.originalUrl;
  
  res.on('finish', () => {
    if (res.statusCode === 302) {
      console.log(`302 redirect: ${originalUrl} → ${res.get('Location')}`);
      
      // Отправка в аналитику
      analytics.track('temporary_redirect', {
        from: originalUrl,
        to: res.get('Location'),
        timestamp: new Date().toISOString()
      });
    }
  });
  
  next();
});
```

### Анализ эффективности
```javascript
// Анализ эффективности временных редиректов
function analyzeRedirectEffectiveness() {
  const redirects = getRedirectLogs();
  
  redirects.forEach(redirect => {
    if (redirect.status === 302) {
      console.log(`Временный редирект: ${redirect.from} → ${redirect.to}`);
      console.log(`Количество переходов: ${redirect.clicks}`);
      console.log(`Конверсия: ${redirect.conversion}%`);
    }
  });
}
```

---

##  Итог

- **302 Found** — временное перенаправление ресурса.
- Не влияет на SEO (не передаёт "вес").
- Не кэшируется браузерами.
- Используется для временных изменений, техобслуживания, A/B тестирования.
- Для API лучше использовать 307 для сохранения HTTP-метода.

##  ЗАДАЧИ

Задачи по теме `HTTP 302 Found`:

---

###  Задача 1: Определи применение
В каком случае следует использовать 302 редирект?
1. Постоянная смена домена
2. Временное техническое обслуживание
3. Объединение страниц
4. Реструктуризация URL
<details>
<summary> Решение</summary>

**Ответ:**
2. Временное техническое обслуживание — 302 используется для временных изменений.

</details>

---

###  Задача 2: SEO влияние
Влияет ли 302 редирект на SEO и передачу "веса" страницы?
<details>
<summary> Решение</summary>

**Ответ:**
Нет, 302 не влияет на SEO — поисковые системы не передают "вес" со старого URL на новый, так как это временное изменение.

</details>

---

###  Задача 3: Кэширование
Кэшируются ли 302 редиректы браузерами?
<details>
<summary> Решение</summary>

**Ответ:**
Нет, 302 редиректы не кэшируются браузерами, так как они временные.

</details>

---

###  Задача 4: Разница с 307
В чём основная разница между 302 и 307 редиректами?
<details>
<summary> Решение</summary>

**Ответ:**
302 — временное перенаправление, метод может измениться (POST → GET).
307 — временное перенаправление с сохранением HTTP-метода.

</details>

---

###  Задача 5: Реализация редиректа
Напишите код для 302 редиректа в Express.js:
<details>
<summary> Решение</summary>

```javascript
app.get('/temporary-page', (req, res) => {
  res.redirect(302, '/new-temporary-page');
});

// Или с дополнительными заголовками
app.get('/temporary-page', (req, res) => {
  res.status(302)
     .set({
       'Location': '/new-temporary-page',
       'Cache-Control': 'no-cache'
     })
     .send('Found');
});
```

</details>

---

###  Задача 6: A/B тестирование
Напишите код для A/B тестирования с использованием 302 редиректа:
<details>
<summary> Решение</summary>

```javascript
app.get('/landing', (req, res) => {
  const userId = req.session.userId;
  const variant = getUserVariant(userId);
  
  if (variant === 'B') {
    return res.redirect(302, '/landing-variant-b');
  }
  
  // Вариант A (контрольный)
  res.render('landing-variant-a');
});
```

</details>

---

 Эти задачи помогут понять особенности 302 редиректов и их правильное использование для временных изменений! 