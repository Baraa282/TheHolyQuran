// Service Worker for Quran PWA – offline-first
const CACHE_NAME = 'quran-app-v4';

// Critical assets – must be available offline
const CRITICAL_URLS = [
  './',
  './index.html',
  './manifest.json',
  './2.jpg',
  './data/quran/quran-data.js',
  './data/quran/qpc-v4.json',
  './data/quran/qpc-hafs-tajweed.json',
  './data/translations/ar-tafsir-muyassar.json',
  'UthmanicHafs_v2-0 font/uthmanic_hafs_v20.ttf',
  'fonts/HafsSmart_08.ttf',
  'fonts/UthmanicHafs1 Ver13.otf'
];

// Optional assets – cached when present (won’t break install if missing)
const OPTIONAL_URLS = [
  './json/page_data.json',
  './json/surah_data.json',
  './ayah_position.json',
  './data/translations/abridged-explanation-of-the-quran.json',
  './data/translations/al-i-rab-al-muyassar.json',
  './data/translations/bengali-mokhtasar.json',
  './data/translations/bosnian-mokhtasar.json',
  './data/translations/cs-unknown-simple.json',
  './data/translations/de-bubenheim-simple.json',
  './data/translations/greek-translation-simple.json',
  './data/translations/french-mokhtasar.json',
  './data/translations/hindi-mokhtasar.json',
  './data/translations/indonesian-mokhtasar.json',
  './data/translations/italian-mokhtasar.json',
  './data/translations/japanese-mokhtasar.json',
  './data/translations/kurd-tafsir-rebar.json',
  './data/translations/kurdish-mokhtasar.json',
  './data/translations/persian-mokhtasar.json',
  './data/translations/russian-mokhtasar.json',
  './data/translations/quran-al-ahmeti-simple.json',
  './data/translations/spanish-mokhtasar.json',
  './data/translations/sv-knut-simple.json',
  './data/translations/turkish-mokhtasar.json'
];

function isSameOrigin(url) {
  try {
    const u = new URL(url, self.location.href);
    return u.origin === self.location.origin;
  } catch (_) {
    return false;
  }
}

// Install: pre-cache critical assets, then optional (ignore 404s)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(CRITICAL_URLS.map((u) => new URL(u, self.location.href).href))
          .then(() => {
            return Promise.allSettled(
              OPTIONAL_URLS.map((u) => cache.add(new URL(u, self.location.href).href))
            );
          });
      })
      .catch((err) => console.warn('SW install cache addAll failed:', err))
  );
  self.skipWaiting();
});

// Fetch: offline-first for same-origin; network-first for HTML
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  const sameOrigin = isSameOrigin(event.request.url);
  const isHtml =
    event.request.mode === 'navigate' ||
    (event.request.headers.get('accept') || '').includes('text/html') ||
    url.pathname.endsWith('.html') ||
    url.pathname.endsWith('/');

  // HTML / navigation: try network first, fall back to cache (offline)
  if (isHtml) {
    event.respondWith(
      fetch(event.request)
        .then((res) => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return res;
        })
        .catch(() => caches.match(event.request).then((r) => r || caches.match('./index.html')))
    );
    return;
  }

  // Same-origin: cache-first so offline works after first load
  if (sameOrigin) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((res) => {
          const clone = res.clone();
          if (res.ok && res.type === 'basic')
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return res;
        });
      })
    );
    return;
  }

  // Cross-origin (e.g. CDN): network only; no cache (will fail offline)
  event.respondWith(fetch(event.request));
});

// Let the new worker take control when user confirms update
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

// Activate: remove old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
    )
  );
  self.clients.claim();
});
