const fs = require('fs');

// Read the package.json file
const json_str = fs.readFileSync('package.json', 'utf8');

// Parse the JSON string
let doc;
try {
    doc = JSON.parse(json_str);
} catch (error) {
    console.error('Invalid JSON document');
    process.exit(1);
}

// Check if the document is valid
if (typeof doc !== 'object' || doc === null) {
    console.error('Invalid JSON document');
    process.exit(1);
}

// Get the value of the "homepage" field
if (doc.hasOwnProperty('homepage') && typeof doc.homepage === 'string') {
    var homepage = doc.homepage;
    homepage = homepage.replace(/^https?:\/\//, '');

    // Remove domain name and port (if they exist)
    homepage = homepage.replace(/^[^\/]+\//, '');
    // Print the homepage value to stdout
    /*import fs from 'fs';
import path from 'path';

const packagePath = path.join(process.cwd(), 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

export const homepageUrl = packageJson.homepage; */
    console.log(`//this is a auto gen. file, if want change homeurl, go to package.json
    const homepage_json = "/${homepage}";
    export const homepageUrl = homepage_json;`);
} else {
    console.error('Unable to find homepage field');
    process.exit(1);
}
