import React, {useContext} from 'react';
import { useMembersContext } from '../../contexts/MembersContext';

import Table from './index';

const Container = () => {
  const {
    state: {
      filteredMembers,
      currentPage,
      membersPerPage
    },
    dispatch
  } = useMembersContext();

  return (
    <Table
      filteredMembers={filteredMembers}
      membersPerPage={membersPerPage}
      currentPage={currentPage}
      dispatch={dispatch}
    />
  )
}

export default Container;
