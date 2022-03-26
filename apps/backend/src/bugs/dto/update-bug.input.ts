import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { CreateBugInput } from './create-bug.input';

@InputType()
export class UpdateBugInput extends PartialType(CreateBugInput){
  @IsNotEmpty()
  @Field(() => String)
  id: string;
}
