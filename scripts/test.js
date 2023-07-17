const puppeteer = require('puppeteer');

async function runTest() {
  try {
    // Launch a headless Chrome browser
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

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

    // Close the browser
    await browser.close();

  } catch (error) {
    console.error('Test failed:', error);
  }
}

// Run the test
runTest();
