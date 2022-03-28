import React from 'react';
import ProjectPage from '../pages/projects/projects';
import { Route,Routes } from 'react-router-dom';
import TechStackPage from '../pages/tech-stacks/tech-stacks';
import BugPage from '../pages/bugs/bugs';

const BugTrackerRoute=()=>{
  return(
    <>
    <Routes>
    <Route path="/" element={<ProjectPage />} />
    <Route path="/tech-stack" element={<TechStackPage />} />
    <Route path="/bugs" element={<BugPage />} />
    </Routes>
      </>
  )
}
export default BugTrackerRoute
