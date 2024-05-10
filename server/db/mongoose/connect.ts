import mongoose from "mongoose";
import { mongoURL } from "../../config/envHandler";

export function connectMongo() {
  mongoose.connect(mongoURL).catch((error) => {
    console.log("Error connecting to mongo", error);
  });
}
