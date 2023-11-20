import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateServiceDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  constructor(title: string, price: number, description: string, type: string) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.type = type;
  }
}
