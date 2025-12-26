import api from './api';

export const pushNotificationService = {
  // Register device for push notifications
  registerDevice: async (
    deviceToken: string,
    deviceType: 'web' | 'ios' | 'android',
    deviceName?: string
  ): Promise<any> => {
    try {
      const response = await api.post('notifications/register-device', {
        token: deviceToken,
        deviceType,
        deviceName: deviceName || navigator.userAgent,
      });
      return response.data;
    } catch (error) {
      console.error('Error registering device:', error);
      throw error;
    }
  },

  // Unregister device
  unregisterDevice: async (deviceToken: string): Promise<void> => {
    try {
      await api.post('notifications/unregister-device', { token: deviceToken });
    } catch (error) {
      console.error('Error unregistering device:', error);
      throw error;
    }
  },

  // Request notification permission
  requestPermission: async (): Promise<NotificationPermission> => {
    if (!('Notification' in window)) {
      console.log('This browser does not support notifications');
      return 'denied';
    }

    if (Notification.permission === 'granted') {
      return 'granted';
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      return permission;
    }

    return 'denied';
  },

  // Show notification
  showNotification: (title: string, options?: NotificationOptions) => {
    if (Notification.permission === 'granted') {
      new Notification(title, options);
    }
  },

  // Setup Web Push API (for advanced implementations)
  setupWebPush: async () => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        const permission = await Notification.requestPermission();

        if (permission === 'granted') {
          // In production, replace with your actual VAPID public key
          const vapidKey = import.meta.env.VITE_VAPID_PUBLIC_KEY || '';
          if (!vapidKey) {
            console.warn('VAPID key not configured. Push notifications may not work.');
            return;
          }

          const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(vapidKey),
          });

          // Send subscription to backend
          await api.post('notifications/subscribe', subscription.toJSON());
          console.log('Push notification setup successful');
        }
      } catch (error) {
        console.error('Failed to setup Web Push:', error);
      }
    }
  },

  // Check if browser supports notifications
  isSupported: (): boolean => {
    return 'Notification' in window && 'serviceWorker' in navigator;
  },

  // Check if permission is granted
  isGranted: (): boolean => {
    return (
      'Notification' in window && Notification.permission === 'granted'
    );
  },
};

// Helper function to convert VAPID key
function urlBase64ToUint8Array(base64String: string): BufferSource {
  if (!base64String) {
    throw new Error('VAPID key is required for Web Push');
  }

  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray.buffer;
}
