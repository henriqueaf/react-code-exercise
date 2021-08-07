import React, { useEffect, useState } from 'react';
import { Form, FormGroup, Row, Col, Spinner, Button } from 'react-bootstrap';
import includes from 'lodash/includes';
import toLower from 'lodash/toLower';
import replace from 'lodash/replace';
import './index.css';

import Filter from '../Filter';
import Table from '../Table';
import ListItem from '../ListItem';
import Pagination from '../Pagination';
import CongressImg from '../../images/congress.png';

export default () => {
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);

  const [membersPerPage, setMembersPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);

  const startIndex = currentPage * membersPerPage;
  const endIndex = startIndex + membersPerPage;

  useEffect(() => {
    const session = 115; // 115th congressional session
    const chamber = 'senate'; // or 'house'

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
      });
  }, []);

  useEffect(() => {
    setCurrentPage(0);
  }, [membersPerPage, filteredMembers])

  return (
    <div className="list-container">
      <Filter members={members} setFilteredMembers={setFilteredMembers} />

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
