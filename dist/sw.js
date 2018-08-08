var CACHE_NAME = "v1";

var urlsToCache =
  [
    'index.html',
    'restaurant.html',
    './css/main.css',
    './data/restaurants.json',
    './js/main.js',
    './js/dbhelper.js',
    './js/map.js',
    './js/header.js',
    './js/restaurant_info.js',
  ];

// Install Service Worker
self.addEventListener("install", function(e) {
  console.log('Service worker: Installed')
  e.waitUntil(
    caches
    .open(CACHE_NAME)
    .then(function(cache) {
      console.log('Service Worker: Caching Files');
      cache.addAll(urlsToCache);
    })
    .then(() => self.skipWaiting())
  );
});

// Activate Service Worker
self.addEventListener("activate", function(e) {
  console.log('Service worker: Activated')
  //Remove olde chache
  e.waitUntil(
    caches.keys()
    .then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if(cache !== CACHE_NAME){
            console.log(`Service Worker: Cache ${cache} Cleared`)
            return caches.delete(cache)
          }
        })
      )
    })
  )
})
