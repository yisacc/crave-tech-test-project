import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { CreateAnswerInput } from './create-answer.input';

@InputType()
export class UpdateAnswerInput extends PartialType(CreateAnswerInput){
  @IsNotEmpty()
  @Field(() => String)
  id: string;
}
