const {connectDB} = require("../database");

class User {
  constructor(email, username, password) {
    this.email = email;
    this.username = username;
    this.password = password;
  }

  async saveNew() {
    const db = await connectDB();
  }
}

module.exports = User;
