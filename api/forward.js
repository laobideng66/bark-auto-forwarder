const yourBark = 'https://api.day.app/Jovi3x48ViTKQehtftonGZ';
const friendBark = 'https://api.day.app/qLwxiaYwctb2ZnpVgujrSg';

module.exports = async (req, res) => {
  // 设置CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // 获取消息内容
  const { message } = req.method === 'GET' ? req.query : req.body;
  
  if (!message) {
    return res.status(400).json({ 
      success: false, 
      error: '需要消息内容' 
    });
  }

  try {
    // 同时转发给你们两个人
    await Promise.all([
      fetch(`${yourBark}/${encodeURIComponent(message)}`),
      fetch(`${friendBark}/${encodeURIComponent(message)}`)
    ]);
    
    return res.status(200).json({ 
      success: true, 
      message: '自动转发成功'
    });
    
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      error: '转发失败' 
    });
  }
};
