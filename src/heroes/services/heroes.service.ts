import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppService } from 'src/app.service';
import { Repository } from 'typeorm';
import { HeroDto } from '../dto/HeroDto';
import { ComicEntity } from '../entities/comic.entity';
import { HeroEntity } from '../entities/hero.entity';
import { SumaryEntity } from '../entities/sumary.entity';

@Injectable()
export class HeroesService {

  constructor( 
  @InjectRepository(HeroEntity) private readonly heroRepository: Repository<HeroEntity>,
  @InjectRepository(ComicEntity) private readonly comicRepository: Repository<ComicEntity>,
  @InjectRepository(SumaryEntity) private readonly sumaryRepository: Repository<SumaryEntity>,
  private readonly appService: AppService ) {}

  async create(id:number) {
    if( (await this.heroRepository.find()).filter(hero => hero.heroId == id)[0] == null 
    &&  (await this.comicRepository.find()).filter(comic => comic.heroId == id)[0] == null
    &&  (await this.sumaryRepository.find()).filter(repository => repository.heroId == id)[0] == null ){
    let hero = await this.appService.getAHeroAPISQL(id)
    .then((response) => {return response})

    const createdHero = await this.heroRepository.create(hero.hero);
    const createdComic = await this.comicRepository.create(hero.comic);
    const createdSumary = await this.sumaryRepository.create(hero.sumary);

    this.heroRepository.save(createdHero)
    this.comicRepository.save(createdComic)
    this.sumaryRepository.save(createdSumary)

    let characterCreated = {hero:createdHero, comic:createdComic, sumary:createdSumary};

    return characterCreated;
    } else return 'El heroe que intentas crear ya está en la base de datos'
  }

  async findAll() {
 
    let heroes = []

      await this.heroRepository.find().then((response) => {

        response.map(async (character) => {
         let hero = new HeroEntity;

         hero.heroId = character.heroId,
           hero.name = character.name,
           hero.description = character.description,
           hero.path = character.path,
           hero.extension = character.extension;

         let comics: number[];
         comics = (await this.comicRepository.find()).filter(item => item.heroId === character.heroId).map((value) => value.available);

         let items: string[];
         items = (await this.sumaryRepository.find()).filter(item => item.heroId === character.heroId).map((value) => value.name);

         let characters = { hero: hero, comic: comics, sumary: items }
         
        heroes.push(characters)   
       })
      }) 
      
setTimeout(() => {
  console.log(heroes)
  return heroes
}, 300);

     }
  


  async update(id: number, idApi: number) {
    this.remove(id)
    return this.create(idApi)
  }

  async remove(id: number) {
    this.heroRepository.delete(id)
    let comicId = (await this.comicRepository.find()).filter(item => item.heroId == id).map(item => item.id)[0]
    let sumaryId = (await this.sumaryRepository.find()).filter(item => item.heroId == id).map(async item => await this.sumaryRepository.delete(item.id))
    setTimeout(() => {
     this.comicRepository.delete(comicId)
    }, 300);
  
  }

 
}
