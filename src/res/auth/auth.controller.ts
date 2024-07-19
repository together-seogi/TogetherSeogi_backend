import { Body, Controller, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { GoogleAuthGuard } from './utils/Guards';
import UserIntro from 'src/interface/userintro.interface';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleLogin() {
    return { msg: 'Google Authentication' };
  }

  // api/auth/google/redirect
  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  handleRedirect() {
    return { msg: 'OK' };
  }

  @Get('status')
  user(@Req() request: Request) {
    console.log(request.user);
    if (request.user) {
      return { msg: 'Authenticated', user: request.user };
    } else {
      return { msg: 'Not Authenticated' };
    }
  }

  @Get('userdata/:userid')
  getUserData(@Param('userid') uid: Number) {
    return this.authService.findUser(uid);
  }

  @Patch('editintro')
  editintro(@Body() intro: UserIntro) {
    return this.editintro(intro);
  }
}
