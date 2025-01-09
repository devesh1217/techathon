"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileno: '',
    password: '',
    aadharno: '',
    captchaInput: '',
  });
  const [captcha, setCaptcha] = useState({ image: '', token: '' });
  const router = useRouter();

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const fetchCaptcha = async () => {
    const res = await fetch('/api/auth/captcha');
    const data = await res.json();
    setCaptcha({ image: data.captchaImage, token: data.captchaToken });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, captchaToken: captcha.token }),
    });
    const data = await res.json();
    if (data.success) {
      toast.success('Signup successful! Please check your email to verify your account.');
      router.push('/auth/login');
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <input
            type="text"
            name="mobileno"
            placeholder="Mobile Number"
            value={formData.mobileno}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <input
            type="text"
            name="aadharno"
            placeholder="Aadhar Number"
            value={formData.aadharno}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <div className="flex items-center mb-4">
            <img src={`data:image/png;base64,${captcha.image}`} alt="CAPTCHA" className="mr-4" />
            <button type="button" onClick={fetchCaptcha} className="text-blue-500">Refresh</button>
          </div>
          <input
            type="text"
            name="captchaInput"
            placeholder="Enter CAPTCHA"
            value={formData.captchaInput}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Sign Up</button>
        </form>
      </div>
    </div>
  );
}
