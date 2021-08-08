import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { getAddressGeocodeLocation } from '../../services/googleGeocode';

import Map from '../Map';

const DetailsModal = ({ show, handleClose, member }) => {
  const [officeGeolocation, setOfficeGeolocation] = useState();

  useEffect(() => {
    if (Boolean(member?.office)) {
      async function getGeocode() {
        const geocode = await getAddressGeocodeLocation(member.office);
        setOfficeGeolocation(geocode);
      }

      getGeocode()
    }
  }, [member]);

  return (
    <Modal size="lg" show={show} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>{member?.first_name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          officeGeolocation &&
          <Map
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDOXsQI-gNk4QO29ZqxofPryaJU_cLmDWs"
            loadingElement={<div style={{ height: '100%' }} />}
            containerElement={<div style={{ height: '400px' }} />}
            mapElement={<div style={{ height: '100%' }} />}
            lat={officeGeolocation.lat}
            lng={officeGeolocation.lng}
          />
        }
      </Modal.Body>
    </Modal>
  );
};

export default DetailsModal;
