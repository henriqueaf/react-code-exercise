import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const Map = withScriptjs(withGoogleMap(({lat, lng}) => {
  return (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={{ lat: lat, lng: lng }}
      options={{disableDefaultUI: true}}
    >
      <Marker position={{ lat: lat, lng: lng }} />
    </GoogleMap>
  )
}))

export default Map;
