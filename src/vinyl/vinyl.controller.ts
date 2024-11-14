import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { VinylService } from './vinyl.service';
import { CreateVinylDto } from './dto/create-vinyl.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('vinyl')
export class VinylController {
  constructor(private readonly vinylService: VinylService) {}

  @Get()
  @ApiOperation({ summary: 'Get list of all vinyl records' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved vinyl list',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error while fetching vinyl list',
  })
  async getVinylList(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    try {
      return await this.vinylService.getPaginatedVinyl(page, pageSize);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to get vinyl list',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create a new vinyl record' })
  @ApiResponse({
    status: 201,
    description: 'Vinyl record successfully created',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, invalid vinyl data',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error while creating vinyl record',
  })
  async createVinyl(@Body() vinylData: CreateVinylDto) {
    try {
      return await this.vinylService.createVinyl(vinylData);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to create vinyl record',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
