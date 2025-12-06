import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
@Controller('auth') // auth will be the route prefix
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
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
    await this.authService.loginUser(loginDto);
  }
}
