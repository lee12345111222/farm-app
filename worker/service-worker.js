// service-worker.ts

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // 如果緩存中有對應資源，则直接返回緩存
      if (response) {
        return response;
      }

      // 否则，通過網絡請求資源
      return fetch(event.request);
    })
  );
});
