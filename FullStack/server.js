// Start the server here
const app = require("./src/app.js");
const connectToDb = require("./src/config/db");

connectToDb();


app.listen(3000, () => {
  console.log("Server Started");
});