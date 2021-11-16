/* serviceWorker.js */
// (参考) https://qiita.com/kaihar4/items/c09a6d73e190ab0b9b01
'use strict';

const CACHE_NAME = "ShortGammon-v20211116";
const ORIGIN = (location.hostname == 'localhost') ? '' : location.protocol + '//' + location.hostname;

const STATIC_FILES = [
  ORIGIN + '/ShortGammon/',
  ORIGIN + '/ShortGammon/index.html',
  ORIGIN + '/ShortGammon/manifest.json',
  ORIGIN + '/ShortGammon/icon/favicon.ico',
  ORIGIN + '/ShortGammon/icon/apple-touch-icon.png',
  ORIGIN + '/ShortGammon/icon/android-chrome-96x96.png',
  ORIGIN + '/ShortGammon/icon/android-chrome-192x192.png',
  ORIGIN + '/ShortGammon/icon/android-chrome-512x512.png',
  ORIGIN + '/ShortGammon/css/bgboardapp.css',
  ORIGIN + '/ShortGammon/css/bgBoard.css',
  ORIGIN + '/css/font-awesome-animation.min.css',
  ORIGIN + '/js/fontawesome-all.min.js',
  ORIGIN + '/js/jquery-3.6.0.min.js',
  ORIGIN + '/js/inobounce.min.js',
  ORIGIN + '/ShortGammon/js/BgBoard_class.js',
  ORIGIN + '/ShortGammon/js/BgChequer_class.js',
  ORIGIN + '/ShortGammon/js/BgXgid_class.js',
  ORIGIN + '/ShortGammon/js/BgUtil_class.js',
  ORIGIN + '/ShortGammon/js/BgGame_class.js'
];

const CACHE_KEYS = [
  CACHE_NAME
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return Promise.all(
        STATIC_FILES.map(url => {
          return fetch(new Request(url, { cache: 'no-cache', mode: 'no-cors' })).then(response => {
            return cache.put(url, response);
          });
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => {
          return !CACHE_KEYS.includes(key);
        }).map(key => {
          return caches.delete(key);
        })
      );
    })
  );
});

