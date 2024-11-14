import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  HttpStatus,
  HttpException,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './google.strategy';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from '../user/user.model';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('google')
  @UseGuards(GoogleStrategy)
  @ApiOperation({ summary: 'Initiate Google authentication' })
  @ApiResponse({
    status: 200,
    description: 'Initiates Google authentication.',
  })
  async googleAuth() {}

  @Get('google/redirect')
  @UseGuards(GoogleStrategy)
  @ApiOperation({ summary: 'Google authentication redirect' })
  @ApiResponse({
    status: 200,
    description: 'Redirect after successful Google authentication.',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        token: { type: 'string' },
      },
    },
  })
  async googleAuthRedirect(@Req() req) {
    const user = req.user;
    console.log(user);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    const token = this.jwtService.sign({ userId: user.id });
    return { message: 'Google auth success', token };
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'User already exists.',
  })
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.authService.findOrCreateGoogleUser(
      createUserDto.email,
      createUserDto.firstName,
      createUserDto.lastName,
    );
    if (!existingUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    return this.authService.register(createUserDto);
  }
}
