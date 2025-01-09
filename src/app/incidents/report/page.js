"use client";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function IncidentForm() {
  const [formData, setFormData] = useState({
    title: "",
    images: [], // Images to upload
  });

  const handleChange = (e) => {
    const { name } = e.target;
    if (name === "images") {
      setFormData((prevData) => ({
        ...prevData,
        images: e.target.files,
      }));
    } else {
      setFormData({ ...formData, [name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Upload images to Cloudinary
      const uploadedImages = [];
      for (let i = 0; i < formData.images.length; i++) {
        const imageFile = formData.images[i];
        const uploadData = new FormData();
        uploadData.append("file", imageFile);
        uploadData.append("upload_preset", process.env.UPLOAD_PRESET); // Replace with your preset
        uploadData.append("cloud_name", process.env.CLOUD_NAME ); // Replace with your cloud name

        const res = await fetch("https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", {
          method: "POST",
          body: uploadData,
        });

        const data = await res.json();
        uploadedImages.push(data.secure_url); // Save the image URL
      }

      // Send the form data with image URLs to your API
      const response = await fetch("/api/incidents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          images: uploadedImages, // Send Cloudinary URLs
        }),
      });

      const result = await response.json();
      if (result.success) {
        toast.success("Incident reported successfully!");
      } else {
        toast.error(result.message || "Failed to report incident.");
      }
    } catch (err) {
      toast.error("An error occurred while uploading the images.");
      console.error(err);
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
        <Toaster />
      </div>
    </div>
  );
}
