"use strict";

import { resourceModel } from "../../config/resources";
import sendRsp from "../../libs/response";

export const index = async (req, res) => {
  try {
    const getUsers = await resourceModel["users"].find(
      {},
      "-hashed_password -salt -tokens"
    );

    return sendRsp(res, 200, "OK", {
      users: getUsers
    });
  } catch (error) {
    console.log("error", error);
    return sendRsp(res, 500, "Server Error");
  }
};

export const create = async (req, res) => {
  try {
    await resourceModel["users"].create(req.body);
    return sendRsp(res, 201, "User Created Successfully");
  } catch (error) {
    if (error.code === 11000) {
      return sendRsp(res, 406, "User Already Exists!!!");
    }
    return sendRsp(res, 500, "Server Error:::");
  }
};
