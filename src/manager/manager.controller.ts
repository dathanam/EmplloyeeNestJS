import { Controller, Get, Post, Put, Delete, Body, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ManagerService } from './manager.service';
import { manager } from './manager.entity';
import { ApiFile } from '../multer/ApiFile';
import { multerOptions } from '../multer/multerOptions';

@Controller('manager')
export class ManagerController {
    constructor(private readonly service: ManagerService) { }

    // @UseGuards(JwtAuthGuard)
    @Get()
    findAll(): Promise<manager[]> {
        return this.service.findAll()
    }

    // @UseGuards(JwtAuthGuard)
    @Get(':id')
    get(@Param() params) {
        return this.service.findOne(params.id);
    }

    @Post()
    @ApiFile()
    @UseInterceptors(FileInterceptor('avata', multerOptions))
    create(@Body() body, @UploadedFile() file: Express.Multer.File) {
      return this.service.create(body, file.path);
    }

    @Put(':id')
    update(@Body() manager, @Param() params) {
        return this.service.update(manager, params)
    }

    @Delete(':id')
    deleteUser(@Param() params) {
        return this.service.delete(params.id);
    }
}
