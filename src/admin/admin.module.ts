import { forwardRef, Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { ConfigModule } from '@nestjs/config';
import { VinylModule } from '../vinyl/vinyl.module';
import { AuthModule } from 'src/auth/auth.module';
import { GoogleStrategy } from 'src/auth/google.strategy';

@Module({
  imports: [VinylModule, ConfigModule, forwardRef(() => AuthModule)],
  providers: [AdminService, GoogleStrategy],
  controllers: [AdminController],
})
export class AdminModule {}
