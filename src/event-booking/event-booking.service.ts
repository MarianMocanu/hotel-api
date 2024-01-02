import { Inject, Injectable } from '@nestjs/common';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { EventBookingDTO } from 'src/dtos/event-booking.dto';
import { EventQueryDTO } from 'src/dtos/event-query.dto';
import { EventVenuesService } from 'src/event-venues/event-venues.service';
import { EventBooking } from 'src/schemas/event-booking.schema';

@Injectable()
export class EventBookingService {
  constructor(
    @Inject('EVENT_BOOKING_MODEL')
    private eventBookingModel: Model<EventBooking>,
    private eventVenuesService: EventVenuesService,
  ) {}

  create(eventBookingDto: EventBookingDTO): Promise<EventBooking> {
    try {
      const createdEventBooking = new this.eventBookingModel(eventBookingDto);
      return createdEventBooking.save();
    } catch (error) {
      return error.message;
    }
  }

  async findAll(): Promise<EventBooking[]> {
    try {
      const response = await this.eventBookingModel.find().exec();
      return response;
    } catch (error) {
      return error.message;
    }
  }

  async findOne(id: string): Promise<EventBooking> {
    return await this.eventBookingModel.findById(id).exec();
  }

  async update(id: string, eventBookingDTO: EventBookingDTO): Promise<EventBooking> {
    try {
      const filter: FilterQuery<EventBooking> = { _id: id };
      const update: UpdateQuery<EventBooking> = eventBookingDTO;
      const options = { new: true };

      const result = await this.eventBookingModel.findOneAndReplace(filter, update, options);
      return result;
    } catch (error) {
      return error.message;
    }
  }

  async getVenues(eventQuery: EventQueryDTO) {
    const otherVenues = await this.eventVenuesService.getOther(eventQuery.hotel_id);
    const selectedVenue = await this.eventVenuesService.findByHotelId(eventQuery.hotel_id);
    return {
      selected_venue: selectedVenue,
      other_venues: otherVenues,
    };
  }

  async delete(id: string): Promise<EventBooking> {
    try {
      const response = await this.eventBookingModel.findByIdAndDelete(id).exec();
      return response;
    } catch (error) {
      return error.message;
    }
  }
}
