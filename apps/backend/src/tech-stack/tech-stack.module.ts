import { Module } from '@nestjs/common';
import { TechStackService } from './tech-stack.service';
import { TechStackResolver } from './tech-stack.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { TechStackDatabaseName, TechStackEntity, TechStackSchema } from './tech-stack.schema';
import { DATABASE_CONNECTION_NAME } from '../shared/database/database.constant';

@Module({
  providers: [TechStackService, TechStackResolver],
  imports:[MongooseModule.forFeature(
    [
      {
        name: TechStackEntity.name,
        schema: TechStackSchema,
        collection: TechStackDatabaseName,
      },
    ],
    DATABASE_CONNECTION_NAME
  )]
})
export class TechStackModule {}
