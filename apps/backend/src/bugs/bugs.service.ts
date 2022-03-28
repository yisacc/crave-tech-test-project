import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BugDocument, BugEntity, BugSchema } from './bug.schema';
import { CreateBugInput } from './dto/create-bug.input';
import { ProjectEntity } from '../projects/project.schema';
import { UpdateBugInput } from './dto/update-bug.input';

@Injectable()
export class BugsService {
  constructor(
    @InjectModel(BugEntity.name)
    private readonly bugModel: Model<BugDocument>
  ){}

  async create(createBugInput: CreateBugInput):Promise<BugDocument> {
    const create:BugDocument=new this.bugModel({
      title:createBugInput.title,
      description:createBugInput.description,
      project:new Types.ObjectId(createBugInput.project)
    });
    return await create.save()
  }

  async findAll() {
    return await this.bugModel.find().populate({
      path:'project',
      model:ProjectEntity.name
    });
  }

  async findOne(id:String) {
    return await this.bugModel.findById(id).populate({
      path:'project',
      model:ProjectEntity.name
    });
  }
  async findByProjectId(id:String):Promise<BugDocument[]> {
    let ObjectId = require('mongoose').Types.ObjectId;
    return this.bugModel.find({project:new ObjectId(id)})
  }

  async update({id,title,description}:UpdateBugInput):Promise<BugDocument> {
    const bug:BugDocument=await this.bugModel.findById(id)
    bug.title=title;
    bug.description=description;
    return await bug.save()
  }

  async remove(id: String):Promise<BugDocument> {
    return await this.bugModel.findByIdAndDelete(id);
  }
}
