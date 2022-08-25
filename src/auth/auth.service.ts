import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from 'src/users/users.repository';
import { LoginRequestDto } from './dto/login.request.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async jwtLogIn(data: LoginRequestDto) {
    const { email } = data;
    //* 해당하는 email이 있는지
    const user = await this.userRepository.FindbyUserEmail(email);

    if (!user) {
    }
    const payload = { email: email, sub: user.id };
    return {
      Accesstoken: this.jwtService.sign(payload),
    };
  }
}
