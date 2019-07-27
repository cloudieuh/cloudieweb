import React from 'react'
import { Link } from 'gatsby'

import Image from './Image'
import './ProjectCard.css'

const ProjectCard = ({
  featuredImage,
  title,
  excerpt,
  slug,
  className = '',
  ...props
}) => (
  <Link to={slug} className={`ProjectCard ${className}`}>
    {featuredImage && (
      <div className="ProjectCard--Image relative">
        <Image background src={featuredImage} alt={title} />
      </div>
    )}
    <div className="ProjectCard--Content">
      {title && <h3 className="PostCard--Title">{title}</h3>}
      <div className="ProjectCard--Category">
        {/* {categories && categories.map(cat => cat.category).join(', ')} */}
      </div>
      {excerpt && <div className="ProjectCard--Excerpt">{excerpt}</div>}
    </div>
  </Link>
)

export default ProjectCard
