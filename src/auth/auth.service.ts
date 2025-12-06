import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  // Create a new user with a salted & hashed password
  async registerUser(registerDto: RegisterDto) {
    const saltOrRounds = 10;
    const salt = await bcrypt.genSalt(saltOrRounds);
    const hash = await bcrypt.hash(registerDto.password, salt);
    const user = await this.userService.createUser({
      ...registerDto,
      password: hash,
    });
    return user;
  }

  // Validate credentials and return the user (no JWT issued here)
  async loginUser(loginDto: LoginDto) {
    const user = await this.userService.loginUser(loginDto);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    return user;
  }
}
