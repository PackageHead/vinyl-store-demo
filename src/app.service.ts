import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as winston from 'winston';

@Injectable()
export class AppService {
  private readonly logger: winston.Logger;

  constructor(private configService: ConfigService) {
    const logLevel = this.configService.get<string>('LOG_LEVEL', 'info');

    this.logger = winston.createLogger({
      level: logLevel,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
          ),
        }),
        new winston.transports.File({ filename: 'app.log' }),
      ],
    });
  }

  logAction(action: string) {
    this.logger.info(action);
  }

  logError(error: Error) {
    this.logger.error(error.message, error);
  }
  getHello(): string {
    return 'Hello World!';
  }
}
