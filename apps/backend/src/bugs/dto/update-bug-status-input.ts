import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateBugStatusInput {
  @IsNotEmpty()
  @Field(() => String)
  id: string;

  @Field()
  status: boolean
}
