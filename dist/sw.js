
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
            return caches.delete(cache);
          }
        })
      );
    })
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
