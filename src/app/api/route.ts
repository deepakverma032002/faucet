import { NextRequest, NextResponse } from "next/server";
import moment from "moment";

const ipMap = new Map<string, string>();
export async function POST(req: NextRequest) {
  console.log(ipMap);
  try {
    const item = ipMap.get(`${req.headers.get("X-Forwarded-For")}`);

    if (item && moment(item).isAfter(moment().toDate())) {
      return NextResponse.json(
        { message: "Too many requests!" },
        {
          status: 429,
        }
      );
    }

    ipMap.set(
      `${req.headers.get("X-Forwarded-For")}`,
      moment().add(1, "minutes").toDate().toISOString()
    );

    return NextResponse.json({ message: "Successfully done!" });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error!" });
  }
}
