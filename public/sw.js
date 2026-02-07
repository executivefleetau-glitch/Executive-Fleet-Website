const CACHE_NAME = 'executive-fleet-v1';
const OFFLINE_URL = '/offline';

// Assets to precache for app shell
const PRECACHE_ASSETS = [
  '/',
  '/site.webmanifest',
  '/favicon.ico',
  '/assets/imgs/logo/tab.png',
  '/assets/imgs/logo/EF Logo-01.png',
  '/assets/imgs/logo/EF Logo-05.png',
];

// Install event - precache app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Cache what we can, don't fail if some assets are missing
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.log('[SW] Precache partial failure (non-critical):', err);
      });
    })
  );
  // Activate immediately
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  // Take control of all clients immediately
  self.clients.claim();
});

// Fetch event - network-first strategy for pages, cache-first for static assets
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip API calls and auth routes - always go to network
  if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/admin/login')) {
    return;
  }

  // Skip cross-origin requests (Google Maps, analytics, etc.)
  if (url.origin !== self.location.origin) return;

  // For static assets (images, fonts, CSS, JS) - cache-first
  if (
    url.pathname.startsWith('/assets/') ||
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.match(/\.(png|jpg|jpeg|gif|webp|svg|ico|woff|woff2|ttf|eot|css|js)$/)
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          // Cache successful responses
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        }).catch(() => {
          // Return nothing for failed static asset fetches
          return new Response('', { status: 404 });
        });
      })
    );
    return;
  }

  // For page navigations - network-first with cache fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache the latest version of each page
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Offline - serve from cache
          return caches.match(request).then((cached) => {
            return cached || caches.match('/');
          });
        })
    );
    return;
  }
});

// Handle push notifications (for future use with booking notifications)
self.addEventListener('push', (event) => {
  if (!event.data) return;

  try {
    const data = event.data.json();
    const options = {
      body: data.body || 'New notification from Executive Fleet',
      icon: '/assets/imgs/logo/tab.png',
      badge: '/assets/imgs/logo/tab.png',
      vibrate: [200, 100, 200],
      data: {
        url: data.url || '/admin/bookings',
      },
      actions: data.actions || [],
    };

    event.waitUntil(
      self.registration.showNotification(
        data.title || 'Executive Fleet',
        options
      )
    );
  } catch (err) {
    console.error('[SW] Push notification error:', err);
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url || '/admin/bookings';

  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then((clients) => {
      // Focus existing tab if open
      for (const client of clients) {
        if (client.url.includes(url) && 'focus' in client) {
          return client.focus();
        }
      }
      // Open new tab
      if (self.clients.openWindow) {
        return self.clients.openWindow(url);
      }
    })
  );
});
