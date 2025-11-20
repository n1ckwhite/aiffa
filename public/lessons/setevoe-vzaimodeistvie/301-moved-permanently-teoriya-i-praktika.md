#  HTTP 301 Moved Permanently: теория, SEO и практика

HTTP статус-код **301 Moved Permanently** указывает на то, что запрашиваемый ресурс был перемещён на другой URL навсегда. Это означает, что клиент (например, веб-браузер или поисковая система) должен обновить свои ссылки на этот ресурс и использовать новый адрес в дальнейшем.

##  Что означает 301 Moved Permanently

### Основные характеристики
- **Описание**: Ресурс перемещён на новый URL навсегда.
- **Категория**: Редирект (3xx).
- **Постоянность**: Изменение адреса является постоянным.
- **SEO-влияние**: Передача "веса" со старого URL на новый.

### Ключевые особенности
1. **Постоянное перенаправление**: Код 301 говорит о том, что изменение адреса ресурса является постоянным, и старый URL больше не должен использоваться.
2. **SEO значение**: Поисковые системы, такие как Google, учитывают 301-редиректы при индексации страниц. Перенаправление с 301 помогает передать часть «веса» (или рейтинга) старого URL на новый, что важно для SEO.
3. **Кэширование**: Браузеры могут кэшировать 301-редиректы, что означает, что после первого запроса они будут автоматически перенаправлять пользователя на новый URL без необходимости повторного запроса к серверу.

---

##  Когда используется статус-код 301

### Изменение структуры URL
Когда сайт меняет структуру своих URL, например, при редизайне или переходе на более удобные адреса.

### Смена домена
При переносе сайта на новый домен или при изменении доменного имени.

### Объединение контента
Если несколько страниц объединяются в одну, и нужно перенаправить пользователей с устаревших страниц на новую.

### Исправление ошибок
Если на сайте были обнаружены ошибочные URL, их можно перенаправить на правильные адреса.

---

##  Примеры реализации 301 редиректов

###  Пример 1: Простой 301 редирект (Apache)
```apache
# .htaccess файл
Redirect 301 /old-page.html /new-page.html
Redirect 301 /old-category/ /new-category/
```

###  Пример 2: 301 редирект в Node.js
```javascript
app.get('/old-page', (req, res) => {
  res.status(301)
     .set('Location', '/new-page')
     .send('Moved Permanently');
});

// Или с дополнительными заголовками
app.get('/old-page', (req, res) => {
  res.status(301)
     .set({
       'Location': '/new-page',
       'Cache-Control': 'max-age=31536000' // Кэширование на год
     })
     .send('Moved Permanently');
});
```

###  Пример 3: 301 редирект в Express.js
```javascript
// Массовые редиректы
const redirects = {
  '/old-page': '/new-page',
  '/old-category': '/new-category',
  '/old-product': '/new-product'
};

app.use((req, res, next) => {
  const newUrl = redirects[req.path];
  if (newUrl) {
    return res.redirect(301, newUrl);
  }
  next();
});
```

###  Пример 4: Обработка 301 на клиенте
```javascript
fetch('/old-page')
  .then(response => {
    if (response.status === 301) {
      const newUrl = response.headers.get('Location');
      console.log('Страница перемещена на:', newUrl);
      
      // Автоматическое следование редиректу
      return fetch(newUrl);
    }
    return response;
  })
  .then(response => response.text())
  .then(content => {
    console.log('Новый контент:', content);
  });
```

---

##  SEO-аспекты 301 редиректов

### Передача "веса" страницы
- **PageRank**: Google передаёт часть PageRank со старого URL на новый.
- **Время передачи**: Полная передача может занять несколько месяцев.
- **Частичная передача**: Обычно передаётся 90-99% "веса".

### Лучшие практики для SEO
```javascript
// Правильная настройка 301 для SEO
app.get('/old-page', (req, res) => {
  // Устанавливаем правильные заголовки
  res.status(301)
     .set({
       'Location': '/new-page',
       'Cache-Control': 'max-age=31536000',
       'X-Robots-Tag': 'noindex' // Временно для старого URL
     })
     .send('Moved Permanently');
});
```

### Мониторинг редиректов
```javascript
// Логирование 301 редиректов для анализа
app.use((req, res, next) => {
  const originalUrl = req.originalUrl;
  
  res.on('finish', () => {
    if (res.statusCode === 301) {
      console.log(`301 redirect: ${originalUrl} → ${res.get('Location')}`);
      // Отправка в аналитику
      analytics.track('301_redirect', {
        from: originalUrl,
        to: res.get('Location')
      });
    }
  });
  
  next();
});
```

---

##  Сравнительная таблица редиректов

