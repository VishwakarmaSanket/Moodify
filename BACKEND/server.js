require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/database");
import path from "path";

app.use("/type-font", express.static(path.join(process.cwd(), "type-font")));

connectDB();

app.listen(3000, () => {
  console.log("Server is running on port 3000 ✅");
});
