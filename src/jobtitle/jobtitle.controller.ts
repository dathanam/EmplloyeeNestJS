import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { JobtitleService } from './jobtitle.service';
import { jobtitle } from './jobtitle.entity';

@Controller('jobtitle')
export class JobtitleController {
    constructor(private readonly service: JobtitleService) { }

    // @UseGuards(JwtAuthGuard)
    @Get()
    findAll(): Promise<jobtitle[]> {
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
