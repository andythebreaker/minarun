const fs = require('fs');
const path = require('path');

let package_json_homepage = '/';

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

console.log(package_json_homepage);
