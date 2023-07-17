/*'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';
process.env.PUBLIC_URL = '';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

// Ensure environment variables are read.
require('../config/env');

const jest = require('jest');
const execSync = require('child_process').execSync;
let argv = process.argv.slice(2);

function isInGitRepository() {
  try {
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}

function isInMercurialRepository() {
  try {
    execSync('hg --cwd . root', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}

// Watch unless on CI or explicitly running all tests
if (
  !process.env.CI &&
  argv.indexOf('--watchAll') === -1 &&
  argv.indexOf('--watchAll=false') === -1
) {
  // https://github.com/facebook/create-react-app/issues/5210
  const hasSourceControl = isInGitRepository() || isInMercurialRepository();
  argv.push(hasSourceControl ? '--watch' : '--watchAll');
}


jest.run(argv);
*/
const puppeteer = require('puppeteer');

async function runTest() {
  // Launch a headless Chrome browser
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    // Enable the 'geolocation' permission
    const context = browser.defaultBrowserContext();
    await context.overridePermissions('https://andythebreaker.github.io/minarun', ['geolocation']);

    // Emulate a mobile device
    await page.setViewport({ width: 375, height: 812, isMobile: true });

    // Enable geolocation and set a random location
    await page.setGeolocation({
      latitude: Math.random() * (90 - (-90)) + (-90),
      longitude: Math.random() * (180 - (-180)) + (-180),
    });

    // Navigate to the PWA
    await page.goto('https://andythebreaker.github.io/minarun');
    //await page.waitForNavigation();

    // Enable geolocation and set a random location
    await page.evaluate(() => {
      navigator.geolocation.getCurrentPosition = function (success, error) {
        success({
          coords: {
            latitude: Math.random() * (90 - (-90)) + (-90),
            longitude: Math.random() * (180 - (-180)) + (-180),
          },
        });
      };
    });

    const indexedDBData = await page.evaluate(async () => {
      const openRequest = indexedDB.open('MyDB');
      return new Promise((resolve, reject) => {
        openRequest.onsuccess = function(event) {
          const db = event.target.result;
          const dbName = db.name;
          const objectStoreNames = Array.from(db.objectStoreNames);
          const storePromises = objectStoreNames.map((storeName) => {
            return new Promise((resolveStore, rejectStore) => {
              const transaction = db.transaction(storeName, 'readonly');
              const store = transaction.objectStore(storeName);
              const request = store.getAll();
              request.onsuccess = function(event) {
                resolveStore({ storeName, data: event.target.result });
              };
              request.onerror = function(event) {
                rejectStore(new Error(`Failed to read from indexed DB store: ${storeName}`));
              };
            });
          });
          Promise.all(storePromises)
            .then((storeData) => {
              resolve({ dbName, stores: storeData });
            })
            .catch((error) => {
              reject(error);
            });
        };
        openRequest.onerror = function(event) {
          reject(new Error('Failed to open indexed DB.'));
        };
      });
    });

    console.log('Indexed DB Data:', indexedDBData);

    // Wait for a few seconds before closing the browser
    await page.waitForTimeout(2000);

  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    // Close the browser
    await browser.close();
  }
}

// Run the test
runTest();
