import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { AwsService } from 'src/aws.service';
import { CurrentUser } from 'src/common/decoraters/user.decorater';
import { User } from 'src/users/user.schema';
import { UndongRequestDto } from '../dto/undongs.request.dto';
import { UndongsService } from '../service/undongs.service';

@Controller('undongs')
export class UndongsController {
  constructor(
    private readonly undongService: UndongsService,
    private readonly awsService: AwsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  /** 운동전부 가져오기 */
  async getAllUndongs(@CurrentUser() user: User) {
    return this.undongService.getAll(user);
  }
  @UseGuards(JwtAuthGuard)
  @Post()
  /**운동 저장하기 */
  async PostUndongs(@Body() body: UndongRequestDto, @CurrentUser() user: User) {
    return this.undongService.postUndong(body, user);
  }
  @Get()

  /** 운동 삭제하기 */
  async DeleteUndongs() {
    return this.undongService.delUndong();
  }
  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async UploadUndong(
    @CurrentUser() user: User,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(file);
    await this.awsService.uploadFileToS3('undongs', file);
    // return await this.undongService.uploadImg(user, file);
  }
}
