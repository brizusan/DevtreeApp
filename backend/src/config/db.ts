import colors from "colors";
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const url = process.env.MONGODB_URL;
    const connection = await mongoose.connect(url);
    const urlConection = `${connection.connection.host}:${connection.connection.port}`;
    console.log(
      colors.bgWhite.black(`MongoDB connection established on ${urlConection}`)
    );
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
