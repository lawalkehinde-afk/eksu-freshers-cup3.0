const CACHE = 'fiercecup-v1';
const ASSETS = [
  '/', '/index.html',
  '/css/style.css', '/css/animations.css',
  '/js/data.js', '/js/main.js',
  '/images/favicon.png'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
