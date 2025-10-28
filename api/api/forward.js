const friendBark = 'https://api.day.app/qLwxiaYwctb2ZnpVgujrSg';

module.exports = async (req, res) => {
  console.log('收到请求:', req.method, req.url);
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  const { message } = req.method === 'GET' ? req.query : req.body;
  console.log('消息内容:', message);
  
  if (!message) {
    return res.status(400).json({ 
      success: false, 
      error: '需要消息内容' 
    });
  }

  try {
    console.log('开始转发到:', friendBark);
    const barkResponse = await fetch(`${friendBark}/${encodeURIComponent(message)}`);
    console.log('Bark响应状态:', barkResponse.status);
    
    if (barkResponse.ok) {
      console.log('转发成功');
      return res.status(200).json({ 
        success: true, 
        message: '自动转发成功',
        forwarded: message 
      });
    } else {
      console.log('Bark服务异常');
      return res.status(500).json({ 
        success: false, 
        error: 'Bark服务响应异常' 
      });
    }
  } catch (error) {
    console.error('转发错误:', error);
    return res.status(500).json({ 
      success: false, 
      error: '服务器错误' 
    });
  }
};
