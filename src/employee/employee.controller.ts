import { Controller, Get, Post, Put, Delete, Body, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { EmployeeService } from './employee.service';
import { employee } from './employee.entity';
import { ApiFile } from '../multer/ApiFile';
import { multerOptions } from '../multer/multerOptions';

@Controller('employee')
export class EmployeeController {
    constructor(private readonly service: EmployeeService) { }

    // @UseGuards(JwtAuthGuard)
    @Post()
    findAll(@Body() body): Promise<employee[]> {
        return this.service.findAll(body.pageNum, body.limit)
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

    
    @Post('search')
    search(@Body() body) {
      return this.service.search(body);
    }

    @Post('eindepartment')
    eindepartment(@Body() body){
        return this.service.employeeInDepartment(body.iddepartment, body.pageNum, body.limit)
    }
}
