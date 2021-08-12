import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service'
import {user} from './user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
    constructor(private readonly service: UserService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get()
    findAll(): Promise<user[]> {
      return this.service.findAll()
    }
  
    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    get(@Param() params) {
      return this.service.findOne(params.id);
    }
  
    @Post()
    create(@Body() body) {
      return this.service.create(body);
    }

    // @Post('login')
    // login(@Body() body) {
    //   return this.service.login(body);
    // }

    @Put()
    update(@Body() data) {
      return this.service.updateCheckCode(data);
    }
  
    @Delete(':id')
    deleteUser(@Param() params) {
      return this.service.delete(params.id);
    }

    @Post('search')
    search(@Body() body) {
      return this.service.search(body);
    }
}
