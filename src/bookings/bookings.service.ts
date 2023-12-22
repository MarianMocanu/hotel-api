import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { BookingDTO } from 'src/dtos/booking.dto';
import { HotelsService } from 'src/hotels/hotels.service';
import { Booking } from 'src/schemas/booking.schema';
import { IRoom as Room } from 'src/schemas/room.schema';
import { eachDayOfInterval } from 'date-fns';
import { RoomsService } from 'src/rooms/rooms.service';
import { BookingQueryDTO } from 'src/dtos/booking-query.dto';

@Injectable()
export class BookingsService {
  constructor(
    @Inject('BOOKING_MODEL')
    private bookingModel: Model<Booking>,
    private hotelsService: HotelsService,
    private roomsService: RoomsService,
  ) {}

  async create(booking: BookingDTO) {
    try {
      const createdBooking = new this.bookingModel(booking);
      const checkin = new Date(booking.checkinDate);
      const checkout = new Date(booking.checkoutDate);
      const dates = getDatesBetweenDates(checkin, checkout);

      // add booked dates to the hotel
      await this.roomsService.bookRoom(booking.room_id, dates);

      return createdBooking.save();
    } catch (error) {
      console.error(error.message);
      return error.message;
    }
  }

  async getAll(): Promise<Booking[]> {
    try {
      const response = await this.bookingModel.find().exec();
      return response;
    } catch (error) {
      return error.message;
    }
  }

  async getAvailable(query: BookingQueryDTO) {
    try {
      const hotel = await this.hotelsService.getHotelData(query.hotelId);
      const availableRooms: Room[] = [];
      hotel.rooms.forEach(room => {
        if (room.isAvailableForPeriod(query.checkinDate, query.checkoutDate)) {
          availableRooms.push(room);
        }
      });
      if (
        availableRooms.length >= query.numberOfRooms &&
        availableRooms.reduce((total, room) => total + room.maxGuests, 0) >= query.numberOfGuests
      ) {
        return { rooms: availableRooms, hotel_services: hotel.services };
      } else {
        return {};
      }
    } catch (error) {
      return error.message;
    }
  }

  async delete(id: string): Promise<Booking> {
    try {
      const response = await this.bookingModel.findByIdAndDelete(id).exec();
      return response;
    } catch (error) {
      return error.message;
    }
  }
}

function getDatesBetweenDates(startDate: Date, endDate: Date) {
  const dates = eachDayOfInterval({ start: startDate, end: endDate });
  //delete the last day as doesnt count as night at the hotel
  dates.pop();
  return dates;
}
