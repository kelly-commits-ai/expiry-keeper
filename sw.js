// 效期管家 Service Worker：離線可用。更新版本時請修改 CACHE 名稱。
const CACHE = "expiry-keeper-v1.2.0";
const LIB_CACHE = "expiry-keeper-lib-v1"; // 文字辨識程式庫（版本固定，長期快取）
const SHELL = ["./", "index.html", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE && k !== LIB_CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  if (url.hostname === "cdn.jsdelivr.net") {
    // 快取優先：辨識程式與語言資料下載一次後即可離線使用
    e.respondWith(caches.open(LIB_CACHE).then(c => c.match(e.request).then(hit => hit || fetch(e.request).then(res => { if (res.ok) c.put(e.request, res.clone()); return res; }))));
    return;
  }
  if (url.origin !== location.origin) return; // Gemini 等外部請求直接走網路
  // 網路優先（取得最新版），離線時使用快取
  e.respondWith(fetch(e.request).then(res => {
    const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return res;
  }).catch(() => caches.match(e.request).then(r => r || caches.match("index.html"))));
});
