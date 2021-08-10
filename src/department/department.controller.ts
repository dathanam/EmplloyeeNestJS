import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { department } from './department.entity';

@Controller('department')
export class DepartmentController {
    constructor(private readonly service: DepartmentService) { }

    // @UseGuards(JwtAuthGuard)
    @Get()
    findAll(): Promise<department[]> {
        return this.service.findAll()
    }

    // @UseGuards(JwtAuthGuard)
    @Get(':id')
    get(@Param() params) {
        return this.service.findOne(params.id);
    }

    @Post()
    create(@Body() body) {
      return this.service.create(body);
    }

    @Put(':id')
    update(@Body() body, @Param() params) {
        return this.service.update(body, params)
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
