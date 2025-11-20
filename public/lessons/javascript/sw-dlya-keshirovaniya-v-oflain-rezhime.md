#  Как использовать Service Workers для кэширования веб-ресурсов в офлайн-режиме

Service Worker — это специальный скрипт, работающий в фоновом потоке браузера. Он позволяет:

* кэшировать файлы (HTML, CSS, JS, изображения),
* запускать веб-приложение офлайн,
* улучшить производительность за счёт локального доступа к ресурсам.

---

###  Шаг 1: Регистрация Service Worker

Добавьте в основной JS-файл (например, `app.js`):

```javascript
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(reg => console.log(' SW зарегистрирован:', reg.scope))
            .catch(err => console.error(' Ошибка регистрации:', err));
    });
}
```

---

###  Шаг 2: Создание файла `service-worker.js`

Разместите файл `service-worker.js` в корне проекта.

---

###  Шаг 3: Кэширование ресурсов при установке

```javascript
const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/image.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log(' Кэширование файлов...');
            return cache.addAll(urlsToCache);
        })
    );
});
```

---

###  Шаг 4: Обработка запросов (fetch)

```javascript
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request).then((networkResponse) => {
                return caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                });
            });
        })
    );
});
```

---

###  Шаг 5: Очистка старого кэша при активации

```javascript
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((name) => {
                    if (!cacheWhitelist.includes(name)) {
                        return caches.delete(name);
                    }
                })
            );
        })
    );
});
```

---

###  Шаг 6: Тестирование

1. Открой DevTools → вкладка **Application** → раздел **Service Workers**.
2. Убедись, что Service Worker активен.
3. Отключи интернет.
4. Перезагрузи страницу — приложение должно загрузиться из кэша.

---

###  Итог

Использование Service Workers даёт:

* автономную работу приложения,
* ускорение загрузки страниц,
* снижение нагрузки на сервер.

##  ЗАДАЧИ

Вот две простые задачи, чтобы закрепить понимание `Service Workers и кэшированию`:

---

###  Задача 1: Что будет в кэше?

 После установки Service Worker, какие файлы будут доступны в офлайн-режиме, если отключить интернет и перезагрузить страницу?

Допустим, у вас есть следующий код в `service-worker.js`:

```javascript
const CACHE_NAME = 'example-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});
```

<details>
<summary> Вывод</summary>

Все ресурсы из массива `urlsToCache`, а именно:

* `/` - общая картина
* `/index.html`
* `/style.css`
* `/script.js`

Эти файлы были явно добавлены в кэш при установке.

</details>

---

###  Задача 2: Как вернуть обновлённый файл?

 Что нужно изменить в Service Worker, чтобы при следующем обновлении браузер получил новую версию `script.js`?

Предположим, вы обновили файл `script.js`, но браузер продолжает использовать старую закэшированную версию.

<details>
<summary> Вывод</summary>

Необходимо:

1. Обновить название кэша, например:

```javascript
const CACHE_NAME = 'example-cache-v2';
 ```
2. В обработчике `activate` удалить старые кэши:

```javascript
self.addEventListener('activate', event => {
    const whitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(keys => 
            Promise.all(keys.map(key => {
                if (!whitelist.includes(key)) {
                    return caches.delete(key);
                }
            }))
        )
    );
});
```

Это заставит браузер использовать свежий кэш.

</details>

---

 Таким образом, Service Workers позволяют гибко управлять кэшированием ресурсов, обеспечивая как офлайн-доступ, так и контроль за обновлениями. Это делает приложения более быстрыми, надёжными и удобными для пользователей.

---