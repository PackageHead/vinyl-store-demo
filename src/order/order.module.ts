import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ApiTags } from '@nestjs/swagger';
import { EmailModule } from '../email/email.module';
import { UserModule } from 'src/user/user.module';
import { ConfigModule } from '@nestjs/config';

@ApiTags('Orders')
@Module({
  imports: [EmailModule, UserModule, ConfigModule],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
