import { subscribeUser, unsubscribeUser } from '@/app/actions'; 
import { useState, useEffect } from 'react';
export default function PushNotificationManager() {
    const [isSupported, setIsSupported] = useState(false);
    const [subscription, setSubscription] = useState(null);
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState('test');

    useEffect(() => {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            setIsSupported(true);
            registerServiceWorker();
        }
        setUser(localStorage.getItem('token'))
        subscribeToPush();
    }, []);

    function urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - (base64String.length % 4)) % 4); // Add missing padding
        const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/'); // Replace URL-safe chars
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
    
        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }
    
    async function registerServiceWorker() {
        const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/',
            updateViaCache: 'none',
        });
        const sub = await registration.pushManager.getSubscription();
        setSubscription(sub);
    }

    async function subscribeToPush() {
        setLoading(true)
        const registration = await navigator.serviceWorker.ready;
        const sub = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(
                process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
            ),
        });
        const data = await subscribeUser(sub, user);
        if (data.success) {
            localStorage.setItem('push-id', data.id);
        } else {
            alert('Error in subscription!');
        }
        setLoading(false);
        setSubscription(sub);
    }

    async function unsubscribeFromPush() {
        setLoading(true);
        const id = localStorage.getItem('push-id');
        if (!id) {
            alert("Already un subscribed!")
            return;
        }
        await subscription?.unsubscribe();
        const data = await unsubscribeUser(id);
        if (data.success) {
            localStorage.removeItem('push-id')
        }
        setLoading(false);
        setSubscription(null);
    }

    if (!isSupported) {
        return <p>Push notifications are not supported in this browser.</p>;
    }

    return (
        <div></div>
        // <div className='flex flex-col text-center justify-center items-center gap-5 p-5 w-full border-t-2 border-t-white bg-white text-black'>
        //     <h3 className='text-4xl'>Latest Government Updates</h3>
        //     {(subscription && localStorage.getItem('push-id')) ? (
        //         <div className='flex flex-col justify-center items-center'>
        //             <p>You are subscribed to Government Notifications.</p>
        //             <button onClick={unsubscribeFromPush} className='bg-slate-800 hover:bg-slate-700 p-2 m-2 rounded-md  text-white'>
        //                 {loading ? 'Loading...' : 'Unsubscribe'}
        //             </button>
        //         </div>
        //     ) : (
        //         <div className='flex flex-col justify-center items-center'>
        //             <p>You are not subscribed to Government Notifications. Click below button and get all latest Government Notifications.</p>
        //             <button onClick={subscribeToPush} className='bg-slate-800 hover:bg-slate-700 p-2 m-2 rounded-md  text-white'>
        //                 {loading ? 'Loading...' : 'Subscribe'}
        //             </button>
        //         </div>
        //     )}
        // </div>
    );
}