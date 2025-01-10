"use client"
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export default function VerifyEmail() {
  const [message, setMessage] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const verifyEmail = async () => {
      const toastId = toast.loading('Verifying email...');
      const token = searchParams.get('token');
      const email = searchParams.get('email');
      const res = await fetch(`/api/auth/verify-email?token=${token}&email=${email}`);
      const data = await res.json();
      toast.dismiss(toastId);
      if (data.status === 200) {
        toast.success('Email verified successfully! Redirecting to login...');
        setTimeout(() => {
          router.push('/auth/login');
        }, 3000);
      } else {
        toast.error(data.message);
      }
    };
    verifyEmail();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-6">Verify Email</h2>
        <p>{message}</p>
      </div>
    </div>
  );
}
