import { forwardRef, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { VinylModule } from './vinyl/vinyl.module';
import { OrderModule } from './order/order.module';
import { ReviewModule } from './review/review.module';
import { AdminModule } from './admin/admin.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/user.model';
import { Vinyl } from './vinyl/vinyl.model';
import { EmailService } from './email/email.service';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { ConfigModule } from './config/config.module';
import { RolesGuard } from './auth/roles.guard';
import { VinylService } from './vinyl/vinyl.service';
import { APP_GUARD } from '@nestjs/core';
import { Review } from './review/review.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'my_user',
      password: 'password',
      database: 'my_project_db',
      models: [User, Vinyl, Review],
      autoLoadModels: true,
      synchronize: true,
    }),
    ConfigModule,
    UserModule,
    VinylModule,
    OrderModule,
    ReviewModule,
    AdminModule,
    forwardRef(() => AuthModule),
    EmailModule,
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    EmailService,
    VinylService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
