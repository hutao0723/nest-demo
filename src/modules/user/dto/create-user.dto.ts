import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty({ message: 'id 不能为空' })
    @IsString()
    id: string;
}
