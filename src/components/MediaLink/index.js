import React, { memo } from 'react';

const MediaLink = ({ type, account_name }) => {
  function getMediaLink() {
    switch (type) {
      case 'twitter':
        return `https://twitter.com/${account_name}`;
        break;
      case 'facebook':
        return `https://www.facebook.com/${account_name}`;
        break;
      case 'youtube':
        return `https://www.youtube.com/user/${account_name}`;
        break;
      default:
        return '';
        break;
    }
  }
  return (
    <a href={getMediaLink()} target="_blank">
      {account_name}
    </a>
  );
};

export default memo(MediaLink);
