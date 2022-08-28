import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decoraters/user.decorater';
import { User } from 'src/users/user.schema';
import { UndongRequestDto } from '../dto/undongs.request.dto';
import { UndongsService } from '../service/undongs.service';

@Controller('undongs')
export class UndongsController {
  constructor(private readonly undongService: UndongsService) {}

  @Get()
  /** 운동전부 가져오기 */
  async getAllUndongs() {
    return this.undongService.getAll();
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
}
