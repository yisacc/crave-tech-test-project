import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { ProjectEntity } from '../projects/project.schema';


@Schema({ timestamps: true, versionKey: false })
@ObjectType()
export class BugEntity{
  @Field()
  _id: string;

  @Prop({
    required: true,
    unique:true,
    index: true,
  })
  @Field()
  title: string;

  @Prop({
    required: true,
    index: true,
  })
  @Field()
  description: string;

  @Prop({
    required:true,
    default:true,
    index: true,
  })
  @Field()
  status: boolean;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: ProjectEntity.name,
  })
  @Field(type=>ProjectEntity)
  project: Types.ObjectId;
}

export const BugDatabaseName = 'bugs';
export const BugSchema = SchemaFactory.createForClass(BugEntity);

export type BugDocument = BugEntity & Document;
