import React, {useContext} from 'react';
import { useMembersContext } from '../../contexts/MembersContext';

import Filter from './index';

const Container = () => {
  const {
    state: {
      members,
      selectedChamber,
      selectedSession,
    },
    dispatch,
    minimumSession
  } = useMembersContext();

  return (
    <Filter
      members={members}
      selectedChamber={selectedChamber}
      selectedSession={selectedSession}
      minimumSession={minimumSession}
      dispatch={dispatch}
    />
  )
}

export default Container;
