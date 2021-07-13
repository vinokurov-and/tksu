import React from "react";
import Slider from "react-slick";
import { HelmetDatoCms } from "gatsby-source-datocms";
import Img from "gatsby-image";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import GrOne from "../components/Gr";
import GrVertical from "../components/GrVertical";

export default ({ data }) => {
  let dataset = { data: null };
  let Component = <></>;

  console.log(data);

  if (data.datoCmsWork && data.datoCmsWork.dataset) {
    const type = data.datoCmsWork.dataset.typeGr;
    console.log(type);
    if (type === "column") {
      Component = GrOne;
    } else if (type === "row") {
      Component = GrVertical;
    }

    dataset =
      data.datoCmsWork.dataset?.dataset &&
      JSON.parse(data.datoCmsWork.dataset?.dataset);

    console.log(JSON.stringify(dataset));
  }

  return (
    <Layout>
      <article className="sheet">
        <HelmetDatoCms seo={data.datoCmsWork.seoMetaTags} />
        <div className="sheet__inner">
          <h1 className="sheet__title">{data.datoCmsWork.title}</h1>
          <p className="sheet__lead">{data.datoCmsWork.excerpt}</p>
          <Component dataset={dataset} />
          <div className="sheet__slider">
            <Slider infinite={true} slidesToShow={2} arrows>
              {data.datoCmsWork.gallery.map(({ fluid }) => (
                <img
                  alt={data.datoCmsWork.title}
                  key={fluid.src}
                  src={fluid.src}
                />
              ))}
            </Slider>
          </div>
          <div
            className="sheet__body"
            dangerouslySetInnerHTML={{
              __html: data.datoCmsWork.descriptionNode.childMarkdownRemark.html,
            }}
          />
          {/* <div className="sheet__gallery">
            <Img fluid={data.datoCmsWork.coverImage.fluid} />
          </div> */}
        </div>
      </article>
    </Layout>
  );
};

export const query = graphql`
  query WorkQuery($slug: String!) {
    datoCmsWork(slug: { eq: $slug }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }

      title
      excerpt
      gallery {
        fluid(maxWidth: 200, imgixParams: { fm: "jpg", auto: "compress" }) {
          src
        }
      }
      dataset {
        name
        dataset
        typeGr
      }
      descriptionNode {
        childMarkdownRemark {
          html
        }
      }
      coverImage {
        url
        fluid(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
    }
  }
`;
