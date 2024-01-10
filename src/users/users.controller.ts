import { Controller, Body, Post, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.model';
import * as bcrypt from 'bcrypt';

@Controller('user')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('/signup')
    async createUser(
        @Body ('password') password: string,
        @Body ('username') username: string,
        @Body ('role') role: string,

    ): Promise<User> {
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltOrRounds);
        const result = await this. usersService.createUser(
            username,
            hashedPassword,
            role
        );
        return result;
    }
}
