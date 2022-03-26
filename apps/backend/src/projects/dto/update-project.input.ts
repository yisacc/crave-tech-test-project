import { CreateProjectInput } from './create-project.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateProjectInput extends PartialType(CreateProjectInput){
  @IsNotEmpty()
  @Field(() => String)
  id: string;
}
