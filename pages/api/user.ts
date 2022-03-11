import { getSession } from "@auth0/nextjs-auth0";
import type { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../utils/mongodb";

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { db } = await connectDb();
    const user: any = await getSession(req, res)!.user;

    const { name, location, bio, avalibility, picture } = req.body;

    const isExisted = await db
      .collection("users")
      .find({ email: user?.email })
      .toArray();

    if (isExisted.length <= 0) {
      await db.collection("users").insertOne({
        email: user.email,
        date: new Date().toString(),
      });
    }

    const userInfo = await db.collection("users").updateOne(
      { email: user.email },
      {
        $set: {
          name,
          location,
          bio,
          avalibility,
          picture,
          setup: true,
          last_updated: new Date().toString(),
        },
      }
    );

    res.status(200).json(userInfo);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}
