import { IsArray, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateHotelDTO {
  
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
  @IsMongoId({each: true})
  rooms: ObjectId[];
  // @IsArray()
  // @IsMongoId({each: true})
  // rooms: string[];


  constructor(name: string, address: string, town: string, image?: string, rooms?:ObjectId[]) {
    this.name = name;
    this.address = address; 
    this.town = town;
    this.image = image;
    this.rooms = rooms;
  }

}
//lalala