import {
  Body,
  Controller,
  Post,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccecssInterceptor } from 'src/common/interceptor/interceptor';
import { UsersRequestDto } from '../dto/user.request.dto';
import { UsersService } from '../service/users.service';

@Controller('users')
@UseInterceptors(SuccecssInterceptor)
@UseFilters(HttpExceptionFilter)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async signUp(@Body() body: UsersRequestDto) {
    return await this.usersService.signUp(body);
  }

  @Post('doc')
  async signIp(@Body() body: UsersRequestDto) {
    return process.env.MONGO_URI;
  }
}
