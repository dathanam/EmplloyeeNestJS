import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor() {}

  canActivate(context: ExecutionContext): boolean {

    const req = context.switchToHttp().getRequest();
    console.log("heheh",req)
    const user = req.user;

    if (user && user.role === 1) return true;
    throw new HttpException("Không được phép !",HttpStatus.FORBIDDEN)

  }
}