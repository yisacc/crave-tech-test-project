import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types,Schema as MongooseSchema } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { TechStackEntity } from '../tech-stack/tech-stack.schema';


@Schema({ timestamps: true, versionKey: false })
@ObjectType()
export class ProjectEntity{
  @Field()
  _id: string;

  @Prop({
    required: true,
    unique:true,
    index: true,
  })
  @Field()
  name: string;

  @Prop({
    required: true,
    type: [MongooseSchema.Types.ObjectId],
    default:[],
    ref: TechStackEntity.name,
  })
  @Field(()=>[TechStackEntity] )
  techStack: MongooseSchema.Types.ObjectId[];
}

export const ProjectDatabaseName = 'projects';
export const ProjectSchema = SchemaFactory.createForClass(ProjectEntity);

export type ProjectDocument = ProjectEntity & Document;
