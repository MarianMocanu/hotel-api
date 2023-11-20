import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ServiceDocument = HydratedDocument<Service>;

@Schema()
export class Service {
  @Prop()
  title: string;

  @Prop()
  price: number;

  @Prop()
  descrption: number;

  @Prop()
  type: string;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
