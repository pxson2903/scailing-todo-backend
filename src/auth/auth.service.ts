import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserEntity } from './entities/auth.entity';
import { LoginDto } from './dto/login.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}
  async create(createAuthDto: CreateAuthDto): Promise<CreateAuthDto> {
    // @ts-ignore
    return await this.userRepository.save(createAuthDto);
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findOne(condition): Promise<UserEntity> {
    return this.userRepository.findOne({ where: condition });
  }

  async update(id: number, updateAuthDto: UpdateAuthDto) {
    // @ts-ignore
    return this.userRepository.update(id, updateAuthDto);
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  async login(condition: LoginDto): Promise<UserEntity> {
    const user = await this.findOne({ email: condition.email });
    if (!user) {
      throw new BadRequestException('Email Does not exist');
    }

    if (!(await bcrypt.compare(condition.password, user.password))) {
      throw new BadRequestException('Invalid Password provided');
    }
    return user;
  }

  async sign(user: UserEntity): Promise<string> {
    return this.jwtService.signAsync({ id: user.id });
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async loginUser(payload: {
    id: string;
    cookie: string;
  }): Promise<UserEntity> {
    const userByCookie = await this.jwtService.verifyAsync(payload.cookie);

    if (+userByCookie.id !== +payload.id) {
      throw new BadRequestException('user not authenticated');
    }
    return this.findOne({ id: userByCookie.id });
  }
}
