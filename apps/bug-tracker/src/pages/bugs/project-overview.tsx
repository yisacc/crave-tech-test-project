import { Card, Tag } from 'antd';
import './project-overview-style.scss'
import React from 'react';

const ProjectOverview=({project}:any)=>{
  let color =['magenta','lime','blue','geekblue','green','purple','cyan','green','']
  return(
  <div className="site-card-border-less-wrapper">
  <Card title={`Project: ${project?.name}`} bordered={false} >
    <h1>Tech-Stacks</h1>
    {project?.techStack.map((tech:any,index:number)=><Tag color={color[index<=color.length-1?index:0]} key={index}>{tech.name}</Tag>)}
    </Card>
  </div>
)
}

export default ProjectOverview;
