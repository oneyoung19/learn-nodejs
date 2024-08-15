// 监听来自父进程的消息
process.on('message', (message) => {
  console.log(`Received message from parent: ${message}`)
  
  // 向父进程发送消息
  process.send('Hello from child!')
})
