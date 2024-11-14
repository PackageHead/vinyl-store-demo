import { Test, TestingModule } from '@nestjs/testing';
import { VinylController } from './vinyl.controller';
import { VinylService } from './vinyl.service';

describe('VinylController', () => {
  let vinylController: VinylController;
  let vinylService: VinylService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VinylController],
      providers: [
        {
          provide: VinylService,
          useValue: {
            getPaginatedVinyl: jest
              .fn()
              .mockResolvedValue(['Vinyl 1', 'Vinyl 2']),
          },
        },
      ],
    }).compile();

    vinylController = module.get<VinylController>(VinylController);
    vinylService = module.get<VinylService>(VinylService);
  });

  it('should return list of vinyls', async () => {
    const result = await vinylController.getVinylList(1, 10);
    expect(result).toEqual(['Vinyl 1', 'Vinyl 2']);
  });
});
