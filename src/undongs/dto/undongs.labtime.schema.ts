import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};
// @ApiProperty({
//   example: 'amamov@kakao.com',
//   description: 'email',
//   required: true,
// })
@Schema(options)
export class Labtime extends Document {
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'undongs',
  })
  @IsNotEmpty()
  undongid: Types.ObjectId;

  @IsNumber()
  @Prop()
  time?: number;
  @IsNumber()
  @Prop()
  restTime?: number;
  @IsNumber()
  @Prop()
  activeTime?: number;
}

/** 데이터 베이스에서 끌어온것 */
export const Labtimechema = SchemaFactory.createForClass(Labtime);
