const friendBark = 'https://api.day.app/qLwxiaYwctb2ZnpVgujrSg';

module.exports = async (req, res) => {
  // 设置CORS头部
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // 处理预检请求
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // 获取消息内容
  const { message } = req.method === 'GET' ? req.query : req.body;
  
  if (!message) {
    return res.status(400).json({ 
      success: false, 
      error: '需要消息内容，使用 ?message=你要转发的消息' 
    });
  }

  try {
    console.log('收到转发请求:', message);
    
    // 转发消息到朋友的Bark
    const barkResponse = await fetch(`${friendBark}/${encodeURIComponent(message)}`);
    
    if (barkResponse.ok) {
      console.log('转发成功:', message);
      return res.status(200).json({ 
        success: true, 
        message: '自动转发成功',
        forwarded: message 
      });
    } else {
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
