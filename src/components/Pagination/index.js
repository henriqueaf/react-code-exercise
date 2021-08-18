import React, { memo } from 'react';
import { Pagination, Form, Row, Col } from 'react-bootstrap';
import isNumber from 'lodash/isNumber';

import { setMembersPerPage, setCurrentPage } from '../../reducers/MembersReducer/actions';

const CustomPagination = ({filteredMembers, membersPerPage, currentPage, dispatch}) => {
  const pages = Math.ceil(filteredMembers.length / membersPerPage);
  const pagesArray = [];

  for (let number = 0; number < pages; number++) {
    pagesArray.push(
      <Pagination.Item key={number} active={number === currentPage} onClick={() => dispatch(setCurrentPage(number))}>
        {number + 1}
      </Pagination.Item>
    );
  }

  return (
    <Row>
      <Col>
        <Pagination>
          <Pagination.First onClick={() => dispatch(setCurrentPage(0))} />
          <Pagination.Prev onClick={() => currentPage > 0 && dispatch(setCurrentPage(currentPage - 1))} />
          {pagesArray}
          <Pagination.Next onClick={() => currentPage < (pages - 1) && dispatch(setCurrentPage(currentPage + 1))} />
          <Pagination.Last onClick={() => dispatch(setCurrentPage(pages - 1))} />
        </Pagination>
      </Col>

      <Col sm={1}>
        <Form.Select value={membersPerPage} onChange={({ target: { value } }) => dispatch(setMembersPerPage(Number(value)))}>
          <option>Select members per page</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </Form.Select>
      </Col>
    </Row>
  )
};

export default memo(CustomPagination);
