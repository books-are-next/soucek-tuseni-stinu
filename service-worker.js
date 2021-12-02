/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-ca4e35f';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./favicon.png","./index.html","./manifest.json","./tuseni_stinu_002.html","./tuseni_stinu_003.html","./tuseni_stinu_005.html","./tuseni_stinu_006.html","./tuseni_stinu_007.html","./tuseni_stinu_008.html","./tuseni_stinu_009.html","./tuseni_stinu_010.html","./tuseni_stinu_011.html","./tuseni_stinu_012.html","./tuseni_stinu_013.html","./tuseni_stinu_014.html","./tuseni_stinu_015.html","./tuseni_stinu_017.html","./tuseni_stinu_018.html","./tuseni_stinu_016.html","./tuseni_stinu_019.html","./tuseni_stinu_020.html","./tuseni_stinu_021.html","./tuseni_stinu_022.html","./tuseni_stinu_023.html","./tuseni_stinu_024.html","./tuseni_stinu_025.html","./tuseni_stinu_026.html","./tuseni_stinu_027.html","./tuseni_stinu_028.html","./tuseni_stinu_029.html","./tuseni_stinu_030.html","./tuseni_stinu_031.html","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./resources/03_fmt.jpeg","./resources/04_fmt.jpeg","./resources/05_fmt.jpeg","./resources/06_fmt.jpeg","./resources/07_fmt.jpeg","./resources/08_fmt.jpeg","./resources/09_fmt.jpeg","./resources/10_fmt.jpeg","./resources/11_fmt.jpeg","./resources/12_fmt.jpeg","./resources/13_fmt.jpeg","./resources/14_fmt.jpeg","./resources/15_fmt.jpeg","./resources/16_fmt.jpeg","./resources/17_fmt.jpeg","./resources/18_fmt.jpeg","./resources/19_fmt.jpeg","./resources/20_fmt.jpeg","./resources/21_fmt.jpeg","./resources/22_fmt.jpeg","./resources/23_fmt.jpeg","./resources/24_fmt.jpeg","./resources/25_fmt.jpeg","./resources/26_fmt.jpeg","./resources/27_fmt.jpeg","./resources/28_fmt.jpeg","./resources/29_fmt.jpeg","./resources/30_fmt.jpeg","./resources/31_fmt.jpeg","./resources/32_fmt.jpeg","./resources/32a_fmt.jpeg","./resources/33_fmt.jpeg","./resources/34_fmt.jpeg","./resources/35_fmt.jpeg","./resources/36_fmt.jpeg","./resources/37_fmt.jpeg","./resources/38_fmt.jpeg","./resources/39_fmt.jpeg","./resources/40_fmt.jpeg","./resources/41_fmt.jpeg","./resources/42_fmt.jpeg","./resources/43_fmt.jpeg","./resources/44_fmt.jpeg","./resources/45_fmt.jpeg","./resources/46_fmt.jpeg","./resources/47_fmt.jpeg","./resources/48_fmt.jpeg","./resources/49_fmt.jpeg","./resources/50_fmt.jpeg","./resources/51_fmt.jpeg","./resources/52_fmt.jpeg","./resources/53_fmt.jpeg","./resources/54_fmt.jpeg","./resources/55_fmt.jpeg","./resources/56_fmt.jpeg","./resources/57_fmt.jpeg","./resources/58_fmt.jpeg","./resources/59_fmt.jpeg","./resources/60_fmt.jpeg","./resources/61_fmt.jpeg","./resources/62_fmt.jpeg","./resources/63_fmt.jpeg","./resources/image001_fmt.jpeg","./resources/image002_fmt.jpeg","./resources/obalka_tuseni_stinu_fmt.jpeg","./resources/upoutavka_eknihy_fmt.jpeg","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
