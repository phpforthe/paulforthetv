export default async function handler(req, res) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // Pegar os parâmetros da requisição
    const { serverUrl, username, password, action, category_id, stream_id } = req.query;

    if (!serverUrl || !username || !password) {
      return res.status(400).json({ error: 'Faltam credenciais (serverUrl, username, password).' });
    }

    // Montar a URL do servidor IPTV (Xtream Codes)
    // Ex: http://tvsrv.co/player_api.php?username=...&password=...&action=...
    let targetUrl = `${serverUrl}/player_api.php?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
    
    if (action) targetUrl += `&action=${encodeURIComponent(action)}`;
    if (category_id) targetUrl += `&category_id=${encodeURIComponent(category_id)}`;
    if (stream_id) targetUrl += `&stream_id=${encodeURIComponent(stream_id)}`;

    // Fazer a chamada ao servidor IPTV
    const response = await fetch(targetUrl);
    
    if (!response.ok) {
      throw new Error(`Erro no servidor IPTV: ${response.status}`);
    }

    const data = await response.json();

    // Retornar os dados para a nossa interface web
    res.status(200).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Failed to fetch data from IPTV server.' });
  }
}
