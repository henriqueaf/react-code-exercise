import React, { useEffect, useState } from 'react';
import { Form, FormGroup, Row, Col, Spinner, Table, Button } from 'react-bootstrap';
import includes from 'lodash/includes';
import toLower from 'lodash/toLower';
import replace from 'lodash/replace';
import './index.css';

import ListItem from '../ListItem';
import Pagination from '../Pagination';
import CongressImg from '../../images/congress.png';

const List = () => {
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);

  const [membersPerPage, setMembersPerPage] = useState(10);
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

  const removeStringSpaces = (text) => (
    replace(text, /\s/, '')
  )

  const filterMemberByFullname = (member, inputText) => {
    const memberFullName = removeStringSpaces(toLower(`${member.first_name}${member.last_name}${member.last_name}`));
    const searchText = removeStringSpaces(toLower(inputText));

    return includes(memberFullName, searchText);
  }

  const handleFilterTextChange = (event) => {
    const inputText = event.target.value;

    if (Boolean(inputText)) {
      const newArray = members.filter((member) => filterMemberByFullname(member, inputText));
      setFilteredMembers(newArray);
    } else {
      setFilteredMembers(members);
    }

    setCurrentPage(0);
  };

  const handleFilterFormReset = () => {
    setFilteredMembers(members);
  }

  const renderTable = () => (
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
        </tr>
      </thead>
      <tbody>
        {
          filteredMembers.slice(startIndex, endIndex).map((member, index) => (
            <ListItem member={member} key={index} />
          ))
        }
      </tbody>
    </Table>
  )

  return (
    <div className="list-container">
      <div className="my-3">
        <Form onReset={handleFilterFormReset}>
          <Row>
            <Col>
              <Form.Control placeholder="Senator/Representative name" onChange={handleFilterTextChange} />
            </Col>
            <Col className="text-start">
              <Button variant="primary" type="reset">
                Clear
              </Button>
            </Col>
          </Row>
        </Form>
      </div>

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
        />
      }
      {!loading && renderTable()}
    </div>
  );
};

export default List;
