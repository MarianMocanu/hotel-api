import { Controller, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDTO } from '../dtos/create-service.dto';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  createService(@Body() serviceData: CreateServiceDTO) {
    return this.servicesService.create(serviceData);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() createServiceDto: CreateServiceDTO) {
    return this.servicesService.update(id, createServiceDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.servicesService.delete(id);
  }
}
