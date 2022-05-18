import HTTP from "./HTTP";
import mockAxios from "jest-mock-axios"; // axios is mocked under <root>/__mocks__

describe("HTTP class test suite: ", () => {
  const setMockPass = () => {
    return new HTTP(true);
  };

  const setMockFail = () => {
    return new HTTP(false);
  };
  it("should make a get call and return 200 with a message", async () => {
    const client = setMockPass();
    const result = await client.get();
    expect(result.status).toBe(200);
    expect(result.message).toBe("success");
  });

  it("should return an error message when making a get to a bad path", async () => {
    const client = setMockFail();
    const result = await client.get(false);
    expect(result.status).toBe(500);
    expect(result.message).toBe("error");
  });

  it("should make a post call and return 200 with a message", async () => {
    const client = setMockPass();
    const result = await client.post({ food: "pizza" });
    expect(result.status).toBe(200);
    expect(result.message).toEqual({ food: "pizza" });
  });

  it("should return an error message when making a post to a bad path", async () => {
    const client = setMockFail();
    const result = await client.post({ food: "pizza" });
    expect(result.status).toBe(500);
    expect(result.message).toBe("ERROR!");
  });
});
