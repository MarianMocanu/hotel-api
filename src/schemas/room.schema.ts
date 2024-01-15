import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { eachDayOfInterval, format, parseISO } from 'date-fns';
import { HydratedDocument } from 'mongoose';

export interface IRoom extends RoomDocument {
  readonly name: string;
  readonly type: string;
  readonly size: number;
  readonly facilities: string[];
  readonly price: number;
  readonly maxGuests: number;
  readonly booked_dates: Date[];
  readonly description: string;
  isAvailableForPeriod(checkin: string, checkout: string): boolean;
}
@Schema()
export class Room {
  @Prop()
  name: string;

  @Prop()
  type: string;

  @Prop()
  size: number;

  @Prop()
  facilities: string[];

  @Prop()
  price: number;

  @Prop()
  maxGuests: number;

  @Prop({ type: [Date] })
  booked_dates: Date[];

  @Prop()
  description: string;
}

export type RoomDocument = HydratedDocument<Room>;
export const RoomSchema = SchemaFactory.createForClass(Room);

RoomSchema.methods.isAvailableForPeriod = function (checkin: string, checkout: string) {
  const interval = eachDayOfInterval({ start: parseISO(checkin), end: parseISO(checkout) });
  interval.pop();
  const dates = interval.map(date => format(date, 'yyyy-MM-dd'));
  const bookedDates = this.booked_dates.map(date => format(date, 'yyyy-MM-dd'));
  return !dates.some(date => bookedDates.includes(date));
};
