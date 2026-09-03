const CACHE = "pt-de-bolso-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
  "./img/abs_cablecrunch.jpg",
  "./img/abs_deadbug.jpg",
  "./img/abs_joelhos.jpg",
  "./img/abs_pallof.jpg",
  "./img/abs_prancha.jpg",
  "./img/biceps_direta.jpg",
  "./img/biceps_martelo.jpg",
  "./img/costas_pulldown.jpg",
  "./img/costas_pulldown_est.jpg",
  "./img/costas_pullover.jpg",
  "./img/costas_remada_sent.jpg",
  "./img/costas_remada_uni.jpg",
  "./img/ombros_desenv.jpg",
  "./img/ombros_elev_lat.jpg",
  "./img/ombros_facepull.jpg",
  "./img/ombros_reverse_deck.jpg",
  "./img/peito_chest_press.jpg",
  "./img/peito_crossover.jpg",
  "./img/peito_crossover_baixo.jpg",
  "./img/peito_pec_deck.jpg",
  "./img/peito_supino_inc_halt.jpg",
  "./img/peito_supino_plano.jpg",
  "./img/pernas_extensao.jpg",
  "./img/pernas_flexao.jpg",
  "./img/pernas_gemeos.jpg",
  "./img/pernas_legpress.jpg",
  "./img/pernas_rdl.jpg",
  "./img/triceps_acima.jpg",
  "./img/triceps_corda.jpg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => cached);
    })
  );
});
