/**
 * @file sw.js
 * @description
 * Dies ist der Service Worker für die Progressive Web App (PWA).
 * Er ist verantwortlich für das Caching von statischen App-Ressourcen, um Offline-Fähigkeit
 * und schnellere Ladezeiten zu ermöglichen. Er verwendet eine "Cache-First"-Strategie.
 */

const CACHE_NAME = 'trainer-db-cache-v2'; // Cache-Version. Eine Änderung erzwingt ein Update des Caches beim Benutzer.
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
    // Lokale Dateien, die in separaten Modulen liegen
    './utils.js',
    './state.js',
    './render.js',
    './api.js',
    './app.js',
    // Externe Bibliotheken
   './style.css',
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js',
    'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js',
    'https://www.gstatic.com/firebasejs/11.6.1/firebase-storage.js',
    'https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js'
];

/**
 * 'install'-Event-Listener: Wird ausgelöst, wenn der Service Worker installiert wird.
 * Öffnet den Cache und speichert alle in `urlsToCache` definierten Ressourcen.
 */
self.addEventListener('install', event => {
    console.log('Service Worker: Installiere und cache statische Assets.');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache geöffnet');
                return cache.addAll(urlsToCache);
            })
            .catch(error => {
                console.error('Caching fehlgeschlagen:', error);
            })
    );
});

/**
 * 'activate'-Event-Listener: Wird ausgelöst, wenn der Service Worker aktiviert wird.
 * Er löscht alte, nicht mehr verwendete Caches, um Speicherplatz freizugeben.
 */
self.addEventListener('activate', event => {
    console.log('Service Worker: Aktiviert.');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('Service Worker: Alten Cache löschen', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

/**
 * 'fetch'-Event-Listener: Wird für jede Netzwerkanfrage der Seite ausgelöst.
 * Implementiert eine "Cache-First"-Strategie.
 * 1. Versucht, die angeforderte Ressource im Cache zu finden.
 * 2. Wenn gefunden, wird sie aus dem Cache zurückgegeben.
 * 3. Wenn nicht gefunden, wird die Anfrage an das Netzwerk weitergeleitet.
 */
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Wenn die Antwort im Cache gefunden wurde, gib sie zurück. Sonst, mache einen Netzwerk-Request.
                return response || fetch(event.request);
            })
    );
});