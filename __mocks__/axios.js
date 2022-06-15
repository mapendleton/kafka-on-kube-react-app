import mockAxios from "jest-mock-axios";

mockAxios.get = (path, headers, success = true) => {
  if (success) {
    return { status: 200, data: "success" };
  } else {
    throw { status: 500, message: "error" };
  }
};

mockAxios.post = (path, data, success = true) => {
  if (success) {
    return { status: 200, data: data };
  } else {
    throw { status: 500, message: "error", stack: "ERROR!" };
  }
};

export default mockAxios;
