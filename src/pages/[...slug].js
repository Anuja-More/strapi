import { useRouter } from "next/router";
import { getStrapiURL } from "../../utils/api";
import parse from "html-react-parser";
import Custom404 from "./404";
import Layout from "../componentes/layout/layout";

export default function ProductPage({ navData, footerData, pageData, Locale }) {
  console.log(Locale)
  const data ={navData,Locale}
  return (
    <>
     <Layout headerData={data} footerData={footerData}>
      {pageData?.[0]?.attributes?.Title && <div>{pageData[0].attributes.Title}</div>}
      {pageData?.[0]?.attributes?.Content && (
        <div>{parse(pageData[0].attributes.Content)}</div>
      )}
    </Layout>
    </>
  );
}



export const getStaticPaths = async () => {
  const response = await fetch(`https://strapi-qa.heartfulness.org/api/spiritualfound-pages?&locale=all`
  // , {
  //   timeout: 10000
  // }
  )
  const list = await response.json()
  const paths = list?.data?.map(page => {
    return { params: { slug: [page.attributes.locale, page.attributes.Slug] } }
  })
  return {
    paths,
    fallback: false
  }

}
export async function getStaticProps({ params }) {
  try {
    const [navData, footerData, allPagesData] = await Promise.all([
      fetch(getStrapiURL(`/api/spiritualfound-header?populate=deep&locale=en`)).then((res) =>
        res.json()
      ),
      fetch(getStrapiURL(`/api/spiritualfound-footer?populate=deep&locale=en`)).then((res) =>
        res.json()
      ),
      fetch(
        getStrapiURL(
          `/api/spiritualfound-pages?populate=deep&filters[Slug][$eq]=${params.slug[1]}&locale=${params.slug[0]}`
        )
      ).then((res) => res.json()),
    ]);
     const Locale = params.slug[0]
    return { props: { navData, footerData, pageData: allPagesData.data ,Locale } };
  } catch (error) {
    console.error(error);
    return { props: { navData: null, footerData: null, pageData: null, Locale:null } };
  }
}
