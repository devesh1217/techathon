"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export default function IncidentForm() {
  const [formData, setFormData] = useState({
    title: '',
    location: null,  // Automatically captured location
    images: null,
  });
  const [user, setUser] = useState(null); // Store logged-in user details
  const router = useRouter();

  useEffect(() => {
    // Automatically capture location when the component is mounted
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData((prevData) => ({
            ...prevData,
            location: { latitude, longitude },
          }));
        },
        (error) => {
          toast.error('Unable to retrieve your location.');
        }
      );
    } else {
      toast.error('Geolocation is not supported by this browser.');
    }

    // Fetch logged-in user details
    fetch('/api/auth/user',{
      headers:{
        'Authorization': `Barear ${localStorage.getItem('token')}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUser(data.user); // Assume the API returns the user details
        } else {
          toast.error('Unable to fetch user details. Please log in again.');
          router.push('/auth/login');
        }
      })
      .catch(() => {
        toast.error('Error fetching user details.');
        router.push('/auth/login');
      });
  }, []);

  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (e) => {
    setFormData({...formData, images: e.target.files[0]});
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    console.log('***',formData)
    if (!formData.images) {
      setUploadStatus('Please select a file.');
      return;
    }

    const formUploadData = new FormData();
    formUploadData.append('file', formData.images);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formUploadData,
      });

      const data = await response.json();

      if (data.success) {
        setUploadStatus(`File uploaded successfully! File ID: ${data.fileId}`);
      } else {
        setUploadStatus('File upload failed.');
      }
      return data;
    } catch (error) {
      console.error('Error:', error);
      setUploadStatus('An error occurred while uploading the file.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'images') {
      setFormData({ ...formData, images: e.target.files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const uploadData = await handleUpload(e);
    if (!formData.location) {
      toast.error('Location is required.');
      return;
    }


    const formDataToSend = {
      title: formData.title,
      location: formData.location,
      reportedBy: user?.id,
      images: uploadData?.fileId,
    };

    const res = await fetch('/api/incidents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formDataToSend),
    });

    const data = await res.json();
    if (data.success) {
      toast.success('Incident reported successfully!');
      router.push('/incidents');
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Report Incident</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Incident Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
            Report Incident
          </button>
        </form>
      </div>
    </div>
  );
}
