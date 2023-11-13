import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database.module';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { roomsProviders } from './rooms.providers';
import { HotelsService } from 'src/hotels/hotels.service';
import { HotelsModule } from 'src/hotels/hotels.module';
import { hotelsProviders } from 'src/hotels/hotels.providers';

@Module({
    imports: [DatabaseModule, HotelsModule],
    controllers: [RoomsController],
    providers: [RoomsService, ...roomsProviders, HotelsService, ...hotelsProviders]
})
export class RoomsModule {}









