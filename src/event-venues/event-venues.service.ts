import { Inject, Injectable } from '@nestjs/common';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { EventVenueDTO } from 'src/dtos/event-venue.dto';
import { EventVenue } from 'src/schemas/event-venue.schema';

@Injectable()
export class EventVenuesService {

  constructor(@Inject('EVENT_VENUE_MODEL') private eventVenueModel: Model<EventVenue>) {}


  create(eventVenueDTO: EventVenueDTO): Promise<EventVenue> {
    try {
      const createdEventVenue = new this.eventVenueModel(eventVenueDTO);
      return createdEventVenue.save();
    } catch (error) {
      return error.message;
    }
  }

  async getAll(): Promise<EventVenue[]> {
    try {
      const response = await this.eventVenueModel.find().exec();
      return response
    } catch(error) {
      return error.message
    }
  }

  findOne(id: string) {
    return `This action returns a #${id} eventVenue`;
  }

  async update(id: string, eventVenueDTO: EventVenueDTO): Promise<EventVenue> {
    try {
      const filter: FilterQuery<EventVenue> = {_id: id};
      const update: UpdateQuery<EventVenue> = eventVenueDTO;
      const options = {new: true};

      const result = await this.eventVenueModel.findOneAndReplace(filter, update, options);
      return result
    } catch(error) {
      return error.message
    } 
  }

  async delete(id: string): Promise<EventVenue> {
    try {
      const response = await this.eventVenueModel.findByIdAndDelete(id).exec();
      return response
    } catch(error) {
      return error.message
    }
  }
}
