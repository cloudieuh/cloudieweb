import React from 'react'

import PostCard from '../components/PostCard'
import './PostSection.css'
import { Link } from 'gatsby';

class PostSection extends React.Component {
  static defaultProps = {
    posts: [],
    title: '',
    limit: 3,
    showLoadMore: true,
    loadMoreTitle: 'Load More',
    perPageLimit: 3
  }

  state = {
    limit: this.props.limit
  }

  increaseLimit = () =>
    this.setState(prevState => ({
      limit: prevState.limit + this.props.perPageLimit
    }))

  render() {
    const { posts, title, showLoadMore, loadMoreTitle } = this.props,
      { limit } = this.state,
      visiblePosts = posts.slice(0, limit || posts.length)

    return (
      <div className="PostSection">
        {title && <h2 className="PostSection--Title">{title}</h2>}
        {!!visiblePosts.length && (
          <div className="PostSection--Grid">
            {visiblePosts.map((post, index) => (
              <PostCard key={post.title + index} {...post} />
            ))}
          </div>
        )}
        {showLoadMore && visiblePosts.length < posts.length && (
          <div className="taCenter">
            <button className="button" onClick={this.increaseLimit}>
              {loadMoreTitle}
            </button>
            <h4 style={{margin: '1em'}}>OR</h4>
          </div>
        )}
          <div className="taCenter">
            <Link to='/blog'>
              <button style={{marginTop: '0em'}}>
                See All News
              </button>
            </Link>
          </div>
      </div>
    )
  }
}

export default PostSection
