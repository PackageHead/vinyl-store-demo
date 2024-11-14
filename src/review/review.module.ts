import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { Review } from './review.model';
import { UserModule } from 'src/user/user.module';
import { VinylModule } from 'src/vinyl/vinyl.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Review]),
    UserModule,
    forwardRef(() => VinylModule),
  ],
  providers: [ReviewService],
  controllers: [ReviewController],
  exports: [SequelizeModule],
})
export class ReviewModule {}
