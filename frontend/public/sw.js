// Service Worker for Push Notifications

self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'New notification',
    icon: '/vite.svg',
    badge: '/vite.svg',
    tag: 'semis-notification',
    requireInteraction: true,
    actions: [
      {
        action: 'open',
        title: 'Open',
      },
      {
        action: 'close',
        title: 'Dismiss',
      },
    ],
  };

  event.waitUntil(
    self.registration.showNotification('SEMIS Notification', options)
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'open' || !event.action) {
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then(clientList => {
        // Check if there is already a window/tab open with the target URL
        for (let i = 0; i < clientList.length; i++) {
          const client = clientList[i];
          if (client.url === '/' && 'focus' in client) {
            return client.focus();
          }
        }
        // If not, open a new window/tab with the target URL
        if (clients.openWindow) {
          return clients.openWindow('/');
        }
      })
    );
  }
});

self.addEventListener('notificationclose', event => {
  console.log('Notification closed:', event.notification.tag);
});

self.addEventListener('install', event => {
  console.log('Service Worker installed');
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('Service Worker activated');
  event.waitUntil(clients.claim());
});
