import axios from 'axios';
import cheerio from 'cheerio';

export default async function handler(req, res) {
  try {
    const { data } = await axios.get('https://vulcanvalues.com/grow-a-garden/stock');
    const $ = cheerio.load(data);

    const stockItems = [];
    $('table tbody tr').each((i, el) => {
      const name = $(el).find('td').eq(0).text().trim();
      const stock = $(el).find('td').eq(1).text().trim();
      if(name && stock) {
        stockItems.push({ name, stock });
      }
    });

    res.status(200).json({ ok: true, data: stockItems });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
}
