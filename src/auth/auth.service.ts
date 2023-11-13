import { Model } from 'mongoose';
import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { LoginUserDto } from 'src/dtos/login-user.dto';
import { IUser } from '../schemas/user.schema';
import * as jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject('USER_MODEL')
    private userModel: Model<IUser>
  ) { }

  async signup(createUserDTO: CreateUserDTO): Promise<IUser> {
    const createdUser = new this.userModel(createUserDTO);
    return createdUser.save();
  }

  async login(loginUserDTO: LoginUserDto): Promise<any> {


    const { email, password } = loginUserDTO;
    const user = await this.userModel.findOne({ email });
    if (user && (await user.comparePassword(password))) {
      const token = jwt.sign({ _id: user._id }, process.env.jwt_secret);
      return { status: 'success', message: 'Login successful', token: token };
    }
    return new UnauthorizedException('Invalid token');
  }


  async getUser(req: Request): Promise<Partial<IUser>> {
    try {
      const token = req.headers['authorization'];
      const response = await this.jwtService.verifyAsync(token);
      console.log(response)
      const id = response._id
      const user = await this.userModel.findById(id);
      if (user) {
        const userRequest = {
          name: user.name,
          email: user.email,
          phone: user.phone ? user.phone : undefined,
          address: user.address ? user.address : undefined,
          dob: user.dob ? user.dob : undefined,
        }
        
        return userRequest
      } else {
        return new UnauthorizedException('Authentication failed');
        
      }
      
      
      
    } catch (error) {
      return error.message;
      return new UnauthorizedException('Login failed');

    }
  }
}
