import { Controller, Body, Post, Get, Param, Put, Delete, Request, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.model';
import * as bcrypt from 'bcrypt';
import { AuthorizationGuard } from 'src/authorization/authorization.guard';
import { Role } from 'src/decorators/roles.decorator';

@Controller('user')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    
    @Role('user')
    @UseGuards(AuthorizationGuard)
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

    //////

    @Role('admin')
    @UseGuards(AuthorizationGuard)
    @Get(':id')
    async getUserById(@Param('id') userId: string) {
      return this.usersService.getUserById(userId);
    }
    
    
    @Role('admin')
    @UseGuards(AuthorizationGuard)
    @Patch(':id')
    async editUser(
      @Param('id') userId: string,
      @Body() updatedUser: Partial<User>,
    ) {
      return this.usersService.editUser(userId, updatedUser);
    }
    
    
    @Role('admin')
    @UseGuards(AuthorizationGuard)
    @Delete(':id')
    async deleteUser(@Param('id') userId: string) {
      return this.usersService.deleteUser(userId);
    }
    
    
    @Role('admin')
    @UseGuards(AuthorizationGuard)
    @Get('users')
    async getAllUsers() {
      return this.usersService.getAllUsers();
    }


    ///////
    
    
    @Role('admin')
    @UseGuards(AuthorizationGuard)
    @Post('list')
    async createList(@Request() req, @Body('date') date: string, @Body('content') content: string) {
      return this.usersService.createList(req.user.userId, date, content);
    }
    
    
    @Role('admin')
    @UseGuards(AuthorizationGuard)
    @Get('lists')
    async getLists(@Request() req) {
      return this.usersService.getLists(req.user.userId);
    }
    
    
    @Role('admin')
    @UseGuards(AuthorizationGuard)
    @Get('/list/:id')
    async getListById(@Request() req, @Param('id') id: string) {
      return this.usersService.getListById(req.user.userId, id);
    }
    
    
    @Role('admin')
    @UseGuards(AuthorizationGuard)
    @Put('/list/:id')
    async updateList(@Request() req, @Param('id') id: string, @Body('date') date: string, @Body('content') content: string) {
      return this.usersService.updateList(req.user.userId, id, date, content);
    }
    
    
    @Role('admin')
    @UseGuards(AuthorizationGuard)
    @Delete('list/:id')
    async deleteList(@Request() req, @Param('id') id: string) {
      return this.usersService.deleteList(req.user.userId, id);
    }
}
 