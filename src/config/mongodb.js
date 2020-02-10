import mongoose from "mongoose";
const configuration = require("./environment");

const config = configuration.default;

export default function() {
  mongoose.connect(config.mongo.uri, config.mongo.options);
  mongoose.connection.on("error", err => {
    console.log("Error:::", err);
    process.exit(-1);
  });
}
