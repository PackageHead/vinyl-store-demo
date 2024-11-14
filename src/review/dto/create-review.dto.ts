import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsInt,
  Min,
  Max,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({
    description: 'Comment of the review',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  comment: string;

  @ApiProperty({
    description: 'Score of the review (1 to 5)',
    type: Number,
    required: true,
    minimum: 1,
    maximum: 5,
  })
  @IsInt()
  @IsPositive()
  @Min(1)
  @Max(5)
  score: number;

  @ApiProperty({
    description: 'ID of the vinyl the review is for',
    type: Number,
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  vinylId: number;

  @ApiProperty({
    description: 'ID of the user who created the review',
    type: Number,
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  userId: number;
}
