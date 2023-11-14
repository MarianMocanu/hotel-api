import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database.module';
import { HotelsController } from './hotels.controller';
import { HotelsService } from './hotels.service';
import { hotelsProviders } from './hotels.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [HotelsController],
    providers: [HotelsService, ...hotelsProviders]
})
export class HotelsModule {}