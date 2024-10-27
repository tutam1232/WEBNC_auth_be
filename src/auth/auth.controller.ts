import { Controller, Post, Body, HttpCode, HttpStatus, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';

@Controller('user')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  @UseInterceptors(new TransformInterceptor('User created successfully'))
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  // TODO: @SetMetadata() decorator can be combined with @HttpCode() decorator to set the return message?
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UseInterceptors(new TransformInterceptor('User logged in successfully'))
  signIn(@Body() createUserDto: CreateUserDto) {
    return this.authService.login(createUserDto);
  }
}
