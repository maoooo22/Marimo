// /api/quran.js
// Vercel serverless function (Node). Proxy ke API public Al-Qur'an.
// Menangani OPTIONS preflight dan meneruskan JSON apa adanya.

export default async function handler(req, res) {
  // CORS untuk berjaga-jaga (frontend biasanya panggil same-origin, tapi biar aman).
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  try {
    // Ganti endpoint kalau mau: beberapa opsi: api.quran.gading.dev/quran or alquran.cloud
    const SOURCE = 'https://api.quran.gading.dev/quran';

    const apiResp = await fetch(SOURCE, { method: 'GET' });
    if (!apiResp.ok) {
      const txt = await apiResp.text().catch(() => '');
      return res.status(502).json({ error: 'Upstream API error', status: apiResp.status, body: txt });
    }

    const json = await apiResp.json();
    // Return exactly what upstream kirim (frontend akan parse)
    res.status(200).json(json);
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
}
