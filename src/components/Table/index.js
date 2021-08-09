import React from 'react';
import { Table } from 'react-bootstrap';

import { useMembersContext } from '../../contexts/MembersContext';
import ListItem from '../ListItem';

export default () => {
  const {
    filteredMembers,
    setSelectedMemberForDetails,
    currentPage,
    membersPerPage
  } = useMembersContext();

  const startIndex = currentPage * membersPerPage;
  const endIndex = startIndex + membersPerPage;

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Twitter</th>
          <th>Facebook</th>
          <th>Youtube</th>
          <th>Party</th>
          <th>District/State</th>
          <th>Next Election</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        {
          filteredMembers.slice(startIndex, endIndex).map((member, index) => (
            <ListItem member={member} key={index} setSelectedMemberForDetails={setSelectedMemberForDetails} />
          ))
        }
      </tbody>
    </Table>
  );
};
