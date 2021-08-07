import React, { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';

const CustomPagination = ({ numberOfMembers, currentPage, setCurrentPage, membersPerPage }) => {
  const pages = Math.ceil(numberOfMembers / membersPerPage);

  const renderPagination = (pages, currentPage) => {
    let pagesArray = [];

    for (let number = 0; number < pages; number++) {
      pagesArray.push(
        <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
          {number + 1}
        </Pagination.Item>
      );
    }

    return (
      <Pagination>
        {pagesArray}
      </Pagination>
    )
  }

  return renderPagination(pages, currentPage);
};

export default CustomPagination;
