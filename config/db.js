const mongoose = require("mongoose");

const db =
  process.env.NODE_ENV === "development"
    ? process.env.MONGO_DB_LOCAL
    : `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_HOST}/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;

const conenctDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("MongoDB connected..");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = conenctDB;
