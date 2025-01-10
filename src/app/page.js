"use client";
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link';

import PushNotificationManager from '@/components/extra/PushNotificationManager';
import NotificationPage from '@/components/installPromptBtn';
import { set } from 'mongoose';





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
    useEffect(() => {
        setUser(localStorage.getItem('token'))
    })
    if (!user) {
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
            <div id='notification'>
                <PushNotificationManager />
                <NotificationPage />
            </div>
        </div>
    )
}

export default Home