import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  degen_name: string;

  @Prop()
  ticker: string;

  // @Prop()
  // domain_name: string;

  // @Prop()
  // email: string;

  // @Prop()
  // x_username: string;

  // @Prop()
  // dicord: string;

  // @Prop()
  // token_address: string;

  // @Prop()
  // telegram: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
