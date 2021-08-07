import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import includes from 'lodash/includes';
import toLower from 'lodash/toLower';
import replace from 'lodash/replace';;

export default ({ members, setFilteredMembers, setCurrentPage }) => {
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
    </div>
  );
};
