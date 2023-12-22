import { Inject, Injectable } from '@nestjs/common';
import { FilterQuery, Model, ObjectId, UpdateQuery } from 'mongoose';
import { RoomDTO } from 'src/dtos/room.dto';
import { IRoom as Room } from 'src/schemas/room.schema';

@Injectable()
export class RoomsService {
  constructor(
    @Inject('ROOM_MODEL')
    private roomModel: Model<Room>,
  ) {}

  async create(createRoomDTO: RoomDTO): Promise<Room> {
    try {
      const createdRoom = await new this.roomModel(createRoomDTO);
      return createdRoom.save();
    } catch (error) {
      return error.message;
    }
  }

  async update(id: string, createRoomDTO: RoomDTO): Promise<Room> | null {
    try {
      const filter: FilterQuery<Room> = { _id: id };
      const update: UpdateQuery<Room> = createRoomDTO;
      const options = { new: true };

      const result = await this.roomModel.findOneAndReplace(filter, update, options);
      return result;
    } catch (error) {
      return error.message;
    }
  }

  async delete(id: string): Promise<Room> {
    try {
      const response = await this.roomModel.findByIdAndDelete(id).exec();
      return response;
    } catch (error) {
      return error.message;
    }
  }

  async bookRoom(id: ObjectId, dates: Date[]): Promise<any> {
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
