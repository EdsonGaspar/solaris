import { useEffect, useState } from "react";
import PontoRefrescamento from "@/@types/PontoRefrescamento";

function useGetRefreshPoint() {
  const [id, setId] = useState<number>();
  const [pontos, setPontos] = useState<PontoRefrescamento[]>([]);

  useEffect(() => {
    async function points() {
      const res = await fetch(`/api/pontos-refrescamento/${id || ""}`);

      if (res.ok) {
        const pontos: PontoRefrescamento[] = await res.json();
        setPontos(pontos);
      }
    }

    points();
  }, [id]);

  const setPointSelected = setId;
  return { setPointSelected, pontos };
}

export { useGetRefreshPoint };
