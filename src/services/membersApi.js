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
    let response;

    try {
      response = await fetch(uri, {
        headers: new Headers({
          'X-API-Key': process.env.REACT_APP_MEMBERS_API_KEY,
        }),
      });
    } catch (error) {
      console.error(error);
      return null;
    }

    const responseJson = await response.json();
    return responseJson;
  }
}
