const axios = require("axios");

class axiosApi {
  constructor(endPoint) {
    this.api = axios.create({
      baseURL: `http://localhost:3000/${endPoint}/`,
      headers: { "Content-Type": "application/json" },
    });
  }

  async addOne(data) {
    return this.api.post("/", data);
  }
  async getAll(data) {
    return this.api.get("/");
  }
}

module.exports = axiosApi;
