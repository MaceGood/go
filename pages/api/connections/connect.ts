import { getSession } from "@auth0/nextjs-auth0";
import type { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../../utils/mongodb";

export default async function connectHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { db } = await connectDb();
    const user: any = await getSession(req, res)!.user;

    const data = await db
      .collection("users")
      .find({ email: user?.email })
      .toArray();
    const userDb = JSON.parse(JSON.stringify(data));
    const userShort = userDb[0];

    const { name, picture } = req.body;
    const { q }: any = req.query;

    const isExisted: any = await db
      .collection("connections")
      .find({
        $and: [{ email: userShort?.email }, { post_email: q }],
      })
      .toArray();

    const isExisted2: any = await db
      .collection("connections")
      .find({
        $and: [{ post_email: userShort?.email }, { email: q }],
      })
      .toArray();

    if (isExisted.length > 0 || isExisted2.length > 0)
      return res.status(400).json({ message: "already connected" });

    const connectionInfo = await db.collection("connections").insertOne({
      email: userShort?.email,
      name: userShort?.name,
      picture: userShort?.picture,
      post_email: q,
      post_name: name,
      post_picture: picture,
      date: new Date().toString(),
    });

    res.status(200).json({ connectionInfo });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}
