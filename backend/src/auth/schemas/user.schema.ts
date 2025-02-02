import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class User {
  @Prop({
    unique: [true, 'You cannot have similar name as another Degen Please'],
    required: [true, 'Degen name is required'],
  })
  degen_name: string;

  @Prop({
    unique: [true, 'Duplicate Email'],
    required: [true, 'Email is required'],
  })
  email: string;

  @Prop({ required: true })
  password: string;
}

export interface UserDocument extends User, Document {}
export const UserSchema = SchemaFactory.createForClass(User);
