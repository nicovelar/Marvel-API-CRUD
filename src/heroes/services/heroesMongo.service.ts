import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {  HeroDocument, HeroMongo } from '../entities/hero.schema';
import { AppService } from 'src/app.service';
import { response } from 'express';




@Injectable()
export class HeroesMongoService {
  constructor(@InjectModel(HeroMongo.name) private heroModel: Model<HeroDocument>,
  private readonly appService: AppService) {}

  //heroe
  async create(id:number)  {

    let hero = await this.appService.getAHeroAPINoSQL(id)
    .then((response) => {return response})
    const createdHero = new this.heroModel(hero);
    if((await this.heroModel.find().exec()).filter((value) => value.name == createdHero.name)[0] == null) {
      return createdHero.save();
    } else return 'El heroe que intentas crear ya está en la base de datos'
  }

  async findAll(): Promise<HeroDocument[]> {
    return this.heroModel.find().exec().then((response) => {return response});
  }

  async update(id: string, idApi: number) {
     let hero = await this.appService.getAHeroAPINoSQL(idApi)
     .then((response) => {return response});
     return this.heroModel.findByIdAndUpdate(id,hero).exec(); 
    }

  async delete(id: string) {
    return this.heroModel.findByIdAndRemove(id).exec();
  }
  
}
