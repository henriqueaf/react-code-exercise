const ONE_DAY = 1000 * 60 * 60 * 24;

const currentTime = () => {
  return Date.now();
}

export const getMembersCache = async (url) => {
  try {
    const data = JSON.parse(localStorage.getItem(url));

    if (data && data.expiry > currentTime()) {
      return data.members;
    }

    const members = await fetchAndSetMembersToCache(url);
    return members;
  }
  catch(e){
    console.error(e.message);
  }
}

const fetchAndSetMembersToCache = async (url) => {
  const response = await fetch(url, {
    headers: new Headers({
      'X-API-Key': 'd0ywBucVrXRlMQhENZxRtL3O7NPgtou2mwnLARTr',
    }),
  });

  const responseJson = await response.json();
  const members = responseJson.results[0].members;
  console.log('entrou no fetch:', members);

  const data = {
    members,
    expiry: new Date().getTime() + ONE_DAY
  }

  localStorage.setItem(url, JSON.stringify(data));

  return members;
}
