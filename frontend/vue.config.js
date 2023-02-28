const path = require("path");
const { defineConfig } = require("@vue/cli-service");
const webpack = require("webpack");
const packageJson = require("./package.json");
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: path.resolve(__dirname, "../backend/public"),
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        "process.env": { APP_VERSION: JSON.stringify(packageJson.version) },
      }),
    ],
  },
});
