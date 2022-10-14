import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { HeroDto } from './dto/HeroDto';

import { HeroesService } from './services/heroes.service';
import { HeroesMongoService } from './services/heroesMongo.service';

@Controller('heroes')
export class HeroesController {
  constructor(
    private readonly heroesService: HeroesService, 
    private readonly heroesMongoService: HeroesMongoService,
    ) {}

  @Post('nosql/:id')
  createNoSQL(@Param('id') id:number) {
    return this.heroesMongoService.create(id);
  }

  @Post('sql/:id')
  createSQL(@Param('id') id:number) {
   return this.heroesService.create(id);
  }

  @Get('/heroesMongo')
  async findAllMongo() {
    return this.heroesMongoService.findAll();
  }

  @Get('/heroesmysql')
  async findAllMySQL() {
    return this.heroesService.findAll();
  }

  @Patch('nosql/:id/:idApi')
  updateNoSQL(@Param('id') id: string , @Param('idApi') idApi:number) {
    return this.heroesMongoService.update(id,idApi);
  }

  @Patch('sql/:id/:idApi')
  updateSQL(@Param('id') id: number, @Param('idApi') idApi:number) {
    return this.heroesService.update(id, idApi);
  }

  @Delete('nosql/:id')
  removeNoSQL(@Param('id') id: string) {
    return this.heroesMongoService.delete(id);
  }

  @Delete('sql/:id')
  removeSQL(@Param('id') id: number) {
    return this.heroesService.remove(id);
  }

}
