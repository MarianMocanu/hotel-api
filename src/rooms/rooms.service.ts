import { Inject, Injectable } from '@nestjs/common';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { CreateRoomDTO } from 'src/dtos/create-room.dto';
import { Room } from 'src/schemas/room.schema';

@Injectable()
export class RoomsService {


    constructor(@Inject('ROOM_MODEL')
    private roomModel: Model<Room>) { }


    async create(createRoomDTO: CreateRoomDTO) {
        try {
            const createdRoom = await new this.roomModel(createRoomDTO);
            return createdRoom.save();
        } catch(error) {
            return error.message
        }
    }

    async update(id: string, createRoomDTO: CreateRoomDTO): Promise<Room> | null {
        try {
            const filter: FilterQuery<Room> = { _id: id };
            const update: UpdateQuery<Room> = createRoomDTO;
            const options = { new: true }

            const result = await this.roomModel.findOneAndReplace(filter, update, options)
            return result;
        }
        catch (error) {
            return error.message;
        }

    }

    async delete(id: string): Promise<Room> {
        try {
            const response = await this.roomModel.findByIdAndDelete(id).exec()
            return response
        }
        catch (error) {
            return error.message;
        }
    }




}






