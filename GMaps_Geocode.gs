function testGeocode(){
  [
    , ()=> GMAPS_ADDRESS("Gran Via 1, Barcelona, Spain","country")
    , ()=> GMAPS_LATLONG("Gran Via 1, Barcelona, Spain")
  ]
  .forEach(f=> console.log(f()));
}

/**
 * Get the full address or an address component of a partial location or pair of coordinates (latitude, longitude) on Google Maps.
 *
 * =GMAPS_ADDRESS(partialAddress, part)
 *
 * @param {String} partialAddress Partial location, postcode or pair of latitude,longitude (e.g. "38.723491, -9.139714") to lookup
 * @param {String} part Address part to get, can be "country", "locality".
 * @return {String} Full formatted address.
 * @customFunction
 */
function GMAPS_ADDRESS (partialAddress, part = null) {
  return CallWithCache(GMAPS_ADDRESS_NC,[partialAddress,part]);
}

function GMAPS_ADDRESS_NC (partialAddress, part = null) {
  var res = Maps.newGeocoder().geocode(partialAddress);
  const { results: [data = {}] = [] } = res;

  console.log(data.address_components);

  if(!part){
    return data.formatted_address;
  }

  const [{ short_name, long_name } = {}] = data.address_components.filter(
    ({ types: [level] }) => {
      return level === part;
    }
  );
  return `${long_name} (${short_name})`;
}

/**
 * Get the coordinates (latitude, longitude) of a partial location on Google Maps.
 *
 * =GMAPS_LATLONG(partialAddress)
 *
 * @param {String} partialAddress Partial location, postcode or pair of latitude,longitude (e.g. "38.723491, -9.139714") to lookup
 * @return {String} Pair of latitude, longitude in the format "xx.xxx, yy.yyy".
 * @customFunction
 */
function GMAPS_LATLONG (partialAddress, part = null) {
  return CallWithCache(GMAPS_LATLONG_NC,[partialAddress,part]);
}
function GMAPS_LATLONG_NC (partialAddress, part = null) {
  var res = Maps.newGeocoder().geocode(partialAddress);
  const { results: [data = null] = [] } = res;
  console.log(data.address_components);

  const { geometry: { location: { lat, lng } } = {} } = data;
  return `${lat}, ${lng}`;

}
