import {
    Module,
    NestModule,
    MiddlewareConsumer,
    RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from 'nestjs-config';
import { resolve } from 'path';


import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { GitModule } from './modules/git/git.module';
import { UserModule } from './modules/user/user.module';

@Module({
    // 导入模块的列表，如果需要使用其他模块的服务，需要通过这里导入
    imports: [
        ConfigModule.load(resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
        GitModule,
        UserModule
    ],
    // 处理http请求
    controllers: [],
    // Nest.js注入器实例化的提供者（服务提供者），处理具体的业务逻辑，各个模块之间可以共享
    providers: [],
    // 导出服务的列表，供其他模块导入使用。如果希望当前模块下的服务可以被其他模块共享，需要在这里配置导出
    exports: [],
})

export class AppModule implements NestModule {
    // 中间件
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
