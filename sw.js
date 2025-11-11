const CACHE_NAME = 'html-code-preview-pwa-v1';
const BASE_URL = '/html-code-preview-pwa/';
const OFFLINE_URL = BASE_URL;

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll([
        BASE_URL,
        BASE_URL + 'index.html',
        BASE_URL + 'manifest.json',
        BASE_URL + 'sw.js',
        BASE_URL + 'icons/icon-192.png',
        BASE_URL + 'icons/icon-512.png',
      ])
    )
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() =>
      caches.match(event.request).then(response => response || caches.match(OFFLINE_URL))
    )
  );
});
