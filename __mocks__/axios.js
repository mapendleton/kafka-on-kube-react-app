import mockAxios from "jest-mock-axios";

mockAxios.get = (success = true) => {
  console.log(`calling ehre...`, success);
  if (success) {
    return { status: 200, data: "success" };
  } else {
    throw { status: 500, message: "error" };
  }
};

mockAxios.post = (success = true, data) => {
  console.log(`what is data: `, success, data);
  if (success) {
    console.log(`resturing here...`);
    return { status: 200, data: data };
  } else {
    throw { status: 500, message: "error" };
  }
};

export default mockAxios;
