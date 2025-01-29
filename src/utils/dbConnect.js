import mongoose from "mongoose";

const connection = {};

async function dbConnect() {
  try {
    if (connection.isConnected) {
      console.log("Database already connected");
      return;
    }

    if (!process.env.DB_URL) {
      throw new Error(
        "Database connection URL is missing in environment variables"
      );
    }

    const db = await mongoose.connect(process.env.DB_URL);

    connection.isConnected = db.connections[0].readyState;
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1); // Exit process if the connection fails
  }
}

export default dbConnect;
