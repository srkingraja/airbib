const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const RobotstxtPlugin = require("robotstxt-webpack-plugin").default;
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const workboxPlugin = require("workbox-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.html",
      favicon: "images/favicon.png"
    }),
    new RobotstxtPlugin({}),
    new ManifestPlugin({
      seed: {
        name: 'AIR BIB Creator',
        short_name: 'AIRBIB',
        start_url: "/",
        background_color: '#8B0000',
        theme_color: '#8B0000',
        display: 'standalone'
      }
    }),
    new workboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    })
  ]
};
