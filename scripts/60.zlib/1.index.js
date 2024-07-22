/*
zlib模块

Deflate 和 Gzip 是两种不同的压缩算法。简而言之，Gzip 比 Deflate 的压缩质量更高，因此 Gzip 的压缩也相对耗时一些。

压缩：
1. Deflate
2. Gzip

解压缩：
1. Inflate
2. Gunzip

*/

/*
压缩方法：
- zlib.deflate(buf, callback): 使用 Deflate 算法压缩数据。
- zlib.deflateSync(buf): 同步版本的 zlib.deflate。
- zlib.gzip(buf, callback): 使用 Gzip 算法压缩数据。
- zlib.gzipSync(buf): 同步版本的 zlib.gzip。

解压方法：
- zlib.inflate(buf, callback): 使用 Inflate 算法解压数据。
- zlib.inflateSync(buf): 同步版本的 zlib.inflate。
- zlib.gunzip(buf, callback): 使用 Gunzip 算法解压数据。
- zlib.gunzipSync(buf): 同步版本的 zlib.gunzip。

Transform 流：
- zlib.createGzip(): 创建一个 Gzip 压缩流。
- zlib.createGunzip(): 创建一个 Gunzip 解压流。
- zlib.createDeflate(): 创建一个 Deflate 压缩流。
- zlib.createInflate(): 创建一个 Inflate 解压流。

*/
