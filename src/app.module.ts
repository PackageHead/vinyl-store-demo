import { forwardRef, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { VinylModule } from './vinyl/vinyl.module';
import { OrderModule } from './order/order.module';
import { ReviewModule } from './review/review.module';
import { AdminModule } from './admin/admin.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { EmailService } from './email/email.service';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { ConfigModule } from './config/config.module';
import { RolesGuard } from './auth/roles.guard';
import { VinylService } from './vinyl/vinyl.service';
import { APP_GUARD } from '@nestjs/core';
import { ConfigService } from './config/config.service';
import { Review } from './review/review.model';
import { User } from './user/user.model';
import { Vinyl } from './vinyl/vinyl.model';

@Module({
  imports: [
    ConfigModule,
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        dialect: 'mysql',
        url: configService.get<string>('MYSQL_PUBLIC_URL'),
        host: configService.get<string>('MYSQLHOST'),
        port: configService.get<number>('MYSQLPORT', 3306),
        username: configService.get<string>('MYSQLUSER'),
        password: configService.get<string>('MYSQL_ROOT_PASSWORD'),
        database: configService.get<string>('MYSQL_DATABASE'),
        models: [User, Vinyl, Review],
        autoLoadModels: true,
        synchronize: true,
      }),
    }),
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
