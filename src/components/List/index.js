import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import includes from 'lodash/includes';
import toLower from 'lodash/toLower';
import replace from 'lodash/replace';
import './index.css';

import Filter from '../Filter';
import Table from '../Table';
import ListItem from '../ListItem';
import Pagination from '../Pagination/container';
import DetailsModal from '../DetailsModal';
import CongressImg from '../../images/congress.png';
import { useMembersContext } from '../../contexts/MembersContext';
import { getMembersCache } from '../../services/membersCache';

export default () => {
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
