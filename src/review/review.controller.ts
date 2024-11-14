import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Review } from './review.model';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new review' })
  @ApiResponse({
    status: 201,
    description: 'The review has been successfully created.',
    type: Review,
  })
  async create(@Body() createReviewDto: CreateReviewDto) {
    return await this.reviewService.create(createReviewDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing review' })
  @ApiResponse({
    status: 200,
    description: 'The review has been successfully updated.',
    type: Review,
  })
  async update(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return await this.reviewService.update(id, updateReviewDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a review' })
  @ApiResponse({
    status: 200,
    description: 'The review has been successfully deleted.',
    type: Review,
  })
  async remove(@Param('id') id: string) {
    return await this.reviewService.remove(id);
  }

  @Get('vinyl/:vinylId')
  @ApiOperation({ summary: 'Get reviews for a specific vinyl' })
  @ApiResponse({
    status: 200,
    description: 'The reviews for the vinyl have been successfully fetched.',
    type: Review,
  })
  async findByVinyl(@Param('vinylId') vinylId: string) {
    return await this.reviewService.findOne(vinylId);
  }
}
