import { forwardRef, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { AuthModule } from 'src/auth/auth.module';
import { AwsService } from 'src/aws.service';
import { User, UserSchema } from 'src/users/user.schema';
import { UsersModule } from 'src/users/users.module';
import { UsersRepository } from 'src/users/users.repository';
import { UndongsController } from './controller/undongs.controller';
import { Labtime, Labtimechema } from './dto/undongs.labtime.schema';
import { ImageUpload, ImageUploadchema } from './dto/undongs.uploadimg.schema';
import { UndongsService } from './service/undongs.service';
import { Undong, Undongchema } from './undongs.schema';

@Module({
  imports: [
    MulterModule.register({
      dest: './upload', //upload 폴더에 저장
      storage: memoryStorage(),
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Undong.name, schema: Undongchema }]),
    MongooseModule.forFeature([
      { name: ImageUpload.name, schema: ImageUploadchema },
    ]),
    MongooseModule.forFeature([{ name: Labtime.name, schema: Labtimechema }]),
    UsersModule,
  ],
  controllers: [UndongsController],
  providers: [UndongsService, UsersRepository, AwsService],
})
export class UndongsModule {}
