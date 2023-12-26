import { Inject, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { BookingDTO } from 'src/dtos/booking.dto';
import { HotelsService } from 'src/hotels/hotels.service';
import { Booking } from 'src/schemas/booking.schema';
import { Room } from 'src/schemas/room.schema';
import { eachDayOfInterval, format } from 'date-fns';
import { RoomsService } from 'src/rooms/rooms.service';
import { BookingQueryDTO } from 'src/dtos/booking-query.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class BookingsService {
  constructor(
    @Inject('BOOKING_MODEL')
    private bookingModel: Model<Booking>,
    private hotelsService: HotelsService,
    private roomsService: RoomsService,
    private userService: AuthService
  ) {}

  async create(booking: BookingDTO) {
    try {
      const createdBooking = new this.bookingModel(booking);
      const checkin = new Date(booking.checkinDate);
      const checkout = new Date(booking.checkoutDate);
      const dates = getDatesBetweenDates(checkin, checkout);

      // add booked dates to the hotel
      await this.roomsService.bookRoom(booking.room_id, dates);

      // add booking to user table - send user id and booking id
      booking.guestInfo.user_id && await this.userService.addBookingToUser(booking.guestInfo.user_id, createdBooking._id);
      
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
    // get dates in between of checkin and checkout dates
    let checkinDate = new Date(query.checkinDate);
    let checkoutDate = new Date(query.checkoutDate);
    const dates = getDatesBetweenDates(checkinDate, checkoutDate);
    const datesToString = dates.map(date => format(date, 'yyyy-MM-dd'));

    try {
      // get hotel data with all the info - rooms and services
      const hotel = await this.hotelsService.getHotelData(query.hotelId);

      // check available rooms
      const availableRooms: Room[] = [];

      for (const room of hotel.rooms) {
        if (room.maxGuests >= Number(query.guestsAmount)) {
          let isAvailable = true;
          for (let bookedDate of room.booked_dates) {
            let bookedDateString = format(bookedDate, 'yyyy-MM-dd');
            if (datesToString.includes(bookedDateString)) {
              isAvailable = false;
              break;
            }
          }
          if (isAvailable) {
            availableRooms.push(room);
          }
        }
      }
      return { rooms: availableRooms, hotel_services: hotel.services };
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
