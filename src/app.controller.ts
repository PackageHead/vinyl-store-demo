import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get Hello message' })
  @ApiResponse({ status: 200, description: 'The hello message.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  getHello(): string {
    return this.appService.getHello();
  }
}
