import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { CreateHotelDTO } from 'src/dtos/create-hotel.dto';
import { Hotel } from 'src/schemas/hotel.schema';

@Injectable()
export class HotelsService {

    constructor(@Inject('HOTEL_MODEL')
    private hotelModel: Model<Hotel>) { }


    async create(createHotelDTO: CreateHotelDTO) {
        const createdHotel = await new this.hotelModel(createHotelDTO);
        return createdHotel.save();
    }

    async update(id: string, createHotelDTO: CreateHotelDTO): Promise<Hotel> | null {
        try {
            const filter: FilterQuery<Hotel> = { _id: id };
            const update: UpdateQuery<Hotel> = createHotelDTO;
            const options = { new: true }

            const result = await this.hotelModel.findOneAndReplace(filter, update, options)
            return result;
        }
        catch (error) {
            return error.message;
        }

    }

    async delete(id: string): Promise<Hotel> {
        try {
            const response = await this.hotelModel.findByIdAndDelete(id).exec()
            return response
        }
        catch (error) {
            return error.message;
        }
    }

    async getAll(): Promise<Hotel[]> {
        try {
            const response = await this.hotelModel.find().exec()
            return response
        }
        catch (error) {
            return error.message;
        }
    }

    async checkIfHotelExists(hotel_id: string): Promise<boolean> {
        try {
            const doesHotelExists = await this.hotelModel.findById(hotel_id).exec();
            // !! is a concise way to ensure that a value is converted to a boolean, with the end result being true if the original value was truthy and false if it was falsy.
            return !!doesHotelExists
        } catch (error) {
            console.log(error.message);
            
            return false
        }
    }

}
