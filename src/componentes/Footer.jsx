import React from 'react'
import parse from "html-react-parser";

const Footer = ({ footerData }) => {
  if (!footerData || !footerData.data || !footerData.data.attributes) {
    // handle the case where footerData is null or doesn't have the expected structure
    return <div>No footer data available</div>
  }
  return (
    <div>{parse(footerData.data.attributes.Description)}</div>
  )
}

export default Footer;
