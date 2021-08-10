import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { jobtitle } from './jobtitle.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class JobtitleService {
    constructor(
        @InjectRepository(jobtitle)
        private readonly jobTitleRepo: Repository<jobtitle>,
    ) { }

    async findAll(): Promise<jobtitle[]> {
        return await this.jobTitleRepo.find();
    }

    async findOne(id: number): Promise<jobtitle> {
        return await this.jobTitleRepo.findOne(id)
    }

    async create(dataJobtitle: jobtitle): Promise<any> {
        try {
            const check = await this.jobTitleRepo.findOne({name: dataJobtitle.name})
            if (check){
                return { statusCode: 404, message: "JobTitle đã tồn tại trong hệ thống !"}
            } 
            const newJobtitle = new jobtitle();
            newJobtitle.name = dataJobtitle.name;
            const dataSave = await this.jobTitleRepo.save(newJobtitle)
            return { statusCode: 200, message: "Thêm thành công !", newJobtitle }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async update(data: jobtitle, id: number): Promise<any> {
        try {
            const newJobtitle = new jobtitle;
            newJobtitle.name = data.name;
            const dataChange = await this.jobTitleRepo.update(id, newJobtitle);
            return { statusCode: 200, message: "Sửa thành công !", newJobtitle }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async delete(id): Promise<any> {
        try {
            const check = await this.jobTitleRepo.findOne({ id: id })
            if (!check) return { statusCode: 404, message: "jobTitle không tồn tại trong hệ thống !" };
            await this.jobTitleRepo.delete(id);
            return { statusCode: 200, message: "Xóa thành công !" }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async search(key: jobtitle){
        try {
            const check = await this.jobTitleRepo.query("select * from employee.jobtitle where name LIKE '%"+ key.name +"%'")
            if (!check) return { statusCode: 404, message: "Quản lý không tồn tại trong hệ thống !" };
            return { statusCode: 200, check }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }
}
