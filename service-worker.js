importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

workbox.skipWaiting();
workbox.clientsClaim();

// cache name
workbox.core.setCacheNameDetails({
    prefix: 'jc-cache',
    precache: 'precache',
    runtime: 'runtime',
  });
  
//stylesheet cache
workbox.routing.registerRoute(
    new RegExp('\.css$'),
    workbox.strategies.cacheFirst({
        cacheName: 'Stylesheets-Cache',
        plugins: [
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 7, // cache for one week
                maxEntries: 50, 
                purgeOnQuotaError: true
            })
        ]
    })
);

//image cache
workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|webp|svg)$/,
    new workbox.strategies.CacheFirst({
      cacheName: 'images',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 60,
          maxAgeSeconds: 5 * 60 , // 30 Days
        }),
      ],
    })
  );

//weather cache
workbox.routing.registerRoute(
    new RegExp('https://api.openweathermap.org/data/2.5/weather'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'Weather-Cache',
        cacheExpiration: {
            maxAgeSeconds: 60 * 5 //cache the news content for 5min
        }
    })
);
  

workbox.precaching.precacheAndRoute([
  {
    "url": "app.js",
    "revision": "d5b3aeee11657adeadbf94716312f9b3"
  },
  {
    "url": "images/day.jpg",
    "revision": "e05992856972218d1624c8754c36f117"
  },
  {
    "url": "images/night.webp",
    "revision": "0959737b870e72f6989532344e2c92f5"
  },
  {
    "url": "index.html",
    "revision": "4d643ecbb81a8c7e2f1085af79e596c0"
  },
  {
    "url": "main.css",
    "revision": "f341a705e879092ce8ff6c031d8eaed8"
  },
  {
    "url": "service-worker-src.js",
    "revision": "3ffe1464bd303084395b8fe98868ecf0"
  },
  {
    "url": "workbox-conf.js",
    "revision": "0a55081d808167996b1e44e2c8e35771"
  }
]);