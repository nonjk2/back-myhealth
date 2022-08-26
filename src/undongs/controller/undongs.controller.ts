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
  @Post()
  /**운동 저장하기 */
  async PostUndongs(@Body() body: UndongRequestDto) {
    return this.undongService.postUndong(body);
  }
  @Get()

  /** 운동 삭제하기 */
  async DeleteUndongs() {
    return this.undongService.delUndong();
  }
}
