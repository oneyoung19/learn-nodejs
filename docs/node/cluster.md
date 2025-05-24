---
title: Cluster
---

在 `Node.js` 中，`Node 集群（Cluster）` 通常指的是使用多进程方式，充分利用多核 `CPU`，提高应用性能和可用性。

因为 `Node.js` 是单线程的（虽然 `I/O` 是异步的），一个进程默认只能使用一个 `CPU` 核心。

为了提升吞吐量和处理能力，可以启动多个 `Node.js` 进程，组成一个"集群"。

**`Node` 集群 vs 服务器集群（区别）：**

| 名称       | 描述                       |
| ---------- | -------------------------- |
| `Node` 集群 | 同一台机器上运行多个 `Node.js` 进程 |
| 服务器集群 | 多台服务器组成一个整体，通过负载均衡分发请求 |

## 1. node:cluster

`Node` 提供了内置的 `cluster` 模块，用于启动和管理多个子进程。

1. 主进程（`Master`）负责管理和调度；
2. 子进程（`Worker`）运行你的 `Node` 应用代码；
3. 所有子进程可以 共享同一个端口（通过内部 `socket` 机制）。

```js
const cluster = require('node:cluster')
const http = require('node:http')
const os = require('node:os')

if (cluster.isMaster) {
  const cpuCount = os.cpus().length
  console.log(`主进程 ${process.pid} 正在运行`)

  // 创建与CPU数量相同的子进程
  for (let i = 0; i < cpuCount; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`工作进程 ${worker.process.pid} 已退出`)
    // 可选：重启一个新进程
    cluster.fork()
  })
} else {
  // Worker进程创建服务器
  http.createServer((req, res) => {
    res.writeHead(200)
    res.end(`由进程 ${process.pid} 处理`)
  }).listen(3000)

  console.log(`工作进程 ${process.pid} 已启动`)
}
```

:::warning
1. **进程间内存不共享**：每个进程是独立的，状态数据需要通过 `IPC`（进程间通信）或者使用 `Redis`、*数据库*等方式共享；

2. **不适合 CPU 密集型任务**，建议使用 `worker_threads` 或 `C++` 扩展模块；

3. **管理多个进程复杂度更高**，推荐使用 `PM2` 等进程管理器；
:::

## 2.PM2



## 3.状态共享

**`Node.js` 集群需要特别考虑"状态一致性"或"事务冲突"问题，尤其当多个进程（或多个用户）同时操作相同的资源时。**

假设你有一个"库存扣减"逻辑，两个用户在不同进程中同时请求购买商品：

```js
if (stock > 0) {
  stock--
}
```

如果这个 `stock` 是保存在内存变量中，每个进程都有自己的一份，**并发请求可能导致超卖。**

### 3-1.❌ 不建议：内存中保存状态

- 集群下，每个进程都有自己的内存副本；
- 没有同步机制；
- 容易出现竞态条件（`Race Condition`）；
- **只适合临时缓存，不适合核心业务状态！**

### 3-2.✅ 数据库存事务控制（推荐）

- 所有进程共享一个数据库（如 `MySQL`、`MongoDB`）；
- 使用数据库事务（或原子操作）来控制并发；

示例（`MySQL` + `SQL` 事务）：

```sql
BEGIN;
SELECT stock FROM products WHERE id = 1 FOR UPDATE;
-- 判断库存
UPDATE products SET stock = stock - 1 WHERE id = 1;
COMMIT;
```

### 3-3.✅ Redis 分布式锁（适用于高并发）

- 使用 `Redis` 实现原子操作或分布式锁来保证并发安全；
- 示例：使用 `SETNX` 实现锁，再处理逻辑；
- 常用库：`redlock`、`ioredis-lock` 等。

示例：

