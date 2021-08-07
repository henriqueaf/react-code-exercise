import React, { memo } from 'react';
import MediaLink from '../MediaLink';
import './index.css';

const ListItem = ({ member }) => {
  const {
    id,
    suffix,
    first_name,
    middle_name,
    last_name,
    twitter_account,
    facebook_account,
    youtube_account,
    party,
    state,
    next_election
  } = member;

  const fullName = () => {
    return `${suffix && ' ' || ''}${first_name}${middle_name && ' ' || ' '}${last_name}`;
  }

  return (
    <tr>
      <td>{id}</td>
      <td>{fullName()}</td>
      <td><MediaLink type="twitter" account_name={twitter_account} /></td>
      <td><MediaLink type="facebook" account_name={facebook_account} /></td>
      <td><MediaLink type="youtube" account_name={youtube_account} /></td>
      <td>{party}</td>
      <td>{state}</td>
      <td>{next_election}</td>
    </tr>
  );
};

export default memo(ListItem);
