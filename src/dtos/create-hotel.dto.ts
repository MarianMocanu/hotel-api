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

  @IsArray()
  @IsMongoId({each: true})
  services: ObjectId[];


  constructor(name: string, address: string, town: string, image?: string, rooms?:ObjectId[], services?:ObjectId[]) {
    this.name = name;
    this.address = address; 
    this.town = town;
    this.image = image;
    this.rooms = rooms;
    this.services = services;
  }

}
//lalala