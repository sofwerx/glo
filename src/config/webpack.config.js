module.exports = {
  externals: {
    cesium: "Cesium"
  },
  output: {
    publicPath: "/"
    // ...
  },
  plugins: [

    new CopyPlugin([
      {
        from: `node_modules/cesium/Build/Cesium${prod ? "" : "Unminified"}`,
        to: "cesium"
      }
    ]),
    new HtmlIncludeAssetsPlugin({
      append: false,
      assets: [
        "cesium/Widgets/widgets.css",
        "cesium/Cesium.js"
      ]
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(opts && prod ? "production" : "development"),
        CESIUM_BASE_URL: JSON.stringify("/cesium"),
      },
    }),
  ],
};