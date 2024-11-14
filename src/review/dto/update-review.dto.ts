import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsInt,
  Min,
  Max,
  IsOptional,
  IsPositive,
} from 'class-validator';

export class UpdateReviewDto {
  @ApiProperty({
    description: 'Comment of the review',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  comment?: string;

  @ApiProperty({
    description: 'Score of the review (1 to 5)',
    type: Number,
    required: false,
    minimum: 1,
    maximum: 5,
  })
  @IsInt()
  @IsOptional()
  @IsPositive()
  @Min(1)
  @Max(5)
  score?: number;

  @ApiProperty({
    description: 'ID of the vinyl the review is for',
    type: Number,
    required: false,
  })
  @IsInt()
  @IsOptional()
  vinylId?: number;

  @ApiProperty({
    description: 'ID of the user who created the review',
    type: Number,
    required: false,
  })
  @IsInt()
  @IsOptional()
  userId?: number;
}
