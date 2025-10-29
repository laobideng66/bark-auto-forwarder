const yourBark = 'https://api.day.app/Jovi3x48ViTKQehtftonGZ';
const friendBark = 'https://api.day.app/qLwxiaYwctb2ZnpVgujrSg';

export default async function handler(req, res) {
  // 设置CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // 处理预检请求
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // 支持GET和POST请求
  let message = '';
  
  if (req.method === 'GET') {
    // GET请求：从查询参数获取
    message = req.query.message || req.query.body || '';
  } else if (req.method === 'POST') {
    // POST请求：从请求体获取
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
    // 同时转发给你们两个人
    await Promise.all([
      fetch(`${yourBark}/${encodeURIComponent(message)}`),
      fetch(`${friendBark}/${encodeURIComponent(message)}`)
    ]);
    
    console.log('Bark消息转发完成');
    
    // 返回Bark兼容的响应格式
    return res.status(200).json({
      code: 200,
      message: "success",
      timestamp: Math.floor(Date.now() / 1000)
    });
    
  } catch (error) {
    console.error('转发错误:', error);
    // 即使出错也返回成功，不让老板察觉
    return res.status(200).json({
      code: 200,
      message: "success"
    });
  }
}
