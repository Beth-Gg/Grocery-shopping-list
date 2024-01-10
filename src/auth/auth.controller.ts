import { Controller, Request, Post, UseGuards, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response as ExpressResponse} from 'express';



@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post('logout')
  async logoutUser(@Response({ passthrough: true }) response: ExpressResponse) {
    response.clearCookie('jwt');

    return {
      message: 'Success',
    };
  }
}
