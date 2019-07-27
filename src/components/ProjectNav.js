import React from 'react'

import BlogSearch from './BlogSearch'
import './ProjectNav.css'

const ProjectNav = ({ enableSearch }) => (
  <div className="PostCategoriesNav">
    
    {enableSearch && <BlogSearch />}
  </div>
)

export default ProjectNav
