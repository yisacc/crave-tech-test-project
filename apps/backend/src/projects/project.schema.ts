import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { TechStackEntity } from '../tech-stack/tech-stack.schema';


@Schema({ timestamps: true, versionKey: false })
@ObjectType()
export class ProjectEntity{
  @Prop({
    required: true,
    unique:true,
    index: true,
  })
  @Field()
  name: string;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: TechStackEntity.name,
  })
  @Field(type=>TechStackEntity)
  techStack: Types.ObjectId;
}

export const ProjectDatabaseName = 'projects';
export const ProjectSchema = SchemaFactory.createForClass(ProjectEntity);

export type ProjectDocument = ProjectEntity & Document;
