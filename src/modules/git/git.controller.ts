import { Controller, Post, HttpException } from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('git')
@Controller('git')
export class GitController {
    @Post('/event')
    gitEvent() {
        // throw new HttpException('请求失败');

        return;
    }
}
