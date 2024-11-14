import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsNotEmpty,
  MinLength,
  Matches,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'First name of the user',
    type: String,
    example: 'John',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'First name must be a string.' })
  @IsNotEmpty({ message: 'First name cannot be empty.' })
  firstName?: string;

  @ApiProperty({
    description: 'Last name of the user',
    type: String,
    example: 'Doe',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Last name must be a string.' })
  @IsNotEmpty({ message: 'Last name cannot be empty.' })
  lastName?: string;

  @ApiProperty({
    description: 'Email address of the user',
    type: String,
    example: 'user@example.com',
    required: false,
  })
  @IsOptional()
  @IsEmail({}, { message: 'Please provide a valid email address.' })
  @IsNotEmpty({ message: 'Email cannot be empty.' })
  email?: string;

  @ApiProperty({
    description: 'Password for the user account',
    type: String,
    example: 'Password123!',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Password must be a string.' })
  @IsNotEmpty({ message: 'Password cannot be empty.' })
  @MinLength(8, { message: 'Password must be at least 8 characters long.' })
  @Matches(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter.',
  })
  @Matches(/[a-z]/, {
    message: 'Password must contain at least one lowercase letter.',
  })
  @Matches(/[0-9]/, { message: 'Password must contain at least one number.' })
  @Matches(/[\W_]/, {
    message: 'Password must contain at least one special character.',
  })
  password?: string;

  @ApiProperty({
    description: 'Avatar URL or file path for the user',
    type: String,
    example: 'https://example.com/avatar.jpg',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Avatar must be a string.' })
  avatar?: string;

  @ApiProperty({
    description: 'User ID for identifying the user',
    type: Number,
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'User ID must be a number.' })
  id?: number;
}
