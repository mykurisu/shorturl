import { Controller, Body, Query, Post, Get, Redirect } from '@nestjs/common'

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

    @Post('/deleteEternalUrl')
    async deleteEternalUrl(
        @Body('k') k: string,
    ) {
        await this.shorturlService.deleteEternalUrl(k);
        return {};
    }

    @Get('/g')
    @Redirect(Config.defaultIndex, 302)
    async getUrl(
        @Query('k') k: string,
    ) {
        if (k) {
            const url = await this.shorturlService.getUrl(k);
            return {
                url
            }
        }
    }

}
