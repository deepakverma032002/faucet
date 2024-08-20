import { NextRequest, NextResponse } from "next/server";
import moment from "moment";

const ipMap = new Map<string, string>();

const timeFormat = (time: string) => {
  const someday = moment(time);
  const today = moment();

  const day = someday.diff(today, "days");
  const hours = someday.diff(today, "hours");
  const minutes = someday.diff(today, "minutes");
  const seconds = someday.diff(today, "seconds");

  if (day > 0) {
    return `${day} days`;
  } else if (hours > 0) {
    return `${hours + 1} hours`;
  } else if (minutes > 0) {
    return `${minutes} minutes`;
  } else {
    return `${seconds} seconds`;
  }
};

export async function POST(req: NextRequest) {
  console.log(ipMap);
  try {
    const item = ipMap.get(`${req.headers.get("X-Forwarded-For")}`);

    if (item && moment(item).isAfter(moment().toDate())) {
      return NextResponse.json(
        { message: "Too many requests!", time: timeFormat(item) },
        {
          status: 429,
        }
      );
    }

    // remove expired items
    ipMap.forEach((value, key) => {
      if (moment(value).isBefore(moment().toDate())) {
        ipMap.delete(key);
      }
    });

    ipMap.set(
      `${req.headers.get("X-Forwarded-For")}`,
      moment().add(1, "d").toDate().toISOString()
    );

    return NextResponse.json({ message: "Successfully done!" });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error!" });
  }
}
