import { Ponto } from "@/hooks/useGetPontos";
import firebaseDB from "@/utils/db";
import { collection, getDocs } from "firebase/firestore";

export async function getAllPontos() {
  try {
    const { docs } = await getDocs(collection(firebaseDB, "testa"));

    const datas: Ponto[] = docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as any;

    return {
      error: false,
      sucesso: true,
      pontos: datas,
    };
  } catch (error) {
    return {
      error: true,
      sucesso: false,
      pontos: [],
    };
  }
}
