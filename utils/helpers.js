import React, { useEffect, useState } from "react";
import NextImage from "next/image";
import { isUndefined, isEmpty } from "lodash";
import { getAttributesData } from "./utility";

const loadImage = (setImageDimensions, imageUrl) => {
  const img = new Image();
  img.src = imageUrl;

  img.onload = () => {
    setImageDimensions({
      height: img.height,
      width: img.width,
    });
  };
};

export function HtmlToStrapiImage(field) {
  const { src, alt, class: className, height, width } = field;

  const [imageDimensions, setImageDimensions] = useState({});
  const imageUrl = src;
  const DefaultDimensions = 100;

  useEffect(() => {
    if (isUndefined(height || width) || isEmpty(height || width))
      loadImage(setImageDimensions, imageUrl);
  }, [height, width, imageUrl]);

  return (
    <NextImage
      src={src}
      alt={alt || "Hfn Strapi Image"}
      className={className}
      height={imageDimensions.height || height || DefaultDimensions}
      width={imageDimensions.width || width || DefaultDimensions}
    />
  );
}

export function StrapiImage(field) {
  const attributes = getAttributesData(field, "attributes");

  if (!attributes) {
    return null;
  }
  const { name, url, alternativeText, height, width } = attributes;
  return (
    <NextImage
      priority
      src={url}
      alt={alternativeText || name}
      height={height}
      width={width}
    />
  );
}