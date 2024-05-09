import mongoose from "mongoose";
import { mongoURL } from "../../config/envHandler";

export function connectMongo() {
  mongoose.connect(mongoURL);
}
