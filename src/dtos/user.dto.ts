import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsDate,
  IsDefined,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateUserDTO {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsDateString()
  dob: string;
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
