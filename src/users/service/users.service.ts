import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UsersRequestDto } from '../dto/user.request.dto';
import { UsersRepository } from '../users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly authService: AuthService,
  ) {}

  async getAlluser() {
    const allUser = await this.userRepository.findAll();
    // const readOnlyUsers = allUser.map((v) => v.readOnlyData);
    return allUser;
  }

  async signUp(body: UsersRequestDto) {
    const { email, profileURL, id } = body;
    const isUserExist = await this.userRepository.existsByEmail(email);
    if (isUserExist) {
    } else {
      await this.userRepository.create({
        email,
        profileURL,
        id,
      });
    }
    return await this.authService.jwtLogIn(body);
    // return user.readOnlyData;
  }
}
