'use client';

import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { io } from 'socket.io-client';
import { sendNotificationToUser } from '../actions';

const socket = io('http://localhost:5000');

export default function DrowsinessDetector() {
    const webcamRef = useRef(null);
    const eyeClosedStartTimeRef = useRef(null); // Track eye closure start time
    const earRef = useRef(null); // Track EAR value for immediate access

    const [ear, setEAR] = useState(null);
    const [isDrowsy, setIsDrowsy] = useState(false);

    const EAR_THRESHOLD = 0.2; // EAR below this value indicates closed eyes
    const DROWSY_TIME_THRESHOLD = 2; // 5 seconds for drowsiness alert

    useEffect(() => {
        try {
            socket.on('ear_data', (data) => {
                const receivedEAR = data.ear;
                setEAR(receivedEAR); // Update state for UI
                earRef.current = receivedEAR; // Update ref for immediate access

                if (receivedEAR < EAR_THRESHOLD) {
                    if (!eyeClosedStartTimeRef.current) {
                        // Start tracking eye closure
                        eyeClosedStartTimeRef.current = Date.now();
                    } else {
                        const eyeClosedDuration = (Date.now() - eyeClosedStartTimeRef.current) / 1000;
                        if (eyeClosedDuration >= DROWSY_TIME_THRESHOLD) {
                            setIsDrowsy(true);
                        }
                    }
                } else {
                    // Reset eye closure tracking
                    eyeClosedStartTimeRef.current = null;
                    setIsDrowsy(false);
                }
            });

            return () => {
                socket.off('ear_data');
            };
        } catch (error) {
            console.error(error);
        }

    }, []);

    const sendFrameToServer = async () => {
        try {
            if (
                webcamRef.current &&
                webcamRef.current.video.readyState === 4
            ) {
                const frame = webcamRef.current.getScreenshot();
                if (frame) {
                    const binaryFrame = await fetch(frame).then((res) => res.arrayBuffer());
                    socket.emit('video_frame', binaryFrame);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            sendFrameToServer();
        }, 200); // Send frame every 200ms
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const fun = async () => {
            if (isDrowsy) {
                await sendNotificationToUser({ title: 'Drowsiness Alert', body: 'You seem drowsy!' }, localStorage.getItem('push-id'));
            }
        }
        fun();
    }, [isDrowsy]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Drowsiness Detector</h1>
            <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={640}
                height={480}
                className="border rounded shadow-lg"
            />
            <p className="mt-4 text-lg">EAR: {ear !== null ? ear.toFixed(2) : 'Calculating...'}</p>
            {isDrowsy && (
                <p className="text-red-500 font-bold text-lg">DROWSY ALERT!</p>
            )}
        </div>
    );
}
