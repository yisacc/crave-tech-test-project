import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateProjectInput{
  @IsNotEmpty()
  @Field()
  name:string

  @IsNotEmpty()
  @IsMongoId()
  @Field()
  techStack: string;
}
