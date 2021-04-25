# Shorturl

**具体启动方式**

> 首先请确保有可用的redis，否则无法顺利启动服务。

```
git clone https://github.com/mykurisu/shorturl.git

cd shorturl

npm install

npm start
```

**可用配置修改**

与短链相关的配置收束在根目录的`config.ts`中。

```js
serverConfig: {
    port: 8000,
},
redis: {
    port: 6379,
    host: '0.0.0.0',
    db: 0,
},
cacheType: 'redis',
maxRetryTimes: 5,
defaultHost: 'http://localhost:8000/s/g',
defaultIndex: 'http://localhost:8000/defaultIndex',
```

| 配置 | 默认值 | 配置用途 |
| ---- | ---- | ---- |
| serverConfig.port | 8000 | 服务启动端口 |
| redis.port | 6379 | redis端口 |
| redis.host | 0.0.0.0 | redis服务地址 |
| redis.db | 0 | redis具体储存库表 |
| cacheType | redis | 短链储存模式，接受memory/redis |
| maxRetryTimes | 5 | 生成短链接最大重试次数 |
| defaultHost | http://localhost:8000/s/g | 短链接前缀 |
| defaultIndex | http://localhost:8000/defaultIndex | 短链接失效后重定向地址 |

**内置接口**

| 接口路由 | 请求方式 | 接口参数 | 接口用途 |
| ---- | ---- | ---- | ---- |
| /s/createUrl | POST | url: string, type?: string | 短链接生成接口 |
| /s/deleteUrl | POST | k: string | 删除短链接接口 |
| /s/:key | GET | none | 目标链接获取 |