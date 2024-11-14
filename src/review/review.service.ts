import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Review } from './review.model';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewService {
  constructor(@InjectModel(Review) private reviewModel: typeof Review) {}

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    return this.reviewModel.create(createReviewDto);
  }

  async findAll(): Promise<Review[]> {
    return this.reviewModel.findAll();
  }

  async findOne(id: string): Promise<Review> {
    return this.reviewModel.findByPk(id);
  }

  async update(id: string, updateReviewDto: UpdateReviewDto): Promise<Review> {
    const review = await this.reviewModel.findByPk(id);
    if (!review) {
      throw new Error('Review not found');
    }
    return review.update(updateReviewDto);
  }

  async remove(id: string): Promise<void> {
    const review = await this.reviewModel.findByPk(id);
    if (!review) {
      throw new Error('Review not found');
    }
    await review.destroy();
  }
}
