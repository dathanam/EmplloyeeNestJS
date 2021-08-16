import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service'
import {user} from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../role/roles.guard';

@Controller('user')
export class UserController {
    constructor(private readonly service: UserService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get()
    findAll(): Promise<user[]> {
      return this.service.findAll()
    }
  
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Get(':id')
    get(@Param() params) {
      return this.service.findOne(params.id);
    }
  
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Post()
    create(@Body() body) {
      return this.service.create(body);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Put()
    update(@Body() data) {
      return this.service.updateCheckCode(data);
    }
  
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Delete(':id')
    deleteUser(@Param() params) {
      return this.service.delete(params.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('search')
    search(@Body() body) {
      return this.service.search(body);
    }
}
