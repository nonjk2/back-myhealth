import { PickType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { User } from '../user.schema';

export class UsersRequestDto extends PickType(User, [
  'email',
  'profileURL',
] as const) {
  id: string;
}
