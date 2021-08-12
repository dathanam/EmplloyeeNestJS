import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { department } from './department.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../role/roles.guard';

@Controller('department')
export class DepartmentController {
    constructor(private readonly service: DepartmentService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    findAll(): Promise<department[]> {
        return this.service.findAll()
    }

    @UseGuards(AuthGuard('jwt'))
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
    @Put(':id')
    update(@Body() body, @Param() params) {
        return this.service.update(body, params)
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
