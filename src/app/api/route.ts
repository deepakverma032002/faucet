import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const ipMap = new Map<string, string>();

  let ip: string | null = "";
  if (req.ip) {
    ip = req.ip;
  } else {
    ip = req.headers.get("X-Forwarded-For");
  }
  console.log(req.ip);

  return NextResponse.json({ message: "Hello, Next.js!" });
}
