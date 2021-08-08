const BASE_URL = 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDOXsQI-gNk4QO29ZqxofPryaJU_cLmDWs'

export async function getAddressGeocodeLocation(address) {
  if(Boolean(address)) {
    const response = await fetch(`${BASE_URL}&address=${address}`)
    const responseJson = await response.json();
    return responseJson.results[0].geometry.location;
  }
}
