import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";

export async function getRoute(
  map: mapboxgl.Map | null,
  start: [number, number],
  end: [number, number]
) {
  // make a directions request using cycling profile
  // an arbitrary start will always be the same
  // only the end or destination will change
  const query = await fetch(
    `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
    { method: "GET" }
  );

  const json = await query.json();
  // console.log(json);

  const data = json.routes[0];

  const route = data.geometry.coordinates;
  const geojson = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: route,
    },
  };
  // if the route already exists on the map, we'll reset it using setData
  if (map?.getSource("route")) {
    (map.getSource("route") as any).setData(geojson);
  }
  // otherwise, we'll make a new request
  else {
    map?.addLayer({
      id: "route",
      type: "line",
      source: {
        type: "geojson",
        data: geojson as any,
      },
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#3887be",
        "line-width": 5,
        "line-opacity": 0.75,
      },
    });
  }
  console.log(data);

  return data;
  // add turn instructions here at the end
}

export function useDirection(
  token: string,
  map: mapboxgl.Map | null
  //   start?: [number, number],
  //   end?: [number, number]
) {
  const [tracking, setTracking] = useState<{
    start?: [number, number];
    end?: [number, number];
  }>({});
  const markers = useRef<{ from?: mapboxgl.Marker; to?: mapboxgl.Marker }>({});

  useEffect(() => {
    const { start, end } = tracking;

    if (!map || !start) return;

    map.on("load", () => {
      // make an initial directions request that
      // starts and ends at the same location
      getRoute(map, start, start);

      // Add starting point to the map
      map.addLayer({
        id: "point",
        type: "circle",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                properties: {},
                geometry: {
                  type: "Point",
                  coordinates: start,
                },
              },
            ],
          },
        },
        paint: {
          "circle-radius": 10,
          "circle-color": "#3887be",
        },
      });
      // this is where the code from the next step will go
    });
  }, [map, tracking]);

  return { setTracking, tracking };
}
