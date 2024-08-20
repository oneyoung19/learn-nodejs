#!/bin/bash

#!/bin/bash

# 发送请求 A
curl http://127.0.0.1:3000/a &

# 等待 500 毫秒
sleep 0.5

# 发送请求 B
curl http://127.0.0.1:3000/b &

# 等待所有后台进程结束
wait
