import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";

export function useDirection(
  token: string,
  map: mapboxgl.Map | null
  //   start?: [number, number],
  //   end?: [number, number]
) {
  const [tracking, setTracking] = useState<{
    start: [number, number];
    end: [number, number];
  }>();
  const markers = useRef<{ from?: mapboxgl.Marker; to?: mapboxgl.Marker }>({});

  useEffect(() => {
    if (!map || !tracking) return;

    const { start, end } = tracking;

    markers.current.from?.remove();
    markers.current.to?.remove();
    markers.current.from = new mapboxgl.Marker({}).setLngLat(start).addTo(map!);
    markers.current.to = new mapboxgl.Marker({}).setLngLat(end).addTo(map!);

    async function getDirection() {
      // const start = [13.2439512, -8.8272699],
      //   end = [13.373148, -8.9444];

      const res = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${start![0]},${
          start![1]
        };${end![0]},${
          end![1]
        }.json?geometries=geojson&steps=true&access_token=${token}`
      );

      if (res.ok) {
        const directions = await res.json();
        console.log(directions);
        const data = directions.routes[0];
        const route = data.geometry;

        map?.on("load", function () {
          map.addLayer({
            id: "route",
            type: "line",
            source: {
              type: "geojson",
              data: {
                type: "Feature",
                properties: {},
                geometry: {
                  type: "LineString",
                  coordinates: route,
                },
              },
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
        });
      }
    }

    // getDirection();
  }, [map, tracking]);

  return { setTracking };
}
