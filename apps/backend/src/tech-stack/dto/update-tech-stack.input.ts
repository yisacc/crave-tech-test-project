import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { CreateTechStackInput } from './create-tech-stack.input';

@InputType()
export class UpdateTechStackInput extends PartialType(CreateTechStackInput){
  @IsNotEmpty()
  @Field(() => String)
  id: string;
}
