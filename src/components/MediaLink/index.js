import React, { memo } from 'react';

const MediaLink = ({ type, account_name }) => {
  function getMediaLink() {
    switch (type) {
      case 'twitter':
        return `https://twitter.com/${account_name}`;
      case 'facebook':
        return `https://www.facebook.com/${account_name}`;
      case 'youtube':
        return `https://www.youtube.com/user/${account_name}`;
      default:
        return '';
    }
  }
  return (
    <a href={getMediaLink()} target="_blank" rel="noreferrer">
      {account_name}
    </a>
  );
};

export default memo(MediaLink);
