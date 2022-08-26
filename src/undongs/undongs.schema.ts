import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';
import { Labtime } from './dto/undongs.labtime.schema';

const options: SchemaOptions = {
  timestamps: true,
};
// @ApiProperty({
//   example: 'amamov@kakao.com',
//   description: 'email',
//   required: true,
// })
@Schema(options)
export class Undong extends Document {
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'users',
  })
  @IsNotEmpty()
  Myid: Types.ObjectId;

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
  sets: Labtime;
}

/** 데이터 베이스에서 끌어온것 */
export const Undongchema = SchemaFactory.createForClass(Undong);

Undongchema.virtual('readOnlyData').get(function (this: Undong) {
  return {
    id: this.id,
  };
});
