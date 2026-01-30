require("dotenv").config();
const app = require("./src/app");
const mongoose = require("mongoose");

const connectToDb = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to DB");
};

connectToDb();

app.listen(3000, () => {
  console.log("Server listening on 3000");
});
