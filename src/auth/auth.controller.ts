import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from 'src/dtos/create-user.dto';
import { LoginUserDto } from 'src/dtos/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() formData: CreateUserDTO) {
    return this.authService.signup(formData);
  }

  @Post('login')
  login(@Body() loginData: LoginUserDto) {
    return this.authService.login(loginData)
  }

}
