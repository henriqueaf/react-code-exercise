const BASE_URL = `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`

export async function getAddressGeocodeLocation(address) {
  if(Boolean(address)) {
    const response = await fetch(`${BASE_URL}&address=${address}`)
    const responseJson = await response.json();
    return responseJson.results[0].geometry.location;
  }
}
