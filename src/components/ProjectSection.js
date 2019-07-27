import React from 'react'

import ProjectCard from '../components/ProjectCard'
import './ProjectSection.css'

class ProjectSection extends React.Component {
  static defaultProps = {
    projects: [],
    title: '',
    limit: 6,
    showLoadMore: true,
    loadMoreTitle: 'Load More',
    perPageLimit: 6
  }

  state = {
    limit: this.props.limit
  }

  increaseLimit = () =>
    this.setState(prevState => ({
      limit: prevState.limit + this.props.perPageLimit
    }))

  render() {
    const { projects, title, showLoadMore, loadMoreTitle } = this.props,
      { limit } = this.state,
      visibleProjects = projects.slice(0, limit || projects.length)

    return (
      <div className="ProjectSection">
        {title && <h2 className="ProjectSection--Title">{title}</h2>}
        {!!visibleProjects.length && (
          <div className="ProjectSection--Grid">
            {visibleProjects.map((project, index) => (
              <ProjectCard key={project.title + index} {...project} />
            ))}
          </div>
        )}
        {showLoadMore && visibleProjects.length < projects.length && (
          <div className="taCenter">
            <button className="button" onClick={this.increaseLimit}>
              {loadMoreTitle}
            </button>
          </div>
        )}
      </div>
    )
  }
}

export default ProjectSection
