const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const { InjectManifest } = require('workbox-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const fs = require('fs');

var package_json_homepage = '/';
function PUBLICURLreplace(indexHtmlPath) {//pathresolvepublicindexhtml) {
  try {
    const packageJsonPath = path.resolve(__dirname, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    package_json_homepage = packageJson.homepage || '/';

    // Remove http:// or https:// prefix
    package_json_homepage = package_json_homepage.replace(/^https?:\/\//, '');

    // Remove domain name and port (if they exist)
    package_json_homepage = package_json_homepage.replace(/^[^\/]+\//, '');
  } catch (err) {
    console.log('\x1b[41m\x1b[32m%s\x1b[0m', ':(\n');
    console.warn('\x1b[41m\x1b[32m%s\x1b[0m', 'Warning: package.json not found or "homepage" key not found!');
  }
  // function createTempHtmlFile() {
  //const indexHtmlPath = path.resolve(__dirname, 'public/index.html');
  const tmpDirPath = path.resolve(__dirname, 'tmp');

  // Check if tmp directory exists
  if (fs.existsSync(tmpDirPath)) {
    // Clear tmp directory
    fs.rmdirSync(tmpDirPath, { recursive: true });
  }

  // Create tmp directory
  fs.mkdirSync(tmpDirPath);

  // Read index.html file
  const inputStr = fs.readFileSync(indexHtmlPath, 'utf8');

  //TODO:防呆

  const regex = /%PUBLIC_URL%/gm;

// Alternative syntax using RegExp constructor
// const regex = new RegExp('%PUBLIC_URL%', 'gm')

const str = inputStr;
const subst = `/${package_json_homepage}`;

// The substituted value will be contained in the result variable
const result = str.replace(regex, subst);

//console.log('Substitution result: ', result);


  // Write inputStr to tmp.html file
  const tmpHtmlPath = path.join(tmpDirPath, 'tmp.html');
  fs.writeFileSync(tmpHtmlPath, result);

  return tmpHtmlPath;
  //}
}

const webpackPlugins = [
  new HtmlWebpackPlugin({
    template: PUBLICURLreplace(path.resolve(__dirname, 'public/index.html')),
    filename: 'index.html',
  }),
  new Dotenv({
    path: './.env', // Path to .env file (this is the default)
    systemvars: true,
  }),
  new CopyPlugin({
    patterns: [
      { from: './src/favicon.ico', to: '' },
      { from: './src/manifest.json', to: '' },
      { from: './src/logo192.png', to: '' },
      { from: './src/logo512.png', to: '' },
    ],
  }),
];

if ('production' === process.env.NODE_ENV) {
  webpackPlugins.push(new InjectManifest({
    swSrc: './src/src-sw.js',
    swDest: 'sw.js',
  }));
}

module.exports = {
  context: __dirname,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: `/${package_json_homepage}/`,
  },
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
      {
        test: /\.css?$/,
        use: ['style-loader', 'css-loader'],
      },
      /*{
        test: /\.(png|j?g|svg|gif)?$/,
        use: 'file-loader?name=./images/[name].[ext]',
      },{
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        use: ['file-loader?name=[name].[ext]'] // ?name=[name].[ext] is only necessary to preserve the original file name
      },*/
    ],
  },
  plugins: webpackPlugins,
};

