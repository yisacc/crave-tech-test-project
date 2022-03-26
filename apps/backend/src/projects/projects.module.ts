import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsResolver } from './projects.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION_NAME } from '../shared/database/database.constant';
import { ProjectDatabaseName, ProjectEntity, ProjectSchema } from './project.schema';

@Module({
  providers: [ProjectsResolver, ProjectsService],
  imports:[MongooseModule.forFeature(
    [
      {
        name: ProjectEntity.name,
        schema: ProjectSchema,
        collection: ProjectDatabaseName,
      },
    ],
    DATABASE_CONNECTION_NAME
  )]
})
export class ProjectsModule {}
