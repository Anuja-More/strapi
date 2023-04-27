import Head from 'next/head'
import fetch from 'isomorphic-unfetch';
import parse from "html-react-parser";
import styles from '@/styles/Home.module.scss'
import Layout from '@/componentes/layout/layout';
import { getStrapiURL } from '../../utils/api';

export default function Home({data, footerData, homeData}) {
  // console.log(homeData.data[0].attributes.Content)
  return (
    <>
      <Head>
        <title>Next strapi poc</title>
        <meta name="description" content="next and strapi application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout headerData={data} footerData={footerData}>
      <main className={styles.main}>
<div> <div>{parse(homeData.data[0].attributes.Content)}</div></div>
      </main>
      </Layout>
    </>
  )
}

export async function getServerSideProps() {
  const res = await fetch(getStrapiURL("/api/smsfin-header?populate=deep"))
  const data = await res.json();

  const home  = await fetch(
    getStrapiURL("/api/smsfin-pages?populate=deep&filters[Slug][$eq]=index")
  );
  const homeData = await home.json();
  const footerRes = await fetch(
    getStrapiURL("/api/smsfin-footer?populate=deep")
  );
 const footerData = await footerRes.json();
  return { props: { data, footerData, homeData } };
}
