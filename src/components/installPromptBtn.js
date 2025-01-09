'use client';

import { useEffect, useState } from 'react';

export default function NotificationPage() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault(); // Prevent the default mini-infobar
      setDeferredPrompt(e); // Save the event for later use
      setIsInstallable(true); // Show custom UI
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Show the browser's install prompt

      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }

      setDeferredPrompt(null); // Clear the saved event
    }
  };

  return (
    <div className="flex flex-col items-center justify-cente p-4 bg-white text-black">
      <h1 className="text-4xl mb-4">Install Our APP</h1>
      {isInstallable ? (
        <button
          onClick={handleInstallClick}
          className="bg-slate-800 hover:bg-slate-700 text-white font-medium py-2 px-4 rounded-md shadow-md transition duration-200"
        >
          Install App
        </button>
      ) : (
        <p className="">Your app is already installed or not installable.</p>
      )}
    </div>
  );
}
