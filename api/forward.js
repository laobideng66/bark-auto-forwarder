const yourBark = 'https://api.day.app/Jovi3x48ViTKQehtftonGZ';
const friendBark = 'https://api.day.app/qLwxiaYwctb2ZnpVgujrSg';

module.exports = async (req, res) => {
  console.log('=== 开始硬编码测试 ===');
  
  try {
    // 测试1：分别发送固定消息到两个地址
    console.log('1. 发送到你的Bark地址:', yourBark);
    const testMessage1 = '测试消息-你的地址-' + Date.now();
    const yourResult = await fetch(`${yourBark}/${encodeURIComponent(testMessage1)}`);
    console.log('你的Bark响应状态:', yourResult.status);
    
    console.log('2. 发送到朋友Bark地址:', friendBark);
    const testMessage2 = '测试消息-朋友地址-' + Date.now();
    const friendResult = await fetch(`${friendBark}/${encodeURIComponent(testMessage2)}`);
    console.log('朋友Bark响应状态:', friendResult.status);
    
    console.log('=== 硬编码测试完成 ===');
    
    // 返回详细结果
    return res.status(200).json({
      测试结果: '完成',
      你的Bark: {
        地址: yourBark,
        状态: yourResult.status,
        成功: yourResult.ok,
        测试消息: testMessage1
      },
      朋友Bark: {
        地址: friendBark, 
        状态: friendResult.status,
        成功: friendResult.ok,
        测试消息: testMessage2
      }
    });
    
  } catch (error) {
    console.error('测试错误:', error);
    return res.status(500).json({ error: error.message });
  }
};
