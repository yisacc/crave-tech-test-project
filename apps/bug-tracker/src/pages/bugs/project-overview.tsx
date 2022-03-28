import { Card } from 'antd';
import './project-overview-style.scss'

const ProjectOverview=({project}:any)=>{
  return(
  <div className="site-card-border-less-wrapper">
  <Card title={`Project: ${project?.name}`} bordered={false} >
    <h1>Tech-Stacks</h1>
    <p>{project?.techStack?.name}</p>
    </Card>
  </div>
)
}

export default ProjectOverview;
