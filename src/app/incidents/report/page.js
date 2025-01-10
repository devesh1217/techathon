"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { google } from 'googleapis';

export default function IncidentForm() {
  const [formData, setFormData] = useState({
    title: '',
    location: null,  // Automatically captured location
    images: [],
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
    fetch('/api/auth/user')
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'images') {
      setFormData({ ...formData, images: e.target.files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileUploadToGoogleDrive = async (file) => {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        type: process.env.GOOGLE_CLOUD_TYPE,
        project_id: process.env.GOOGLE_CLOUD_PROJECT_ID,
        private_key_id: process.env.GOOGLE_CLOUD_PRIVATE_KEY_ID,
        private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
        client_id: process.env.GOOGLE_CLOUD_CLIENT_ID,
        auth_uri: process.env.GOOGLE_CLOUD_AUTH_URI,
        token_uri: process.env.GOOGLE_CLOUD_TOKEN_URI,
        auth_provider_x509_cert_url: process.env.GOOGLE_CLOUD_AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.GOOGLE_CLOUD_CLIENT_X509_CERT_URL,
      },
      scopes: ['https://www.googleapis.com/auth/drive.file'],
    });

    const drive = google.drive({ version: 'v3', auth });

    const fileMetadata = {
      name: file.name,
      parents: [process.env.GOOGLE_DRIVE_FOLDER_ID], // Optional: specify folder ID
    };

    const media = {
      mimeType: file.type,
      body: file,
    };

    const response = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id',
    });

    return response.data.id; // Return the file ID
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.location) {
      toast.error('Location is required.');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('location', JSON.stringify(formData.location)); // Directly include location in the request
    formDataToSend.append('reportedBy', user?.id); // Automatically include logged-in user ID
    Array.from(formData.images).forEach((image) =>
      formDataToSend.append('images', image)
    );

    const uploadedFileIds = await Promise.all(
      Array.from(formData.images).map((file) => handleFileUploadToGoogleDrive(file))
    );

    const res = await fetch('/api/incidents', {
      method: 'POST',
      body: formDataToSend,
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
            onChange={handleChange}
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
