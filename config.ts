const config =  {
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
    defaultHost: 'http://localhost:8000/s',
    defaultIndex: 'http://localhost:8000/defaultIndex',
}

export default config
