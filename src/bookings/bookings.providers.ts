import { Connection } from 'mongoose';
import { BookingSchema } from 'src/schemas/booking.schema';

export const bookingsProviders = [
  {
    provide: 'BOOKING_MODEL',
    useFactory: (connection: Connection) => connection.model('Bookings', BookingSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
