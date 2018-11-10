const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const RobotstxtPlugin = require("robotstxt-webpack-plugin").default;
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const workboxPlugin = require("workbox-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')

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
    new CopyWebpackPlugin([{from:'images',to:'images'}]),
    new ManifestPlugin({
      seed: {
        name: "AIR BIB Creator",
        short_name: "AIRBIB",
        start_url: "/",
        background_color: "#87ceeb",
        theme_color: "#87ceeb",
        display: "standalone",
        icons: [
          {
            src: "images/favicon-512.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "images/favicon-192.png",
            sizes: "192x192",
            type: "image/png"
          }
        ]
      }
    }),
    new workboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    })
  ]
};
