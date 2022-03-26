import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateBugInput{
  @IsNotEmpty()
  @Field()
  title:string

  @IsNotEmpty()
  @Field()
  description:string

  @IsNotEmpty()
  @IsMongoId()
  @Field()
  project: string;
}

