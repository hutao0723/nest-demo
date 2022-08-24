import { IsNotEmpty, IsString } from 'class-validator';

export class FindUserDto {
    @IsString()
    @IsNotEmpty({ message: 'id 不能为空' })
    id: string;
}
