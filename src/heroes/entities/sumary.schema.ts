import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SumaryDocument = SumaryMongo & Document;

@Schema()
export class SumaryMongo {

  @Prop({ required: true })
  name: string;

}

export const SumarySchema = SchemaFactory.createForClass(SumaryMongo);