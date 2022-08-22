import axios from "axios";
import { logger } from "../../util/logger";

export default class HTTP {
  #path = "";
  #headers = {};

  constructor(auth) {
    logger.info(`instantiating a new HTTP object: ${auth}`);
    this.headers = { ...this.headers, auth: { ...auth } };
  }

  async get(path) {
    let result;
    try {
      result = await axios.get(path, { headers: {} });
    } catch (e) {
      logger.error(
        `something bad happened while fetching from ${this.path}`,
        e
      );
      return { status: 500, message: e.message };
    }
    if (result.status !== 200) {
      return { status: result.status, message: result.data };
    }
    return { status: 200, message: result.data };
  }

  async post(path, data) {
    let result;
    try {
      logger.info(`posting from http.js to: ${path}`);
      result = await axios.post(path, data, {
        headers: {}
      });
    } catch (e) {
      logger.error(`something bad happened while posting to ${path}`+"STACK: "+e.stack);
      logger.error(`${e}`);
      return { status: 500, message: e.stack };
    }
    if ([200, 201, 204].includes(result.status)) {
      return { status: result.status, message: result.data };
    }

    return { status: 500, message: result.data };
  }
}
