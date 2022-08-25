import { PickType } from '@nestjs/swagger';
import { User } from 'src/users/user.schema';

export class LoginRequestDto extends PickType(User, ['email'] as const) {}
