import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { manager } from './manager.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeleteResult } from 'typeorm';

@Injectable()
export class ManagerService {
    constructor(
        @InjectRepository(manager)
        private readonly managerRepo: Repository<manager>,
    ) { }

    async findAll(): Promise<manager[]> {
        return await this.managerRepo.find();
    }

    async findOne(id: number): Promise<manager> {
        return await this.managerRepo.findOne(id)
    }

    async create(dataManagger: manager, file: string): Promise<any> {
        try {
            const check = await this.managerRepo.findOne({name: dataManagger.name})
            if (check){
                return { statusCode: 404, message: "Quản lý đã tồn tại trong hệ thống !"}
            } 
            const newAccount = new manager();
            newAccount.name = dataManagger.name;
            newAccount.avata = file;
            const dataSave = await this.managerRepo.save(newAccount)
            return { statusCode: 200, message: "Thêm thành công !", newAccount }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async update(data: manager, id: number): Promise<any> {
        try {
            const newManager = new manager;
            newManager.name = data.name;
            const dataChange = await this.managerRepo.update(id, newManager);
            return { statusCode: 200, message: "Sửa thành công !", newManager }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async delete(id): Promise<any> {
        try {
            const check = await this.managerRepo.findOne({ id: id })
            if (!check) return { statusCode: 404, message: "Nhân viên không tồn tại trong hệ thống !" };
            await this.managerRepo.delete(id);
            return { statusCode: 200, message: "Xóa thành công !" }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async search(key: manager){
        try {
            const check = await this.managerRepo.query("select * from employee.manager where name LIKE '%"+ key.name +"%'")
            if (!check) return { statusCode: 404, message: "Quản lý không tồn tại trong hệ thống !" };
            return { statusCode: 200, check }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }
}
