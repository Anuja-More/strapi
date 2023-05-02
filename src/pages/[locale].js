import { useRouter } from "next/router";
import { getStrapiURL } from "../../utils/api";
import parse from "html-react-parser";
import Custom404 from "./404";
import Layout from "../componentes/layout/layout";

export default function LocalePage({ navData, footerData, pageData, Locale }) {
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
    const paths =  [
            {params: { locale: 'en' }},
            {params: { locale:  'fr'}}
        ]
        return {
          paths,
          fallback: false
        }
  
  }
  


export async function getStaticProps({params:{locale}}) {
    try {
      const [navData, footerData, allPagesData] = await Promise.all([
        fetch(getStrapiURL(`/api/spiritualfound-header?populate=deep&locale=${locale}`, {
            timeout: 10000 // 10 seconds
          })).then((res) =>
          res.json()
        ),
        fetch(getStrapiURL(`/api/spiritualfound-footer?populate=deep&locale=${locale}`, {
            timeout: 10000 // 10 seconds
          })).then((res) =>
          res.json()
        ),
        fetch(
            `https://strapi-qa.heartfulness.org/api/spiritualfound-pages?populate=deep&filters[Slug][$eq]=index&locale=${locale}`
        ).then((res) => res.json()),
      ]);
      const Locale = locale
      return { props: { navData, footerData, pageData: allPagesData.data, Locale } };
      
    } catch (error) {
      console.error(error);
      return { props: { navData: null, footerData: null, pageData: null, Locale:null } };
    }
  }
  