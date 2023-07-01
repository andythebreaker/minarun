'use strict';
const { createHash } = require('crypto');
// @see https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-webpack-plugin.InjectManifestconst 
WorkboxWebpackPlugin = require("workbox-webpack-plugin");const CopyPlugin = require("copy-webpack-plugin");
module.exports = env => {
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "./src/favicon.ico", to: "" },
        { from: "./src/manifest.json", to: "" },
        { from: "./src/logo192.png", to: "" },
        { from: "./src/logo512.png", to: "" },
      ],
    }),
    new WorkboxWebpackPlugin.InjectManifest({
      swSrc: "./src/src-sw.js",
      swDest: "sw.js",
    }),
    ]
  const hash = createHash('md5');
  hash.update(JSON.stringify(env));

  return hash.digest('hex');
};
