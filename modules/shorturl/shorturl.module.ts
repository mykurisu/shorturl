import { Module } from '@nestjs/common'
import { ShorturlController } from './shorturl.controller'
import { ShorturlService } from './shorturl.service'

@Module({
    controllers: [ ShorturlController ],
    providers: [ ShorturlService ]
})
export class ShorturlModule {}
