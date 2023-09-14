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
  async getAll() {
    return this.api.get("/");
  }

  async getOne(id) {
    return this.api.get("/", id);
  }
}

module.exports = axiosApi;
