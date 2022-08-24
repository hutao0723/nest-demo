import {
    ArgumentMetadata,
    HttpException,
    HttpStatus,
    Injectable,
    PipeTransform
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform {
    // 为实现 PipeTransfrom，每个管道必须声明 transfrom() 方法
    /**
     * @param value  参数是当前处理的方法参数(在被路由处理程序方法接收之前)
     * @param metadata 前处理的方法参数的元数据
     * @returns
     */
    async transform(value: any, { metatype }: ArgumentMetadata) {
    
        // 如果没有传入验证规则，则不验证，直接返回数据
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }

        // 将对象转换为 Class 来验证
        const object = plainToInstance(metatype,value);

        const errors = await validate(object);

        if (errors.length > 0) {
            const errObj = {};
            errors.forEach((err) => {
                const { property, constraints } = err;
                errObj[property] = Object.values(constraints);
            });
            throw new HttpException(
                { message: 'Request params validation failed', error: errObj },
                HttpStatus.BAD_REQUEST,
            );
        }

        return value;
    }

    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
}
