import mongoose from "mongoose";

let isConnected = false;

export const connectOrderDb = async () => {
  if (isConnected) {
    console.log("Already connected to MongoDB");
    return;
  }
  if (!process.env.MONGO_URL) {
    throw new Error("MONGO_URL is not defined");
  }
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
    throw error;
  }
};
