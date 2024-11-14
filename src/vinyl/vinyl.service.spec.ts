import { Test, TestingModule } from '@nestjs/testing';
import { VinylService } from './vinyl.service';
import { getModelToken } from '@nestjs/sequelize';
import { Vinyl } from './vinyl.model';
import { CreateVinylDto } from './dto/create-vinyl.dto';
import { UpdateVinylDto } from './dto/update-vinyl.dto';

describe('VinylService', () => {
  let vinylService: VinylService;
  let vinylModelMock: any;

  beforeEach(async () => {
    vinylModelMock = {
      findAll: jest.fn(),
      create: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      destroy: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VinylService,
        {
          provide: getModelToken(Vinyl),
          useValue: vinylModelMock,
        },
      ],
    }).compile();

    vinylService = module.get<VinylService>(VinylService);
  });

  it('should be defined', () => {
    expect(vinylService).toBeDefined();
  });

  it('should create a vinyl record', async () => {
    const createVinylDto: CreateVinylDto = {
      name: 'Test Vinyl',
      author: 'Author',
      price: 10,
      description: 'Description',
    };
    vinylModelMock.create.mockResolvedValue(createVinylDto as any);

    const vinyl = await vinylService.createVinyl(createVinylDto);
    expect(vinyl).toEqual(createVinylDto);
  });

  it('should get all vinyl records', async () => {
    vinylModelMock.findAll.mockResolvedValue([{}]);

    const vinyls = await vinylService.getAllVinyl();
    expect(vinyls).toEqual([{}]);
  });

  it('should update a vinyl record', async () => {
    const updateVinylDto: UpdateVinylDto = { name: 'Updated Vinyl' };
    vinylModelMock.findOne.mockResolvedValue({
      update: jest.fn().mockResolvedValue(updateVinylDto),
    });

    const vinyl = await vinylService.updateVinyl('1', updateVinylDto);
    expect(vinyl.name).toBe('Updated Vinyl');
  });

  it('should throw an error if vinyl is not found', async () => {
    const updateVinylDto: UpdateVinylDto = { name: 'Updated Vinyl' };
    vinylModelMock.findOne.mockResolvedValue(null);

    await expect(
      vinylService.updateVinyl('1', updateVinylDto),
    ).rejects.toThrowError('Vinyl not found');
  });

  it('should remove a vinyl record', async () => {
    vinylModelMock.findOne.mockResolvedValue({
      destroy: jest.fn(),
    });

    await vinylService.removeVinyl('1');
    expect(vinylModelMock.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
  });
});
