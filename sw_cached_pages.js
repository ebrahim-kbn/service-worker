const cacheName = "v1";
const cacheAssets = [
  "index.html",
  "about.html",
  "/css/style.css",
  "/js/main.js",
];
self.addEventListener("install", (e) => {
  console.log("Service Worker: Installed");
  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        console.log("Service Worker: Caching Files");
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  console.log("Service Worker: Activated");
  e.waitUntil(
    caches.keys().then((chaceNames) => {
      return Promise.all(
        chaceNames.map((cache) => {
          if (cache !== cacheName) {
            console.log("Service Worker: Clearing Old Cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (e) => {
  console.log("Service Worker: Fetching");

  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
