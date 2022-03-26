import { Module } from '@nestjs/common';
import { CoreModule } from '../shared/core/core.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TechStackModule } from '../tech-stack/tech-stack.module';
import { ProjectsModule } from '../projects/projects.module';
import { BugsModule } from '../bugs/bugs.module';
import { AnswersModule } from '../answers/answers.module';


@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    CoreModule,
    TechStackModule,
    ProjectsModule,
    BugsModule,
    AnswersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
