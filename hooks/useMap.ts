import mapboxgl from "mapbox-gl";
import { useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";

export function useMap(mapContainerID: string) {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (map) return; // initialize map only once
    const nav = new mapboxgl.NavigationControl({ visualizePitch: true });
    const mapBox = new mapboxgl.Map({
      container: mapContainerID,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [13.2439512, -8.8272699],
      zoom: 11,
    });
    mapBox.addControl(nav);
    setMap(mapBox);
  }, []);

  return { map };
}
