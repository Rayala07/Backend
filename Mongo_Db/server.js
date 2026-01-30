// Import the server to this file
const app = require("./src/app");
const connectToDb = require("./src/config/database");

connectToDb();

// Start the server
app.listen("3000", () => console.log("Listening on port 3000"));
