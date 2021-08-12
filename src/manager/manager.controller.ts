import { Controller, Get, Post, Put, Delete, Body, Param, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ManagerService } from './manager.service';
import { manager } from './manager.entity';
import { ApiFile } from '../multer/ApiFile';
import { multerOptions } from '../multer/multerOptions';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../role/roles.guard';

@Controller('manager')
export class ManagerController {
    constructor(private readonly service: ManagerService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    findAll(): Promise<manager[]> {
        return this.service.findAll()
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    get(@Param() params) {
        return this.service.findOne(params.id);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Post()
    @ApiFile()
    @UseInterceptors(FileInterceptor('avata', multerOptions))
    create(@Body() body, @UploadedFile() file: Express.Multer.File) {
      return this.service.create(body, file.path);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Put(':id')
    update(@Body() manager, @Param() params) {
        return this.service.update(manager, params)
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
