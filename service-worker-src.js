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
                maxEntries: 20, 
                purgeOnQuotaError: true
            })
        ]
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
  

workbox.precaching.precacheAndRoute([]);