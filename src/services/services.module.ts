import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { servicesProviders } from './services.providers';
import { DatabaseModule } from 'src/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ServicesController],
  providers: [ServicesService, ...servicesProviders],
})
export class ServicesModule {}
