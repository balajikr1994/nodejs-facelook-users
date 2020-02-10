"use strict";

require("dotenv").config();

import express from "express";
import mongoose from "mongoose";
import routerConfig from "./routes";
import expressConfig from "./src/config/express";
import http from "http";
import mongoDB from "./src/config/mongodb";

const messageMapper = require("./src/config/mapper");
const configuration = require("./src/config/environment");
const config = configuration.default;
const app = express();
const server = http.createServer(app);

routerConfig(app);
expressConfig(app);
mongoDB();

app.get("/api/users/health", (req, res) => {
  try {
    res.status(404).send("OK");
  } catch (error) {
    return Promise.reject(res.send(messageMapper.Error));
  }
});

function startServer() {
  server.listen(process.env.PORT, process.env.IP, () => {
    console.log(
      process.env.ENTITY_NAME + messageMapper.ServerMessage,
      process.env.PORT
    );
  });
}

setImmediate(startServer);
