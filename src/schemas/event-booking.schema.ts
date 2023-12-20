import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { Service } from './service.schema';

export type EventBookingDocument = HydratedDocument<EventBooking>;

@Schema()
export class EventBooking {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  hotel_id: ObjectId;

  @Prop()
  date: Date;

  @Prop()
  time_slot: string[];

  @Prop()
  type: string;

  @Prop()
  host_name: string;

  @Prop()
  email: string;

  @Prop()
  tel: number;

  @Prop()
  guest_amount: number;

  @Prop()
  corporation: string;

  @Prop()
  comments: string;
}

export const EventBookingSchema = SchemaFactory.createForClass(EventBooking);