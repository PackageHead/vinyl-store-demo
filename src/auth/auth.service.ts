import { Injectable } from '@nestjs/common';
import { User } from '../user/user.model';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, firstName, lastName } = createUserDto;

    const existingUser = await this.userService.getUserByEmail(email);
    if (existingUser) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userService.createUser({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    return user;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
    };
  }

  async googleLogin(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async findOrCreateGoogleUser(
    email: string,
    firstName: string,
    lastName: string,
  ): Promise<User> {
    let user = await this.userService.getUserByEmail(email);

    if (!user) {
      user = await this.userService.createUser({ email, firstName, lastName });
    }

    return user;
  }
}
