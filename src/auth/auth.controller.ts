import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  Res,
  Req,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';

import { AuthService } from './auth.service';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthInterceptor } from './auth.interceptor';
import { AuthGuard } from './auth.guard';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async create(@Body() createAuthDto: RegisterDto) {
    if (createAuthDto.password !== createAuthDto.password_confirm) {
      throw new BadRequestException('Password did not match');
    }

    return this.authService.create({
      first_name: createAuthDto.first_name,
      last_name: createAuthDto.last_name,
      email: createAuthDto.email,
      password: await this.authService.hashPassword(createAuthDto.password),
      phone_number: createAuthDto.phone_number,
    });
  }

  @Post('/login')
  async login(
    @Body() loginUserDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    const user = await this.authService.login({
      email: loginUserDto.email,
      password: loginUserDto.password,
    });

    //   send res by cookies
    const accessToken = await this.authService.sign(user);
    response.cookie('userJWT', await this.authService.sign(user), {
      httpOnly: true,
    });

    return {
      user: user,
      token: accessToken,
    };
  }
}
