import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { UserService } from 'src/user/user.service';
@Controller('auth') // auth will be the route prefix
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const createdUser = await this.authService.registerUser(registerDto);
    const payload = {
      sub: createdUser._id,
      email: createdUser.email,
      username: createdUser.username,
    };
    const token = this.jwtService.sign(payload);
    return { user: createdUser, access_token: token };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const loginUser = await this.authService.loginUser(loginDto);
    const payload = {
      sub: loginUser._id,
      email: loginUser.email,
    };
    const token = this.jwtService.sign(payload);
    return {
      message: 'Login successful',
      user: loginUser,
      access_token: token,
    };
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async profile(@Request() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userId = req.user?.sub as string;
    console.log('hellow', userId);
    const user = await this.userService.getUserById(userId);
    return user;
  }
}
