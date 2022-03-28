import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BugEntity, BugSchema } from './bug.schema';
import { BugsService } from './bugs.service';
import { CreateBugInput } from './dto/create-bug.input';
import { UpdateBugInput } from './dto/update-bug.input';

@Resolver(() => BugEntity)
export class BugsResolver {
  constructor(private readonly bugsService: BugsService) {}

  @Mutation(() => BugEntity)
  async createBug(
    @Args('createBugInput') createBugInput: CreateBugInput
  ):Promise<BugEntity> {
    return await this.bugsService.create(createBugInput);
  }

  @Query(() => [BugEntity], { name: 'bugs' })
  async findAll():Promise<BugEntity[]> {
    return await this.bugsService.findAll();
  }

  @Query(() => BugEntity, { name: 'bug' })
  async findOne(@Args('id', { type: () => String }) id: string):Promise<BugEntity> {
    return await this.bugsService.findOne(id);
  }
  @Query(() => [BugEntity], { name: 'bugsByProjectId' })
  async findByProjectId(@Args('projectId', { type: () => String }) id: string):Promise<BugEntity[]> {
    return await this.bugsService.findByProjectId(id);
  }

  @Mutation(() => BugEntity)
  async updateBug(
    @Args('updateBugInput') updateBugInput: UpdateBugInput
  ):Promise<BugEntity> {
    return await this.bugsService.update(
      updateBugInput
    );
  }

  @Mutation(() => BugEntity)
  async removeBug(@Args('id', { type: () => String }) id: string):Promise<BugEntity> {
    return await this.bugsService.remove(id);
  }
}
