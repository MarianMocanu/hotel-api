import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type EventVenueDocument = HydratedDocument<EventVenue>;

@Schema()
export class EventVenue {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  hotel_id: ObjectId;

  @Prop()
  name: string;

  @Prop()
  meetingPerks: string[];

  @Prop()
  partyPerks: string[];

  @Prop()
  meetingDesc: string;

  @Prop()
  partyDesc: string;
}

export const EventVenueSchema = SchemaFactory.createForClass(EventVenue);
