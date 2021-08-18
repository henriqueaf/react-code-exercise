import React from 'react';
import { useMembersContext } from '../../contexts/MembersContext';

import Pagination from './index';

const Container = () => {
  const {
    state: {
      filteredMembers,
      membersPerPage,
      currentPage
    },
    dispatch
  } = useMembersContext();

  return (
    <Pagination
      filteredMembers={filteredMembers}
      membersPerPage={membersPerPage}
      currentPage={currentPage}
      dispatch={dispatch}
    />
  )
}

export default Container;
