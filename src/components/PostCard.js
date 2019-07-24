import React from 'react'
import { Link } from 'gatsby'

import Image from './Image'
import Moment from 'moment'
import './PostCard.css'

const PostCard = ({
  featuredImage,
  title,
  date,
  excerpt,
  slug,
  categories = [],
  className = '',
  ...props
}) => (
  <Link to={slug} className={`PostCard ${className}`}>
    {featuredImage && (
      <div className="PostCard--Image relative">
        <Image background src={featuredImage} alt={title} />
      </div>
    )}
    <div className="PostCard--Content">
      {title && <h3 className="PostCard--Title">{title}</h3>}
      <div className="PostCard--Category">
        <span>{Moment(date).format('DD MMMM, YYYY')}</span>
        {/* {categories && categories.map(cat => cat.category).join(', ')} */}
      </div>
      {excerpt && <div className="PostCard--Excerpt">{excerpt}</div>}
    </div>
  </Link>
)

export default PostCard
