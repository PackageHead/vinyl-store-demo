import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { VinylService } from '../vinyl/vinyl.service';
import { CreateVinylDto } from '../vinyl/dto/create-vinyl.dto';
import { UpdateVinylDto } from '../vinyl/dto/update-vinyl.dto';

describe('AdminService', () => {
  let adminService: AdminService;
  let vinylService: VinylService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminService,
        {
          provide: VinylService,
          useValue: {
            createVinyl: jest.fn(),
            updateVinyl: jest.fn(),
            removeVinyl: jest.fn(),
          },
        },
      ],
    }).compile();

    adminService = module.get<AdminService>(AdminService);
    vinylService = module.get<VinylService>(VinylService);
  });

  describe('create', () => {
    it('should create a vinyl record successfully', async () => {
      const createVinylDto: CreateVinylDto = {
        name: 'The Dark Side of the Moon',
        author: 'Pink Floyd',
        description: 'Classic rock album with iconic tracks.',
        price: 29.99,
      };

      const result = await adminService.create(createVinylDto);

      expect(result).toEqual(createVinylDto);
      expect(vinylService.createVinyl).toHaveBeenCalledWith(createVinylDto);
    });

    it('should throw an error if vinyl creation fails', async () => {
      const createVinylDto: CreateVinylDto = {
        name: 'The Dark Side of the Moon',
        author: 'Pink Floyd',
        description: 'Classic rock album with iconic tracks.',
        price: 29.99,
      };

      jest
        .spyOn(vinylService, 'createVinyl')
        .mockRejectedValueOnce(new Error('Creation error'));

      await expect(adminService.create(createVinylDto)).rejects.toThrow(
        'Error creating vinyl record: Creation error',
      );
    });
  });

  describe('update', () => {
    it('should update a vinyl record successfully', async () => {
      const id = '1';
      const updateVinylDto: UpdateVinylDto = {
        name: 'The Wall',
        author: 'Pink Floyd',
        description: 'Another classic album.',
        price: 35.99,
      };

      const result = await adminService.update(id, updateVinylDto);

      expect(result).toEqual(updateVinylDto);
      expect(vinylService.updateVinyl).toHaveBeenCalledWith(id, updateVinylDto);
    });

    it('should throw an error if vinyl update fails', async () => {
      const id = '1';
      const updateVinylDto: UpdateVinylDto = {
        name: 'The Wall',
        author: 'Pink Floyd',
        description: 'Another classic album.',
        price: 35.99,
      };

      jest
        .spyOn(vinylService, 'updateVinyl')
        .mockRejectedValueOnce(new Error('Update error'));

      await expect(adminService.update(id, updateVinylDto)).rejects.toThrow(
        'Error updating vinyl record: Update error',
      );
    });
  });

  describe('remove', () => {
    it('should remove a vinyl record successfully', async () => {
      const id = '1';

      jest
        .spyOn(vinylService, 'removeVinyl')
        .mockResolvedValueOnce({ message: 'Vinyl deleted' });

      const result = await adminService.remove(id);

      expect(result).toEqual({ message: 'Vinyl deleted' });
      expect(vinylService.removeVinyl).toHaveBeenCalledWith(id);
    });

    it('should throw an error if vinyl deletion fails', async () => {
      const id = '1';

      jest
        .spyOn(vinylService, 'removeVinyl')
        .mockRejectedValueOnce(new Error('Deletion error'));

      await expect(adminService.remove(id)).rejects.toThrow(
        'Error deleting vinyl record: Deletion error',
      );
    });
  });
});
