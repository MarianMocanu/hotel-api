import { Inject, Injectable } from '@nestjs/common';
import { ServiceDTO } from '../dtos/service.dto';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { Service } from 'src/schemas/service.schema';

@Injectable()
export class ServicesService {
  constructor(
    @Inject('SERVICE_MODEL')
    private serviceModel: Model<Service>,
  ) {}

  async getById(serviceId: string): Promise<Service> {
    try {
      return await this.serviceModel.findById(serviceId);
    } catch (error) {
      return error.message;
    }
  }

  async create(createServiceDTO: ServiceDTO): Promise<Service> {
    try {
      const createdService = await new this.serviceModel(createServiceDTO);
      return createdService.save();
    } catch (error) {
      return error.message;
    }
  }

  async update(id: string, createServiceDTO: ServiceDTO): Promise<Service> | null {
    try {
      const filter: FilterQuery<Service> = { _id: id };
      const update: UpdateQuery<Service> = createServiceDTO;
      const options = { new: true };

      const result = await this.serviceModel.findOneAndReplace(filter, update, options);
      return result;
    } catch (error) {
      return error.message;
    }
  }

  async delete(id: string): Promise<Service> {
    try {
      const response = await this.serviceModel.findByIdAndDelete(id).exec();
      return response;
    } catch (error) {
      return error.message;
    }
  }
}
