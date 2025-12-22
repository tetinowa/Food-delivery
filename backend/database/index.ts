import { connect } from "mongoose";

export const connectToDatabase = async () => {
  await connect(
    "mongodb+srv://raphiclsn_db_user:THykv5Blx3reT0G1@cluster0.ttecrl6.mongodb.net/?appName=Cluster0"
  );
};
