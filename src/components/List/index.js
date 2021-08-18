import React from 'react';
import './index.css';

import Filter from '../Filter/container';
import Table from '../Table/container';
import Pagination from '../Pagination/container';
import DetailsModal from '../DetailsModal/container';
import CongressImg from '../../images/congress.png';
import { useMembersContext } from '../../contexts/MembersContext';

const List = () => {
  const {
    state: {
      loading
    }
  } = useMembersContext();

  return (
    <div className="list-container">
      <DetailsModal />
      <Filter />

      {loading && (
        <div className="loading-container">
          <img src={CongressImg} alt="Loading" className="loading" />
        </div>
      )}

      {!loading && <Pagination/>}
      {!loading && <Table/>}
    </div>
  );
};

export default List;
