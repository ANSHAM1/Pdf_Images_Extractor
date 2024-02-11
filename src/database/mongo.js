const mongoose = require("mongoose");
DB_name = "testDB";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_name}`);
  } catch (err) {
    console.log("error", err);
    process.exit(1);
  }
};

module.exports={ connectDB };
