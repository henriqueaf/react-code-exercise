import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';

import { useMembersContext } from '../../contexts/MembersContext';
import { getAddressGeocodeLocation } from '../../services/googleGeocodeApi';
import { getMemberDetails } from '../../services/membersApi';
import { setSelectedMemberForDetails } from '../../reducers/MembersReducer/actions';
import Map from '../Map';

const DetailsModal = () => {
  const {
    state: {
      selectedMemberForDetails
    },
    dispatch
  } = useMembersContext();

  const [officeGeocode, setOfficeGeocode] = useState();
  const [memberDetails, setMemberDetails] = useState();

  useEffect(() => {
    if (Boolean(selectedMemberForDetails)) {
      async function getGeocode() {
        const geocode = await getAddressGeocodeLocation(selectedMemberForDetails.office);
        setOfficeGeocode(geocode);
      }

      async function getDetails() {
        const details = await getMemberDetails(selectedMemberForDetails.api_uri);
        setMemberDetails(details);
      }

      getGeocode();
      getDetails();
    }
  }, [selectedMemberForDetails]);

  const renderMembersDetails = () => (
    <>
      <ul className="list-unstyled">
        <li><h5><b>Roles:</b></h5>
        <hr/>
        <ul>
          {memberDetails.roles.map((role, index) => (
            <li key={index}>{role.title} => from <b>{role.start_date}</b> to <b>{role.end_date}</b></li>
          ))}
        </ul>
        </li>
      </ul>
    </>
  )

  const onModalHide = () => {
    setOfficeGeocode(null);
    setMemberDetails(null);
    dispatch(setSelectedMemberForDetails(null));
  }

  const renderMap = () => (
    <>
      <h5><b>Office:</b> {selectedMemberForDetails?.office}</h5>
      <hr/>
      <Map
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height: '400px' }} />}
        mapElement={<div style={{ height: '100%' }} />}
        lat={officeGeocode.lat}
        lng={officeGeocode.lng}
      />
    </>
  )

  return (
    <Modal size="lg" show={Boolean(selectedMemberForDetails)} onHide={onModalHide} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>{selectedMemberForDetails?.first_name} {selectedMemberForDetails?.last_name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {memberDetails && renderMembersDetails()}
        {officeGeocode && renderMap()}
      </Modal.Body>
    </Modal>
  );
};

export default DetailsModal;
