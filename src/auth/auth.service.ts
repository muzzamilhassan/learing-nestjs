import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async registerUser(registerDto: RegisterDto) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(registerDto.password, saltOrRounds);
    const user = await this.userService.createUser({
      ...registerDto,
      password: hash,
    });
    return user;
  }

  async loginUser(loginDto: LoginDto) {
    console.log('Login attempt:', loginDto);
    await this.userService.loginUser(loginDto);
  }
}
