import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { CreateBugInput } from './create-bug.input';

@InputType()
export class UpdateBugInput{
  @IsNotEmpty()
  @Field(() => String)
  id: string;

  @IsNotEmpty()
  @Field()
  title:string

  @IsNotEmpty()
  @Field()
  description:string
}
