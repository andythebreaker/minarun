const fs = require('fs');

// Read package.json file
fs.readFile('package.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading package.json:', err);
        return;
    }

    try {
        const packageJson = JSON.parse(data);
        
        // Increment the version number
        const versionParts = packageJson.version.split('.');
        versionParts[versionParts.length - 1] = (parseInt(versionParts[versionParts.length - 1]) + 1).toString();
        packageJson.version = versionParts.join('.');
        
        // Update the minarun-core dependency version
        if (packageJson.devDependencies && packageJson.devDependencies['minarun-core']) {
            const coreVersionParts = packageJson.devDependencies['minarun-core'].split('.');
            coreVersionParts[coreVersionParts.length - 1] = (parseInt(coreVersionParts[coreVersionParts.length - 1]) + 1).toString();
            packageJson.devDependencies['minarun-core'] = coreVersionParts.join('.');
        }
        
        // Write back updated package.json
        fs.writeFile('package.json', JSON.stringify(packageJson, null, 2), 'utf8', (writeErr) => {
            if (writeErr) {
                console.error('Error writing updated package.json:', writeErr);
            } else {
                console.log('package.json updated successfully.');
            }
        });
    } catch (parseErr) {
        console.error('Error parsing package.json:', parseErr);
    }
});
