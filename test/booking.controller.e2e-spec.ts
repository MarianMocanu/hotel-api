import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { BookingsService } from 'src/bookings/bookings.service';
import { BookingDTO } from 'src/dtos/booking.dto';

describe('BookingController (e2e)', () => {
  let app: INestApplication;
  let bookingService: BookingsService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    bookingService = moduleFixture.get<BookingsService>(BookingsService);
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('POST bookings controller', () => {
    it('should create a new booking', async () => {
      // Arrange
      const booking: BookingDTO = {
        // fake a mongo id for all ids
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
      // Act
      const result = await request(app.getHttpServer()).post('/bookings').send(booking).expect(201);
      // Assert
      expect(result.body._id).toBeDefined();
      expect(result.body.__v).toEqual(0);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
