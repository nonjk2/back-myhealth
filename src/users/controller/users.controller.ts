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
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decoraters/user.decorater';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccecssInterceptor } from 'src/common/interceptor/interceptor';
import { UsersRequestDto } from '../dto/user.request.dto';
import { UsersService } from '../service/users.service';
import { User } from '../user.schema';

@Controller('users')
@UseInterceptors(SuccecssInterceptor)
@UseFilters(HttpExceptionFilter)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async signUp(@Body() body: UsersRequestDto) {
    return await this.usersService.signUp(body);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentUser(@CurrentUser() user: User) {
    return user;
  }

  //   @Post()
  //   async signip(@Body() body: UsersRequestDto) {
  //     return await this.usersService(body);
  //   }
}
