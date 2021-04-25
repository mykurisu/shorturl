import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import UUID from 'uuidjs'

import Config from '../../config'
import { MyLogger } from '../_common/Logger.service'
import { MyRedisService } from '../_common/Redis.service'
import { Cache } from '../_common/Cache.service'


@Injectable()
export class ShorturlService {
    private client: MyRedisService | Cache;

    constructor(
        private readonly myLogger: MyLogger,
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
        const urlKey = await this.handleUrlKey();
        const urlID = UUID.genV4().toString();
        const dataStr = JSON.stringify({
            urlID,
            url,
            type
        });
        this.myLogger.log(`createUrl**${urlID}`, 'createUrl', false);
        await this.client.set(urlKey, dataStr, type === 'permanent' ? -1 : 300);
        return `${Config.defaultHost}/${urlKey}`;
    }

    async deleteUrl(k: string) {
        await this.client.del(k);
        return {};
    }

    async getUrl(k: string) {
        const dataStr = await this.client.get(k);
        if (!dataStr) return;
        const { url, type, urlID } = JSON.parse(dataStr);
        if (type === 'once') {
            await this.client.del(k);
        }
        this.myLogger.log(`getUrl**${urlID}`, 'getUrl', false);
        return url;
    }

    private async handleUrlKey(count?: number): Promise<string> {
        const _count = count || 1;
        const maxCount = Config.maxRetryTimes;
        if (_count >= maxCount) throw new HttpException('超过重试次数，请重新生成链接', HttpStatus.INTERNAL_SERVER_ERROR);
        const urlKey: string = Math.random().toString(36).slice(-4);
        const _url = await this.client.get(urlKey);
        if (_url) {
            return await this.handleUrlKey(_count + 1);
        }
        return urlKey;
    }

}
