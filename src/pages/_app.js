import "@/styles/globals.scss";
import Head from "next/head";
import "primereact/resources/themes/lara-light-indigo/theme.css";
// core
import "primereact/resources/primereact.min.css";
// icons
import "primeicons/primeicons.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "primereact/resources/primereact.min.css";      

export default function App({ Component, pageProps }) {
  return (
    <>
      {" "}
      <Head>
        {/* // Responsive meta tag */}

        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* // bootstrap CDN */}
      </Head>
      <Component {...pageProps} />
      
    </>
  );
}
