"use client";
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link';
import { subscribeUser, unsubscribeUser } from './actions'
import NotificationPage from '@/components/installPromptBtn';
import { set } from 'mongoose';

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


function PushNotificationManager() {
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
    }, []);

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
        if(!user || user === 'test'){
            alert('Please login to subscribe to notifications')
            setLoading(false)
            window.location.href = '/auth/login'
            return;
        }
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
        <div className='flex flex-col text-center justify-center items-center gap-5 p-5 w-full border-t-2 border-t-white bg-white text-black'>
            <h3 className='text-4xl'>Latest Government Updates</h3>
            {(subscription && localStorage.getItem('push-id')) ? (
                <div className='flex flex-col justify-center items-center'>
                    <p>You are subscribed to Government Notifications.</p>
                    <button onClick={unsubscribeFromPush} className='bg-slate-800 hover:bg-slate-700 p-2 m-2 rounded-md  text-white'>
                        {loading ? 'Loading...' : 'Unsubscribe'}
                    </button>
                </div>
            ) : (
                <div className='flex flex-col justify-center items-center'>
                    <p>You are not subscribed to Government Notifications. Click below button and get all latest Government Notifications.</p>
                    <button onClick={subscribeToPush} className='bg-slate-800 hover:bg-slate-700 p-2 m-2 rounded-md  text-white'>
                        {loading ? 'Loading...' : 'Subscribe'}
                    </button>
                </div>
            )}
        </div>
    );
}

function InstallPrompt() {
    const [isIOS, setIsIOS] = useState(false);
    const [isStandalone, setIsStandalone] = useState(false);

    useEffect(() => {
        setIsIOS(
            /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
        );

        setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);
    }, []);

    if (isStandalone) {
        return null; // Don't show install button if already installed
    }

    return (
        <div>
            <h3>Install App</h3>
            <button>Add to Home Screen</button>
            {isIOS && (
                <p>
                    To install this app on your iOS device, tap the share button
                    <span role="img" aria-label="share icon">
                        {' '}
                        ⎋{' '}
                    </span>
                    and then &quot; Add to Home Screen &quot;
                    <span role="img" aria-label="plus icon">
                        {' '}
                        ➕{' '}
                    </span>
                    .
                </p>
            )}
        </div>
    );
}

function Home() {

    const [user, setUser] = useState('test');
    useEffect(()=>{
        setUser(localStorage.getItem('token'))
    })
    if(!user){
        window.location.href = '/auth/login'
    }
    const el = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640);
        };

        handleResize(); // Set the initial value
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    

    return (
        <div>
            <div className='w-full h-screen sm:py-24 py-8 px-4 sm:px-0 flex flex-col sm:flex-row justify-start sm:justify-evenly items-center text-black bg-white'>
                <div>
                    <div className='flex sm:flex-row flex-col justify-center items-center gap-10 mb-7'>
                        <h1 className='text-6xl mb-5 hidden sm:inline-block'>Accident Prevention</h1>
                        <h1 className='text-4xl mb-5 sm:hidden'>Sai General Store</h1>
                    </div>
                    <h2 className='text-3xl text-sky-800 mb-7 italic text-center'>One step to save your life from road accident...</h2>
                    <div className='flex justify-center sm:justify-normal'><span ref={el} className='text-2xl text-amber-300 mb-7 h-5'></span></div>
                </div>
                <div className='hidden sm:inline-block'>
                    <Image src={'/icons/logo.png'} alt='Biometric ID Card' width={500} height={500}></Image>
                </div>
                {/* <InstallPrompt /> */}
            </div>
            <PushNotificationManager />
            <NotificationPage />
        </div>
    )
}

export default Home