const app = require("./src/app");
const connectToDb = require("./src/config/db");

connectToDb();

app.listen(3000, () => {
  console.log("Server running on 3000");
});
