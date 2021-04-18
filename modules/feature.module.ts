import { Module } from '@nestjs/common'
import { ShorturlModule } from './shorturl/shorturl.module'


@Module({
    imports: [
        ShorturlModule,
    ]
})
export class FeatureModule {}
