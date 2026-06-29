import mongoose from "mongoose";

const connectDB = async () => {
    try {
        console.log("Connecting...");
        // console.log(process.env.MONGO_URI);

        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log("Connected!");
    } catch (err) {
        console.error("Full Error:");
        console.error(err);
    }
};

export default connectDB;