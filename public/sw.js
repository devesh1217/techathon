self.addEventListener('push', function (event) {
    if (event.data) {
      const data = event.data.json()
      // const options = {
      //   body: data.body,
      //   icon: data.icon || '/logo.png',
      //   badge: '/logo.png',
      //   vibrate: [100, 50, 100],
      //   data: {
      //     dateOfArrival: Date.now(),
      //     primaryKey: '2',
      //   },
      //   "renotify": true,
      //   "actions": [
      //     { "action": "open", "title": "View Offer" },
      //     { "action": "dismiss", "title": "Dismiss" }
      //   ],
      // }
      const options = {
        body: data.body || 'You have a new notification!',
        icon: data.icon || '/icons/icon.png',
        badge: data.badge || '/icons/monochrome.png',
        vibrate: data.vibrate || [200, 100, 200],
        tag: data.tag || 'default-tag',
        renotify: data.renotify || false,
        actions: data.actions || [
          { action: 'open', title: 'Open App' },
          { action: 'dismiss', title: 'Dismiss' },
        ],
        data: data.data || { dateOfArrival: Date.now(), primaryKey: 1 },
        silent: data.silent || false,
        image: data.image || '/icons/logo.png',
        requireInteraction: data.requireInteraction || true,
        timestamp: data.timestamp || Date.now(),
        // sound: data.sound || '/sounds/notification.mp3', // Optional; browser support varies
      };
      event.waitUntil(self.registration.showNotification(data.title, options))
    }
  })
  
  // self.addEventListener('notificationclick', function (event) {
  //   console.log('Notification click received.')
  //   event.notification.close()
  //   event.waitUntil(clients.openWindow('https://devesh1217.github.io/portfolio'))
  // })
  
  self.addEventListener('notificationclick', function (event) {
    console.log('Notification clicked:', event.notification.data);
  
    // Perform actions based on the clicked action
    if (event.action === 'open') {
      event.waitUntil(clients.openWindow(event.notification.data.url || '/'));
    } else {
      // Handle dismiss or other actions
      console.log('Notification dismissed or another action triggered.');
    }
  
    // Close the notification
    event.notification.close();
  });
  
//   self.addEventListener('install', (event) => {
//     event.waitUntil(
//       caches.open('offline-cache').then((cache) => {
//         return cache.addAll([
//           '/offline', // Make sure the offline page is pre-cached
//           '/images/offline.png',
//           '/images/home.png',
//           '/icons/logo.png',
//           '/icons/icon-192x192.png',
//           '/icons/icon-512x512.png',
//           '/icons/monochrome.png',
//           '/manifest.json',
//         ]);
//       })
//     );
//   });
  
//   self.addEventListener('fetch', (event) => {
//     if (event.request.mode === 'navigate') {
//       event.respondWith(
//         fetch(event.request).catch(() =>
//           caches.open('offline-cache').then((cache) => cache.match('/offline'))
//         )
//       );
//     }
//   });
  