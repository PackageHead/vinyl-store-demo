import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { VinylService } from './vinyl.service';
import { VinylController } from './vinyl.controller';
import { Vinyl } from './vinyl.model';
import { ConfigModule } from '@nestjs/config';
import { ReviewModule } from 'src/review/review.module';

@Module({
  imports: [SequelizeModule.forFeature([Vinyl]), ReviewModule, ConfigModule],
  providers: [VinylService],
  controllers: [VinylController],
  exports: [VinylService, SequelizeModule],
})
export class VinylModule {}
