import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from 'src/users/user.schema';
import { UsersRepository } from 'src/users/users.repository';
import { Labtime } from '../dto/undongs.labtime.schema';
import { UndongRequestDto } from '../dto/undongs.request.dto';
import { ImageUpload } from '../dto/undongs.uploadimg.schema';
import { Undong } from '../undongs.schema';

@Injectable()
export class UndongsService {
  constructor(
    @InjectModel(Undong.name) private readonly undongModel: Model<Undong>,
    @InjectModel(Labtime.name) private readonly labtimeModel: Model<Labtime>,
    @InjectModel(ImageUpload.name)
    private readonly uploadModel: Model<ImageUpload>,
    private readonly userRepository: UsersRepository,
  ) {}
  async getAll(user: User) {
    const undongresult = await this.undongModel.find({
      myid: user.id,
    });
    const undongImg = await this.uploadModel.find({
      myid: user.id,
    });

    const result = [].concat(undongresult, undongImg).sort((a, b) => {
      return a.createdAt - b.createdAt;
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

    return newUndongData;
  }

  async uploadImg(user: User, files: Express.Multer.File[]) {
    const Filename = `undongs/${files[0].filename}`;
    const ImageUploads = await new this.uploadModel({
      myid: user.id,
      imgUrl: Filename,
    }).save();
    return ImageUploads;
  }
  async delUndong() {
    throw new Error('Method not implemented.');
  }
}
