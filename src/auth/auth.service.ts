import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { User } from '../interfaces/user.interface';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { LoginUserDto } from 'src/dtos/login-user.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';


@Injectable()
export class AuthService {
  constructor(
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
        const token = jwt.sign({ _id: user._id }, process.env.jwt_secret)
        return { status: 'success', message: 'Login successful', token: token };
      }
      return { status: 'error', message: 'Login failed' };
    }
    return { status: 'error', message: 'Login failed' };
  }
}
