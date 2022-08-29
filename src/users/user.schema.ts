import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';
import { Undong } from 'src/undongs/undongs.schema';

const options: SchemaOptions = {
  timestamps: true,
};
// @ApiProperty({
//   example: 'amamov@kakao.com',
//   description: 'email',
//   required: true,
// })
@Schema(options)
export class User extends Document {
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @Prop()
  profileURL: string;

  readonly readOnlyData: {
    id: string;
    email: string;
    profileURL: string;
    undongs: Undong[];
  };

  readonly undongs: Undong[];
}

/** 데이터 베이스에서 끌어온것 */
const _UserSchema = SchemaFactory.createForClass(User);

_UserSchema.virtual('readOnlyData').get(function (this: User) {
  return {
    id: this.id,
    email: this.email,
    profileURL: this.profileURL,
    undongs: this.undongs,
  };
});
_UserSchema.virtual('undongs', {
  ref: 'Undong' /** 참조할 컬렉션 */,
  localField: '_id' /** 현재 스키마에 선언되어있는 참조할 필드 */,
  foreignField: 'myid' /** 컬렉션에서 참조할 필드 */,
});

export const UserSchema = _UserSchema;
