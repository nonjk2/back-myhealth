import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from 'src/users/user.schema';
import { UsersRepository } from 'src/users/users.repository';
import { Labtime } from '../dto/undongs.labtime.schema';
import { UndongRequestDto } from '../dto/undongs.request.dto';
import { Undong } from '../undongs.schema';

@Injectable()
export class UndongsService {
  constructor(
    @InjectModel(Undong.name) private readonly undongModel: Model<Undong>,
    @InjectModel(Labtime.name) private readonly labtimeModel: Model<Labtime>,
    private readonly userRepository: UsersRepository,
  ) {}
  async getAll() {
    const result =
      // = await this.undongModel.find();
      await this.undongModel.find({
        myid: { $in: ['630c5cedc2c81b2f875bdc44'] },
      });
    return result;
  }
  async postUndong(undongsData: UndongRequestDto, user: User) {
    const newUndongData = new this.undongModel({
      ...undongsData,
      myid: user.id,
    });
    newUndongData.save((err, result) => {
      undongsData.sets.forEach((v) => {
        const labtimeSet = {
          ...v,
          undongid: result._id,
        };
        console.log(result._id);
        return new this.labtimeModel({
          ...labtimeSet,
        }).save();
      });
    });

    return '성공';
  }
  async delUndong() {
    throw new Error('Method not implemented.');
  }
}
