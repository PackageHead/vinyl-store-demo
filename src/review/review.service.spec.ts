import { Test, TestingModule } from '@nestjs/testing';
import { ReviewService } from './review.service';
import { getModelToken } from '@nestjs/sequelize';
import { Review } from './review.model';
import { CreateReviewDto } from './dto/create-review.dto';

describe('ReviewService', () => {
  let reviewService: ReviewService;
  let reviewModelMock: any;

  beforeEach(async () => {
    reviewModelMock = {
      create: jest.fn(),
      findAll: jest.fn(),
      findByPk: jest.fn(),
      update: jest.fn(),
      destroy: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        {
          provide: getModelToken(Review),
          useValue: reviewModelMock,
        },
      ],
    }).compile();

    reviewService = module.get<ReviewService>(ReviewService);
  });

  it('should be defined', () => {
    expect(reviewService).toBeDefined();
  });

  it('should create a review', async () => {
    const createReviewDto: CreateReviewDto = {
      comment: 'Great album!',
      score: 1,
      vinylId: 1,
      userId: 1,
    };
    reviewModelMock.create.mockResolvedValue(createReviewDto as any);

    const review = await reviewService.create(createReviewDto);
    expect(review.comment).toBe('Great album!');
  });

  it('should get all reviews', async () => {
    reviewModelMock.findAll.mockResolvedValue([{}]);

    const reviews = await reviewService.findAll();
    expect(reviews).toEqual([{}]);
  });

  it('should get a review by id', async () => {
    const id = '1';
    reviewModelMock.findByPk.mockResolvedValue({ id });

    const review = await reviewService.findOne(id);
    expect(review.id).toBe(id);
  });

  it('should throw an error if review is not found', async () => {
    const id = '1';
    reviewModelMock.findByPk.mockResolvedValue(null);

    await expect(reviewService.findOne(id)).rejects.toThrowError(
      'Review not found',
    );
  });
});
