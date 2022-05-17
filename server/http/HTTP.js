import axios from "axios";

export default class HTTP {
  #path = "";
  #headers = {};

  constructor(path) {
    this.path = path;
  }

  async get() {
    let result;
    try {
      result = await axios.get(this.path, { headers: {} });
    } catch (e) {
      console.log(`something bad happened while fetching from ${this.path}`, e);
      return { status: 500, message: e.message };
    }
    if (result.status !== 200) {
      return { status: result.status, message: result.data };
    }
    return { status: 200, message: result.data };
  }

  async post(data) {
    let result;
    try {
      result = await axios.post(this.path, data, {
        headers: {}
      });
    } catch (e) {
      console.log(`something bad happened while posting to ${this.path}`, e);
      return { status: 500, message: e.message };
    }
    if ([200, 201, 204].includes(result.status)) {
      return { status: result.status, message: result.data };
    }
    return { status: 200, message: result.data };
  }
}
