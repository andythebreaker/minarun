import { Workbox } from 'workbox-window';

export default function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    // Create a new instance of Workbox and provide the service worker file name
    const wb = new Workbox('/path/to/sw.js');

    // Listen for the "installed" event
    wb.addEventListener('installed', event => {
      // Check if this event corresponds to an update
      if (event.isUpdate) {
        // Show a confirmation dialog to the user
        if (window.confirm('A new app update is available! Click OK to refresh.')) {
          // Reload the page to apply the update
          window.location.reload();
        }
      }
    });

    // Register the service worker
    wb.register()
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  }
}
