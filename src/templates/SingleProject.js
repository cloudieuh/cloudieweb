import React from 'react'
import { graphql } from 'gatsby'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import "./SingleProject.css"

import PageHeader from '../components/PageHeader'
import Content from '../components/Content.js'
import Layout from '../components/Layout.js'
import Gallery from '../components/Gallery'

export const SingleProjectTemplate = ({
    title,
    subtitle,
    featuredImage,
    body,
    section1,
    section2,
    section3,
    gallery1,
    gallery2
}) => (
    <main>
        <PageHeader 
            title={title}
            subtitle={subtitle}
            backgroundImage={featuredImage}
        />
        <Tabs>
            <TabList>
                <Tab>Home</Tab>
                <Tab>Project Content</Tab>
                <Tab>Activity Report</Tab>
            </TabList>
            <TabPanel>
                <section className="section">
                    <div className="container">
                        <Content source={section1} />
                    </div>
                </section>
            </TabPanel>
            <TabPanel>
                <section className="section">
                    <div className="container">
                        <Content source={section2} />
                    </div>
                </section>
                <section className="section">
                    <div className="container">
                        <Gallery images={gallery1} />
                    </div>
                </section>
            </TabPanel>
            <TabPanel>
                <section className="section">
                    <div className="container">
                        <Content source={section3} />
                    </div>
                </section>
                <section className="section">
                    <div className="container">
                        <Gallery images={gallery2} />
                    </div>
                </section>
            </TabPanel>
        </Tabs>
    </main>
)

const SingleProject = ({ data: { projects } }) => {
    
    return (
        <Layout
            meta={projects.frontmatter.meta || false}
            title={projects.frontmatter.title || false}
        >
            <SingleProjectTemplate 
                {...projects}
                {...projects.frontmatter}
            />
        </Layout>
    )
}

export default SingleProject

export const pageQuery = graphql`
    ## Query for SinglePost data
    ## Use GraphiQL interface (http://localhost:8000/___graphql)
    ## $id is processed via gatsby-node.js
    ## query name must be unique to this file
    query SingleProject($id: String!) {
    projects: markdownRemark(id: { eq: $id }) {
      ...Meta
      ...Gallery
      id
      frontmatter {
        title
        subtitle
        featuredImage
        section1
        section2
        section3
      }
    }
    }
`