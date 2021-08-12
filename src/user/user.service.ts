import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { user } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

var randomstring = require("randomstring");
let code = randomstring.generate(7);
const nodemailer = require('nodemailer');

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(user)
        private readonly userRepo: Repository<user>,
    ) { }

    async findAll(): Promise<user[]> {
        return await this.userRepo.find();
    }

    async findOne(id: number): Promise<user> {
        return await this.userRepo.findOne(id)
    }

    async findUser(username: string): Promise<user> {
        return await this.userRepo.findOne({ username: username });
    }

    async sendEmail(email: string): Promise<any> {
        try {
            const output = `
            <p>mã xác minh tài khoản của bạn !</p>
            <ul>
                <li>${code}</li>
            </ul>
            `
            await nodemailer.createTestAccount();

            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: `${process.env.user}`,
                    pass: `${process.env.pass}`,
                },
            });

            let info = await transporter.sendMail({
                from: '"Hacker👻" <foo@example.com>',
                to: email,
                subject: "[dev] ✔",
                text: "Congratulations, you have successfully created an account",
                html: output,
            });
            return { statusCode: 200, message: "Gửi email thành công !" };

        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }
    
    async create(dataUser: user): Promise<any> {
        try {
            const check = await this.userRepo.findOne({ email: dataUser.email })
            if (check) {
                return { statusCode: 404, message: "Tài khoản đã tồn tại trong hệ thống !" };
            }
            const newUser = new user();
            newUser.name = dataUser.name;
            newUser.email = dataUser.email;
            newUser.role = 0;
            newUser.code = code;
            newUser.checkcode = false;
            newUser.username = dataUser.username;
            newUser.password = dataUser.password;
            newUser.loginfirst = false;

            const dataSave = await this.userRepo.save(newUser);
            await this.sendEmail(dataUser.email);
            return { statusCode: 200, message: "Thêm thành công. Mã code đã được gửi tới Email của bạn !", newUser};
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async updateCheckCode(data: user): Promise<any> {
        try {
            let userCheck = new user()
            userCheck = await this.userRepo.findOne({ code: data.code })
            if (!userCheck) {
                return { statusCode: 404, message: "Mã code không khớp !"};
            }
            await this.userRepo.query("UPDATE employee.user SET checkcode = true WHERE id =" + userCheck.id)

            return { statusCode: 200, message: "Mã code chính xác !"};
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async delete(id): Promise<any> {
        try {
            const check = await this.userRepo.findOne({ id: id })
            if (!check) return { statusCode: 404, message: "Người dùng không tồn tại trong hệ thống !" };
            await this.userRepo.delete(id);
            return { statusCode: 200, message: "Xóa thành công !" }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async search(key: user){
        try {
            const check = await this.userRepo.query("select * from employee.user where name LIKE '%"+ key.name +"%'")
            if (!check) return { statusCode: 404, message: "Quản lý không tồn tại trong hệ thống !" };
            return { statusCode: 200, check }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }
}
