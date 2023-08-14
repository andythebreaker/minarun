const main = require('minarun-core');

const srcDir = './src';
main(srcDir)
    .then(have_Provider => {
        if (!mute) console.log('Files with Provider imports:', have_Provider);
    })
    .catch(error => {
        console.error('Error counting TypeScript files:', error);
    });

