import { IsArray, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class EventVenueDTO {
  @IsNotEmpty()
  @IsMongoId()
  hotel_id: ObjectId;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  meetingDesc: string;

  @IsNotEmpty()
  @IsString()
  partyDesc: string;

  @IsNotEmpty()
  @IsArray()
  meetingPerks: string[];

  @IsNotEmpty()
  @IsArray()
  partyPerks: string[];
}
