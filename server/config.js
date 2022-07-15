import { logger } from "../util/logger";

const defaultTopic = "my-topic";
const defaultKafkaServicePath = "http://localhost:8084";
let config = {
  topic: defaultTopic,
  kafkaServicePath: defaultKafkaServicePath
};
export const configuration = (env = process.env.ENVIRONMENT) => {
  switch (env) {
    case "dev":
      logger.info("Building for 'dev'");
      break;

    case "sandbox":
      logger.info("Building for 'sandbox'");
      config = { ...config, kafkaServicePath: "http://tbd" };
      break;

    default:
      logger.info("Building for default: 'dev' environment...");
      break;
  }
  return config;
};
