import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';
import { Document, Types } from 'mongoose';
import { User } from 'src/users/user.schema';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class ImageUpload extends Document {
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: User.name,
  })
  @IsString()
  @IsNotEmpty()
  myid: string;
  @Prop()
  @IsString()
  imgUrl: string;
}

/** 데이터 베이스에서 끌어온것 */
export const ImageUploadchema = SchemaFactory.createForClass(ImageUpload);
