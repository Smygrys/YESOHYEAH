// ============================
// SMYGRYSSAVE AI — SERVICE WORKER
// ============================

const CACHE_NAME = 'smygryssave-v1.2.0';
const RUNTIME_CACHE = 'smygryssave-runtime-v1';

// Files to cache immediately on install
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/styles.css',
  '/data.js',
  '/ai.js',
  '/features.js',
  '/app.js',
  '/manifest.json'
];

// External CDN resources to cache on first use
const CDN_URLS = [
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
  'https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js'
];

// ==================== INSTALL ====================
self.addEventListener('install', event => {
  console.log('[SW] Installing SmygrysSave AI Service Worker...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Pre-caching app shell');
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => {
        console.log('[SW] Install complete');
        return self.skipWaiting();
      })
      .catch(err => {
        console.warn('[SW] Pre-cache failed for some resources:', err);
        return self.skipWaiting();
      })
  );
});

// ==================== ACTIVATE ====================
self.addEventListener('activate', event => {
  console.log('[SW] Activating...');

  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(name => name !== CACHE_NAME && name !== RUNTIME_CACHE)
            .map(name => {
              console.log('[SW] Deleting old cache:', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => {
        console.log('[SW] Activated, claiming clients');
        return self.clients.claim();
      })
  );
});

// ==================== FETCH ====================
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Skip chrome-extension and other non-http
  if (!url.protocol.startsWith('http')) return;

  // Strategy based on request type
  if (isAppShell(url)) {
    // App shell: Cache first, fallback to network
    event.respondWith(cacheFirst(event.request));
  }
  else if (isCDN(url)) {
    // CDN resources: Stale while revalidate
    event.respondWith(staleWhileRevalidate(event.request));
  }
  else if (isFont(url)) {
    // Fonts: Cache first (they rarely change)
    event.respondWith(cacheFirst(event.request));
  }
  else if (isAPI(url)) {
    // API calls: Network first, fallback to cache
    event.respondWith(networkFirst(event.request));
  }
  else {
    // Everything else: Network first with cache fallback
    event.respondWith(networkFirst(event.request));
  }
});

// ==================== STRATEGIES ====================

// Cache First — serve from cache, fallback to network
async function cacheFirst(request) {
  try {
    const cached = await caches.match(request);
    if (cached) {
      // Update cache in background
      updateCache(request);
      return cached;
    }
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    const cached = await caches.match(request);
    if (cached) return cached;
    return offlineFallback(request);
  }
}

// Network First — try network, fallback to cache
async function networkFirst(request) {
  try {
    const response = await fetch(request, { 
      signal: AbortSignal.timeout(8000) 
    });
    if (response.ok) {
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    const cached = await caches.match(request);
    if (cached) return cached;
    return offlineFallback(request);
  }
}

// Stale While Revalidate — serve cache immediately, update in background
async function staleWhileRevalidate(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cached = await cache.match(request);
  
  const fetchPromise = fetch(request)
    .then(response => {
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => cached);

  return cached || fetchPromise;
}

// Background cache update
async function updateCache(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, response);
    }
  } catch (err) {
    // Silent fail — we already served from cache
  }
}

// ==================== HELPERS ====================

function isAppShell(url) {
  const path = url.pathname;
  return PRECACHE_URLS.some(p => {
    if (p === '/') return path === '/' || path === '/index.html';
    return path.endsWith(p.replace('/', ''));
  });
}

function isCDN(url) {
  return CDN_URLS.some(cdn => url.href.startsWith(cdn.split('?')[0])) ||
    url.hostname.includes('cdn') ||
    url.hostname.includes('cdnjs') ||
    url.hostname.includes('jsdelivr');
}

function isFont(url) {
  return url.hostname.includes('fonts.googleapis.com') ||
    url.hostname.includes('fonts.gstatic.com') ||
    url.pathname.endsWith('.woff2') ||
    url.pathname.endsWith('.woff') ||
    url.pathname.endsWith('.ttf');
}

function isAPI(url) {
  return url.pathname.startsWith('/api/') ||
    url.hostname.includes('api.');
}

