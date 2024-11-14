import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  Max,
  IsOptional,
} from 'class-validator';

export class UpdateVinylDto {
  @ApiProperty({
    description: 'Name of the vinyl record',
    type: String,
    example: 'The Dark Side of the Moon',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Name must be a string.' })
  @IsNotEmpty({ message: 'Name cannot be empty.' })
  name?: string;

  @ApiProperty({
    description: 'Author of the vinyl record',
    type: String,
    example: 'Pink Floyd',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Author must be a string.' })
  @IsNotEmpty({ message: 'Author cannot be empty.' })
  author?: string;

  @ApiProperty({
    description: 'Description of the vinyl record',
    type: String,
    example: 'Classic rock album with iconic tracks.',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Description must be a string.' })
  @IsNotEmpty({ message: 'Description cannot be empty.' })
  description?: string;

  @ApiProperty({
    description: 'Price of the vinyl record',
    type: Number,
    example: 29.99,
    minimum: 0,
    maximum: 100000,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Price must be a number.' })
  @Min(0, { message: 'Price cannot be negative.' })
  @Max(100000, { message: 'Price cannot be more than 100000.' })
  price?: number;
}
