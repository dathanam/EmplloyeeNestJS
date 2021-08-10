import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { department } from './department.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DepartmentService {
    constructor(
        @InjectRepository(department)
        private readonly departmentRepo: Repository<department>,
    ) { }

    async findAll(): Promise<department[]> {
        return await this.departmentRepo.find();
    }

    async findOne(id: number): Promise<department> {
        return await this.departmentRepo.findOne(id)
    }

    async create(dataDepartment: department): Promise<any> {
        try {
            const check = await this.departmentRepo.findOne({name: dataDepartment.name})
            if (check){
                return { statusCode: 404, message: "Phòng ban đã tồn tại trong hệ thống !"}
            } 
            const newDepartment = new department();
            newDepartment.idmanager = dataDepartment.idmanager;
            newDepartment.name = dataDepartment.name;
            newDepartment.phone = dataDepartment.phone;
            const dataSave = await this.departmentRepo.save(newDepartment)
            return { statusCode: 200, message: "Thêm thành công !", newDepartment }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async update(data: department, id: number): Promise<any> {
        try {
            const newDepartment = new department;
            newDepartment.idmanager = data.idmanager;
            newDepartment.name = data.name;
            newDepartment.phone = data.phone;
            const dataChange = await this.departmentRepo.update(id, newDepartment);
            return { statusCode: 200, message: "Sửa thành công !", newDepartment }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async delete(id): Promise<any> {
        try {
            const check = await this.departmentRepo.findOne({ id: id })
            if (!check) return { statusCode: 404, message: "jobTitle không tồn tại trong hệ thống !" };
            await this.departmentRepo.delete(id);
            return { statusCode: 200, message: "Xóa thành công !" }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async search(key: department){
        try {
            const check = await this.departmentRepo.query("select * from employee.department where name LIKE '%"+ key.name +"%'")
            if (!check) return { statusCode: 404, message: "Quản lý không tồn tại trong hệ thống !" };
            return { statusCode: 200, check }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }
}
