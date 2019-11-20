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

  workbox.routing.setCatchHandler(({event}) => {
    // The FALLBACK_URL entries must be added to the cache ahead of time, either via runtime
    // or precaching.
    // If they are precached, then call workbox.precaching.getCacheKeyForURL(FALLBACK_URL)
    // to get the correct cache key to pass in to caches.match().
    console.log("routing")
    workbox.precaching.getCacheKeyForURL('night.webp')
    // Use event, request, and url to figure out how to respond.
    // One approach would be to use request.destination, see
    // https://medium.com/dev-channel/service-worker-caching-strategies-based-on-request-types-57411dd7652c
    switch (event.request.destination) {
        
      case 'images':
        return caches.match('night.webp');
      break;
  
      default:
        // If we don't have a fallback, just return an error response.
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
  

workbox.precaching.precacheAndRoute([]);