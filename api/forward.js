// 接收者列表
const receivers = [
  'Jovi3x48ViTKQehtftonGZ',     // 你
  'qLwxiaYwctb2ZnpVgujrSg',     // 朋友1
  // 可以继续添加更多朋友...
];

export default async function handler(req, res) {
  // 支持GET和POST
  const { message } = req.method === 'GET' ? req.query : req.body;
  
  if (!message) {
    return res.status(400).json({ error: '需要消息内容' });
  }

  try {
    console.log('中转站收到消息:', message);
    
    // 同时发送给所有接收者
    const sendPromises = receivers.map(receiver => {
      return fetch(`https://api.day.app/${receiver}/${encodeURIComponent(message)}`)
        .then(response => ({
          receiver,
          status: response.status,
          success: response.ok
        }))
        .catch(error => ({
          receiver, 
          status: 'error',
          error: error.message
        }));
    });
    
    const results = await Promise.all(sendPromises);
    console.log('转发结果:', results);
    
    return res.status(200).json({ 
      success: true,
      message: `消息已转发给${receivers.length}人`,
      results: results
    });
    
  } catch (error) {
    console.error('中转站错误:', error);
    return res.status(500).json({ error: '中转站内部错误' });
  }
}
