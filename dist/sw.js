<<<<<<< HEAD
const cacheName = "v1";

const CACHE_URLS = [
  "index.html",
  "restaurant.html",
  "./css/main.css",
  "./js/main.js",
  "./js/header.js",
  "./js/dbhelper.js",
  "./js/map.js",
  "./js/restaurant_info.js",
  './data/restaurants.jsom'
];

// Install SW
self.addEventListener("install", event => {
  event.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        console.log(`SW Caching files`);
        cache.addAll(CACHE_URLS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate SW
self.addEventListener("activate", event => {
  console.log("SW Activated");
  //Delete old caches
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache != cacheName) {
            console.log(`SW: Clear old cache`);
=======
var CACHE_NAME = "v1";

// Install Service Worker
self.addEventListener("install", function(e) {
  console.log("Service worker: Installed");
});

// Activate Service Worker
self.addEventListener("activate", function(e) {
  console.log("Service worker: Activated");
  //Remove old chache
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log(`Service Worker: Cache ${cache} Cleared`);
>>>>>>> fetchAll
            return caches.delete(cache);
          }
        })
      );
    })
<<<<<<< HEAD
  );
});

// SW Fetch
self.addEventListener("fetch", event => {
  console.log(`SW: Fetching`);
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
=======
>>>>>>> fetchAll
  );
});

// Fetch cache with Service Worker
self.addEventListener("fetch", e => {
  console.log("Service worker: Fetching site")
  e.respondWith(
    fetch(e.request)
    .then(res => {
      // Clone response
      const resClone = res.clone();
      // Open cache
      caches
        .open(CACHE_NAME)
        .then(cache => {
          // Cache response
          cache.put(e.request, resClone);
        });
      return res;
    }).catch(err => caches.match(e.request).then(res => res))
  )
})
