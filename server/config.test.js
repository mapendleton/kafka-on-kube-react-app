import "setimmediate";
import { configuration } from "./config";

describe("config", () => {
  it("should return a default config if process.env.ENVIRONMENT is not set or null is passed which should default to the dev configuration", () => {
    const defaultResult = configuration(null);
    const devResult = configuration("dev");
    expect(defaultResult.topic).toBe("my-topic");
    expect(defaultResult.kafkaServicePath).toBe("http://localhost:8084");
    expect(defaultResult).toEqual(devResult);
  });
  it("should return the sandbox path when environment is set to sandbox", () => {
    const result = configuration("sandbox");
    expect(result.kafkaServicePath).not.toBe("http://localhost:8084");
  });
  it("should return the kafka-ms service path when set to production", () => {
    const result = configuration("production");
    expect(result.kafkaServicePath).toEqual("http://kafka-ms:8084");
  });
});
