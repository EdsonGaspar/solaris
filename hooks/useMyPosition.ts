import mapboxgl from "mapbox-gl";
import { useEffect } from "react";

export function useMyPosition(
  map: mapboxgl.Map | null,
  setMyCoord: (lng: number, lat: number) => void
) {
  useEffect(() => {
    if (!map) return;

    // minha localização
    const myPos = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserHeading: true,
    });

    myPos.on("geolocate", (evt) => {
      setMyCoord(evt.coords.longitude, evt.coords.latitude);
    });

    map?.addControl(myPos);
  }, [map]);
}
