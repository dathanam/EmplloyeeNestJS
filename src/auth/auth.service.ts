import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { user } from 'src/user/user.entity';


@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.findUser(username);
        if (user && user.password === pass) {
            const { password, ...result } = user;

            return result;
        }
        return null;
    }


    async login(dataUser: user) {
        try {
            const userFind = await this.userService.findUser(dataUser.username);
            if (!userFind) {
                return { statusCode: 404, message: "Không tìm thấy tài khoản" }
            } else {
                if (userFind.password === dataUser.password) {
                    const payload = { username: userFind.username, email: userFind.email, role: userFind.role, loginFrist: userFind.loginfirst }
                    return {
                        accessToken: this.jwtService.sign(payload, { expiresIn: 60 * 60 }),
                        expiresIn: 60 * 60
                    }
                } else {
                    return { statusCode: 404, message: "Sai thông tin đăng nhập" }
                }
            }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }
}
