import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Data {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  userId: MongooseSchema.Types.ObjectId;
  @Prop({ unique: true, required: [true, 'Ticker is required'] })
  ticker: string;

  @Prop({ unique: true })
  contract_address: string;

  @Prop({ unique: true })
  x_username: string;

  @Prop({ unique: true })
  telegram_channel: string;

  @Prop({ unique: true })
  discord: string;
}

export interface DataDocument extends Data, Document {}
export const DataSchema = SchemaFactory.createForClass(Data);
