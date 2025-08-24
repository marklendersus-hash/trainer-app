const CACHE_NAME = 'trainer-db-cache-v4'; // Increased version to force update
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
    // Haupt-Skripte
    './utils.js',
    './state.js',
    './render.js',
    './api.js',
    './app.js',
    // Neue View-Skripte
    './views/layout-view.js',
    './views/home-view.js',
    './views/spieler-view.js',
    './views/events-view.js',
    './views/einstellungen-view.js',
    // Externe Bibliotheken
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js',
    'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js',
    'https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Service Worker: Caching files');
            return cache.addAll(urlsToCache);
        }).catch(err => console.error('Service Worker: Caching failed', err))
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cache => cache !== CACHE_NAME).map(cache => caches.delete(cache))
            );
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => response || fetch(event.request))
    );
});
