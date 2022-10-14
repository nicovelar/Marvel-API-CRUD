import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//Heroes
import { HeroEntity } from './heroes/entities/hero.entity';
import { HeroesModule } from './heroes/heroes.module';
//DB
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ComicEntity } from './heroes/entities/comic.entity';
import { SumaryEntity } from './heroes/entities/sumary.entity';


@Module({
  imports: [HeroesModule,
     // Configuración de variables de entorno
    ConfigModule,
    
    ConfigModule.forRoot({
      envFilePath:`${process.cwd()}/src/enviroments/.${process.env.ENV}.env`,
      isGlobal: true,
    }),

    // Configuración para conexión con MongoDB a través de Mongoose
     MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('NOSQL_URI')
     })
    }),
   
     // Configuración para conexión con MySQL a través de TypeORM
     TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
      type: 'mysql',
      host: configService.get<string>('DB_HOST'),
      port: configService.get<number>('DB_PORT'),
      username: configService.get<string>('DB_USER'),
      password: configService.get<string>('DB_PASSWORD'),
      database: configService.get<string>('DB_DATABASE'),
      entities: [HeroEntity,ComicEntity,SumaryEntity],
      autoLoadEntities: true,
      synchronize: true,
      logging: process.env.SCOPE === 'production' ? false : true,
     })
    })
    ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
