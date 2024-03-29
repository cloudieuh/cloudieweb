import React from 'react'
import { MapPin, Smartphone, Mail } from 'react-feather'
import { graphql } from 'gatsby'

import PageHeader from '../components/PageHeader'
// import FormSimpleAjax from '../components/FormSimpleAjax'
import Content from '../components/Content'
// import GoogleMap from '../components/GoogleMap'
import Layout from '../components/Layout'
import './ContactPage.css'
import Gallery from '../components/Gallery'

// Export Template for use in CMS preview
export const ContactPageTemplate = ({
  section4,
  gallery3,
  title,
  subtitle,
  featuredImage,
  address,
  phone,
  email,
}) => (
  <main className="Contact">
    <PageHeader
      title={title}
      subtitle={subtitle}
      backgroundImage={featuredImage}
    />
    <section className="section Contact--Section1">
      <div className="container Contact--Section1--Container">
        <div>
          <Content source={section4} />
          <Gallery images={gallery3} />
          <h3>Location</h3>
          <div className="Contact--Details">
            <div style={{justifySelf: 'center'}}>
            {address && (
              <a
                className="Contact--Details--Item"
                href={`https://www.google.com.au/maps/search/${encodeURI(
                  address
                )}`}
                target="_blank"
                rel="noopener noreferrer" 
              >
                <MapPin /> {address}
              </a>
            )}
            </div>
            <div style={{justifySelf: 'center'}}>
            {phone && (
              <a className="Contact--Details--Item" href={`tel:${phone}`}>
                <Smartphone/> {phone}
              </a>
            )}
            </div>
            <div style={{justifySelf: 'center'}}>
            {email && (
              <a className="Contact--Details--Item" href={`mailto:${email}`}>
                <Mail /> {email}
              </a>
            )}
            </div>
          </div>
        </div>

        
      </div>
    </section>
  </main>
)

const ContactPage = ({ data: { page } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <ContactPageTemplate {...page.frontmatter} body={page.html} />
  </Layout>
)

export default ContactPage

export const pageQuery = graphql`
  query ContactPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      ...Gallery
      html
      frontmatter {
        title
        template
        subtitle
        featuredImage
        address
        phone
        email
        section4
      }
    }
  }
`
