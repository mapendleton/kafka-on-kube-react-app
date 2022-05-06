import "dotenv/config";

import express from "express";

const app = express();
const port = process.env.PORT || 3001;
const PROD = process.env.NODE_ENV === "production";

app.use("/", express.static("dist"));

app.listen(port, () => {
  if (PROD) {
    console.log(`Server running at http://localhost:${port}...`);
  } else {
    console.log(`...server running at http://localhost:3000...`);
  }
});
