import PontoRefrescamento from "@/@types/PontoRefrescamento";
import mapboxgl from "mapbox-gl";
import { useEffect, useState } from "react";

function useSetRefreshPoitMarker(map: mapboxgl.Map | null) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (loaded || !map) return;

    async function setRefreshPoints() {
      // const start = [13.2439512, -8.8272699],
      //   end = [13.373148, -8.9444];

      const res = await fetch("/api/pontos-refrescamento/");

      if (res.ok) {
        const pontos: PontoRefrescamento[] = await res.json();

        pontos.forEach((ponto) => {
          new mapboxgl.Marker()
            .setLngLat({ lat: ponto.coords.lat, lon: ponto.coords.lng })
            .addTo(map!);
        });
        setLoaded(true);
      }
    }

    setRefreshPoints();
  }, [map, loaded]);
}

export { useSetRefreshPoitMarker };
