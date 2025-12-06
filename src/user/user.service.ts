import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LoginDto, RegisterDto } from 'src/auth/dto/auth.dto';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async createUser(registerDto: RegisterDto) {
    try {
      return await this.userModel.create({
        username: registerDto.username,
        email: registerDto.email,
        password: registerDto.password,
      });
    } catch (error: unknown) {
      const e = error as { code: number };
      if (e.code === 11000) {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  async loginUser(loginDto: LoginDto) {
    const user = await this.userModel.findOne({ email: loginDto.email }).exec();
    if (!user) throw new NotFoundException('User not found');

    const isMatch = await bcrypt.compare(loginDto.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');
    return user;
  }
}
