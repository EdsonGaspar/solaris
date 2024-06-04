type PontoRefrescamento = {
  id: number;
  nome: string;
  numero_total_pessoas: number;
  estado: "FUNCIONAL" | "CHEIO" | "INDISPONÍVEL";
  numero_actual_pessoas: number;
  coords: {
    lat: number;
    lng: number;
  };
};

export default PontoRefrescamento;
