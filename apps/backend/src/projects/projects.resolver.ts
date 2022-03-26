import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProjectsService } from './projects.service';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { ProjectEntity } from './project.schema';

@Resolver(() => ProjectEntity)
export class ProjectsResolver {
  constructor(private readonly projectsService: ProjectsService) {}

  @Mutation(() => ProjectEntity)
  async createProject(
    @Args('createProjectInput') createProjectInput: CreateProjectInput
  ):Promise<ProjectEntity> {
    return await this.projectsService.create(createProjectInput);
  }

  @Query(() => [ProjectEntity], { name: 'projects' })
  async findAll():Promise<ProjectEntity[]> {
    return await this.projectsService.findAll();
  }

  @Query(() => ProjectEntity, { name: 'project' })
  async findOne(@Args('id', { type: () => String }) id: string):Promise<ProjectEntity> {
    return await this.projectsService.findOne(id);
  }

  @Mutation(() => ProjectEntity)
  async updateProject(
    @Args('updateProjectInput') updateProjectInput: UpdateProjectInput
  ):Promise<ProjectEntity> {
    return await this.projectsService.update(
      updateProjectInput
    );
  }

  @Mutation(() => ProjectEntity)
  async removeProject(@Args('id', { type: () => String }) id: string):Promise<ProjectEntity> {
    return await this.projectsService.remove(id);
  }
}
