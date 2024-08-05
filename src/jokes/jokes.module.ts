import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Joke, JokeSchema } from './schemas/joke.schema';
import { JokesService } from './jokes.service';
import { JokesController } from './jokes.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Joke.name, schema: JokeSchema }]),
  ],
  controllers: [JokesController],
  providers: [JokesService],
})
export class JokesModule {}
