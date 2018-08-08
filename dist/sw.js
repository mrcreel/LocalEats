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
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// SW Fetch
self.addEventListener("fetch", event => {
  console.log(`SW: Fetching`);
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
