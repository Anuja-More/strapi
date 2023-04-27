import { useRouter } from "next/router";
import { getStrapiURL } from "../../utils/api";
import parse from "html-react-parser";
import Custom404 from "./404";
import Layout from "../componentes/layout/layout";

export default function ProductPage({ navData, footerData, pageData }) {
  const router = useRouter();
  const currentSlug = router.query.slug?.[0];
  console.log("currentSlug:", currentSlug);
  const currentPage = pageData.find(
    (page) => page.attributes.Slug === currentSlug
  );
  console.log("currentPage:", currentPage);

  if (!currentPage) {
    return <Custom404 />;
  }

  return (
    <Layout headerData={navData} footerData={footerData}>
      <div>{currentSlug}</div>
      <div>{currentPage.attributes.Title}</div>
      {currentPage.attributes.Content && (
        <div>{parse(currentPage.attributes.Content)}</div>
      )}
    </Layout>
  );
}



export async function getStaticPaths() {
  const pagesData = await fetch(
    "https://strapi-qa.heartfulness.org/api/smsfin-pages?locale=all",
    { timeout: 3000 } // 3 second timeout
).then((res) => res.json());
  const paths = pagesData.data.map((page) => ({
    params: { slug: [page.attributes.Slug] },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  try {
    const [navData, footerData, allPagesData] = await Promise.all([
      fetch(getStrapiURL("/api/smsfin-header?populate=deep")).then((res) =>
        res.json()
      ),
      fetch(getStrapiURL("/api/smsfin-footer?populate=deep")).then((res) =>
        res.json()
      ),
      fetch(
        getStrapiURL(
          `/api/smsfin-pages?populate=deep&filters[Slug][$eq]=${params.slug[0]}`
        )
      ).then((res) => res.json()),
    ]);

    return { props: { navData, footerData, pageData: allPagesData.data } };
  } catch (error) {
    console.error(error);
    return { props: { navData: null, footerData: null, pageData: null } };
  }
}
