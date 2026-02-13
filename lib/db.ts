import mongoose from "mongoose";



const connectDB = async () => {
  try {
    const db = await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log(`MongoDB connected: ${db.connection.host}`);
    
  } catch (error) {
    console.error("MongoDB connection error:& password", error);
    process.exit(1);
  }
};
connectDB();
export default connectDB;