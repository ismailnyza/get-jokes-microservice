import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JokesService } from './jokes.service';
import { Joke } from './schemas/joke.schema';

@Controller('jokes')
export class JokesController {
  constructor(private readonly jokesService: JokesService) {}

  /**
   * @swagger
   * /jokes:
   *   get:
   *     summary: Get a random joke
   *     tags: [Jokes]
   *     responses:
   *       200:
   *         description: A random joke
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 text:
   *                   type: string
   *                 type:
   *                   type: string
   *                 status:
   *                   type: string
   *                 rejectionComment:
   *                   type: string
   *       500:
   *         description: Failed to get joke
   */
  @Get()
  async getRandomJoke(): Promise<Joke> {
    try {
      return await this.jokesService.getRandomApprovedJoke();
    } catch (error) {
      throw new HttpException(
        'Failed to get joke',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * @swagger
   * /jokes/by-type:
   *   get:
   *     summary: Get a random joke by type
   *     tags: [Jokes]
   *     parameters:
   *       - in: query
   *         name: type
   *         schema:
   *           type: string
   *         required: true
   *         description: The type of the joke
   *     responses:
   *       200:
   *         description: A random joke of a specific type
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 text:
   *                   type: string
   *                 type:
   *                   type: string
   *                 status:
   *                   type: string
   *                 rejectionComment:
   *                   type: string
   *       404:
   *         description: No jokes of that type found
   *       500:
   *         description: Failed to get joke
   */
  @Get('by-type')
  async getRandomJokeByType(@Query('type') type: string): Promise<Joke> {
    try {
      return await this.jokesService.getRandomApprovedJokeByType(type);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
