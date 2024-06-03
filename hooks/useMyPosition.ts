import { useRef, useState } from "react";

export function useMyPosition() {
  const [coords, setCoords] = useState<{ lng: number; lat: number }>({
    lat: 0,
    lng: 0,
  });
  const myMarker = useRef<mapboxgl.Marker>();

  return { coords, setCoords, myMarker };
}
