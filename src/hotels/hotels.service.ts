import { Inject, Injectable } from '@nestjs/common';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { HotelDTO } from 'src/dtos/hotel.dto';
import { Hotel } from 'src/schemas/hotel.schema';

@Injectable()
export class HotelsService {
  constructor(
    @Inject('HOTEL_MODEL')
    private hotelModel: Model<Hotel>,
  ) {}

  async create(createHotelDTO: HotelDTO) {
    const createdHotel = await new this.hotelModel(createHotelDTO);
    return createdHotel.save();
  }

  async update(id: string, createHotelDTO: HotelDTO): Promise<Hotel> | null {
    try {
      const filter: FilterQuery<Hotel> = { _id: id };
      const update: UpdateQuery<Hotel> = createHotelDTO;
      const options = { new: true };

      const result = await this.hotelModel.findOneAndReplace(filter, update, options);
      return result;
    } catch (error) {
      return error.message;
    }
  }

  async delete(id: string): Promise<Hotel> {
    try {
      const response = await this.hotelModel.findByIdAndDelete(id).exec();
      return response;
    } catch (error) {
      return error.message;
    }
  }

  async getHotelData(id: string): Promise<Hotel> {
    const hotelData = await this.hotelModel.findById(id).populate('rooms').populate('services');
    return hotelData;
  }

  async getAll(): Promise<Hotel[]> {
    try {
      const response = await this.hotelModel.find().exec();
      return response;
    } catch (error) {
      return error.message;
    }
  }

  async getRooms(id: string): Promise<Hotel> {
    //we are returning the whole hotel object with the rooms injected inside. should we return only the rooms?
    return this.hotelModel.findById(id).populate('rooms');
  }

  async getServices(id: string): Promise<Hotel> {
    //we are returning the whole hotel object with the rooms injected inside. should we return only the rooms?
    return this.hotelModel.findById(id).populate('services');
  }
}
