const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

const PROD = process.env.NODE_ENV === "production";
const DEV = !PROD;
const redirectTo = PROD? "http://kafkauiservice:4001" : "http://localhost:3001"

module.exports = {
  entry: "./client/index.js",

  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].bundle.js"
  },

  mode: PROD ? "production" : "development",

  devServer: {
    static: {
      directory: path.join(__dirname, "dist")
    },
    compress: true,
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true,
    proxy: {
      "/api": {
        target: redirectTo
      }
    }
  },

  module: {
    rules: [
      {
        test: [/\.js/, /\.jsx/],
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    extensions: ["", ".js", ".jsx"],
    fallback: {
      "fs": false
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(PROD ? "production" : "development")
    }),
    new HTMLWebpackPlugin({
      template: "./client/index.html"
    }),
    new NodePolyfillPlugin()
  ]
};
