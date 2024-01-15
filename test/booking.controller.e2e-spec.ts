import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { BookingDTO } from 'src/dtos/booking.dto';
import { BookingQueryDTO } from 'src/dtos/booking-query.dto';
import { HotelsService } from 'src/hotels/hotels.service';
import { IRoom } from 'src/schemas/room.schema';
import { RoomsService } from 'src/rooms/rooms.service';

describe('BookingController (e2e)', () => {
  let app: INestApplication;
  let hotelService: HotelsService;
  let roomService: RoomsService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    hotelService = moduleFixture.get<HotelsService>(HotelsService);
    roomService = moduleFixture.get<RoomsService>(RoomsService);

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  describe('POST bookings controller', () => {
    it('return a 201 status code for valid booking data', async () => {
      const booking: BookingDTO = {
        hotelId: '6596e413cc9ae1e2e572be27',
        checkinDate: '2022-01-01',
        checkoutDate: '2022-01-02',
        guestsAmount: 2,
        rooms: [
          {
            roomId: '6596e40ee36b1d6ec406902c',
            packageId: '6596e4103061bc2f35563745',
            addonsIds: ['6596e4103061bc2f35563749', '6596e4103061bc2f3556374a'],
            guest: {
              userId: '6596e4ebc4a93177587dc704',
              name: 'John Doe',
              email: 'john@mail.com',
              phone: '12345678',
              address: {
                address: '123 Main St',
                city: 'New York',
                zip: 12345,
              },
            },
          },
        ],
        guest: {
          userId: '6596e4ebc4a93177587dc704',
          name: 'John Doe',
          email: 'john@mail.com',
          phone: '12345678',
          address: {
            address: '123 Main St',
            city: 'New York',
            zip: 12345,
          },
        },
      };
      const response = await request(app.getHttpServer()).post('/bookings').send(booking);
      expect(response.statusCode).toBe(201);
    });

    it('return a 400 status code for invalid booking data', async () => {
      const booking: BookingDTO = {
        hotelId: '',
        checkinDate: '2022-01-01',
        checkoutDate: '2022-01-02',
        guestsAmount: 2,
        rooms: [
          {
            roomId: '6596e40ee36b1d6ec406902c',
            packageId: '6596e4103061bc2f35563745',
            addonsIds: ['6596e4103061bc2f35563749', '6596e4103061bc2f3556374a'],
            guest: {
              userId: '6596e4ebc4a93177587dc704',
              name: 'John Doe',
              email: 'john@mail.com',
              phone: '12345678',
              address: {
                address: '123 Main St',
                city: 'New York',
                zip: 12345,
              },
            },
          },
        ],
        guest: {
          userId: '6596e4ebc4a93177587dc704',
          name: 'John Doe',
          email: 'john@mail.com',
          phone: '12345678',
          address: {
            address: '123 Main St',
            city: 'New York',
            zip: 12345,
          },
        },
      };
      const response = await request(app.getHttpServer()).post('/bookings').send(booking);
      expect(response.statusCode).toBe(400);
    });

    it('return booking data after creation', async () => {
      const booking: BookingDTO = {
        hotelId: '6596e413cc9ae1e2e572be27',
        checkinDate: '2022-01-01',
        checkoutDate: '2022-01-02',
        guestsAmount: 2,
        rooms: [
          {
            roomId: '6596e40ee36b1d6ec406902c',
            packageId: '6596e4103061bc2f35563745',
            addonsIds: ['6596e4103061bc2f35563749', '6596e4103061bc2f3556374a'],
            guest: {
              userId: '6596e4ebc4a93177587dc704',
              name: 'John Doe',
              email: 'john@mail.com',
              phone: '12345678',
              address: {
                address: '123 Main St',
                city: 'New York',
                zip: 12345,
              },
            },
          },
        ],
        guest: {
          userId: '6596e4ebc4a93177587dc704',
          name: 'John Doe',
          email: 'john@mail.com',
          phone: '12345678',
          address: {
            address: '123 Main St',
            city: 'New York',
            zip: 12345,
          },
        },
      };
      const response = await request(app.getHttpServer()).post('/bookings').send(booking);
      expect(response.body._id).toBeDefined();
      expect(response.body.__v).toEqual(0);
    });
  });

  describe('POST available-rooms bookings controller', () => {
    it('return 200 status code for valid query data', async () => {
      const bookingQuery: BookingQueryDTO = {
        hotelId: '6596e413cc9ae1e2e572be27',
        checkinDate: '2022-01-01',
        checkoutDate: '2022-01-02',
        numberOfGuests: 2,
        numberOfRooms: 1,
      };
      const response = await request(app.getHttpServer())
        .post('/bookings/available-rooms')
        .send(bookingQuery);
      expect(response.statusCode).toBe(200);
    });

    it('return 400 status code for invalid query data', async () => {
      const bookingQuery: BookingQueryDTO = {
        hotelId: '',
        checkinDate: '',
        checkoutDate: '',
        numberOfGuests: 2,
        numberOfRooms: 1,
      };
      const response = await request(app.getHttpServer())
        .post('/bookings/available-rooms')
        .send(bookingQuery);
      expect(response.statusCode).toBe(400);
    });

    it('return rooms from the same hotel', async () => {
      // Arrange
      const bookingQuery: BookingQueryDTO = {
        hotelId: '6596e413cc9ae1e2e572be27',
        checkinDate: '2022-01-01',
        checkoutDate: '2022-01-02',
        numberOfGuests: 2,
        numberOfRooms: 1,
      };
      const hotel = await hotelService.getHotelData(bookingQuery.hotelId);

      // Act
      const response = await request(app.getHttpServer())
        .post('/bookings/available-rooms')
        .send(bookingQuery);

      // Assert
      const rooms: IRoom[] = await Promise.all(
        response.body.rooms.map(async room => await roomService.getRoomById(room._id)),
      );
      expect(
        rooms.every(room =>
          hotel.rooms.some(hotelRoom => hotelRoom._id.toString() === room._id.toString()),
        ),
      ).toBe(true);
    });

    it('return available rooms', async () => {
      const bookingQuery: BookingQueryDTO = {
        hotelId: '6596e413cc9ae1e2e572be27',
        checkinDate: '2022-01-01',
        checkoutDate: '2022-01-02',
        numberOfGuests: 2,
        numberOfRooms: 1,
      };
      const response = await request(app.getHttpServer())
        .post('/bookings/available-rooms')
        .send(bookingQuery);

      const rooms: IRoom[] = await Promise.all(
        response.body.rooms.map(async room => await roomService.getRoomById(room._id)),
      );
      expect(
        rooms.every(room =>
          room.isAvailableForPeriod(bookingQuery.checkinDate, bookingQuery.checkoutDate),
        ),
      ).toBe(true);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
