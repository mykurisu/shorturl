const config =  {
    serverConfig: {
        port: 8000,
    },
    redis: {
        port: 6379,
        host: '0.0.0.0',
        db: 0,
    },
    cacheType: 'memory', // memory 内存缓存、redis redis缓存
    defaultHost: 'http://localhost:8000/s/g',
    defaultIndex: 'http://localhost:8000',
}

export default config
