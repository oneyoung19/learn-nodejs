# 365天的自签名证书
openssl x509 -req -days 365 -in csr.pem -signkey private-key.pem -out certificate.pem
