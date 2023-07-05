import sys
import json
from datetime import datetime
import gpxpy
import gpxpy.gpx

def convert_json_to_gpx(data):
    gpx = gpxpy.gpx.GPX()

    gpx_track = gpxpy.gpx.GPXTrack()
    gpx_segment = gpxpy.gpx.GPXTrackSegment()

    for item in data:
        latitude = item['coords']['latitude']
        longitude = item['coords']['longitude']
        ev=item['coords']['altitude']
        heading=item['coords']['heading']
        speed=item['coords']['speed']
        timestamp_str = item['timestamp']

        # Convert timestamp from string to datetime object
        timestamp = datetime.fromisoformat(timestamp_str.replace('Z', '+00:00'))

        gpx_trackpoint = gpxpy.gpx.GPXTrackPoint(latitude, longitude,elevation=ev, time=timestamp)
        gpx_trackpoint.course = heading
        gpx_trackpoint.speed = speed
        gpx_segment.points.append(gpx_trackpoint)
        
    gpx_track.segments.append(gpx_segment)
    gpx.tracks.append(gpx_track)

    return gpx.to_xml(version='1.0')

# Read JSON data from stdin
json_data = sys.stdin.read()

try:
    # Parse JSON
    data = json.loads(json_data)

    # Convert to GPX
    gpx_data = convert_json_to_gpx(data)

    # Output GPX data to stdout
    sys.stdout.write(gpx_data)
except json.JSONDecodeError:
    print("Invalid JSON format")
