import { includes, isEmpty } from "lodash";
import qs from "qs";

export function getStrapiURL(path) {
  return `${process.env.NEXT_PUBLIC_APP_STRAPI_URL}${path}`;
}

/**
 * Helper to make GET requests to Strapi API endpoints
 * @param {string} path Path of the API route
 * @param {Object} urlParamsObject URL params object, will be stringified
 * @param {RequestInit} options Options passed to fetch
 * @returns Parsed API call response
 */
export async function fetchAPI(path, urlParamsObject = {}, options = {}) {
  // Merge default and user options
  const mergedOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  };

  // Build request URL
  const queryString = qs.stringify(urlParamsObject);
  const requestUrl = `${getStrapiURL(
    `/api${path}${queryString ? `?${queryString}` : ""}`
    // for local sever
    // `/${path}${queryString ? `?${queryString}` : ""}`
  )}`;

  // console.log(queryString)
  // Trigger API call
  const response = await fetch(requestUrl, mergedOptions);
  // Hn,dle response

  let data = await response.json();
  if (!response.ok) {
    // console.error(response.statusText);
    // throw new Error(`An error occured please try again`)
    data = requestUrl;
    return null;
  }
  return data;
}

export async function fetchAPIWithUrl(path, options = {}) {
  // Merge default and user options
  const mergedOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  };

  // Build request URL

  const requestUrl = path;

  // console.log(queryString)
  // Trigger API call
  const response = await fetch(requestUrl, mergedOptions);
  // Hn,dle response

  let data = await response.json();
  if (!response.ok) {
    // console.error(response.statusText);
    // throw new Error(`An error occured please try again`)
    data = requestUrl;
    return null;
  }
  return data;
}

