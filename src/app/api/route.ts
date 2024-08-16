import { NextRequest, NextResponse } from "next/server";

const ipMap = new Map<string, string>();
export async function GET(req: NextRequest) {
  ipMap.set(`localhost ${req.headers.get("user-agent")}`, "127.0.0.1");
  console.log(ipMap);

  return NextResponse.json({ message: "Hello, Next.js!" });
}
