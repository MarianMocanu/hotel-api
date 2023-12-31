import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type EventBookingDocument = HydratedDocument<EventBooking>;

@Schema()
export class EventBooking {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  venue_id: ObjectId;

  @Prop()
  date: Date;

  @Prop()
  type: string;

  @Prop()
  host_name: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  guest_amount: number;

  @Prop()
  start_time: string;

  @Prop()
  end_time: string;

  @Prop()
  corporation: string;

  @Prop()
  comments: string;
}

export const EventBookingSchema = SchemaFactory.createForClass(EventBooking);