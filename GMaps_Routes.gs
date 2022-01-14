function testRoutes(){
  [
    //, () => gmapsRoute("38.723491, -9.139714","Tour Eiffel, Paris")
    , () => GMAPS_DISTANCE("38.723491, -9.139714","Tour Eiffel, Paris" , "transit")
    , () => GMAPS_TIME("38.723491, -9.139714","Tour Eiffel, Paris" , "transit")
    , () => GMAPS_TIME("38.723491, -9.139714","Tour Eiffel, Paris")
  ]
  .forEach(f=> console.log(f()));
}

/**
 * Get travel time on Google Maps.
 *
 * =GMAPS_TIME("Gran Via 1, Barcelona, Spain", "Puerta del Sol, Madrid, Spain", "driving")
 *
 * @param {String} origin Starting address
 * @param {String} destination Destination address
 * @param {String} mode Travel mode (driving, walking, bicycling, transit)
 * @return {String} Travel time in minutes
 * @customFunction
 */
function GMAPS_TIME (origin, destination, mode = "walking") {
  return CallWithCache(GMAPS_TIME_NC,[origin, destination, mode]);
}

function GMAPS_TIME_NC (origin, destination, mode = "walking") {
  var data = gmapsRoute(origin,destination,mode);
  const { legs: [{ duration: { text: time } } = {}] = [] } = data;
  return time;
}

/**
 * Get travel distance on Google Maps.
 *
 * =GMAPS_DISTANCE("Gran Via 1, Barcelona, Spain", "Puerta del Sol, Madrid, Spain", "driving")
 *
 * @param {String} origin Starting address
 * @param {String} destination Destination address
 * @param {String} mode Travel mode (driving, walking, bicycling, transit)
 * @return {String} Travel time in minutes
 * @customFunction
 */
function GMAPS_DISTANCE (origin, destination, mode = "walking") {
  return CallWithCache(GMAPS_DISTANCE_NC,[origin, destination, mode]);
}

function GMAPS_DISTANCE_NC (origin, destination, mode = "walking") {
    var data = gmapsRoute(origin,destination,mode);
  const { legs: [{ distance: { text: distance } } = {}] = [] } = data;
  return distance;
}

function gmapsRoute (origin, destination, mode = "walking") {
  var directions = Maps.newDirectionFinder()
    .setOrigin(origin)
    .setDestination(destination)
    .setMode(mode)
    .getDirections();
  //console.log(directions);
  const { routes: [data] = [] } = directions;
  //console.log(data);
  return data;
}
