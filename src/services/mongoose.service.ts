import mongoose from "mongoose";

export const init = () => {
  mongoose.Promise = global.Promise;
  console.log(process.env.TEST_MONGO_URL);
  mongoose.connect(process.env.TEST_MONGO_URL || "");
};
