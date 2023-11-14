import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DatabaseModule } from '../database.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { usersProviders } from './auth.providers';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [DatabaseModule, JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '20h' },
  })],
  controllers: [AuthController],
  providers: [AuthService, ...usersProviders],
})
export class AuthModule {}
