import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'

import App from './app.module'
import { ErrorFilter } from './common/filter/errorResp.filter'
import Config from './config'

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(App);

    //  全局异常处理
    app.useGlobalFilters(new ErrorFilter())

    await app.listen(Config.serverConfig.port);
}

bootstrap()
