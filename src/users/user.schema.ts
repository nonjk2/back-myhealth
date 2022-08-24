import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type CatDocument = User & Document;
const options: SchemaOptions = {
  timestamps: true,
};
// @ApiProperty({
//   example: 'amamov@kakao.com',
//   description: 'email',
//   required: true,
// })
@Schema(options)
export class User {
  @Prop({
    required: true,
    unique: true,
  })
  email: string;
  @Prop()
  profileURL: string;
  readonly readOnlyData: {
    email: string;
    profileURL: string;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('readOnlyData').get(function (this: User) {
  return {
    email: this.email,
    profileURL: this.profileURL,
  };
});
