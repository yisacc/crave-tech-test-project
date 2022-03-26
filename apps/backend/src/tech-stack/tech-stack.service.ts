import { Injectable } from '@nestjs/common';
import { TechStackDocument, TechStackEntity } from './tech-stack.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTechStackInput } from './dto/create-tech-stack.input';
import { ProjectDocument } from '../projects/project.schema';
import { UpdateTechStackInput } from './dto/update-tech-stack.input';

@Injectable()
export class TechStackService {

  constructor(
    @InjectModel(TechStackEntity.name)
    private readonly techStackModel: Model<TechStackDocument>
  ){}

async findAll(): Promise<TechStackEntity[]>{
return await this.techStackModel.find();
}

async create(createTechStack:CreateTechStackInput):Promise<TechStackEntity>{
    const create:TechStackDocument=new this.techStackModel({
      name:createTechStack.name,
    });

    return await create.save()
}

async findOne(id):Promise<TechStackEntity>{
    return await this.techStackModel.findById(id)
}
  async update({id,name}:UpdateTechStackInput):Promise<TechStackDocument> {
    const techStack:TechStackDocument=await this.techStackModel.findById(id)
    techStack.name=name;
    return await techStack.save()
  }

  async remove(id: String):Promise<TechStackDocument> {
    return await this.techStackModel.findByIdAndDelete(id);
  }
}
