const path = require("path");
const webpack = require("webpack");

const PROD = process.env.NODE_ENV === "production";
const DEV = !PROD;

module.exports = {
  entry: "./server/index.js",

  target: "node",

  output: {
    path: path.resolve(__dirname, "dist"),
    //publicPath: path.resolve(__dirname, "dist"),
    filename: "server.bundle.js"
  },

  mode: PROD ? "production" : "development",

  module: {
    rules: [
      {
        test: [/\.js/, /\.jsx/],
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(PROD ? "production" : "development")
    })
  ]
};
