const API_KEY = process.env.REACT_APP_MEMBERS_API_KEY;

export const getMembersList = async (uri) => {
  if(Boolean(uri)) {
    const response = await fetch(uri, {
      headers: new Headers({
        'X-API-Key': API_KEY,
      }),
    });

    const responseJson = await response.json();
    return responseJson.results[0].members;
  }
}

export const getMemberDetails = async (uri) => {
  if(Boolean(uri)) {
    const response = await fetch(uri, {
      headers: new Headers({
        'X-API-Key': 'd0ywBucVrXRlMQhENZxRtL3O7NPgtou2mwnLARTr',
      }),
    });

    const responseJson = await response.json();
    return responseJson.results[0];
  }
}
