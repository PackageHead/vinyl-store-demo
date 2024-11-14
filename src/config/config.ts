import { ConfigService } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';

export default () => ({
  LOG_LEVEL: 'info',
  port: '3000',
  JWT_SECRET: 'default-secret',
  BASE_URL: 'http://localhost:3000',
  FRONTEND_URL: 'http://localhost:3000',
  GOOGLE_CLIENT_ID:
    '967264246354-orv519f440qqj38fv6m1gb4ppdkn9irv.apps.googleusercontent.com',
  GOOGLE_CLIENT_SECRET: 'wadawd',
  GOOGLE_CALLBACK_URL: 'http://localhost:3000/auth/google/redirect',
  DISCOGS_API_KEY: 'api-key',
  STRIPE_SECRET_KEY: 'your-stripe-secret-key',
  STRIPE_PUBLIC_KEY: 'your-stripe-secret-key',
});
export const databaseConfig = (
  configService: ConfigService,
): SequelizeModuleOptions => ({
  dialect: 'mysql' as Dialect,
  host: configService.get<string>('MYSQLHOST'),
  port: parseInt(configService.get<string>('MYSQLPORT'), 10),
  username: configService.get<string>('MYSQLUSER'),
  password: configService.get<string>('MYSQLPASSWORD'),
  database: configService.get<string>('MYSQL_DATABASE'),
});
