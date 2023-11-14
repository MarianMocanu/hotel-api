import { Connection } from 'mongoose';
import { HotelSchema } from 'src/schemas/hotel.schema';

export const hotelsProviders = [
  {
    provide: 'HOTEL_MODEL',
    useFactory: (connection: Connection) => connection.model('Hotel', HotelSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
