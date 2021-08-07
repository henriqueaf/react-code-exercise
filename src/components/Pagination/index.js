import React from 'react';
import { Pagination, Form, Row, Col } from 'react-bootstrap';
import isNumber from 'lodash/isNumber';

export default ({ numberOfMembers, currentPage, setCurrentPage, membersPerPage, setMembersPerPage }) => {
  const pages = Math.ceil(numberOfMembers / membersPerPage);
  const pagesArray = [];

  for (let number = 0; number < pages; number++) {
    pagesArray.push(
      <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
        {number + 1}
      </Pagination.Item>
    );
  }

  return (
    <Row>
      <Col>
        <Pagination>
          {pagesArray}
        </Pagination>
      </Col>

      <Col sm={1}>
        <Form.Select value={membersPerPage} onChange={({ target: { value } }) => setMembersPerPage(value)}>
          <option>Select members per page</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </Form.Select>
      </Col>
    </Row>
  )
};
