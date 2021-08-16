import { getMembersList } from './membersApi';

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
  const members = await getMembersList(url);

  if (members) {
    const data = {
      members,
      expiry: new Date().getTime() + ONE_DAY
    }

    localStorage.setItem(url, JSON.stringify(data));

    return members;
  }

  return [];
}
