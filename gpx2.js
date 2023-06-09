const readline = require('readline');
const moment = require('moment');
const xmlbuilder = require('xmlbuilder');

function convertJsonToGpx(data) {
  const gpx = xmlbuilder.create('gpx', { version: '1.0', encoding: 'UTF-8' })
    .att('xmlns', 'http://www.topografix.com/GPX/1/1')
    .att('version', '1.1')
    .att('creator', 'Your Application');

  const gpxTrack = gpx.ele('trk');
  const gpxSegment = gpxTrack.ele('trkseg');

  data.forEach((item) => {
    const { latitude, longitude, altitude, heading, speed, timestamp } = item.coords;
    const timestampStr = item.timestamp;

    // Convert timestamp from string to Date object
    const parsedTimestamp = moment.utc(timestampStr, moment.ISO_8601).toDate();

    const gpxTrackpoint = gpxSegment.ele('trkpt', { lat: latitude, lon: longitude });
    gpxTrackpoint.ele('ele', {}, altitude);
    gpxTrackpoint.ele('time', {}, parsedTimestamp.toISOString());
    gpxTrackpoint.ele('course', {}, heading);
    gpxTrackpoint.ele('speed', {}, speed);
  });

  return gpx.end({ pretty: true });
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let json_data = '';

rl.on('line', (line) => {
  json_data += line;
});

rl.on('close', () => {
  try {
    // Parse JSON
    const data = JSON.parse(json_data);

    // Convert to GPX
    const gpxData = convertJsonToGpx(data);

    // Output GPX data to stdout
    process.stdout.write(gpxData);
  } catch (error) {
    console.log('Invalid JSON format');
  }
});