```js
const redis = require('redis');
const client = redis.createClient();

// 获取分布式锁
async function acquireLock(lockKey, lockValue, expireTime = 10) {
  try {
    // 使用 SET NX 命令尝试获取锁
    const result = await client.set(lockKey, lockValue, {
      NX: true,  // 只在键不存在时设置
      EX: expireTime  // 设置过期时间（秒）
    });
    
    return result === 'OK';
  } catch (error) {
    console.error('获取锁失败:', error);
    return false;
  }
}

// 释放分布式锁
async function releaseLock(lockKey, lockValue) {
  try {
    // 使用 Lua 脚本确保原子性操作
    const script = `
      if redis.call("get", KEYS[1]) == ARGV[1] then
        return redis.call("del", KEYS[1])
      else
        return 0
      end
    `;
    
    const result = await client.eval(script, 1, lockKey, lockValue);
    return result === 1;
  } catch (error) {
    console.error('释放锁失败:', error);
    return false;
  }
}

// 使用示例
async function example() {
  const lockKey = 'myLock';
  const lockValue = Date.now().toString(); // 使用时间戳作为锁的值
  
  try {
    // 尝试获取锁
    const acquired = await acquireLock(lockKey, lockValue);
    
    if (acquired) {
      console.log('成功获取锁');
      
      // 执行业务逻辑
      await doSomething();
      
      // 释放锁
      const released = await releaseLock(lockKey, lockValue);
      if (released) {
        console.log('成功释放锁');
      }
    } else {
      console.log('获取锁失败，资源被占用');
    }
  } catch (error) {
    console.error('操作失败:', error);
  }
}

// 模拟业务逻辑
async function doSomething() {
  // 这里放置需要加锁保护的业务逻辑
  await new Promise(resolve => setTimeout(resolve, 1000));
}

// 运行示例
example();
```

### 3-4.✅ 队列化处理（适用于交易/支付类）

- 所有写操作通过消息队列（如 `RabbitMQ`、`Kafka`）进入单点处理；
- 保证顺序和一致性；
- 缺点是有延迟，适用于某些异步场景；

```js
const { Kafka } = require('kafkajs');

// 创建 Kafka 客户端
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
});

// 创建生产者
const producer = kafka.producer();
// 创建消费者
const consumer = kafka.consumer({ groupId: 'payment-group' });

// 生产者发送消息（异步）
async function sendMessage(topic, message) {
  try {
    await producer.connect();
    await producer.send({
      topic,
      messages: [
        { 
          value: JSON.stringify(message),
          key: message.orderId 
        }
      ]
    });
    console.log('消息已发送到队列:', message.orderId);
    // 注意：这里不等待消息处理完成
  } catch (error) {
    console.error('发送消息失败:', error);
  } finally {
    await producer.disconnect();
  }
}

// 消费者处理消息（独立进程）
async function startConsumer() {
  try {
    await consumer.connect();
    await consumer.subscribe({ topic: 'payment-orders', fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          const value = JSON.parse(message.value.toString());
          console.log('开始处理订单:', value.orderId);
          
          // 异步处理支付逻辑
          processPayment(value).catch(error => {
            console.error(`订单 ${value.orderId} 处理失败:`, error);
            // 这里可以添加重试逻辑或发送到死信队列
          });
          
          // 注意：这里不等待处理完成就继续处理下一条消息
        } catch (error) {
          console.error('消息解析失败:', error);
        }
      }
    });
  } catch (error) {
    console.error('消费者启动失败:', error);
  }
}

// 模拟支付处理（异步）
async function processPayment(orderData) {
  // 模拟异步处理过程
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // 这里实现具体的支付处理逻辑
  console.log('支付处理完成:', orderData.orderId);
  // 1. 检查库存
  // 2. 扣减库存
  // 3. 创建支付记录
  // 4. 更新订单状态
}

// 使用示例 - 生产者端
async function producerExample() {
  // 模拟发送多个支付订单
  const orders = [
    {
      orderId: '12345',
      userId: 'user1',
      amount: 100,
      items: [{ productId: 'p1', quantity: 2 }]
    },
    {
      orderId: '12346',
      userId: 'user2',
      amount: 200,
      items: [{ productId: 'p2', quantity: 1 }]
    }
  ];

  // 异步发送所有订单
  await Promise.all(orders.map(order => 
    sendMessage('payment-orders', order)
  ));
  
  console.log('所有订单已发送到队列');
}

// 使用示例 - 消费者端（独立进程）
async function consumerExample() {
  console.log('启动支付处理消费者...');
  await startConsumer();
}

// 实际使用时，生产者和消费者应该在不同的进程中运行
// 例如：使用 PM2 启动两个进程
// pm2 start producer.js
// pm2 start consumer.js

// 这里仅作演示
if (process.env.ROLE === 'producer') {
  producerExample().catch(console.error);
} else if (process.env.ROLE === 'consumer') {
  consumerExample().catch(console.error);
}
```

