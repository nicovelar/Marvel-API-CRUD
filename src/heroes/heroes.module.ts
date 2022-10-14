import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HeroesController } from './heroes.controller';
import { HeroMongo, HeroSchema } from './entities/hero.schema';
import { HeroesService } from './services/heroes.service';
import { AppService } from 'src/app.service';
import { HeroesMongoService } from './services/heroesMongo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComicMongo, ComicSchema } from './entities/comic.schema';
import { SumaryMongo, SumarySchema } from './entities/sumary.schema';
import { HeroEntity } from './entities/hero.entity';
import { ComicEntity } from './entities/comic.entity';
import { SumaryEntity } from './entities/sumary.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([HeroEntity]),
    MongooseModule.forFeature([{name: HeroMongo.name, schema: HeroSchema}]),

    TypeOrmModule.forFeature([ComicEntity]),
    MongooseModule.forFeature([{name: ComicMongo.name, schema: ComicSchema}]),

    TypeOrmModule.forFeature([SumaryEntity]),
    MongooseModule.forFeature([{name: SumaryMongo.name, schema: SumarySchema}])
  ],
  controllers: [HeroesController],
  providers: [AppService,HeroesService,HeroesMongoService]
})
export class HeroesModule {}
