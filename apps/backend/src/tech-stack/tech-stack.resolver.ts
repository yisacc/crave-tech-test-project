import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TechStackService } from './tech-stack.service';
import { TechStackEntity } from './tech-stack.schema';
import { CreateTechStackInput } from './dto/create-tech-stack.input';
import { UpdateTechStackInput } from './dto/update-tech-stack.input';

@Resolver(of => TechStackEntity)
export class TechStackResolver {
  constructor(private techStackService:TechStackService) {}

  @Query(returns => [TechStackEntity])
  techStacks(): Promise<TechStackEntity[]>{
    return this.techStackService.findAll()
  }

  @Mutation(returns => TechStackEntity)
  async createTechStack(@Args('createTechStackInput') createTechStackInput:CreateTechStackInput):Promise<TechStackEntity>{
    return await this.techStackService.create(createTechStackInput)
  }
  @Query(returns => TechStackEntity)
  async getTechStack(@Args('id',{type:()=>String}) id:string):Promise<TechStackEntity>{
  return await this.techStackService.findOne(id)
  }

  @Mutation(() => TechStackEntity)
  async updateProject(
    @Args('updateTechStackInput') updateTechStackInput: UpdateTechStackInput
  ):Promise<TechStackEntity> {
    return await this.techStackService.update(
      updateTechStackInput
    );
  }

  @Mutation(() => TechStackEntity)
  async removeProject(@Args('id', { type: () => String }) id: string):Promise<TechStackEntity> {
    return await this.techStackService.remove(id);
  }
}
