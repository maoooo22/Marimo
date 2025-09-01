// File: /api/chat.js
// INI ADALAH VERSI YANG BENAR DAN AMAN UNTUK DI-UPLOAD KE VERCEL

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { chatHistory, systemPrompt } = req.body;

  // Ambil API key dari Environment Variable di Vercel
  // Ini adalah cara yang aman
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: 'API key tidak diatur di server.' });
  }

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
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);

  } catch (error) {
    console.error('Gagal memanggil Gemini API:', error);
    res.status(500).json({ error: 'Gagal menghubungi AI. Coba lagi nanti.' });
  }
}
