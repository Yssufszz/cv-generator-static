// Berkas. — Cloudflare Worker proxy untuk Cohere.
// PENTING: file ini TIDAK berisi API key. Key disimpan sebagai secret di
// dashboard Worker (Settings > Variables > CO_API_KEY), bukan di repo,
// bukan di Drive, dan bukan di chat.
//
// Deploy:
//   1. Buat Worker baru di Cloudflare (gratis).
//   2. Tempel file ini sebagai kode Worker.
//   3. Tambah secret: CO_API_KEY = key trial/produksi Cohere kamu.
//      Opsional: COHERE_MODEL = command-r (default) atau command-r-plus.
//   4. Deploy, lalu catat URL Worker-nya, mis.
//      https://berkas-cohere.<subdomain>.workers.dev
//   5. Beri URL itu ke pengelola situs (bukan key-nya) agar dipasang
//      sebagai COHERE_PROXY_URL di app.js. Sampai URL itu dipasang,
//      situs tetap memakai Asisten CV lokal.

const ALLOWED_MODELS = ["command-r", "command-r-plus", "command-a", "command-a-plus-05-2026"];
const MAX_MESSAGE_CHARS = 4000;
const MAX_TOKENS = 600;

function jsonResponse(body, status, origin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json",
      "access-control-allow-origin": origin || "*",
      "access-control-allow-methods": "POST, OPTIONS",
      "access-control-allow-headers": "content-type",
    },
  });
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("origin") || "*";
    if (request.method === "OPTIONS") {
      return jsonResponse({}, 204, origin);
    }
    if (request.method !== "POST") {
      return jsonResponse({ error: "Gunakan POST." }, 405, origin);
    }
    if (!env.CO_API_KEY) {
      return jsonResponse({ error: "CO_API_KEY belum diset di Worker." }, 500, origin);
    }
    let body;
    try {
      body = await request.json();
    } catch {
      return jsonResponse({ error: "Body JSON tidak valid." }, 400, origin);
    }
    const message = String(body.message || "").slice(0, MAX_MESSAGE_CHARS).trim();
    if (!message) {
      return jsonResponse({ error: "Pesan kosong." }, 400, origin);
    }
    const model = ALLOWED_MODELS.includes(body.model) ? body.model : (env.COHERE_MODEL || "command-r");
    // Konteks CV TIDAK dikirim utuh: hanya pesan pengguna + ringkasan
    // singkat yang dikirim situs (mis. jabatan dan keahlian), tanpa
    // kontak pribadi seperti email dan nomor HP.
    const context = String(body.context || "").slice(0, 1000);
    const res = await fetch("https://api.cohere.com/v2/chat", {
      method: "POST",
      headers: {
        "authorization": "Bearer " + env.CO_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model,
        max_tokens: MAX_TOKENS,
        temperature: 0.3,
        messages: [
          {
            role: "system",
            content: "Kamu Asisten CV di situs Berkas. Jawab singkat dalam Bahasa Indonesia, praktis, dan jujur. Jangan mengarang pengalaman, angka, atau kualifikasi pengguna. Kalau ragu, minta pengguna melengkapi datanya. Jangan pernah meminta atau mengulang API key, password, atau data pribadi sensitif.",
          },
          ...(context ? [{ role: "user", content: "Konteks CV (ringkas): " + context }] : []),
          { role: "user", content: message },
        ],
      }),
    });
    if (!res.ok) {
      const text = await res.text();
      return jsonResponse({ error: "Cohere gagal (" + res.status + ").", detail: text.slice(0, 300) }, 502, origin);
    }
    const data = await res.json();
    const reply = data.message && data.message.content
      ? data.message.content.map((p) => p.text || "").join("")
      : "";
    return jsonResponse({ reply: reply || "Maaf, Cohere tidak mengembalikan jawaban.", model }, 200, origin);
  },
};
