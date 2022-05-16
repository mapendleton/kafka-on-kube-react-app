import "dotenv/config";

import express from "express";
import bodyParser from "body-parser";

import HTTP from "./http/HTTP";

const app = express();
const port = process.env.PORT || 3001;
const PROD = process.env.NODE_ENV === "production";
console.log(`HTTP: `, HTTP);
const client = new HTTP("http://localhost:8082/greetings");
app.use(bodyParser.json());
app.use("/", express.static("dist"));

app.post("/api/kafka-ms", async (req, res) => {
  const result = await client.post(req.body);
  res.status(result.status).send(result.message);
});

app.listen(port, () => {
  if (PROD) {
    console.log(`Server running at http://localhost:${port}...`);
  } else {
    console.log(`...server running at http://localhost:3001...`);
  }
});
