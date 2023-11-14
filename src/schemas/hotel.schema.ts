import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import  mongoose, { HydratedDocument, ObjectId, Types } from 'mongoose';
import { Room } from './room.schema';

export type HotelDocument = HydratedDocument<Hotel>;

@Schema()
export class Hotel {

    // @Prop({type: Types.ObjectId,required: false})
    // _id: ObjectId;

    @Prop()
    name: string;

    @Prop()
    address: string;

    @Prop()
    town: string;

    @Prop()
    image: string;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Room'}]})
    rooms: Room[];

}

export const HotelSchema = SchemaFactory.createForClass(Hotel);