# 2048位私钥
openssl genrsa -out ./scripts/25.https/key-cert/key.pem 2048

# 根据私钥生成证书签名请求 Certificate Signing Request
# -new: 生成新的证书签名请求
# -key: 指定私钥
# -out: 指定输出文件
openssl req -new -key ./scripts/25.https/key-cert/key.pem -out ./scripts/25.https/key-cert/csr.pem

# 生成自签名证书
# -req: 指定证书签名请求文件
# -days: 指定证书有效期
# -in: 指定证书签名请求文件
# -signkey: 指定私钥
# -out: 指定输出文件
openssl x509 -req -days 365 -in ./scripts/25.https/key-cert/csr.pem -signkey ./scripts/25.https/key-cert/key.pem -out ./scripts/25.https/key-cert/cert.pem
