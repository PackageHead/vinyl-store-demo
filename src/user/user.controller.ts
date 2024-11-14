import {
  Controller,
  Get,
  Patch,
  Body,
  UseGuards,
  Request,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { GoogleStrategy } from 'src/auth/google.strategy';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @UseGuards(GoogleStrategy)
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved user profile.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, invalid or missing authentication.',
  })
  async getProfile(@Request() req) {
    if (!req.user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }
    return await this.userService.getProfile(req.user.id);
  }

  @Patch('profile')
  @UseGuards(GoogleStrategy)
  @ApiOperation({ summary: 'Update user profile' })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated user profile.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, invalid profile data.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, invalid or missing authentication.',
  })
  @ApiBody({
    description: 'Data to update user profile',
    type: UpdateUserDto,
  })
  async updateProfile(@Body() updateData: UpdateUserDto, @Request() req) {
    updateData.id = req.user.id;
    return await this.userService.updateProfile(updateData);
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout the user' })
  @ApiResponse({
    status: 200,
    description: 'Successfully logged out.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, invalid or missing authentication.',
  })
  async logout(@Request() req) {
    return { message: 'Logged out successfully' };
  }
}
