// import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import pontos from "../../../datas.json"

function GET() {
    return NextResponse.json(pontos, {status: 200})
}

export {GET}