const yourBark = 'https://api.day.app/Jovi3x48ViTKQehtftonGZ';
const friendBark = 'https://api.day.app/qLwxiaYwctb2ZnpVgujrSg';

export default async function handler(req, res) {
  // 设置CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  let message = '';
  
  if (req.method === 'GET') {
    message = req.query.message || req.query.body || '';
  } else if (req.method === 'POST') {
    const { body, message: msg, title } = req.body;
    message = body || msg || title || '';
  }
  
  console.log('收到Bark消息:', message);
  
  if (!message) {
    return res.status(200).json({
      code: 200,
      message: "success"
    });
  }

  try {
    await Promise.all([
      fetch(`${yourBark}/${encodeURIComponent(message)}`),
      fetch(`${friendBark}/${encodeURIComponent(message)}`)
    ]);
    
    return res.status(200).json({
      code: 200,
      message: "success",
      timestamp: Math.floor(Date.now() / 1000)
    });
    
  } catch (error) {
    return res.status(200).json({
      code: 200,
      message: "success"
    });
  }
}
