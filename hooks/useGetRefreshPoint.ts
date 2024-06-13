import { useEffect, useState } from "react";
import PontoRefrescamento from "@/@types/PontoRefrescamento";

function useGetRefreshPoint() {
  const [id, setId] = useState<number>();
  const [pontos, setPontos] = useState<PontoRefrescamento[]>([]);

  useEffect(() => {
    async function points() {
      const res = await fetch(`/api/pontos-refrescamento/${id || ""}`);

      if (res.ok) {
        const datas = await res.json();
        const pontos: PontoRefrescamento[] = datas.map((data) => {
          return {
            ...data,
            coords: {
              lat: Number(data.coords.split(";")[1]),
              lng: Number(data.coords.split(";")[0]),
            },
            numero_actual_pessoas: 3,
          };
        });

        // console.log(pontos);

        setPontos(pontos);
      }
    }

    points();
  }, [id]);

  const setPointSelected = setId;
  return { setPointSelected, pontos };
}

export { useGetRefreshPoint };
