import { getSession } from "@auth0/nextjs-auth0";
import type { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../../utils/mongodb";
import user from "../user";

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

    const { name, email, picture } = req.body;

    // ako emajl e user.email i ako probam togas ke dade greska a ako emajlot e isto so post.email
    const isExisted: any = await db
      .collection("connections")
      .find({
        $and: [{ email: userShort?.email }, { post_email: email }],
      })
      .toArray();

    const isExisted2: any = await db
      .collection("connections")
      .find({
        $and: [{ post_email: userShort?.email }, { email: email }],
      })
      .toArray();

    if (isExisted.length > 0 || isExisted2.length > 0)
      return res.status(400).json({ message: "already connected" });

    const connectionInfo = await db.collection("connections").insertOne({
      email: userShort?.email,
      name: userShort?.name,
      picture: userShort?.picture,
      post_email: email,
      post_name: name,
      post_picture: picture,
    });

    res.status(200).json(connectionInfo);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
    console.log(error);
  }
}
