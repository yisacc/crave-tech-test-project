import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersResolver } from './answers.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION_NAME } from '../shared/database/database.constant';
import { AnswerDatabaseName, AnswerEntity, AnswerSchema } from './answer.schema';

@Module({
  providers: [AnswersResolver, AnswersService],
  imports:[MongooseModule.forFeature(
    [
      {
        name: AnswerEntity.name,
        schema: AnswerSchema,
        collection: AnswerDatabaseName,
      },
    ],
    DATABASE_CONNECTION_NAME
  )]
})
export class AnswersModule {}
