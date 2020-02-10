"use strict";

import mongoose from "mongoose";
const Schema = mongoose.Schema;
const crypto = require("crypto");

const userSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true
    },
    last_name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    email_verified: {
      type: Boolean,
      default: false
    },
    gender: Number, // 1: MALE  2: FEMALE
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE"
    },
    country_code: {
      type: String
    },
    mobile: {
      type: Number,
      validate: {
        validator: function(v) {
          return typeof v === "number";
        },
        message: "{VALUE} is not a valid 10 digit number!"
      }
    },
    hashed_password: {
      type: String
    },
    salt: {
      type: String
    },
    tokens: [
      {
        clientId: Number,
        refreshToken: String
      }
    ]
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "last_updated_at"
    }
  }
);

userSchema
  .virtual("password")
  .set(function(password) {
    if (password) {
      this._password = password;
      this.salt = this.makeSalt();
      this.hashed_password = this.encryptPassword(password);
    }
  })
  .get(function() {
    console.log("this", this);
    return this._password;
  });

userSchema.path("hashed_password").validate(hashedPassword => {
  return hashedPassword.length;
}, "Password cannot be blank");

userSchema.methods = {
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  makeSalt: () => {
    return crypto.randomBytes(16).toString("base64");
  },
  encryptPassword: function(password) {
    if (!password || !this.salt) return "";
    const saltWithEmail = new Buffer.from(
      this.salt + this.email.toString("base64"),
      "base64"
    );
    return crypto
      .pbkdf2Sync(password, saltWithEmail, 10000, 64, "sha1")
      .toString("base64");
  }
};

export default mongoose.model("User", userSchema);
