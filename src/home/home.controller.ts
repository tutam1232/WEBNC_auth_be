import { Controller, Get, HttpCode, HttpStatus, UseInterceptors, UseGuards } from '@nestjs/common';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('home')
export class HomeController {

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get()
    @UseInterceptors(new TransformInterceptor('Home accessed successfully, this message is returned from NestJS backend!'))
    getHome() {
        return 'Home accessed successfully, this message is returned from NestJS backend!';
    }
}
