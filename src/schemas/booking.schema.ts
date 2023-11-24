import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { Service } from './service.schema';

export type BookingDocument = HydratedDocument<Booking>;

@Schema({ _id: false })
class Address {
  @Prop()
  address: string;

  @Prop()
  zip: number;

  @Prop()
  city: string;
}

@Schema({ _id: false })
export class GuestInfo {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  user_id: ObjectId;

  @Prop()
  name: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop({ type: Address })
  address: Address;
}

@Schema()
export class Booking {
  @Prop()
  hotel_id: string;

  @Prop()
  room_id: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }] })
  services: Service[];

  @Prop()
  checkinDate: Date;

  @Prop()
  checkoutDate: Date;

  @Prop({ type: GuestInfo })
  guestInfo: GuestInfo;

  @Prop()
  nights: number;

  @Prop()
  guestsAmount: number;

  @Prop()
  totalAmount: number;

  @Prop()
  comments: string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
