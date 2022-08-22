import "dotenv/config";
import "setimmediate";
import express from "express";
import bodyParser from "body-parser";

import HTTP from "./http/HTTP";
import { configuration } from "./config";
import { logger } from "./../util/logger";

const app = express();
const port = process.env.PORT || 3001;
const PROD = process.env.NODE_ENV === "production";
const config = configuration(process.env.NODE_ENV);

const kafkaMsClient = new HTTP({ clientId: "test", token: "xxx" });
app.use(bodyParser.json());
app.use("/", express.static("dist"));

app.get("/health", async (req, res) => {
  res.status(200);
});

app.post("/api/kafka-ms", async (req, res) => {
  logger.info("posting a message to kafka-ms...");
  logger.info(`config.kafkaServicePath: ${config.kafkaServicePath}`);
  try {
    const result = await kafkaMsClient.post(
      `${config.kafkaServicePath}/topics/${
        req.body?.topic ? req.body?.topic : config.topic
      }/`,
      req.body
    );
    res.status(result.status).json({ message: result.data });
  } catch (e) {
    logger.error(`something bad happened`);
    logger.error(e);
    res.status(500).json({ message: e.message });
  }
});

app.listen(port, () => {
  if (PROD) {
    logger.info(`server running at http://localhost:${port}...`);
  } else {
    logger.info(
      `...server running at http://localhost:3001, serving up at http://localhost:3000`
    );
  }
});
