import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersRequestDto } from './dto/user.request.dto';
import { User } from './user.schema';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async existsByEmail(email: string): Promise<boolean> {
    const result = await this.userModel.exists({ email });
    return result ? true : false;
  }
  async create(user: UsersRequestDto): Promise<User> {
    return await this.userModel.create(user);
  }

  async findUserByIdWithoutPassword(
    userId: string,
  ): Promise<UsersRequestDto | null> {
    const user = await this.userModel.findById(userId).select('-password');
    return user.readOnlyData;
  }
  async FindbyUserEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email });
    return user;
  }
}
