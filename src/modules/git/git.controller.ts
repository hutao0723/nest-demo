import { Controller, Post, HttpException } from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('git')
export class GitController {
    @Post('/event')
    gitEvent():boolean {
        // throw new HttpException('请求失败', 500);

        return true;
    }
}
