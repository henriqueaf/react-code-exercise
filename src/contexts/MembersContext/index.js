import React, { createContext, useEffect, useState, useCallback, useContext } from 'react';
import { getMembersCache } from '../../services/membersCache';

const HOUSE_MINIMUM_SESSION = 102;
const SENATE_MINIMUM_SESSION = 80;

const MembersContext = createContext({});

const MembersProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [selectedMemberForDetails, setSelectedMemberForDetails] = useState(null);

  const [membersPerPage, setMembersPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [chamber, setChamber] = useState('senate');
  const [session, setSession] = useState(115);
  const [minimumSession, setMinimumSession] = useState(SENATE_MINIMUM_SESSION);

  const calculateMinimumSession = () => {
    switch (chamber) {
      case 'senate':
        return SENATE_MINIMUM_SESSION;
        break;
      case 'house':
        return HOUSE_MINIMUM_SESSION;
        break;
    }
  };

  const providerValue = {
    loading,
    members,
    filteredMembers,
    setFilteredMembers,
    selectedMemberForDetails,
    setSelectedMemberForDetails,
    membersPerPage,
    setMembersPerPage,
    currentPage,
    setCurrentPage,
    chamber,
    setChamber,
    session,
    setSession,
    minimumSession
  };

  useEffect(() => {
    setLoading(true);

    const url = `https://api.propublica.org/congress/v1/${session}/${chamber}/members.json`;

    async function membersCache() {
      try {
        const responseMembers = await getMembersCache(url);
        setMembers(responseMembers);
        setFilteredMembers(responseMembers);
      } catch (error) {
        console.error(error.message);
        setLoading(false);
      } finally {
        setLoading(false);
        setMinimumSession(calculateMinimumSession());
      }
    }

    membersCache()
  }, [chamber, session]);

  useEffect(() => {
    if (chamber === 'house' && session < HOUSE_MINIMUM_SESSION)
      setSession(HOUSE_MINIMUM_SESSION);
  }, [chamber]);

  useEffect(() => {
    setCurrentPage(0);
  }, [membersPerPage, filteredMembers]);

  return (
    <MembersContext.Provider value={providerValue}>
      {children}
    </MembersContext.Provider>
  );
};

const useMembersContext = () => useContext(MembersContext);

export { useMembersContext, MembersProvider };
