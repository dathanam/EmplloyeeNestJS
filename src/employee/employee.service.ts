import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { employee } from './employee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
    constructor(
        @InjectRepository(employee)
        private readonly employeeRepo: Repository<employee>,
    ) { }

    async findAll(pageNum: number, limit: number): Promise<employee[]> {
        return await this.employeeRepo.query("SELECT * FROM employee.employee LIMIT "+limit+" OFFSET "+limit*(pageNum-1)+"");
    }

    async findOne(id: number): Promise<employee> {
        return await this.employeeRepo.findOne(id)
    }

    async create(dataEmployee: employee, file: string): Promise<any> {
        try {
            const check = await this.employeeRepo.findOne({name: dataEmployee.name})
            if (check){
                return { statusCode: 404, message: "Nhân viên đã tồn tại trong hệ thống !"}
            } 
            const newEmployee = new employee();
            newEmployee.idjobtitle = dataEmployee.idjobtitle;
            newEmployee.iddepartment = dataEmployee.iddepartment;
            newEmployee.name = dataEmployee.name;
            newEmployee.phone = dataEmployee.phone;
            newEmployee.email = dataEmployee.email;
            newEmployee.avata = file;
            const dataSave = await this.employeeRepo.save(newEmployee)
            return { statusCode: 200, message: "Thêm thành công !", newEmployee }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async update(data: employee, id: number): Promise<any> {
        try {
            const newEmployee = await this.employeeRepo.findOne({id: id})
            newEmployee.idjobtitle = data.idjobtitle;
            newEmployee.iddepartment = data.iddepartment;
            const dataChange = await this.employeeRepo.update(id, newEmployee);
            return { statusCode: 200, message: "Sửa thành công !", newEmployee }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async delete(id): Promise<any> {
        try {
            const check = await this.employeeRepo.findOne({ id: id })
            if (!check) return { statusCode: 404, message: "Nhân viên không tồn tại trong hệ thống !" };
            await this.employeeRepo.delete(id);
            return { statusCode: 200, message: "Xóa thành công !" }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async search(key: employee){
        try {
            const check = await this.employeeRepo.query("select * from employee.employee where name LIKE '%"+ key.name +"%'")
            if (check.length === 0) return { statusCode: 404, message: "Nhân viên không tồn tại trong hệ thống !" };
            return { statusCode: 200, check }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async employeeInDepartment(idDepartment: number, pageNum: number, limit: number){
        try {
            const check = await this.employeeRepo.query("select * from employee.employee where iddepartment = "+idDepartment+" LIMIT "+limit+" OFFSET "+limit*(pageNum-1))
            if (!check) return { statusCode: 404, message: "phòng ban chưa có nhân viên !" };
            return { statusCode: 200, check } 
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }
}
