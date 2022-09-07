import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';
import { User } from 'src/users/user.schema';
import { Labtime } from './dto/undongs.labtime.schema';
import { ImageUpload } from './dto/undongs.uploadimg.schema';

const options: SchemaOptions = {
  timestamps: true,
  collection: 'undongs',
};
@Schema(options)
export class Undong extends Document {
  @Prop({
    required: true,
    ref: User.name,
  })
  @IsNotEmpty()
  myid: string;

  @IsString()
  @Prop()
  startdate: string;
  @IsString()
  @Prop()
  enddate: string;

  @IsString()
  @IsNotEmpty()
  @Prop()
  name: string;

  @IsString()
  @Prop()
  @IsNotEmpty()
  activetime: string;

  @Prop()
  sets?: Labtime[];
}

/** 데이터 베이스에서 끌어온것 */
const _Undongchema = SchemaFactory.createForClass(Undong);
_Undongchema.virtual('MyUndongImg', {
  ref: ImageUpload.name /** 참조할 컬렉션 */,
  localField: 'myid' /** 현재 스키마에 선언되어있는 참조할 필드 */,
  foreignField: 'myid' /** 컬렉션에서 참조할 필드 */,
});
_Undongchema.set('toObject', { virtuals: true });
_Undongchema.set('toJSON', { virtuals: true });
export const Undongchema = _Undongchema;
