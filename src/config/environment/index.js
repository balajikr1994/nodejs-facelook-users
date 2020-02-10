"use strict";

require("dotenv").config();
const _ = require("lodash");

const all = {
  ip: process.env.IP || "0.0.0.0",
  port: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV || "development",
  tmp: process.env.TMP || "/tmp",
  // MongoDB connection options
  mongo: {
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    }
  }
};

export default _.merge(all, require(`./${all.NODE_ENV}.js`));
