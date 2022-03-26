import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTechStack{
  @Field()
  name:string
}
