import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { usersProviders } from './auth/auth.providers';
import { DatabaseModule } from './database.module';
import { HotelsService } from './hotels/hotels.service';
import { HotelsController } from './hotels/hotels.controller';
import { HotelsModule } from './hotels/hotels.module';
import * as dotenv from 'dotenv';
import { hotelsProviders } from './hotels/hotels.providers';

dotenv.config();

@Module({
  imports: [AuthModule, DatabaseModule, HotelsModule],
  controllers: [AppController, AuthController, HotelsController],
  providers: [AppService, AuthService, ...usersProviders, ...hotelsProviders, HotelsService],
})
export class AppModule {}
