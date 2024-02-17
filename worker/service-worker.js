// service-worker.ts

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // 如果缓存中有对应资源，则直接返回缓存
      if (response) {
        return response;
      }

      // 否则，通过网络请求资源
      return fetch(event.request);
    })
  );
});
