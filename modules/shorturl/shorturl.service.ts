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

    async createUrl(url: string, type: string = 'normal') {
        let urlKey: string = Math.random().toString(36).slice(-4);
        const _url = await this.client.get(urlKey);
        // 短链值不幸重复时将会生成8位短链值
        if (_url) {
            urlKey += Math.random().toString(36).slice(-4);
        }
        const dataStr = JSON.stringify({
            url,
            type
        });
        await this.client.set(urlKey, dataStr, type === 'eterna' ? -1 : 300);
        return `${Config.defaultHost}?k=${urlKey}`;
    }

    async deleteEternalUrl(k: string) {
        await this.client.del(k);
        return {};
    }

    async getUrl(k: string) {
        const dataStr = await this.client.get(k);
        if (!dataStr) return;
        const { url, type } = JSON.parse(dataStr);
        if (type === 'once') {
            await this.client.del(k);
        }
        return url;
    }

}
