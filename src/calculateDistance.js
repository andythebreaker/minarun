function calculateDistance(input_gps_latitude_1, input_gps_longitude_1, input_gps_latitude_2, input_gps_longitude_2) {
    const earthRadius = 6371; // Radius of the Earth in kilometers
  
    // Convert latitude and longitude from degrees to radians
    const lat1 = degreesToRadians(input_gps_latitude_1);
    const lon1 = degreesToRadians(input_gps_longitude_1);
    const lat2 = degreesToRadians(input_gps_latitude_2);
    const lon2 = degreesToRadians(input_gps_longitude_2);
  
    // Haversine formula
    const dlat = lat2 - lat1;
    const dlon = lon2 - lon1;
    const a =
      Math.sin(dlat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;
  
    return distance;
  }
  
  function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
  }
  
  module.exports = calculateDistance;
  