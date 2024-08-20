import { NextRequest, NextResponse } from "next/server";
import moment from "moment";
import prisma from "@/prisma";

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
  try {
    const item1 = await prisma.iPTable.findFirst({
      where: {
        ip: `${req.headers.get("X-Forwarded-For")}`,
      },
    });

    if (item1 && moment(item1.expireTime).isAfter(moment().toDate())) {
      return NextResponse.json(
        { message: "Too many requests!", time: timeFormat(item1.expireTime) },
        {
          status: 429,
        }
      );
    }

    await prisma.iPTable.create({
      data: {
        ip: `${req.headers.get("X-Forwarded-For")}`,
        expireTime: moment().add(1, "d").toDate().toISOString(),
      },
    });

    return NextResponse.json({ message: "Successfully done!" });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error!" },
      { status: 500 }
    );
  }
}

// export async function DELETE() {
//   try {
//     await prisma.iPTable.deleteMany({
//       where: {
//         expireTime: {
//           lt: moment().toDate().toISOString(),
//         },
//       },
//     });

//     return NextResponse.json({ message: "Successfully done!" });
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Internal server error!" },
//       { status: 500 }
//     );
//   }
// }
