export function getStrapiURL(path = "") {
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:8081"
    }${path}`;
}

// Helper to make GET requests to Strapi
export async function fetchAPI(path) {
  const requestUrl = getStrapiURL(path);
  const response = await fetch(requestUrl);
  const data = await response.json();
  if(data.statusCode === 403){
    console.log('incorrect permissions---->>>>', path, data);
    return [];
  } else {
    return data;
  }
}

//Helper to set Header for POST requests to Strapi
export async function requestHeader(method, postData) {
  let header = {
    method: method,
    headers: {
      "accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(postData)
  };
  return header;
}

//Helper to make POST requests to Strapi
export async function postAPI(path, postData) {
  const requestUrl = getStrapiURL(path);
  const header = await requestHeader('POST', postData)
  const response = await fetch(requestUrl, header);
  const data = await response.json();
  return data;
}
