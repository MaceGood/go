import { getSession } from "@auth0/nextjs-auth0";
import type { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../utils/mongodb";

export default async function searchHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { db } = await connectDb();
    const user: any = await getSession(req, res)!.user;

    const { q }: any = req.query;
    // const regex: any = new RegExp(q, "i");

    const index = db.collection("users").createIndex({
      name: "text",
      bio: "text",
      location: "text",
    });

    const data = await db
      .collection("users")
      .find({
        $text: { $search: q },
        email: { $not: { $regex: user?.email! } },
      })
      .toArray();

    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}
