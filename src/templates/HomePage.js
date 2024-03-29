import React from 'react'
import { graphql } from 'gatsby'
import { Location } from '@reach/router'
import qs from 'qs'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content'
import PostSection from '../components/PostSection'
// import PostCategoriesNav from '../components/PostCategoriesNav'
import Layout from '../components/Layout'
import Gallery from '../components/Gallery'
/**
 * Filter posts by date. Feature dates will be fitered
 * When used, make sure you run a cronejob each day to show schaduled content. See docs
 *
 * @param {posts} object
 */
export const byDate = posts => {
  const now = Date.now()
  return posts.filter(post => Date.parse(post.date) <= now)
}

/**
 * filter posts by category.
 *
 * @param {posts} object
 * @param {title} string
 * @param {contentType} string
 */
export const byCategory = (posts, title, contentType) => {
  const isCategory = contentType === 'postCategories'
  const byCategory = post =>
    post.categories &&
    post.categories.filter(cat => cat.category === title).length
  return isCategory ? posts.filter(byCategory) : posts
}

// Export Template for use in CMS preview
export const HomePageTemplate = ({ 
  title, subtitle, featuredImage, body,
  posts = [],
  postCategories = [],
  enableSearch = true,
  contentType,
  section5,
  gallery4 
}) => (
  // <main className="Home">
  //   <PageHeader
  //     large
  //     title={title}
  //     subtitle={subtitle}
  //     backgroundImage={featuredImage}
  //   />

  //    <section className="section">
  //      <div className="container">
  //        <Content source={body} />
  //      </div>
  //    </section>
  //  </main>
  <Location>
    {({ location }) => {
      let filteredPosts =
        posts && !!posts.length
          ? byCategory(byDate(posts), title, contentType)
          : []

      let queryObj = location.search.replace('?', '')
      queryObj = qs.parse(queryObj)

      if (enableSearch && queryObj.s) {
        const searchTerm = queryObj.s.toLowerCase()
        filteredPosts = filteredPosts.filter(post =>
          post.frontmatter.title.toLowerCase().includes(searchTerm)
        )
      }

      return (
        <main className="Home">
          <PageHeader
            large
            title={title}
            subtitle={subtitle}
            backgroundImage={featuredImage}
          />
          <section className="section">
            <div className="container">
              <Content source={body} />
            </div>
          </section>

          <section className="section">
            <div className="container">
              <Content source={section5} />
            </div>
          </section>

          <section className="section">
            <div className="container">
              <Gallery images={gallery4}/>
            </div>
          </section>

          {/* {!!postCategories.length && (
            <section className="section thin">
              <div className="container">
                <PostCategoriesNav enableSearch categories={postCategories} />
              </div>
            </section>
          )} */}

          {!!posts.length && (
            <section className="section">
              <div className="container">
                <h2>News</h2>
                <PostSection posts={filteredPosts} />
              </div>
            </section>
          )}
        </main>
      )
    }}
  </Location>
  
)

// Export Default HomePage for front-end
const HomePage = ({ data: { page, posts, postCategories } }) => (
  <Layout meta={page.frontmatter.meta || false}>
    <HomePageTemplate 
    {...page} 
    {...page.frontmatter} body={page.html}
    posts={posts.edges.map(post => ({
      ...post.node,
      ...post.node.frontmatter,
      ...post.node.fields
    }))}
    postCategories={postCategories.edges.map(post => ({
      ...post.node,
      ...post.node.frontmatter,
      ...post.node.fields
    }))}
   />
  </Layout>
)

export default HomePage

export const pageQuery = graphql`
  ## Query for HomePage data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query HomePage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      ...Gallery
      html
      fields {
        contentType
      }
      frontmatter {
        title
        subtitle
        featuredImage,
        template,
        excerpt
        section5
      }
    }
    posts: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "posts" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            date
            categories {
              category
            }
            featuredImage
          }
        }
      }
    }
    postCategories: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "postCategories" } } }
      sort: { order: ASC, fields: [frontmatter___title] }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
