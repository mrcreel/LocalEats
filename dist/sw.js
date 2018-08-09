var CACHE_NAME = "v2";

var urlsToCache = [
  "index.html",
  "restaurant.html",
  "./css/main.css",
  "./css/all.css",
  "./data/restaurants.json",
  "./js/main.js",
  "./js/dbhelper.js",
  "./js/map.js",
  "./js/header.js",
  "./js/restaurant_info.js",
  "./webfonts/"
];

// Install Service Worker
self.addEventListener("install", function(e) {
  console.log("Service worker: Installed");
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(function(cache) {
        console.log("Service Worker: Caching Files");
        cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
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
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch cache with Service Worker
self.addEventListener("fetch", e => {
  console.log("Service worker: Fetching files");
  e.respondWith(
    fetch(e.request)
      .catch(() => caches.match(e.request))
  );
});
