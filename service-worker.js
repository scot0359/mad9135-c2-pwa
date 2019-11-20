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
  
  // Use a stale-while-revalidate strategy for all other requests.
  workbox.routing.setDefaultHandler(
    new workbox.strategies.StaleWhileRevalidate()
  );

  workbox.routing.setCatchHandler(({event}) => {
    switch (event.request.destination) {
      case 'image':
        return caches.match('images/night.webp');
      break;
  
      default:
        return Response.error();
    }
  });

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
    "revision": "3c99cc78c511894b7c961ef9d663bde4"
  },
  {
    "url": "images/day.jpg",
    "revision": "e05992856972218d1624c8754c36f117"
  },
  {
    "url": "index.html",
    "revision": "852deb7827af47776e59b3409635c972"
  },
  {
    "url": "main.css",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "service-worker-src.js",
    "revision": "f6532c4f26501d40bb0933466565dddb"
  },
  {
    "url": "workbox-conf.js",
    "revision": "ca94431e4adec3f428b694ab5a8a158e"
  }
]);