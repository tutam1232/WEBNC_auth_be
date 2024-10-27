import { Injectable, BadRequestException, UnauthorizedException  } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async register(createUserDto: CreateUserDto) {
    const user = await this.usersService.findOne(createUserDto.email);
    if (user) {
      throw new BadRequestException('User already exists');
    }

    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    const newUser = await this.usersService.create(createUserDto);


    return {...newUser};
  }

  async login(createUserDto: CreateUserDto) {
    const user = await this.usersService.findOne(createUserDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(createUserDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return {access_token: await this.jwtService.signAsync(user), email: user.email};
  }
}
