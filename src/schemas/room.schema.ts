import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type RoomDocument = HydratedDocument<Room>;

@Schema()
export class Room {

    @Prop({ type: String, required: true })    
    hotel_id: string;

    @Prop()
    name: string;

    @Prop()
    images: string[];

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
}

export const RoomSchema = SchemaFactory.createForClass(Room);



// {
//     "hotel_id": 0,
//     "name": "Standard Double Room",
//     "description": "Our standard rooms are furnished in a modern, Nordic style and have a large bathroom.",
//     "images": {},
//     "type": "double",
//     "size": 16,
//     "facilities": ["double bed", "air conditioning", "armchair", "iron & board", "tv", "free Wi-Fi", "workplace", "blow-dryer", "deposit box"],
//     "price": 1361,
//     "maxGuests": 2,
//     "booked_dates": {}
// }