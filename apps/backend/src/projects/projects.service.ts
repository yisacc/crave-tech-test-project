import { Injectable } from '@nestjs/common';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectDocument, ProjectEntity } from './project.schema';
import { TechStackEntity } from '../tech-stack/tech-stack.schema';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(ProjectEntity.name)
    private readonly projectModel: Model<ProjectDocument>
  ){}

  async create(createProjectInput: CreateProjectInput):Promise<ProjectEntity> {
    const create:ProjectDocument=new this.projectModel({
      name:createProjectInput.name,
      techStack:createProjectInput.techStack
    });
    return await create.save()
  }

  async findAll() {
    return await this.projectModel.find().populate({
      path:'techStack',
      model:TechStackEntity.name
    });
  }

  async findOne(id:String) {
    return await this.projectModel.findById(id).populate({
      path:'techStack',
      model:TechStackEntity.name
    });
  }

  async update({id,name,techStack}:UpdateProjectInput):Promise<ProjectDocument> {
    const project:ProjectDocument=await this.projectModel.findById(id)
    project.name=name;
    project.techStack=techStack;

return await project.save()
  }

  async remove(id: String):Promise<ProjectDocument> {
    return await this.projectModel.findByIdAndDelete(id);
  }
}
