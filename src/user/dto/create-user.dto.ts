import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Email address of the user',
    type: String,
    example: 'user@example.com',
    required: true,
  })
  @IsEmail({}, { message: 'Please provide a valid email address.' })
  @IsNotEmpty({ message: 'Email is required.' })
  email: string;

  @ApiProperty({
    description: 'Password for the user account',
    type: String,
    example: 'Password123!',
    required: true,
  })
  @IsString({ message: 'Password must be a string.' })
  @IsNotEmpty({ message: 'Password is required.' })
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
  password: string;

  @ApiProperty({
    description: 'First name of the user',
    type: String,
    example: 'John',
    required: true,
  })
  @IsString({ message: 'First name must be a string.' })
  @IsNotEmpty({ message: 'First name is required.' })
  firstName: string;

  @ApiProperty({
    description: 'Last name of the user',
    type: String,
    example: 'Doe',
    required: true,
  })
  @IsString({ message: 'Last name must be a string.' })
  @IsNotEmpty({ message: 'Last name is required.' })
  lastName: string;
}
