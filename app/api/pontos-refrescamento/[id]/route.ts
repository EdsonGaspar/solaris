import { NextRequest, NextResponse } from "next/server";
import pontos from "../../../../datas.json";

function GET(_: NextRequest, { params }: { params: { id: number } }) {
  const ponto = pontos.find((ponto) => {
    return ponto.id === Number(params.id);
  });

  if (ponto) return NextResponse.json(ponto, { status: 200 });

  return NextResponse.json(null, { status: 400 });
}

export { GET };
