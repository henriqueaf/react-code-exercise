import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import includes from 'lodash/includes';
import toLower from 'lodash/toLower';
import replace from 'lodash/replace';
import './index.css';

import Filter from '../Filter';
import Table from '../Table';
import ListItem from '../ListItem';
import Pagination from '../Pagination';
import CongressImg from '../../images/congress.png';

const HOUSE_MINIMUM_SESSION = 102;
const SENATE_MINIMUM_SESSION = 80;

export default () => {
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);

  const [membersPerPage, setMembersPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [chamber, setChamber] = useState('senate');
  const [session, setSession] = useState(115);
  const [minimumSession, setMinimumSession] = useState(SENATE_MINIMUM_SESSION);

  const startIndex = currentPage * membersPerPage;
  const endIndex = startIndex + membersPerPage;

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

  useEffect(() => {
    setLoading(true);

    fetch(`https://api.propublica.org/congress/v1/${session}/${chamber}/members.json`, {
      headers: new Headers({
        'X-API-Key': 'd0ywBucVrXRlMQhENZxRtL3O7NPgtou2mwnLARTr',
      }),
    })
      .then((res) => res.json())
      .then((json) => json.results[0].members)
      .then((responseMembers) => {
        console.log(responseMembers);
        setMembers(responseMembers);
        setFilteredMembers(responseMembers);
      })
      .catch(() => {
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
        setMinimumSession(calculateMinimumSession());
      });
  }, [chamber, session]);

  useEffect(() => {
    setCurrentPage(0);
  }, [membersPerPage, filteredMembers]);

  useEffect(() => {
    if (chamber === 'house' && session < HOUSE_MINIMUM_SESSION)
      setSession(HOUSE_MINIMUM_SESSION);
  }, [chamber]);

  return (
    <div className="list-container">
      <Filter
        members={members}
        setFilteredMembers={setFilteredMembers}
        chamber={chamber}
        setChamber={setChamber}
        session={session}
        setSession={setSession}
        minimumSession={minimumSession}
      />

      {loading && (
        <div className="loading-container">
          <img src={CongressImg} alt="Loading" className="loading" />
        </div>
      )}

      {!loading &&
        <Pagination
          numberOfMembers={filteredMembers.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          membersPerPage={membersPerPage}
          setMembersPerPage={setMembersPerPage}
        />
      }
      {!loading &&
        <Table
          filteredMembers={filteredMembers}
          startIndex={startIndex}
          endIndex={endIndex}
        />
      }
    </div>
  );
};
