import { FilterQuery, Model, ObjectId, Types, UpdateQuery } from 'mongoose';
import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { CreateUserDTO, EditUserDTO } from '../dtos/user.dto';
import { LoginUserDto } from 'src/dtos/user.dto';
import { IUser } from '../schemas/user.schema';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<IUser>,
  ) {}

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

  async getUser(id: string): Promise<Partial<IUser>> {
    try {
      return await this.userModel.findById(id).populate('bookings');
    } catch (error) {
      return new UnauthorizedException('Login failed');
    }
  }

  async getUserAccount(id: string): Promise<IUser> {
    try {
      return await this.userModel.findById(id);
    } catch (error) {
      throw new UnauthorizedException('Login failed');
    }
  }

  async addBookingToUser(userId: string, bookingId: Types.ObjectId): Promise<any> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    user.bookings.push(bookingId);
    await user.save();
    return 'success';
  }

  async update(userId: string, editUserDto: EditUserDTO): Promise<Partial<IUser>> | null {
    try {
      const filter: FilterQuery<IUser> = { _id: userId };
      const update: UpdateQuery<IUser> = editUserDto;
      const options = { new: true };

      const result = await this.userModel.findOneAndUpdate(filter, update, options);
      const userRequest = {
        _id: result._id,
        name: result.name,
        email: result.email,
        phone: result.phone ? result.phone : undefined,
        address: result.address ? result.address : undefined,
        dob: result.dob ? result.dob : undefined,
      };

      return userRequest;
    } catch (error) {
      return error.message;
    }
  }
}
