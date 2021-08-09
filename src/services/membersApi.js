export const getMembersList = async (uri) => {
  const responseJson = await doRequest(uri);
  return responseJson?.results[0].members;
}

export const getMemberDetails = async (uri) => {
  const responseJson = await doRequest(uri);
  return responseJson?.results[0];
}

const doRequest = async (uri) => {
  if(Boolean(uri)) {
    const response = await fetch(uri, {
      headers: new Headers({
        'X-API-Key': process.env.REACT_APP_MEMBERS_API_KEY,
      }),
    });

    const responseJson = await response.json();
    return responseJson;
  }
}
