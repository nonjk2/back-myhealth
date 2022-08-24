import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersRequestDto } from '../dto/user.request.dto';
import { User } from '../user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async signUp(body: UsersRequestDto) {
    const { email, profileURL } = body;
    const isUserExist = await this.userModel.exists({ email });

    if (isUserExist) {
    }

    const user = await this.userModel.create({
      email,
      profileURL,
    });

    return user;
  }
}
