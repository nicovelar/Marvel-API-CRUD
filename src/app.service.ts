import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import { ComicEntity } from './heroes/entities/comic.entity';
import { ComicMongo } from './heroes/entities/comic.schema';
import { HeroEntity } from './heroes/entities/hero.entity';
import { HeroMongo } from './heroes/entities/hero.schema';
import { SumaryEntity } from './heroes/entities/sumary.entity';
import { SumaryMongo } from './heroes/entities/sumary.schema';

@Injectable()
export class AppService {
  ts = process.env.TS
  apikey = process.env.APIKEY
  hash = process.env.HASH

  async getAHeroAPINoSQL(id:number) {
    const result = await fetch(
      `https://gateway.marvel.com/v1/public/characters/${id}?ts=${this.ts}&apikey=${this.apikey}&hash=${this.hash}`
    )
    let heroe = await result.json();
    heroe = heroe.data.results[0]
    let hero = new HeroMongo
    hero.name = heroe.name
    hero.description = heroe.description
    hero.thumbnail = heroe.thumbnail
    hero.comics = new ComicMongo
    hero.comics.available = heroe.comics.available
     hero.comics.items = heroe.comics.items.map(item => {
       let sumary = new SumaryMongo
       sumary.name = item.name
        return sumary.name
     })
    return hero
  }

  async getAHeroAPISQL(id:number) {
    const result = await fetch(
      `https://gateway.marvel.com/v1/public/characters/${id}?ts=${this.ts}&apikey=${this.apikey}&hash=${this.hash}`
    )
    let heroe = await result.json();
    heroe = heroe.data.results[0]
  
    let hero = new HeroEntity
    hero.heroId = heroe.id
    hero.name = heroe.name
    hero.description = heroe.description
    hero.path = heroe.thumbnail.path
    hero.extension = heroe.thumbnail.extension

    let comic = new ComicEntity
    comic.available = heroe.comics.available
    comic.heroId = heroe.id

    let sumarys = []
   await heroe.comics.items.map((comic) => { 
      let sumary = new SumaryEntity
      sumary.heroId = heroe.id
      sumary.name = comic.name
      sumarys.push(sumary)
     })

     let character = {hero:hero, comic:comic, sumary:sumarys}

    return character
  }


}
