import { Controller, Body, Param, Post, Get, Redirect } from '@nestjs/common'

import Config from '../../config'
import { ShorturlService } from './shorturl.service'


@Controller('/s')
export class ShorturlController {

    constructor(
        private readonly shorturlService: ShorturlService,
    ) { }

    @Post('/createUrl')
    async createUrl(
        @Body('url') url: string,
        @Body('type') type: string,
    ) {
        const shortUrl = await this.shorturlService.createUrl(url, type);
        return {
            shortUrl,
        };
    }

    @Post('/deleteUrl')
    async deleteEternalUrl(
        @Body('k') k: string,
    ) {
        await this.shorturlService.deleteUrl(k);
        return {};
    }

    @Get('/:key')
    @Redirect(Config.defaultIndex, 302)
    async getUrl(
        @Param('key') key: string,
    ) {
        if (key) {
            const url = await this.shorturlService.getUrl(key);
            return {
                url
            }
        }
    }

}
