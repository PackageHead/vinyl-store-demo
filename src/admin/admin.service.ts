import { Injectable } from '@nestjs/common';
import { VinylService } from '../vinyl/vinyl.service';
import { CreateVinylDto } from '../vinyl/dto/create-vinyl.dto';
import { UpdateVinylDto } from '../vinyl/dto/update-vinyl.dto';

@Injectable()
export class AdminService {
  constructor(private readonly vinylService: VinylService) {}

  async create(createVinylDto: CreateVinylDto) {
    try {
      return await this.vinylService.createVinyl(createVinylDto);
    } catch (error) {
      throw new Error('Error creating vinyl record: ' + error.message);
    }
  }

  async update(id: string, updateVinylDto: UpdateVinylDto) {
    try {
      return await this.vinylService.updateVinyl(id, updateVinylDto);
    } catch (error) {
      throw new Error('Error updating vinyl record: ' + error.message);
    }
  }

  async remove(id: string) {
    try {
      return await this.vinylService.removeVinyl(id);
    } catch (error) {
      throw new Error('Error deleting vinyl record: ' + error.message);
    }
  }
}
