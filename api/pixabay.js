export default async function handler(req, res) {
  const key = process.env.PIXABAY_API_KEY;
  const q = (req.query.q || '').toString().trim();

  if (!key) return res.status(500).json({ error: 'PIXABAY_API_KEY 환경변수가 설정되지 않았습니다.' });
  if (!q) return res.status(400).json({ error: '검색어를 입력하세요.' });

  const url = `https://pixabay.com/api/?key=${encodeURIComponent(key)}&q=${encodeURIComponent(q)}&image_type=photo&per_page=10`;
  const r = await fetch(url);
  if (!r.ok) return res.status(r.status).json({ error: `Pixabay 요청 실패 (${r.status})` });

  const data = await r.json();
  res.status(200).json({ hits: data.hits });
}
