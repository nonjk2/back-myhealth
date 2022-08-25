import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersRepository } from 'src/users/users.repository';
import { Labtime } from '../dto/undongs.labtime.schema';
import { Undong } from '../undongs.schema';

@Injectable()
export class UndongsService {
  constructor(
    @InjectModel(Undong.name) private readonly undongModel: Model<Undong>,
    @InjectModel(Labtime.name) private readonly labtimeModel: Model<Labtime>,
    private readonly userRepository: UsersRepository,
  ) {}
  async getAll() {
    throw new Error('Method not implemented.');
  }
  async postUndong() {
    throw new Error('Method not implemented.');
  }
  async delUndong() {
    throw new Error('Method not implemented.');
  }
}