function offlineFallback(request) {
  // If requesting a page, return the cached index.html
  if (request.headers.get('accept')?.includes('text/html')) {
    return caches.match('/index.html') || new Response(
      offlineHTML(),
      { headers: { 'Content-Type': 'text/html' } }
    );
  }

  // If requesting JSON, return empty
  if (request.headers.get('accept')?.includes('application/json')) {
    return new Response(
      JSON.stringify({ error: 'offline', message: 'No network connection' }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Default empty response
  return new Response('', { status: 503, statusText: 'Offline' });
}

function offlineHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SmygrysSave AI — Offline</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body {
      font-family: 'Inter', -apple-system, sans-serif;
      background: #050508; color: #f0f0f5;
      display: flex; align-items: center; justify-content: center;
      min-height: 100vh; text-align: center; padding: 20px;
    }
    .offline-card {
      background: rgba(18,18,32,0.85);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 24px; padding: 48px 40px;
      max-width: 420px; width: 100%;
      box-shadow: 0 8px 40px rgba(0,0,0,0.5);
    }
    .offline-icon {
      width: 72px; height: 72px; border-radius: 20px;
      background: linear-gradient(135deg, #a855f7, #ec4899);
      display: inline-flex; align-items: center; justify-content: center;
      font-size: 28px; margin-bottom: 24px;
      box-shadow: 0 8px 32px rgba(168,85,247,0.3);
    }
    h1 { font-size: 22px; font-weight: 800; margin-bottom: 8px; letter-spacing: -0.5px; }
    p { font-size: 14px; color: #8888a8; line-height: 1.7; margin-bottom: 24px; }
    .retry-btn {
      padding: 14px 32px; border-radius: 12px; border: none;
      background: linear-gradient(135deg, #a855f7, #ec4899);
      color: #fff; font-size: 14px; font-weight: 700;
      cursor: pointer; font-family: inherit;
      box-shadow: 0 4px 20px rgba(168,85,247,0.35);
      transition: all 0.3s;
    }
    .retry-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 30px rgba(168,85,247,0.45); }
    .info { font-size: 11px; color: #555570; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="offline-card">
    <div class="offline-icon">📡</div>
    <h1>You're Offline</h1>
    <p>SmygrysSave AI needs an internet connection for the first load. Your data is stored locally and will be available once reconnected.</p>
    <button class="retry-btn" onclick="window.location.reload()">Try Again</button>
    <p class="info">All your financial data is safely stored on your device.</p>
  </div>
</body>
</html>`;
}

// ==================== PUSH NOTIFICATIONS ====================
self.addEventListener('push', event => {
  const options = {
    icon: 'icons/icon-192x192.png',
    badge: 'icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: { url: '/' },
    actions: [
      { action: 'open', title: 'Open App' },
      { action: 'dismiss', title: 'Dismiss' }
    ]
  };

  let data;
  try {
    data = event.data?.json();
  } catch (e) {
    data = { title: 'SmygrysSave AI', body: event.data?.text() || 'New notification' };
  }

  event.waitUntil(
    self.registration.showNotification(
      data.title || 'SmygrysSave AI',
      { ...options, body: data.body || 'Check your finances' }
    )
  );
});

// ==================== NOTIFICATION CLICK ====================
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'dismiss') return;

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(clients => {
        // Focus existing window
        for (const client of clients) {
          if (client.url.includes('index.html') && 'focus' in client) {
            return client.focus();
          }
        }
        // Open new window
        if (self.clients.openWindow) {
          return self.clients.openWindow('/index.html');
        }
      })
  );
});

// ==================== BACKGROUND SYNC ====================
self.addEventListener('sync', event => {
  if (event.tag === 'sync-data') {
    console.log('[SW] Background sync triggered');
    event.waitUntil(syncData());
  }
});

async function syncData() {
  // Placeholder for future server sync
  // When backend is added, this would push local changes to server
  console.log('[SW] Data sync complete (local only for now)');
}

// ==================== PERIODIC BACKGROUND SYNC ====================
self.addEventListener('periodicsync', event => {
  if (event.tag === 'update-rates') {
    event.waitUntil(updateExchangeRates());
  }
});

async function updateExchangeRates() {
  // Placeholder for fetching live exchange rates
  // When API is connected, this would update cached rates
  console.log('[SW] Exchange rate update check (placeholder)');
}

// ==================== MESSAGE HANDLER ====================
self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data?.type === 'CLEAR_CACHE') {
    caches.keys().then(names => {
      names.forEach(name => caches.delete(name));
    });
  }

  if (event.data?.type === 'GET_VERSION') {
    event.ports[0]?.postMessage({ version: CACHE_NAME });
  }

  if (event.data?.type === 'CACHE_URLS') {
    const urls = event.data.urls || [];
    caches.open(RUNTIME_CACHE).then(cache => {
      cache.addAll(urls).catch(() => {});
    });
  }
});

console.log('[SW] SmygrysSave AI Service Worker loaded');