import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AnswersService } from './answers.service';
import { AnswerEntity } from './answer.schema';
import { UpdateAnswerInput } from './dto/update-answer.input';
import { CreateAnswerInput } from './dto/create-answer.input';

@Resolver(() => AnswerEntity)
export class AnswersResolver {
  constructor(private readonly answersService: AnswersService) {}

  @Mutation(() => AnswerEntity)
  async createAnswer(
    @Args('createAnswerInput') createAnswerInput: CreateAnswerInput
  ):Promise<AnswerEntity> {
    return await this.answersService.create(createAnswerInput);
  }

  @Query(() => [AnswerEntity], { name: 'answers' })
  async findAll():Promise<AnswerEntity[]> {
    return await this.answersService.findAll();
  }

  @Query(() => AnswerEntity, { name: 'answer' })
  async findOne(@Args('id', { type: () => String }) id: string):Promise<AnswerEntity> {
    return await this.answersService.findOne(id);
  }

  @Mutation(() => AnswerEntity)
  async updateAnswer(
    @Args('updateAnswerInput') updateAnswerInput: UpdateAnswerInput
  ):Promise<AnswerEntity> {
    return await this.answersService.update(
      updateAnswerInput
    );
  }

  @Mutation(() => AnswerEntity)
  async removeAnswer(@Args('id', { type: () => String }) id: string):Promise<AnswerEntity> {
    return await this.answersService.remove(id);
  }
}
