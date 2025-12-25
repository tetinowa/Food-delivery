import { connect } from "mongoose";

let isConnected = false;

export const connectToDatabase = async () => {
  if (isConnected) {
    return;
  }

  const MONGODB_URI = process.env.MONGODB_URI ||
    "mongodb+srv://raphiclsn_db_user:THykv5Blx3reT0G1@cluster0.ttecrl6.mongodb.net/?appName=Cluster0";

  await connect(MONGODB_URI);
  isConnected = true;
};
