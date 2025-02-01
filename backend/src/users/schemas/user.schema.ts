import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ unique: [true, 'You cannot have similar name as another Degen'] })
  degen_name: string;

  @Prop({ unique: [true, 'Duplicate Email'] })
  email: string;

  @Prop()
  password: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
