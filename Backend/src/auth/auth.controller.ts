import { Controller, Request, Post, UseGuards, Response, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response as ExpressResponse} from 'express';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';




@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    // @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(

      @Body ('password') password: string,
      @Body ('username') username: string
     ) {
      console.log("passwed in",password);
      console.log("username in", username);
        // return this.authService.login(req.body);
        return this.authService.login(username, password);

    }

    @Post('logout')
  async logoutUser(@Response({ passthrough: true }) response: ExpressResponse) {
    response.clearCookie('jwt');

    return {
      message: 'Success',
    };
  }


  @Post('/signup')
  async createUser(
      @Body ('password') password: string,
      @Body ('username') username: string,
      @Body ('role') role: string,

  ): Promise<User> {
      const saltOrRounds = 5;
      const hashedPassword = await bcrypt.hash(password, saltOrRounds);
      const result = await this. authService.createUser(
          username,
          hashedPassword,
          role
      );
      return result;
  }
}
