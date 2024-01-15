import { Inject, Injectable } from '@nestjs/common';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { RoomDTO } from 'src/dtos/room.dto';
import { IRoom as Room } from 'src/schemas/room.schema';

@Injectable()
export class RoomsService {
  constructor(
    @Inject('ROOM_MODEL')
    private roomModel: Model<Room>,
  ) {}

  async getRoomById(roomId: string): Promise<Room> {
    try {
      return await this.roomModel.findById(roomId);
    } catch (error) {
      return error.message;
    }
  }

  async create(createRoomDTO: RoomDTO): Promise<Room> {
    try {
      const createdRoom = new this.roomModel(createRoomDTO);
      return await createdRoom.save();
    } catch (error) {
      return error.message;
    }
  }

  async update(id: string, createRoomDTO: RoomDTO): Promise<Room> | null {
    try {
      const filter: FilterQuery<Room> = { _id: id };
      const update: UpdateQuery<Room> = createRoomDTO;
      const options = { new: true };

      return await this.roomModel.findOneAndReplace(filter, update, options);
    } catch (error) {
      return error.message;
    }
  }

  async delete(id: string): Promise<Room> {
    try {
      return await this.roomModel.findByIdAndDelete(id).exec();
    } catch (error) {
      return error.message;
    }
  }

  async bookRoom(id: string, dates: string[]): Promise<any> {
    try {
      await this.roomModel.findOneAndUpdate(
        { _id: id }, // find a document with _id equal to roomId
        { $push: { booked_dates: { $each: dates } } },
        { new: true },
      );
      return 'success';
    } catch (error) {
      return error.message;
    }
  }
}
