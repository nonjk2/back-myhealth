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
  async PostUndongs() {
    return this.undongService.postUndong();
  }
  @Get()

  /** 운동 삭제하기 */
  async DeleteUndongs() {
    return this.undongService.delUndong();
  }
}
