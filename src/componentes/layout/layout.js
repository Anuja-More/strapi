import Footer from "../footer"
import Header from "../Header"
export default  function Layout({children, headerData, footerData}){
return(
    <>
 <Header headerData={headerData}/>
    {children}
   <Footer footerData={footerData}/>
    </>
)
}