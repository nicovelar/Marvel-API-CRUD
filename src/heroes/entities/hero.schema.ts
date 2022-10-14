import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ComicMongo } from './comic.schema';



export type HeroDocument = HeroMongo & Document;

@Schema()
export class HeroMongo {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true , type: {} })
  thumbnail: {
    path:string,
    extension:string 
  }

  @Prop({ required: true , type: {} })
    comics: ComicMongo
}

export const HeroSchema = SchemaFactory.createForClass(HeroMongo);