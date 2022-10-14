import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SumaryMongo } from './sumary.schema';


export type ComicDocument = ComicMongo & Document;

@Schema()
export class ComicMongo {

  @Prop({ required: true })
    available: number;

  @Prop({ required: true , type: [] })
    items: [SumaryMongo]
    
}

export const ComicSchema = SchemaFactory.createForClass(ComicMongo);