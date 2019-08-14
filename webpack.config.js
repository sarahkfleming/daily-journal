const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const WebpackShellPlugin = require("webpack-shell-plugin");
module.exports = {
  entry: "./src/scripts/journal.js",
  devServer: {
    writeToDisk: true,
    clientLogLevel: "error",
    stats: "errors-only"
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          formatter: require("eslint/lib/cli-engine/formatters/stylish")
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new WebpackShellPlugin({
      onBuildEnd: ["json-server -p 3000 -w api/entries.json"]
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new CopyPlugin([{ from: "./src/styles", to: "./styles" }])
  ],
  output: {
    filename: "bundle.js"
  },
  devtool: "eval-source-map"
};
