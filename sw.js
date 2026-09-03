const CACHE = "pt-de-bolso-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
  "./img/abs_cablecrunch_0.jpg",
  "./img/abs_cablecrunch_1.jpg",
  "./img/abs_deadbug_0.jpg",
  "./img/abs_deadbug_1.jpg",
  "./img/abs_joelhos_0.jpg",
  "./img/abs_joelhos_1.jpg",
  "./img/abs_pallof_0.jpg",
  "./img/abs_pallof_1.jpg",
  "./img/abs_prancha_0.jpg",
  "./img/abs_prancha_1.jpg",
  "./img/biceps_direta_0.jpg",
  "./img/biceps_direta_1.jpg",
  "./img/biceps_martelo_0.jpg",
  "./img/biceps_martelo_1.jpg",
  "./img/costas_pulldown_0.jpg",
  "./img/costas_pulldown_1.jpg",
  "./img/costas_pulldown_est_0.jpg",
  "./img/costas_pulldown_est_1.jpg",
  "./img/costas_pullover_0.jpg",
  "./img/costas_pullover_1.jpg",
  "./img/costas_remada_sent_0.jpg",
  "./img/costas_remada_sent_1.jpg",
  "./img/costas_remada_uni_0.jpg",
  "./img/costas_remada_uni_1.jpg",
  "./img/ombros_desenv_0.jpg",
  "./img/ombros_desenv_1.jpg",
  "./img/ombros_elev_lat_0.jpg",
  "./img/ombros_elev_lat_1.jpg",
  "./img/ombros_facepull_0.jpg",
  "./img/ombros_facepull_1.jpg",
  "./img/ombros_reverse_deck_0.jpg",
  "./img/ombros_reverse_deck_1.jpg",
  "./img/peito_chest_press_0.jpg",
  "./img/peito_chest_press_1.jpg",
  "./img/peito_crossover_0.jpg",
  "./img/peito_crossover_1.jpg",
  "./img/peito_crossover_baixo_0.jpg",
  "./img/peito_crossover_baixo_1.jpg",
  "./img/peito_pec_deck_0.jpg",
  "./img/peito_pec_deck_1.jpg",
  "./img/peito_supino_inc_halt_0.jpg",
  "./img/peito_supino_inc_halt_1.jpg",
  "./img/peito_supino_plano_0.jpg",
  "./img/peito_supino_plano_1.jpg",
  "./img/pernas_extensao_0.jpg",
  "./img/pernas_extensao_1.jpg",
  "./img/pernas_flexao_0.jpg",
  "./img/pernas_flexao_1.jpg",
  "./img/pernas_gemeos_0.jpg",
  "./img/pernas_gemeos_1.jpg",
  "./img/pernas_legpress_0.jpg",
  "./img/pernas_legpress_1.jpg",
  "./img/pernas_rdl_0.jpg",
  "./img/pernas_rdl_1.jpg",
  "./img/triceps_acima_0.jpg",
  "./img/triceps_acima_1.jpg",
  "./img/triceps_corda_0.jpg",
  "./img/triceps_corda_1.jpg"
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
