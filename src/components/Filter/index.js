import React, { useEffect, useState, useRef } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import includes from 'lodash/includes';
import toLower from 'lodash/toLower';
import replace from 'lodash/replace';
import isString from 'lodash/isString';

export default ({ members, setFilteredMembers, session, setSession, chamber, setChamber, minimumSession }) => {
  const [party, setParty] = useState('');
  const nameInputRef = useRef();
  const partyInputRef = useRef();

  const removeStringSpaces = (text) => (
    replace(text, /\s/, '')
  )

  const filterMemberByFullname = (member, inputText) => {
    const memberFullName = removeStringSpaces(toLower(`${member.first_name}${member.last_name}${member.last_name}`));
    const searchText = removeStringSpaces(toLower(inputText));

    return includes(memberFullName, searchText);
  }

  const handleFilterNameChange = (membersToSearch) => {
    const inputText = nameInputRef.current.value;

    if (Boolean(inputText)) {
      return membersToSearch.filter((member) => filterMemberByFullname(member, inputText));
    }

    return membersToSearch;
  };

  const handleFilterPartyChange = (membersToSearch) => {
    const inputText = partyInputRef.current.value;
    setParty(inputText);

    if (inputText != '0') {
      return membersToSearch.filter((member) => member.party == inputText);
    }

    return membersToSearch;
  };

  const applyFilters = () => {
    let newMembers = handleFilterNameChange(members);
    newMembers = handleFilterPartyChange(newMembers);

    setFilteredMembers(newMembers);
  }

  const handleFilterFormReset = () => {
    setFilteredMembers(members);
  }

  const renderSessionsSelect = () => {
    const optionsArray = [];

    for (let number = minimumSession; number <= 117; number++) {
      optionsArray.push(
        <option key={number} value={number}>{number}</option>
      );
    }

    return (
      <Form.Select value={session} onChange={({ target: { value } }) => setSession(value)}>
        {optionsArray}
      </Form.Select>
    )
  }

  return (
    <div className="my-3">
      <Form onReset={handleFilterFormReset}>
        <Row>
          <Col>
            <Form.Control placeholder="Senator/Representative name" ref={nameInputRef} onChange={applyFilters} />
          </Col>

          <Col>
            <Form.Select ref={partyInputRef} value={party} onChange={applyFilters}>
              <option value={0}>Select party</option>
              <option value="R">R</option>
              <option value="D">D</option>
            </Form.Select>
          </Col>

          <Col className="text-start">
            <Button variant="primary" type="reset">
              Clear
            </Button>
          </Col>
        </Row>
      </Form>

      <Row className="mt-3">
        <Col sm={2}>
          <Form.Select value={chamber} onChange={({ target: { value } }) => setChamber(value)}>
            <option value="senate">senate</option>
            <option value="house">house</option>
          </Form.Select>
        </Col>

        <Col sm={1}>
          {renderSessionsSelect()}
        </Col>
      </Row>
    </div>
  );
};
