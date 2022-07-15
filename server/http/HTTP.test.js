import "setimmediate";
import HTTP from "./HTTP";
import mockAxios from "jest-mock-axios"; // axios is mocked under <root>/__mocks__

describe("HTTP class test suite: ", () => {
  const client = new HTTP();

  it("should make a get call and return 200 with a message", async () => {
    mockAxios.get = () => {
      return { status: 200, data: "success" };
    };
    const result = await client.get();
    expect(result.status).toBe(200);
    expect(result.message).toBe("success");
  });

  it("should return an error message when making a get to a bad path", async () => {
    mockAxios.get = () => {
      throw { status: 500, message: "error" };
    };

    const result = await client.get();
    expect(result.status).toBe(500);
    expect(result.message).toBe("error");
  });

  it("should make a post call and return 200 with a message", async () => {
    mockAxios.post = () => {
      return { status: 200, data: { food: "pizza" } };
    };
    const result = await client.post();
    expect(result.status).toBe(200);
    expect(result.message).toEqual({ food: "pizza" });
  });

  it("should return an error message when making a post to a bad path", async () => {
    mockAxios.post = () => {
      throw { status: 500, message: "error", stack: "ERROR!" };
    };
    const result = await client.post({ food: "pizza" });
    expect(result.status).toBe(500);
    expect(result.message).toBe("ERROR!");
  });
});