| Код | Название | Постоянный | SEO-влияние | Кэширование | Применение |
|-----|----------|------------|-------------|-------------|------------|
| 301 | Moved Permanently |  |  |  | Постоянное перемещение |
| 302 | Found |  |  |  | Временное перемещение |
| 307 | Temporary Redirect |  |  |  | Временное с сохранением метода |
| 308 | Permanent Redirect |  |  |  | Постоянное с сохранением метода |

---

##  Практические сценарии использования

### Смена домена
```javascript
// Редирект со старого домена на новый
app.use((req, res, next) => {
  if (req.hostname === 'old-domain.com') {
    const newUrl = `https://new-domain.com${req.url}`;
    return res.redirect(301, newUrl);
  }
  next();
});
```

### Реструктуризация URL
```javascript
// Старые URL → новые URL
const urlMappings = {
  '/products/item-123': '/products/new-item-123',
  '/blog/post-456': '/articles/post-456',
  '/about-us': '/about'
};

app.use((req, res, next) => {
  const newPath = urlMappings[req.path];
  if (newPath) {
    return res.redirect(301, newPath);
  }
  next();
});
```

### Объединение страниц
```javascript
// Несколько старых страниц → одна новая
const redirectToMain = {
  '/page1': '/main-page',
  '/page2': '/main-page',
  '/page3': '/main-page'
};

app.use((req, res, next) => {
  const targetPage = redirectToMain[req.path];
  if (targetPage) {
    return res.redirect(301, targetPage);
  }
  next();
});
```

---

##  Лучшие практики работы с 301

### На стороне сервера
- Используйте правильный статус-код 301.
- Предоставляйте заголовок Location с новым URL.
- Настройте кэширование для оптимизации.
- Логируйте редиректы для анализа.

### На стороне клиента
- Следуйте редиректам автоматически.
- Обновляйте внутренние ссылки на сайте.
- Мониторьте эффективность редиректов.

###  Пример универсальной обработки
```javascript
async function handleRedirects(url) {
  const response = await fetch(url, {
    redirect: 'follow' // Автоматически следовать редиректам
  });
  
  if (response.redirected) {
    console.log('Произошёл редирект:', response.url);
  }
  
  return response;
}
```

---

##  Итог

- **301 Moved Permanently** — постоянное перемещение ресурса.
- Важен для SEO — передаёт "вес" со старого URL на новый.
- Браузеры кэшируют 301 редиректы для оптимизации.
- Используется при смене домена, реструктуризации URL, объединении страниц.

##  ЗАДАЧИ

Задачи по теме `HTTP 301 Moved Permanently`:

---

###  Задача 1: Определи применение
В каком случае НЕ следует использовать 301 редирект?
1. Смена домена сайта
2. Временное техническое обслуживание
3. Реструктуризация URL
4. Объединение страниц
<details>
<summary> Решение</summary>

**Ответ:**
2. Временное техническое обслуживание — для временных изменений используется 302 или 307 редирект.

</details>

---

###  Задача 2: SEO влияние
Сколько процентов "веса" обычно передаётся при 301 редиректе?
<details>
<summary> Решение</summary>

**Ответ:**
90-99% — Google передаёт большую часть PageRank со старого URL на новый.

</details>

---

###  Задача 3: Кэширование
Почему браузеры кэшируют 301 редиректы?
<details>
<summary> Решение</summary>

**Ответ:**
301 означает постоянное перемещение, поэтому браузер может запомнить новый URL и не делать повторные запросы к серверу для экономии ресурсов.

</details>

---

###  Задача 4: Реализация редиректа
Напишите код для 301 редиректа в Express.js:
<details>
<summary> Решение</summary>

```javascript
app.get('/old-page', (req, res) => {
  res.redirect(301, '/new-page');
});

// Или с дополнительными заголовками
app.get('/old-page', (req, res) => {
  res.status(301)
     .set('Location', '/new-page')
     .send('Moved Permanently');
});
```

</details>

---

###  Задача 5: Обработка на клиенте
Напишите код для обработки 301 редиректа в JavaScript:
<details>
<summary> Решение</summary>

```javascript
fetch('/old-page')
  .then(response => {
    if (response.status === 301) {
      const newUrl = response.headers.get('Location');
      console.log('Страница перемещена на:', newUrl);
      return fetch(newUrl);
    }
    return response;
  })
  .then(response => response.text())
  .then(content => console.log('Контент:', content));
```

</details>

---

###  Задача 6: Разница с 302
В чём основная разница между 301 и 302 редиректами?
<details>
<summary> Решение</summary>

**Ответ:**
301 — постоянное перемещение (влияет на SEO, кэшируется браузером).
302 — временное перемещение (не влияет на SEO, не кэшируется).

</details>

---

 Эти задачи помогут понять важность 301 редиректов для SEO и их правильное использование в веб-приложениях! 