import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AnswerDocument, AnswerEntity } from './answer.schema';
import { CreateAnswerInput } from './dto/create-answer.input';
import { BugEntity } from '../bugs/bug.schema';
import { UpdateAnswerInput } from './dto/update-answer.input';

@Injectable()
export class AnswersService {
  constructor(
    @InjectModel(AnswerEntity.name)
    private readonly answerModel: Model<AnswerDocument>
  ){}

  async create(createAnswerInput: CreateAnswerInput):Promise<AnswerDocument> {
    const create:AnswerDocument=new this.answerModel({
      answer:createAnswerInput.answer,
      bug:new Types.ObjectId(createAnswerInput.bug)
    });
    return await create.save()
  }

  async findAll() {
    return await this.answerModel.find().populate({
      path:'bug',
      model:BugEntity.name
    });
  }

  async findOne(id:String) {
    return await this.answerModel.findById(id).populate({
      path:'bug',
      model:BugEntity.name
    });
  }

  async update({id,answer,bug}:UpdateAnswerInput):Promise<AnswerDocument> {
    const _answer:AnswerDocument=await this.answerModel.findById(id)
    _answer.answer=answer;
    _answer.bug=new Types.ObjectId(answer);

    return await _answer.save()
  }

  async remove(id: String):Promise<AnswerDocument> {
    return await this.answerModel.findByIdAndDelete(id);
  }
}
