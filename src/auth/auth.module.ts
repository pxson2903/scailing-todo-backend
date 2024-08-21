import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserEntity } from './entities/auth.entity';
import configuration from '../config/config';


@Module({
  controllers: [AuthController],
  exports: [AuthService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: configuration().jwtSecret,
      signOptions: { expiresIn: '30m' },
    }),
  ],
  providers: [AuthService],
})
export class AuthModule {}