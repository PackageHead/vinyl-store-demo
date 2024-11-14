import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, Min, Max } from 'class-validator';

export class CreateVinylDto {
  @ApiProperty({
    description: 'Name of the vinyl record',
    type: String,
    example: 'The Dark Side of the Moon',
    required: true,
  })
  @IsString({ message: 'Name must be a string.' })
  @IsNotEmpty({ message: 'Name is required.' })
  name: string;

  @ApiProperty({
    description: 'Author of the vinyl record',
    type: String,
    example: 'Pink Floyd',
    required: true,
  })
  @IsString({ message: 'Author must be a string.' })
  @IsNotEmpty({ message: 'Author is required.' })
  author: string;

  @ApiProperty({
    description: 'Description of the vinyl record',
    type: String,
    example: 'Classic rock album with iconic tracks.',
    required: true,
  })
  @IsString({ message: 'Description must be a string.' })
  @IsNotEmpty({ message: 'Description is required.' })
  description: string;

  @ApiProperty({
    description: 'Price of the vinyl record',
    type: Number,
    example: 29.99,
    minimum: 0,
    maximum: 100000,
    required: true,
  })
  @IsNumber({}, { message: 'Price must be a number.' })
  @IsNotEmpty({ message: 'Price is required.' })
  @Min(0, { message: 'Price cannot be negative.' })
  @Max(100000, { message: 'Price cannot be more than 100000.' })
  price: number;
}
