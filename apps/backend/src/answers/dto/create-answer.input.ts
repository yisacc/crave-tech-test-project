import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateAnswerInput{
  @IsNotEmpty()
  @Field()
  answer:string

  @IsNotEmpty()
  @IsMongoId()
  @Field()
  bug: string;
}
