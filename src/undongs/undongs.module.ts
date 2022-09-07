import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from 'src/auth/auth.module';
import { User, UserSchema } from 'src/users/user.schema';
import { UsersModule } from 'src/users/users.module';
import { UsersRepository } from 'src/users/users.repository';
import { UndongsController } from './controller/undongs.controller';
import { Labtime, Labtimechema } from './dto/undongs.labtime.schema';
import { UndongsService } from './service/undongs.service';
import { Undong, Undongchema } from './undongs.schema';

@Module({
  imports: [
    MulterModule.register({
      dest: './upload', //upload 폴더에 저장
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Undong.name, schema: Undongchema }]),
    MongooseModule.forFeature([{ name: Labtime.name, schema: Labtimechema }]),
    UsersModule,
  ],
  controllers: [UndongsController],
  providers: [UndongsService, UsersRepository],
})
export class UndongsModule {}
