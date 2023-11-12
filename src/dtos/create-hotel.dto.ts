import { IsNotEmpty, IsString } from 'class-validator';

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

  constructor(name: string, address: string, town: string, image?: string) {
    this.name = name;
    this.address = address; 
    this.town = town;
    this.image = image;
  }

}
