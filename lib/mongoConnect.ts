import mongoose from "mongoose";

export default function mongoConnect(): void {
  if (!process.env.MONGODB_URI) throw Error("[mongoConnect] Couldn't find process.env.MONGODB_URI");
  mongoose.connect(process.env.MONGODB_URI);
}
