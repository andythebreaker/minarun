/**
 * Config Checker
 * 
 * This script verifies the consistency between the package.json homepage
 * and webpack.config.js publicPath settings
 */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

console.log(chalk.blue('Checking configuration consistency...'));

// Read package.json
let packageJson;
try {
  const packageJsonPath = path.resolve(__dirname, '../package.json');
  packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
} catch (err) {
  console.error(chalk.red('Error reading package.json:'), err.message);
  process.exit(1);
}

// Extract homepage URL
const homepageUrl = packageJson.homepage || '/';
console.log(chalk.yellow('Homepage URL from package.json:'), homepageUrl);

// Extract path part (without domain) for comparison
let packageJsonPath = homepageUrl.replace(/^https?:\/\//, '');
packageJsonPath = packageJsonPath.replace(/^[^\/]+\//, '');

console.log(chalk.yellow('Path part from homepage:'), packageJsonPath);

// Read webpack.config.js
let webpackConfig;
try {
  const webpackConfigPath = path.resolve(__dirname, '../webpack.config.js');
  webpackConfig = fs.readFileSync(webpackConfigPath, 'utf8');
} catch (err) {
  console.error(chalk.red('Error reading webpack.config.js:'), err.message);
  process.exit(1);
}

// Check for publicPath in webpack config
const publicPathRegex = /publicPath: `\/([^/]+)\/`/;
const publicPathMatch = webpackConfig.match(publicPathRegex);

if (publicPathMatch) {
  const publicPath = publicPathMatch[1];
  console.log(chalk.yellow('publicPath from webpack.config.js:'), publicPath);
  
  // Compare
  if (packageJsonPath === publicPath || packageJsonPath === './' && publicPath === '') {
    console.log(chalk.green('✓ Configuration is consistent!'));
  } else {
    console.log(chalk.red('✗ Configuration mismatch!'));
    console.log(chalk.red(`  package.json homepage path: ${packageJsonPath}`));
    console.log(chalk.red(`  webpack.config.js publicPath: ${publicPath}`));
    
    console.log(chalk.yellow('\nTo fix this, run one of:'));
    console.log(chalk.cyan('  npm run env         # Interactive selection'));
    console.log(chalk.cyan('  npm run env:dev     # Development environment'));
    console.log(chalk.cyan('  npm run env:local   # Local network environment'));
    console.log(chalk.cyan('  npm run env:prod    # Production environment'));
  }
} else {
  console.log(chalk.red('Could not find publicPath in webpack.config.js'));
}
