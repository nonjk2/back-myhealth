import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Undongchema } from 'src/undongs/undongs.schema';
import { UsersRequestDto } from './dto/user.request.dto';
import { User } from './user.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async findAll() {
    const UndongsModel = mongoose.model('undongs', Undongchema);
    console.log(UndongsModel);
    const result = await this.userModel
      .find()
      .populate('undongs', UndongsModel);

    return result;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const result = await this.userModel.exists({ email });
    return result ? true : false;
  }
  async create(user: UsersRequestDto): Promise<User> {
    return await this.userModel.create(user);
  }

  async findUserByIdWithoutPassword(
    userId: string | Types.ObjectId,
  ): Promise<UsersRequestDto | null> {
    const user = await this.userModel.findById(userId).select('-password');
    return user.readOnlyData;
  }
  async FindbyUserEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email });
    return user;
  }
}
