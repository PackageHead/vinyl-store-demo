import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Vinyl } from './vinyl.model';
import { CreateVinylDto } from './dto/create-vinyl.dto';
import { UpdateVinylDto } from './dto/update-vinyl.dto';
import { Review } from 'src/review/review.model';

@Injectable()
export class VinylService {
  constructor(
    @InjectModel(Vinyl)
    private vinylRepository: typeof Vinyl,
  ) {}

  async getAllVinyl() {
    return await this.vinylRepository.findAll();
  }

  async createVinyl(vinylData: CreateVinylDto) {
    const vinyl = await this.vinylRepository.create(
      vinylData as Partial<Vinyl>,
    );
    return vinyl;
  }

  async getPaginatedVinyl(page: number, pageSize: number) {
    pageSize = parseInt(pageSize.toString(), 10);
    return await this.vinylRepository.findAll({
      offset: (page - 1) * pageSize,
      limit: pageSize,
      include: [
        {
          model: Review,
          limit: 1,
        },
      ],
      attributes: ['id', 'name', 'author', 'description', 'price'],
      group: ['Vinyl.id'],
    });
  }

  async updateVinyl(id: string, updateVinylDto: UpdateVinylDto) {
    const vinyl = await this.vinylRepository.findOne({ where: { id } });

    if (!vinyl) {
      throw new Error('Vinyl not found');
    }

    await vinyl.update(updateVinylDto);
    return vinyl;
  }

  async removeVinyl(id: string) {
    const vinyl = await this.vinylRepository.findOne({ where: { id } });

    if (!vinyl) {
      throw new Error('Vinyl not found');
    }

    await vinyl.destroy();
    return { message: 'Vinyl deleted' };
  }
}
