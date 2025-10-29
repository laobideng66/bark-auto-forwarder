// 中转站 - 简化版本
const receivers = [
  'Jovi3x48ViTKQehtftonGZ',     // 你
  'qLwxiaYwctb2ZnpVgujrSg',     // 朋友
];

export default async function handler(req, res) {
  console.log('=== 中转站开始工作 ===');
  
  const { message } = req.query;
  
  if (!message) {
    return res.json({ error: '需要消息内容' });
  }

  try {
    console.log('收到消息:', message);
    
    // 发送给所有接收者
    for (const receiver of receivers) {
      console.log('发送给:', receiver);
      await fetch(`https://api.day.app/${receiver}/${encodeURIComponent(message)}`);
    }
    
    console.log('=== 中转站完成 ===');
    return res.json({ success: true, message: '转发完成' });
    
  } catch (error) {
    console.error('错误:', error);
    return res.json({ error: '转发失败' });
  }
}
