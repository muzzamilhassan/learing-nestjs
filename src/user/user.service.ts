import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterDto } from 'src/auth/dto/auth.dto';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}
  createUser(registerDto: RegisterDto) {
    console.log('registerDto', registerDto);
    // User registration logic
    return 'User registered successfully';
  }
}
