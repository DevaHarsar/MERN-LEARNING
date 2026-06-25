const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        console.log("Connecting...");
        // console.log(process.env.MONGO_URI);

        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log("Connected!");
        console.log(conn.connection.host);
    } catch (err) {
        console.error("Full Error:");
        console.error(err);
    }
};

module.exports = connectDB;