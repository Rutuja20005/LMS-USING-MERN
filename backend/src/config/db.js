import mongoose from "mongoose";

const URI = process.env.MONGO_URI || "mongodb://localhost:27017/LMS";
const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("MongoDB connectd");
  } catch (err) {
    console, log("Error in DB connection", err);
  }
};

export default connectDB;
