import { Controller, Get, Post, UseGuards, Body, Param, Res  } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService
    ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Body() body) {
    return this.authService.login(body);
  }

  @Get(':photo')
  serverImage(@Param('photo') photo, @Res() res): Promise<any> {
      return res.sendFile(photo, { root: 'uploads' })
  }
}
