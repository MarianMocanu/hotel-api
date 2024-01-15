import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { BookingDTO } from 'src/dtos/booking.dto';
import { HotelsService } from 'src/hotels/hotels.service';
import { Booking } from 'src/schemas/booking.schema';
import { IRoom as Room } from 'src/schemas/room.schema';
import { differenceInDays, eachDayOfInterval, format } from 'date-fns';
import { RoomsService } from 'src/rooms/rooms.service';
import { BookingQueryDTO } from 'src/dtos/booking-query.dto';
import { ServicesService } from 'src/services/services.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class BookingsService {
  constructor(
    @Inject('BOOKING_MODEL')
    private bookingModel: Model<Booking>,
    private hotelsService: HotelsService,
    private roomsService: RoomsService,
    private userService: AuthService,
    private servicesService: ServicesService,
  ) {}

  async create(data: BookingDTO) {
    const checkin = new Date(data.checkinDate);
    const checkout = new Date(data.checkoutDate);
    try {
      // create booking
      const booking = new this.bookingModel(data);
      booking.rooms = [];
      data.rooms.forEach((room, index) => {
        booking.rooms[index] = room.roomId;
        booking.services[index] = [room.packageId];
        if (room.addonsIds && room.addonsIds.length > 0) {
          booking.services[index] = [...booking.services[index], ...room.addonsIds];
        }
      });
      booking.guestInfo = data.guest;
      booking.nights = differenceInDays(checkout, checkin);
      booking.guestsAmount = data.guestsAmount;

      // calculate total amount
      booking.totalAmount = 0;
      const roomCalculations = booking.rooms.map(async (roomId, index) => {
        const room = await this.roomsService.getRoomById(roomId);
        booking.totalAmount += room.price * booking.nights;

        const serviceCalculations = booking.services[index].map(async serviceId => {
          const service = await this.servicesService.getById(serviceId);
          booking.totalAmount +=
            service.type === 'package' ? service.price * booking.nights : service.price;
        });

        await Promise.all(serviceCalculations);
      });
      await Promise.all(roomCalculations);

      // book rooms
      const dates = getDatesBetweenDates(checkin, checkout);
      booking.rooms.forEach(async roomId => {
        await this.roomsService.bookRoom(roomId, dates);
      });

      // add booking to user
      if (booking.guestInfo.userId) {
        await this.userService.addBookingToUser(booking.guestInfo.userId, booking._id);
      }

      // save booking
      return booking.save();
    } catch (error) {
      throw new HttpException('Bad Request', 400, {
        cause: 'Invalid booking data',
      });
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
        return { rooms: [], hotel_services: hotel.services };
      }
    } catch (error) {
      throw new HttpException('Bad Request', 400, {
        cause: 'Invalid query data',
      });
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
  return dates.map(date => format(date, 'yyyy-MM-dd'));
}
