import React from 'react'
import { graphql } from 'gatsby'
import { Location } from '@reach/router'
import qs from 'qs'

import PageHeader from '../components/PageHeader'
import ProjectSection from '../components/ProjectSection'
import ProjectNav from '../components/ProjectNav'
import Layout from '../components/Layout'

export const ProjectIndexTemplate = ({
    title,
    subtitle,
    featuredImage,
    projects = [],
    enableSearch = true,
}) => (
    <Location>
        {({ location }) => {
            let queryObj = location.search.replace('?', '')
            queryObj = qs.parse(queryObj)

            if (enableSearch && queryObj.s) {
                const searchTerm = queryObj.s.toLowerCase()
                projects = projects.filter(project => 
                    project.frontmatter.title.toLowerCase().includes(searchTerm)
                )
            }

            return (
                <main>
                    <PageHeader 
                        title={title}
                        subtitle={subtitle}
                        backgroundImage={featuredImage}
                    />

                    <section className="section thin">
                        <div className="container">
                            <ProjectNav enableSearch />
                        </div>
                    </section>

                    {!!projects.length && (
                        <section className="section thin">
                            <div className="container">
                                <ProjectSection projects={projects} />
                            </div>
                        </section>
                    )}
                </main>
            )
        }}
    </Location>
)

const ProjectIndex = ({ data: { page, projects } }) => (
    <Layout
        meta={page.frontmatter.meta || false}
        title={page.frontmatter.title || false}
    >
        <ProjectIndexTemplate 
            {...page}
            {...page.frontmatter}
            projects={projects.edges.map(project => ({
                ...project.node,
                ...project.node.frontmatter,
                ...project.node.fields
            }))}
        />
    </Layout>
)

export default ProjectIndex

export const pageQuery = graphql`
  ## Query for BlogIndex data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query ProjectIndex($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      frontmatter {
        title
        excerpt
        template
        subtitle
        featuredImage
      }
    }

    projects: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "projects" } } }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            featuredImage
          }
        }
      }
    }
  }
`