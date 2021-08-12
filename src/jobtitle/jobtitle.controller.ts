import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { JobtitleService } from './jobtitle.service';
import { jobtitle } from './jobtitle.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../role/roles.guard';

@Controller('jobtitle')
export class JobtitleController {
    constructor(private readonly service: JobtitleService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    findAll(): Promise<jobtitle[]> {
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
