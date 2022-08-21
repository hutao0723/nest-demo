import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // 设置全局路由前缀
    app.setGlobalPrefix('api');

    // 全局注册错误的过滤器
    app.useGlobalFilters(new HttpExceptionFilter());

    // 请求响应的数据拦截
    app.useGlobalInterceptors(new TransformInterceptor());

    // 管道验证
    app.useGlobalPipes(new ValidationPipe())

    // 配置swagger
    const config = new DocumentBuilder()
        .setTitle('Cats example')
        .setDescription('The cats API description')
        .setVersion('1.0')
        .addTag('cats')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);

    await app.listen(3000);
}
bootstrap();
