import { Model } from 'mongoose';
import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { User } from '../interfaces/user.interface';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { LoginUserDto } from 'src/dtos/login-user.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject('USER_MODEL')
    private userModel: Model<User>,
  ) { }

  async signup(createUserDTO: CreateUserDTO): Promise<User> {
    const createdUser = new this.userModel(createUserDTO);
    return createdUser.save();
  }

  // i put <any> because the answer can be different options :/
  async login(loginUserDTO: LoginUserDto): Promise<any> {

    //bcrypt.compare: i wanted to use it form the userSchema but i couldnt import it dk why

    const { email, password } = loginUserDTO;
    const user = await this.userModel.findOne({ email });
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password)
      if (isPasswordValid) {
        const payload = {sub: user._id, email: user.email}
        return { status: 'success', message: 'Login successful', token: await this.jwtService.signAsync(payload) };
      }
    }
    return new UnauthorizedException('Login failed');
  }

  async getUser(token: string): Promise<any> {
    try {
      const response = await this.jwtService.verifyAsync(token)
      const id = response.sub
      const user = await this.userModel.findById(id);
      console.log(user);
      if(user) {
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
      

    }
    catch(error) {
      
      return new UnauthorizedException('Invalid token');
    }

  }



}
