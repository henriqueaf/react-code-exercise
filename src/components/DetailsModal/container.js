import React from 'react'

import { useMembersContext } from '../../contexts/MembersContext';
import DetailsModal from './index';

const Container = () => {
  const {
    state: {
      selectedMemberForDetails
    },
    dispatch
  } = useMembersContext();

  return (
    <DetailsModal
      selectedMemberForDetails={selectedMemberForDetails}
      dispatch={dispatch}
    />
  )
}

export default Container;
