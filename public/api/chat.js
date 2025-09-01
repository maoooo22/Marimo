// File: /api/chat.js
// Versi ini akan mencetak log di Vercel untuk debugging.

export default async function handler(req, res) {
  console.log("Fungsi /api/chat dipanggil."); // Log 1

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { chatHistory, systemPrompt } = req.body;
  console.log("Menerima riwayat chat:", chatHistory.length, "pesan."); // Log 2

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  if (!GEMINI_API_KEY) {
    console.error("FATAL: GEMINI_API_KEY tidak ditemukan di environment variables!"); // Log Eror
    return res.status(500).json({ error: 'API key tidak diatur di server.' });
  }
  
  console.log("API Key ditemukan. Mencoba menghubungi Google..."); // Log 3

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${GEMINI_API_KEY}`;

  const payload = {
    contents: chatHistory,
    systemInstruction: { parts: [{ text: systemPrompt }] },
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Error dari Gemini API:', errorBody);
      throw new Error(`Google API mengembalikan status ${response.status}`);
    }

    const data = await response.json();
    console.log("Berhasil menerima balasan dari Google."); // Log 4
    res.status(200).json(data);

  } catch (error) {
    console.error('Gagal memanggil Gemini API:', error);
    res.status(500).json({ error: 'Gagal menghubungi AI. Detail: ' + error.message });
  }
}
