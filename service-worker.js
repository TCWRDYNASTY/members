const CACHE_NAME = 'members-v1'; 
const urlsToCache = [
  
  './', 
 'index.html',
    'manifest.json',
  'service-worker.js',
  'Alex.JPG',
  'Brody.JPG',
  'DYNASTYLOGO.jpeg',
  'Missy.jpg',
  'Raja.png',
  'Rayn.jpg',
  'brody2.JPG',
  'goober.JPG',
  'ktty.jpg',
  'kitty2.JPG',
  'noah.jpg',
  'thehomies.jpeg',
  'tonytiger.jpg',
  'zesusT2.jpeg',
  'zeusc.jpg',
  'ainteasy.jpeg',
  'ziggy.jpg',

  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2'
];


self.addEventListener('install', (event) => {
  console.log('[Service Worker] Install event received, beginning caching.');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting()) // Forces the new service worker to activate immediately
      .catch((error) => {
        console.error('[Service Worker] Failed to cache resources:', error);
      })
  );
});


self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
   
        if (response) {
          return response;
        }
       
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  console.log('[Service Worker] Activate event received, cleaning up old caches.');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log(`[Service Worker] Deleting old cache: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
