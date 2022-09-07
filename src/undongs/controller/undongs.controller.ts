import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UploadedFiles,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decoraters/user.decorater';
import { multerOptions } from 'src/common/utils/multer.options';
import { User } from 'src/users/user.schema';
import { UndongRequestDto } from '../dto/undongs.request.dto';
import { UndongsService } from '../service/undongs.service';

@Controller('undongs')
export class UndongsController {
  constructor(private readonly undongService: UndongsService) {}

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
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('image', 10, multerOptions('undongs')))
  @Post('upload')
  async UploadUndong(
    @CurrentUser() user: User,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return {
      image: `http://localhost:8000/media/undongs/${files[0].filename}`,
    };
  }
}
