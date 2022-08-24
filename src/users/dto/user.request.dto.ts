import { IsEmail, IsNotEmpty } from 'class-validator';

export class UsersRequestDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  profileURL: string;
}
