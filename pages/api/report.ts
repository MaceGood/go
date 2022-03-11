import { getSession } from "@auth0/nextjs-auth0";
import type { NextApiRequest, NextApiResponse } from "next";
import { isFloat32Array } from "util/types";
import connectDb from "../../utils/mongodb";

export default async function reportHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { db } = await connectDb();
    const user: any = await getSession(req, res)!.user;

    const { q }: any = req.query;
    const { name, picture, bio, avalibility, location, reason } = req.body;

    const alreadyReported: any = await db
      .collection("reports")
      .find({
        $and: [{ reported_by: user?.email }, { email: q }],
      })
      .toArray();
    if (alreadyReported.length >= 3)
      return res.status(400).json({
        message:
          "You tried to report this user too many times in a short amount of time, please try again later.",
      });

    const data = await db.collection("reports").insertOne({
      email: q,
      name: name,
      bio: bio,
      location: location,
      picture: picture,
      avalibility: avalibility,
      reported_by: user?.email,
      reason: reason,
      date: new Date().toString(),
    });

    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}
