import { Injectable, OnModuleInit } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
import IORedis from 'IORedis';

import { MyLogger } from './Logger.service'


@Injectable()
export class MyRedisService implements OnModuleInit {
    public client!: IORedis.Redis;

    constructor(
        private readonly redisService: RedisService,
        private readonly myLogger: MyLogger,
    ) { }

    async onModuleInit() {
        await this.RedisInit()
    }

    async RedisInit() {
        this.client = await this.redisService.getClient();
        this.client.on('ready', () => this.myLogger.log('Redis INITED', 'RedisService'));
        this.client.on('error', (error) => {
            this.myLogger.error('Redis INIT FAIL', JSON.stringify(error), 'RedisService')
        });
    }

    //设置值的方法
    async set(key: string, value: any, seconds?: number) {
        value = JSON.stringify(value);
        if (!this.client) {
            await this.RedisInit();
        }
        if (!seconds) {
            await this.client.set(key, value);
        } else {
            await this.client.set(key, value, 'EX', seconds);
        }
    }

    //获取值的方法
    async get(key: string) {
        if (!this.client) {
            await this.RedisInit();
        }
        var data = await this.client.get(key);
        if (!data) return;
        return JSON.parse(data);
    }

    async del(key: string) {
        if (!this.client) {
            await this.RedisInit();
        }
        await this.client.del(key);
    }
}