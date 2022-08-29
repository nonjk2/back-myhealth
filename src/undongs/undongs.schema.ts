import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';
import { User } from 'src/users/user.schema';
import { Labtime } from './dto/undongs.labtime.schema';

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

_Undongchema.set('toObject', { virtuals: true });
_Undongchema.set('toJSON', { virtuals: true });
export const Undongchema = _Undongchema;
