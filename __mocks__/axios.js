import mockAxios from "jest-mock-axios";

mockAxios.get = (success = true) => {
  if (success) {
    return { status: 200, data: "success" };
  } else {
    throw { status: 500, message: "error" };
  }
};

mockAxios.post = (success = true, data) => {
  if (success) {
    return { status: 200, data: data };
  } else {
    throw { status: 500, message: "error" };
  }
};

export default mockAxios;
