import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import includes from 'lodash/includes';
import toLower from 'lodash/toLower';
import replace from 'lodash/replace';

export default ({ members, setFilteredMembers, session, setSession, chamber, setChamber, minimumSession }) => {
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
  };

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
            <Form.Control placeholder="Senator/Representative name" onChange={handleFilterTextChange} />
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
