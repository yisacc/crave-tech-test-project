import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';


@Schema({ timestamps: true, versionKey: false })
@ObjectType()
export class AnswerEntity{
  @Prop({
    required: true,
    unique:true,
    index: true,
  })
  @Field()
  answer: string;

  // @Prop({
  //   required: true,
  //   type: Types.ObjectId,
  //   ref: BugEntity.name,
  // })
  // @Field(type=>BugEntity)
  // bug: Types.ObjectId;
}

export const AnswerDatabaseName = 'answers';
export const AnswerSchema = SchemaFactory.createForClass(AnswerEntity);

export type AnswerDocument = AnswerEntity & Document;
