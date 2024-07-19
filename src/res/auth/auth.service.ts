import { Injectable } from '@nestjs/common';
import userSchema from 'src/models/user.schema';
import { config } from 'dotenv';
config();

let env = process.env;

@Injectable()
export class AuthService {
  constructor() {}

  async validateUser(details: UserDetails) {
    console.log('AuthService');
    console.log(details);
    const user = await userSchema.findOne({ email: details.email });
    console.log(user);
    if (user) return user;
    console.log('User not found. Creating...');
    const newUser = this.userRepository.create(details);
    return this.userRepository.save(newUser);
  }

  async findUser(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }
}
