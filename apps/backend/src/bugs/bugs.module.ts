import { Module } from '@nestjs/common';
import { BugsService } from './bugs.service';
import { BugsResolver } from './bugs.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION_NAME } from '../shared/database/database.constant';
import { BugDatabaseName, BugEntity, BugSchema } from './bug.schema';

@Module({
  providers: [BugsResolver, BugsService],
  imports:[MongooseModule.forFeature(
    [
      {
        name: BugEntity.name,
        schema: BugSchema,
        collection: BugDatabaseName,
      },
    ],
    DATABASE_CONNECTION_NAME
  )]
})
export class BugsModule {}
