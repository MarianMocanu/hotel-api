import { IsNotEmpty, IsString, IsEmail, IsDate } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsDate()
  dob: Date;
}

export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class EditUserDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  address: string;

  @IsDate()
  dob: Date;
}
