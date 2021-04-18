import { Module, Global, HttpModule } from '@nestjs/common'
import { RedisModule } from 'nestjs-redis'

import { Cache } from './_common/Cache.service'
import { MyLogger } from './_common/Logger.service'
import { MyRedisService } from './_common/Redis.service'
import Config from '../config'


@Global()
@Module({
    imports: [
        HttpModule,
        RedisModule.register(Config.redis || {}),
    ],
    providers: [ Cache, MyLogger, MyRedisService ],
    exports: [ Cache, MyLogger, MyRedisService ]
})
export class CommonModule {}
