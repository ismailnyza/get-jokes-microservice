import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type JokeDocument = Joke & Document;

@Schema()
export class Joke {
  @Prop()
  text: string;

  @Prop()
  type: string;

  @Prop({ default: 'pending' })
  status: string;

  @Prop()
  rejectionComment: string;
}

export const JokeSchema = SchemaFactory.createForClass(Joke);
