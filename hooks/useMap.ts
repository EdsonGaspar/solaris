import mapboxgl from "mapbox-gl";
import { useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";

export function useMap(mapContainerID: string) {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (map) return; // initialize map only once
    setMap(
      new mapboxgl.Map({
        container: mapContainerID,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [13.2439512, -8.8272699],
        zoom: 11,
      })
    );
  }, []);

  return { map };
}
