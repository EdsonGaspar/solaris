// import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import pontos from "../../../datas.json";
import { getAllPontos } from "@/lib/getAllPontos";

async function GET() {
  const result = await getAllPontos();
  if (result.sucesso) {
    return NextResponse.json(result.pontos, { status: 200 });
  }
  return NextResponse.json([], { status: 200 });
}

export { GET };
