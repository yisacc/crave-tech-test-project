import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateTechStackInput{
  @IsNotEmpty()
  @Field()
  name:string
}
