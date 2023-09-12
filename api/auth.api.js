const axios = require("axios");

class authApi {
  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:3000/users/",
      headers: { "Content-Type": "application/json" },
    });
  }

  async addUser(user) {
    return this.api.post("/", user);
  }
}

module.exports = authApi;
