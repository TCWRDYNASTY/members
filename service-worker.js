const cacheName = 'tcwr-v1';
const filesToCache = [
  '/',
  '/index.html',
  '/Alex.JPG',
  '/Brody.JPG',
  '/DYNASTYLOGO.jpeg',
  '/Missy.jpg',
  '/Raja.png',
  '/Rayn.jpg',
  '/brody2.JPG',
  '/goober.JPG',
  '/ktty.jpg,
  '/kitty2.JPG,
  '/noah.jpg',
  '/thehomies.jpeg,
  '/tonytiger.jpg',
  '/zesusT2.jpeg',
  '/zeusc.jpg',
  '/ainteasy.jpeg',
  '/ziggy.jpg',

  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(filesToCache);
    }).catch((error) => {
      console.error('Failed to cache resources:', error);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});