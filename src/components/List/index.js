import React, { useContext, useEffect, useState, MouseEvent } from 'react';
import { FormGroup, Spinner, Table } from 'react-bootstrap';
import './index.css';

import ListItem from '../ListItem';
import CongressImg from '../../images/congress.png';

const List = () => {
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState([]);

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
      })
      .catch(() => {
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
          members.map((member, index) => (
            <ListItem member={member} key={index} />
          ))
        }
      </tbody>
    </Table>
  )

  return (
    <div className="list-container">
      {loading && (
        <div className="loading-container">
          <img src={CongressImg} alt="Loading" className="loading" />
        </div>
      )}

      {!loading && renderTable()}
    </div>
  );
};

export default List;
