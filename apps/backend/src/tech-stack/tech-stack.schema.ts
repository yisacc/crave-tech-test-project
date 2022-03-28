import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';


@Schema({ timestamps: true, versionKey: false })
@ObjectType()
export class TechStackEntity {
  @Field()
  _id: string;
  @Prop({
    required: true,
    unique:true,
    index: true,
  })
  @Field()
  name: string;
}

export const TechStackDatabaseName = 'techStacks';
export const TechStackSchema = SchemaFactory.createForClass(TechStackEntity);

export type TechStackDocument = TechStackEntity & Document;


