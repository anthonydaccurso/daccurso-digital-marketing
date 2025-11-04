// Smart caching strategy
const CACHE_NAME = 'ddm-cache-v1';

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip caching for API calls
  if (url.pathname.includes('/functions/v1/') ||
      url.pathname.includes('/.netlify/functions/') ||
      url.hostname.includes('openrouter.ai')) {
    event.respondWith(fetch(request));
    return;
  }

  // Cache-first for fonts and static assets
  if (request.destination === 'font' ||
      request.destination === 'image' ||
      url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      caches.match(request).then(cached => {
        return cached || fetch(request).then(response => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(request, response.clone());
            return response;
          });
        });
      })
    );
    return;
  }

  // Network-first for everything else
  event.respondWith(
    fetch(request).catch(() => {
      return caches.match(request);
    })
  );
});

self.addEventListener('push', (event) => {
  const options = {
    body: event.data.text(),
    icon: '/apple-touch-icon.png',
    badge: '/favicon-32x32.png'
  };

  event.waitUntil(
    self.registration.showNotification('Daccurso Digital Marketing', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('https://anthonydaccurso.com')
  );
});