import { IsArray, IsDate, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class EventQueryDTO {
  @IsNotEmpty()
  @IsMongoId()
  hotel_id: ObjectId;

  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsString()
  guest_amount: number;

  @IsArray()
  time_slot: string[];

  @IsNotEmpty()
  @IsString()
  type: string;
}
