import { IsNotEmpty, IsString } from 'class-validator';

export class FindUserDto {
    @IsNotEmpty({ message: 'id 不能为空' })
    @IsString()
    id: string;
}
