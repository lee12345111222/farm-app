if(!self.define){let e,s={};const c=(c,n)=>(c=new URL(c+".js",n).href,s[c]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=s,document.head.appendChild(e)}else e=c,importScripts(c),s()})).then((()=>{let e=s[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(n,a)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let r={};const t=e=>c(e,i),d={module:{uri:i},exports:r,require:t};s[i]=Promise.all(n.map((e=>d[e]||t(e)))).then((e=>(a(...e),r)))}}define(["./workbox-07a7b4f2"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/BPr5AN0jZNy_cVgWo-KEW/_buildManifest.js",revision:"5bc86a3e5e7a01f3313e6b9fd0e3a0d5"},{url:"/_next/static/BPr5AN0jZNy_cVgWo-KEW/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/284-18f517de2d52abd6.js",revision:"18f517de2d52abd6"},{url:"/_next/static/chunks/2b7b2d2a-673c6c95daca3e52.js",revision:"673c6c95daca3e52"},{url:"/_next/static/chunks/412-0d4511fe7dd3e6bc.js",revision:"0d4511fe7dd3e6bc"},{url:"/_next/static/chunks/515-0a0d2a4641f3968c.js",revision:"0a0d2a4641f3968c"},{url:"/_next/static/chunks/5cdd5e0d-8a29e2dd1f5102ef.js",revision:"8a29e2dd1f5102ef"},{url:"/_next/static/chunks/711-27729895dd738ae9.js",revision:"27729895dd738ae9"},{url:"/_next/static/chunks/721-276c404343842c4a.js",revision:"276c404343842c4a"},{url:"/_next/static/chunks/876-5029ae306a7d997b.js",revision:"5029ae306a7d997b"},{url:"/_next/static/chunks/c869f9c7-dc0f6f368fcce159.js",revision:"dc0f6f368fcce159"},{url:"/_next/static/chunks/d59bccd2-47d4cb14083d1aaf.js",revision:"47d4cb14083d1aaf"},{url:"/_next/static/chunks/f1b7312e-789b66262cc92505.js",revision:"789b66262cc92505"},{url:"/_next/static/chunks/framework-467b11a89995b152.js",revision:"467b11a89995b152"},{url:"/_next/static/chunks/main-4cec6cb0d7dd95eb.js",revision:"4cec6cb0d7dd95eb"},{url:"/_next/static/chunks/pages/_app-902d5ab79d5dbc9f.js",revision:"902d5ab79d5dbc9f"},{url:"/_next/static/chunks/pages/_error-a59e2db023c5e431.js",revision:"a59e2db023c5e431"},{url:"/_next/static/chunks/pages/addshop-b5f652e6fc5422cf.js",revision:"b5f652e6fc5422cf"},{url:"/_next/static/chunks/pages/adminTable-e0573dd4fa3dee49.js",revision:"e0573dd4fa3dee49"},{url:"/_next/static/chunks/pages/animals-c064ac4aefea9a2e.js",revision:"c064ac4aefea9a2e"},{url:"/_next/static/chunks/pages/batchTable-0883eb874e1704bb.js",revision:"0883eb874e1704bb"},{url:"/_next/static/chunks/pages/chat-f4073789506f0048.js",revision:"f4073789506f0048"},{url:"/_next/static/chunks/pages/chickenBatch-d6c24228f0f0573e.js",revision:"d6c24228f0f0573e"},{url:"/_next/static/chunks/pages/clean-4258116a71ae4a63.js",revision:"4258116a71ae4a63"},{url:"/_next/static/chunks/pages/farm-82384ee996584ad4.js",revision:"82384ee996584ad4"},{url:"/_next/static/chunks/pages/feed-a959001dd812fc6a.js",revision:"a959001dd812fc6a"},{url:"/_next/static/chunks/pages/forget-317181d34c96cd88.js",revision:"317181d34c96cd88"},{url:"/_next/static/chunks/pages/home-c83b779b0d38ce5c.js",revision:"c83b779b0d38ce5c"},{url:"/_next/static/chunks/pages/immunity-183393ea84ea0e2f.js",revision:"183393ea84ea0e2f"},{url:"/_next/static/chunks/pages/index-6877a70ecaaa0693.js",revision:"6877a70ecaaa0693"},{url:"/_next/static/chunks/pages/login-dbb69eadfdaeebd2.js",revision:"dbb69eadfdaeebd2"},{url:"/_next/static/chunks/pages/login/home-4ab9ef0e926f2eae.js",revision:"4ab9ef0e926f2eae"},{url:"/_next/static/chunks/pages/news-37d0af0f7a829d55.js",revision:"37d0af0f7a829d55"},{url:"/_next/static/chunks/pages/news/detail-05427e9ee2d00acd.js",revision:"05427e9ee2d00acd"},{url:"/_next/static/chunks/pages/questionnaire-b8bb24615db35e07.js",revision:"b8bb24615db35e07"},{url:"/_next/static/chunks/pages/record-a36c17fb7f4797ca.js",revision:"a36c17fb7f4797ca"},{url:"/_next/static/chunks/pages/register-d9e14d3c68462b07.js",revision:"d9e14d3c68462b07"},{url:"/_next/static/chunks/pages/shop-cd6c3fd297521608.js",revision:"cd6c3fd297521608"},{url:"/_next/static/chunks/pages/shopCart-94f1a41c66e7bfb5.js",revision:"94f1a41c66e7bfb5"},{url:"/_next/static/chunks/pages/shopDetail-01c14b6705b3f651.js",revision:"01c14b6705b3f651"},{url:"/_next/static/chunks/pages/table-cadd52570143b431.js",revision:"cadd52570143b431"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-c21fd345984bfc83.js",revision:"c21fd345984bfc83"},{url:"/_next/static/css/3ce6fd6c595f2fd9.css",revision:"3ce6fd6c595f2fd9"},{url:"/back.png",revision:"45d45ac29536cf962117551815c04c76"},{url:"/background.png",revision:"8a01db5d2913c7818ad37e0c445852e7"},{url:"/backwhite.png",revision:"0775d5b63523e34c7e2f708628f63856"},{url:"/email.png",revision:"16203e91a369665941a321bf541a9704"},{url:"/favicon.ico",revision:"27bb4a7d24cfbd9487d50fadfd27ab05"},{url:"/home_slices/bg.png",revision:"f10d2acefc4e4944f78d8cb77d325bb3"},{url:"/home_slices/connect.png",revision:"38552ac051b172a9cff35840a83850ab"},{url:"/home_slices/connectus.png",revision:"fb5ee88444b8655b596a8c88d224997d"},{url:"/home_slices/home-grey.png",revision:"f0f47d25c1809846c79555d6bb83f042"},{url:"/home_slices/home.png",revision:"b7b2bce85f4442153f2a37faa6d3f9c8"},{url:"/home_slices/language.png",revision:"f1f14e7438bb04eaf9a61866b7d83381"},{url:"/home_slices/logo-white.png",revision:"ca5304ba998fc24085e965d2e2ee7037"},{url:"/home_slices/medicine.png",revision:"c36e0cf220746ad8e1fe23cce18d1512"},{url:"/home_slices/menu.png",revision:"c38d18c375e34531947c1d07b0c91c60"},{url:"/home_slices/message-grey.png",revision:"d9192d4347a698d67ea70dccfc33ecc1"},{url:"/home_slices/message.png",revision:"e4a707c4e20eb246ee538edc1ca8f1db"},{url:"/home_slices/mysquare.png",revision:"89c8bd14c1e29cb465690d815af01de6"},{url:"/home_slices/news.png",revision:"b872cb213732647d9572d90a9c760a19"},{url:"/home_slices/square-grey.png",revision:"aecdbe6a49b49f5c24d8f14de7f485a4"},{url:"/home_slices/square.png",revision:"faa114f58badc0dbc7b595b8064b2928"},{url:"/home_slices/table.png",revision:"86a078d80fa056daad4303107ee9372f"},{url:"/home_slices/user-record-grey.png",revision:"c02d859c4f7ee70b37bb7c5009f46039"},{url:"/home_slices/user-record.png",revision:"e06407b31d7232e017eae0426f147671"},{url:"/icons/android-chrome-192x192.png",revision:"0bbd64d1ee937300fb1505ec5c88b154"},{url:"/icons/apple-touch-icon.png",revision:"7090a7b2693181947331e38efa4f3486"},{url:"/icons/icon-512x512.png",revision:"9312927ec9f042055794a59d924e8c03"},{url:"/language.png",revision:"995746027a964a1e29ada71c18604b6a"},{url:"/logo.png",revision:"747303d01aca129879bbce2d9fbaffde"},{url:"/manifest.json",revision:"f4749fc794577c45df163bcb23d1e483"},{url:"/menu.png",revision:"5e46342a630d70c2db4ec6289839ebb6"},{url:"/news/add-white.png",revision:"58b8feff91b6e30f00838ce4bfb40bda"},{url:"/news/add.png",revision:"2bad69bc63c2b1a56386809fe4555bb9"},{url:"/news/arrowright.png",revision:"a5525ca31d938cb5062ca07e90b74e16"},{url:"/news/backTop.png",revision:"3efb4b6da2f31513a6829d5ac22918d3"},{url:"/news/down-white.png",revision:"098437064d43db4ebb0091d05354f7e3"},{url:"/news/expression.png",revision:"0cd11b1d31a74e5af486d6ac216fe973"},{url:"/news/farmbg.png",revision:"dd375e33061c24addc34a8a6c09ede97"},{url:"/news/left.png",revision:"b812e0d1646ebf9bd1d0592d0df7b67f"},{url:"/news/right.png",revision:"e55b10bd28a4f89f3c7e31fe15af1a4f"},{url:"/news/search.png",revision:"6986d212aa561bdbf19ba79f34cf041a"},{url:"/news/selectdown.png",revision:"b7153e7479839d0ff3973c13e491d34e"},{url:"/news/shop.png",revision:"2fe619223716649d036b7181327273bc"},{url:"/news/shopCart.png",revision:"b59d56e067bf4fb499b8cd1fbdd81d61"},{url:"/news/table.png",revision:"2f8b49ce89651ae9428896f8d648b781"},{url:"/nickname.png",revision:"bf4a70debcc531d23aec3e79c7898e42"},{url:"/password.png",revision:"ef4c83faf0a3515ade16fa58bd9a561f"},{url:"/phone.png",revision:"b36e2361e9f7a372a9cd1995be75ab26"},{url:"/signincode.png",revision:"0ec4907c951a609a7507777a2c2a50bb"},{url:"/user_photo.png",revision:"0124f3cfc92e47fb5bf0b013193a7609"},{url:"/user_photo2.png",revision:"9ccb7255ce0b5fceaa28391360207b3a"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:c,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
