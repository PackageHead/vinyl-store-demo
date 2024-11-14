import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  HttpCode,
  HttpStatus,
  UseGuards,
  HttpException,
} from '@nestjs/common';
import { VinylService } from '../vinyl/vinyl.service';
import { CreateVinylDto } from '../vinyl/dto/create-vinyl.dto';
import { UpdateVinylDto } from '../vinyl/dto/update-vinyl.dto';
import { GoogleStrategy } from 'src/auth/google.strategy';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';

@Controller('admin')
@UseGuards(GoogleStrategy)
@Roles('admin')
export class AdminController {
  constructor(private readonly vinylService: VinylService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new vinyl record' })
  @ApiResponse({
    status: 201,
    description: 'Vinyl record successfully created',
  })
  async create(@Body() createVinylDto: CreateVinylDto) {
    try {
      const vinyl = await this.vinylService.createVinyl(createVinylDto);
      return {
        message: 'Vinyl record successfully created',
        vinyl,
      };
    } catch (error) {
      console.error('Error creating vinyl record:', error);
      throw new HttpException(
        'Error creating vinyl record',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update an existing vinyl record' })
  @ApiResponse({
    status: 200,
    description: 'Vinyl record successfully updated',
  })
  async update(
    @Param('id') id: string,
    @Body() updateVinylDto: UpdateVinylDto,
  ) {
    try {
      const updatedVinyl = await this.vinylService.updateVinyl(
        id,
        updateVinylDto,
      );
      return {
        message: 'Vinyl record successfully updated',
        updatedVinyl,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Error updating vinyl record',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a vinyl record' })
  @ApiResponse({
    status: 204,
    description: 'Vinyl record successfully deleted',
  })
  async delete(@Param('id') id: string) {
    try {
      await this.vinylService.removeVinyl(id);
      return { message: 'Vinyl record successfully deleted' };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Error deleting vinyl record',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
