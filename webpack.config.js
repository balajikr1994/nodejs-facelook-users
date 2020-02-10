const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: {
    server: "./index.js"
  },
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },
  target: "node",
  node: {
    __dirname: false,
    __filename: false
  },

  externals: [nodeExternals()],
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins:["@babel/plugin-transform-runtime"]
          }
        }
      }
    ]
  },
  plugins: []
};
