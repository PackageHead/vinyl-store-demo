import { Test, TestingModule } from '@nestjs/testing';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

describe('ReviewController', () => {
  let reviewController: ReviewController;
  let reviewService: ReviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewController],
      providers: [
        {
          provide: ReviewService,
          useValue: {
            create: jest
              .fn()
              .mockResolvedValue({ id: 1, comment: 'Great vinyl!' }),
          },
        },
      ],
    }).compile();

    reviewController = module.get<ReviewController>(ReviewController);
    reviewService = module.get<ReviewService>(ReviewService);
  });

  it('should create a review', async () => {
    const result = await reviewController.create({
      comment: 'Great vinyl!',
      score: 2,
      vinylId: 1,
      userId: 1,
    });
    expect(result).toEqual({ id: 1, comment: 'Great vinyl!' });
  });
});
