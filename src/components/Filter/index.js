import React, { useEffect, useState, useRef, memo } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useParams, useRouteMatch }from 'react-router-dom';
import includes from 'lodash/includes';
import toLower from 'lodash/toLower';
import replace from 'lodash/replace';
import isString from 'lodash/isString';

import { setFilteredMembers, setSelectedChamber, setSelectedSession } from '../../reducers/MembersReducer/actions';
import { encrypt, decrypt } from '../../services/cryptoHelpers';

const Filter = ({members, selectedChamber, selectedSession, minimumSession, dispatch}) => {
  const routerMatch = useRouteMatch();

  const [party, setParty] = useState('');
  const [gender, setGender] = useState('');

  const nameInputRef = useRef();
  const partyInputRef = useRef();
  const genderInputRef = useRef();

  const { encryptedFilterParams } = useParams();

  useEffect(() => {
    if (encryptedFilterParams) {
      const decryptedJson = decrypt(decodeURIComponent(encryptedFilterParams));

      const {
        name: filterName,
        party: filterParty,
        gender: filterGender,
        chamber: filterChamber,
        session: filterSession
      } = decryptedJson;

      nameInputRef.current.value = filterName;
      // partyInputRef.current.value = filterParty;
      // genderInputRef.current.value = filterGender;

      applyFilters()
    }
  }, []);

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

  const handleFilterGenderChange = (membersToSearch) => {
    const inputText = genderInputRef.current.value;
    setGender(inputText);

    if (inputText != '0') {
      return membersToSearch.filter((member) => member.gender == inputText);
    }
    return membersToSearch;
  };

  const applyFilters = () => {
    let newMembers = handleFilterNameChange(members);
    newMembers = handleFilterPartyChange(newMembers);
    newMembers = handleFilterGenderChange(newMembers);

    dispatch(setFilteredMembers(newMembers));
  }

  const handleFormReset = () => {
    setParty(0);
    setGender(0);
    dispatch(setFilteredMembers(members));
  }

  const handleGenerateUrlClick = (event) => {
    event.preventDefault();

    const urlParams = {
      name: nameInputRef.current.value,
      party,
      gender,
      chamber: selectedChamber,
      session: selectedSession
    }

    const encryptedJson = encrypt(urlParams);
    const encodedJson = encodeURIComponent(encryptedJson);

    const { hostname, port } = new URL(window.location.href);
    navigator.clipboard.writeText(`${hostname}${port ? `:${port}` : ''}/${encodedJson}`);
  }

  const renderSessionsSelect = () => {
    const optionsArray = [];

    for (let number = minimumSession; number <= 117; number++) {
      optionsArray.push(
        <option key={number} value={number}>{number}</option>
      );
    }

    return (
      <Form.Select value={selectedSession} onChange={({ target: { value } }) => dispatch(setSelectedSession(value))}>
        {optionsArray}
      </Form.Select>
    )
  }

  return (
    <div className="my-3">
      <Form onReset={handleFormReset}>
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

          <Col>
            <Form.Select ref={genderInputRef} value={gender} onChange={applyFilters}>
              <option value={0}>Select gender</option>
              <option value="M">M</option>
              <option value="F">F</option>
            </Form.Select>
          </Col>

          <Col sm={1}>
            <Button variant="primary" type="reset">
              Clear
            </Button>
          </Col>
        </Row>
      </Form>

      <Row className="mt-3">
        <Col sm={2}>
          <Form.Select value={selectedChamber} onChange={({ target: { value } }) => dispatch(setSelectedChamber(value))}>
            <option value="senate">senate</option>
            <option value="house">house</option>
          </Form.Select>
        </Col>

        <Col sm={2}>
          {renderSessionsSelect()}
        </Col>

        <Col sm={2}>
          <Button variant="primary" type="button" onClick={handleGenerateUrlClick}>
            Generate URL
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default memo(Filter);
