import { Connection } from 'mongoose';
import { ServiceSchema } from 'src/schemas/service.schema';

export const servicesProviders = [
  {
    provide: 'SERVICE_MODEL',
    useFactory: (connection: Connection) => connection.model('Service', ServiceSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
