import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Joke, JokeDocument } from './schemas/joke.schema';

@Injectable()
export class JokesService {
  constructor(@InjectModel(Joke.name) private jokeModel: Model<JokeDocument>) {}

  async getAllApprovedJokes(): Promise<Joke[]> {
    return this.jokeModel.find({ status: 'approved' }).exec();
  }

  async getApprovedJokesByType(type: string): Promise<Joke[]> {
    return this.jokeModel.find({ status: 'approved', type }).exec();
  }

  async getRandomApprovedJoke(): Promise<Joke> {
    const jokes = await this.getAllApprovedJokes();
    const randomIndex = Math.floor(Math.random() * jokes.length);
    return jokes[randomIndex];
  }

  async getRandomApprovedJokeByType(type: string): Promise<Joke> {
    const jokes = await this.getApprovedJokesByType(type);
    if (jokes.length === 0) {
      throw new Error(`No approved jokes of type ${type} found`);
    }
    const randomIndex = Math.floor(Math.random() * jokes.length);
    return jokes[randomIndex];
  }
}
