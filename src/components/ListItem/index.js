import React, { memo } from 'react';
import MediaLink from '../MediaLink';

const ListItem = ({ member, setSelectedMemberForDetails }) => {
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
    district,
    state,
    next_election
  } = member;

  const fullName = () => (
    `${suffix? `${suffix} ` : ''}${first_name}${middle_name? `${middle_name} ` : ' '}${last_name}`
  );

  const districtAndState = () => (
    `${district? `${district}/` : ''}${state}`
  );

  const handleDetailsClick = (member) => (event) => {
    event.preventDefault();
    setSelectedMemberForDetails(member);
  }

  return (
    <tr>
      <td>{id}</td>
      <td>{fullName()}</td>
      <td><MediaLink type="twitter" account_name={twitter_account} /></td>
      <td><MediaLink type="facebook" account_name={facebook_account} /></td>
      <td><MediaLink type="youtube" account_name={youtube_account} /></td>
      <td>{party}</td>
      <td>{districtAndState()}</td>
      <td>{next_election}</td>
      <td><a href="#none" onClick={handleDetailsClick(member)}>Details</a></td>
    </tr>
  );
};

export default memo(ListItem);
