import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('nosql/:id')
  getAHeroAPINoSQL(@Param('id') id:number) {
    return this.appService.getAHeroAPINoSQL(id);
  }

  @Get('sql/:id')
  getAHeroAPISQL(@Param('id') id:number) {
    return this.appService.getAHeroAPISQL(id);
  }
}
