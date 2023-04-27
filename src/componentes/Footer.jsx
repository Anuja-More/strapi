import React from 'react'
import parse from "html-react-parser";
const Footer = ({footerData}) => {
  return (
    <div>{parse(footerData?.data?.attributes?.Description)}</div>
  )
}
export default Footer;