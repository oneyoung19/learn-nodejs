# 2048位私钥
openssl genrsa -out ./scripts/25.https/key-cert/private-key.pem 2048

# 根据私钥生成证书
openssl req -new -key ./scripts/25.https/key-cert/private-key.pem -out ./scripts/25.https/key-cert/csr.pem
