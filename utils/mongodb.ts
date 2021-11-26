import { Db, MongoClient } from "mongodb";

const url: any = process.env.MONGODB_URI;
const client: MongoClient = new MongoClient(url);

const dbName: string = "go-app";
let db: Db;

export default async function connectDb(): Promise<{
  db: Db;
  client: MongoClient;
}> {
  try {
    await client.connect();
    db = client.db(dbName);

    console.log("rabote mongodb");
  } catch (error) {
    console.log(error);
  }
  return { db, client };
}
