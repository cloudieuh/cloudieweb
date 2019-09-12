import React from 'react'
import { graphql } from 'gatsby'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content'
import Layout from '../components/Layout'
import Gallery from '../components/Gallery'
// import SVGIcon from '../components/SVGIcon'

// Export Template for use in CMS preview
export const MemberPageTemplate = ({
  title,
  subtitle,
  featuredImage,
  section6,
  gallery5
}) => (
  <main className="MemberPage">
    <PageHeader
      title={title}
      subtitle={subtitle}
      backgroundImage={featuredImage}
    />

    <section className="section">
      <div className="container">
        <Content source={section6} />
        {/* <SVGIcon src="/images/calendar.svg" /> */}
      </div>
    </section>
    <section className="section">
      <div className="container">
        <Gallery images={gallery5} />
        {/* <SVGIcon src="/images/calendar.svg" /> */}
      </div>
    </section>
  </main>
)

const MemberPage = ({ data: { page } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <MemberPageTemplate {...page.frontmatter} body={page.html} />
  </Layout>
)
export default MemberPage

export const pageQuery = graphql`
  query MemberPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      ...Gallery
      html
      frontmatter {
        title
        subtitle
        featuredImage,
        section6
      }
    }
  }
`
