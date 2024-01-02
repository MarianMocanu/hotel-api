import {
  Controller,
  Post,
  Body,
  Get,
  Request,
  HttpCode,
  HttpStatus,
  UseGuards,
  Put,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO, EditUserDTO, LoginUserDto } from 'src/dtos/user.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() formData: CreateUserDTO) {
    return this.authService.signup(formData);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() editUserDto: EditUserDTO) {
    return this.authService.update(id, editUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginData: LoginUserDto) {
    return this.authService.login(loginData);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.authService.getUser(req.user._id);
  }
}
