import React, { createContext, useEffect, useState, useContext } from 'react';

import { useMembersReducer } from '../../reducers/MembersReducer';
import { setLoading, setMembers, setFilteredMembers, setCurrentPage, setSelectedSession } from '../../reducers/MembersReducer/actions';
import { getMembersCache } from '../../services/membersCache';

const HOUSE_MINIMUM_SESSION = 102;
const SENATE_MINIMUM_SESSION = 80;

const MembersContext = createContext({});

const MembersProvider = ({ children }) => {
  const [state, dispatch] = useMembersReducer();
  const {
    filteredMembers,
    membersPerPage,
    selectedChamber,
    selectedSession,
  } = state;

  const [minimumSession, setMinimumSession] = useState(SENATE_MINIMUM_SESSION);

  const calculateMinimumSession = () => {
    switch (selectedChamber) {
      case 'senate':
        return SENATE_MINIMUM_SESSION;
      case 'house':
        return HOUSE_MINIMUM_SESSION;
    }
  };

  const providerValue = {
    minimumSession,
    state,
    dispatch,
  };

  useEffect(() => {
    dispatch(setLoading(true));

    const url = `https://api.propublica.org/congress/v1/${selectedSession}/${selectedChamber}/members.json`;

    async function membersCache() {
      try {
        const responseMembers = await getMembersCache(url);
        dispatch(setMembers(responseMembers));
        dispatch(setFilteredMembers(responseMembers));
      } catch (error) {
        console.error(error.message);
        dispatch(setLoading(false));
      } finally {
        dispatch(setLoading(false));
        setMinimumSession(calculateMinimumSession());
      }
    }

    membersCache()
  }, [selectedChamber, selectedSession]);

  useEffect(() => {
    if (selectedChamber === 'house' && selectedSession < HOUSE_MINIMUM_SESSION)
      dispatch(setSelectedSession(HOUSE_MINIMUM_SESSION));
  }, [selectedChamber]);

  useEffect(() => {
    dispatch(setCurrentPage(0));
  }, [membersPerPage, filteredMembers]);

  return (
    <MembersContext.Provider value={providerValue}>
      {children}
    </MembersContext.Provider>
  );
};

const useMembersContext = () => useContext(MembersContext);

export { useMembersContext, MembersProvider, MembersContext };
