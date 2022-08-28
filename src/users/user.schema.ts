import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { Undong } from 'src/undongs/undongs.schema';

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
  ref: 'undongs',
  localField: '_id',
  foreignField: 'Myid',
});
_UserSchema.set('toObject', { virtuals: true });
_UserSchema.set('toJSON', { virtuals: true });

export const UserSchema = _UserSchema;
