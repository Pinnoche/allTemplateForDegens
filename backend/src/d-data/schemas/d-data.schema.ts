import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../auth/schemas/user.schema';

@Schema({
  timestamps: true,
})
export class Data extends Document {
  @Prop({ unique: true, required: [true, 'Ticker is required'] })
  ticker: string;

  @Prop({ unique: true })
  contract_address: string;

  @Prop({ unique: false })
  token_description: string;

  @Prop({ unique: true })
  x_username: string;

  @Prop({ unique: true })
  telegram_channel: string;

  @Prop({ unique: true })
  discord: string;
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
  })
  userId: User;
}

export const DataSchema = SchemaFactory.createForClass(Data);
