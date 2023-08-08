/*'use strict';
const { createHash } = require('crypto');

module.exports = env => {
  const hash = createHash('md5');
  hash.update(JSON.stringify(env));

  return hash.digest('hex');
};*/

'use strict';
const { createHash } = require('crypto');
// @see https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-webpack-plugin.InjectManifestconst 
//const WorkboxWebpackPlugin = require("workbox-webpack-plugin");const CopyPlugin = require("copy-webpack-plugin");
module.exports = env => {
  // plugins: [
  //   new CopyPlugin({
  //     patterns: [
  //       { from: "./src/favicon.ico", to: "" },
  //       { from: "./src/manifest.json", to: "" },
  //       { from: "./src/logo192.png", to: "" },
  //       { from: "./src/logo512.png", to: "" },
  //     ],
  //   }),
  //   ];
  const hash = createHash('md5');
  hash.update(JSON.stringify(env));

  return hash.digest('hex');
};