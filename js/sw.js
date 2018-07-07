var filesToCache = [
  '..',
  'css/style.css',
  'js/script.js',
  'js/script2.js',
  'js/script3.js',
  'js/jquery.min.js',
  'js/bootstrap.min.js',
  'js/script.js',
  'index.html'

];

var staticCacheName = 'pages-cache-v1';

self.addEventListener('install', function(event) {
  console.log('Attempting to install service worker and cache static assets');
  event.waitUntil(
    caches.open(staticCacheName)
    .then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});