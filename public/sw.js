/* eslint-disable no-restricted-globals */

const CACHE_NAME = "aiffa-pwa-v1";
// Кэшируем только статические ассеты, без HTML,
// чтобы сервер всегда видел актуальные куки (в том числе тему).
const APP_SHELL = [
  "/manifest.json",
  "/icons/android-chrome-192x192.png",
  "/icons/android-chrome-512x512.png",
  "/icons/apple-touch-icon.png",
  "/icons/icon.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.map((key) => {
            if (key !== CACHE_NAME) {
              return caches.delete(key);
            }
            return undefined;
          })
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") return;

  // Для навигаций всегда идём в сеть, чтобы SSR учитывал куки (цветовую тему и пр.).
  if (request.mode === "navigate") return;

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) {
        return cached;
      }

      // Если в кэше ничего нет, просто идём в сеть.
      // В случае сетевой ошибки браузер сам вернёт корректный Response ошибку,
      // что предотвращает TypeError: Failed to convert value to 'Response'.
      return fetch(request);
    })
  );
});


