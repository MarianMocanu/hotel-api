import { IsArray, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class HotelDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  town: string;

  @IsString()
  image: string;

  @IsArray()
  @IsMongoId({ each: true })
  rooms: ObjectId[];

  @IsArray()
  @IsMongoId({ each: true })
  services: ObjectId[];
}
