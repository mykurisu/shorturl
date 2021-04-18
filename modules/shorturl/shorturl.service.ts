import { Injectable } from '@nestjs/common'

import Config from '../../config'
import { MyRedisService } from '../_common/Redis.service'
import { Cache } from '../_common/Cache.service'


@Injectable()
export class ShorturlService {
    private client: MyRedisService | Cache;

    constructor(
        private readonly myRedisService: MyRedisService,
        private readonly cache: Cache,
    ) {
        if (Config.cacheType === 'memory') {
            this.client = this.cache;
        } else {
            this.client = this.myRedisService;
        }
    }

    async createUrl(url: string) {
        let urlKey: string = Math.random().toString(36).slice(-4);
        const _url = await this.client.get(urlKey);
        // 短链值不幸重复时将会生成8位短链值
        if (_url) {
            urlKey += Math.random().toString(36).slice(-4);
        }
        await this.client.set(urlKey, url, 300);
        return `${Config.defaultHost}?k=${urlKey}`;
    }

    async createEternalUrl(url: string) {
        const urlKey: string = Math.random().toString(36).slice(-6);
        await this.client.set(urlKey, url);
        return `${Config.defaultHost}?k=${urlKey}`;
    }

    async deleteEternalUrl(k: string) {
        await this.client.del(k);
        return {};
    }

    async getUrl(k: string) {
        const url = await this.client.get(k);
        return url;
    }

}
