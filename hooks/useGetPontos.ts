import { useEffect, useState } from "react";

export type Ponto = {
  id: string;
  coords: string;
  nome: string;
  numero_total_pessoas: string;
  estado: string;
};

function useGetPontos() {
  const [result, setResult] = useState<{
    pontos: Ponto[];
    carregando: boolean;
    error: boolean;
    sucesso: boolean;
  }>({ pontos: [], carregando: true, error: false, sucesso: false });

  useEffect(() => {
    if (!result.carregando) return;
    async function carregarPontos() {
      try {
        const datas: Ponto[] = [];

        setResult((prev) => ({
          ...prev,
          error: false,
          carregando: false,
          sucesso: true,
          pontos: datas,
        }));
      } catch (error) {
        console.log(error);

        setResult((prev) => ({
          ...prev,
          error: true,
          carregando: false,
          sucesso: false,
        }));
      }
    }
    carregarPontos();
  }, [result]);

  function actualizarDados() {
    if (result.carregando) return;

    setResult((prev) => ({
      ...prev,
      error: false,
      carregando: true,
      sucesso: false,
    }));
  }
  return { result, carregarPontos: actualizarDados };
}

export { useGetPontos };
